"use client";

import { Textarea } from "./ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { uploadFiles } from "@/lib/uploadthing";
import { UseFormRegisterReturn } from "react-hook-form";

interface EditorProps {
  ref?: React.Ref<HTMLTextAreaElement>;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ ...props }, reff) => {
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
                    const [res] = await uploadFiles("imageUploader", { files: [file] });

                    
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

    return (
      <div>
        <TextareaAutosize
          // ref={(e) => {
          //   reff(e);
          //   // @ts-ignore
          //   _titleRef.current = e;
          // }}
          {...props}
          placeholder="Description"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-xl font-bold focus:outline-none"
          //   {...props}
        />
        <div id="editor" className="min-h-[500px]" />
      </div>
      // <Textarea
      //     {...props}

      // />
    );
  }
);

Editor.displayName = "Editor";
