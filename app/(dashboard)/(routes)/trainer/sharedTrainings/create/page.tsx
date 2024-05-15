"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreateSharedTrainingPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit =  async (values: z.infer<typeof formSchema>) => {
    try {
        // const response = await axios.post('/api/users');
        // console.log(response.data)
        const response = await axios.post('/api/trainings', values);
        router.push(`/trainer/sharedTrainings/${response.data.id}`)
        toast.success("Training created")
    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name yout train</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. Advaced web development"
                    />
                  </FormControl>
                  <FormDescription>
                    What would you train?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2"> 
                <Link href="/">
                <Button type="button" variant="ghost">
                    Cancel
                </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                    Continue
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateSharedTrainingPage;
