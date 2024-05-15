"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import type EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-textarea-autosize";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/uploadthing";

interface PostFormProps {
  onSubmit: (values: z.infer<typeof postFormSchema>) => void;
}

export const postFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.any()
});

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
  });

  const { isSubmitting, errors } = form.formState;

  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          editorRef.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles("imageUploader", {
                    files: [file],
                  });

                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast.error((value as { message: string }).message)
      }
    }
  }, [errors])

  const onEditorSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const blocks = await editorRef.current?.save()

    data.content = blocks

    onSubmit(data)
  }

  const { ref: titleRef, ...rest } = form.register('title')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEditorSubmit)} className="space-y-6 mt-8">
      <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Content</FormLabel> */}
              <FormControl>
                <div>
                  <TextareaAutosize
                    ref={(e) => {
                      titleRef(e);
                      // @ts-ignore
                      _titleRef.current = e;
                    }}
                    {...rest}
                    placeholder="Description"
                    className="w-full resize-none appearance-none mb-10 overflow-hidden bg-transparent text-xl font-bold focus:outline-none"
                  />
                  <div id="editor" className="shadow-md" />
                </div>
              </FormControl>
              {/* <FormDescription>Name your exercise</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          {/* {exercise && (
            // <Link href="/exercises">
              <Button type="button" variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            // </Link>
          )} */}
          <Link href="/?refresh=true">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={/*!isValid ||*/ isSubmitting}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};
