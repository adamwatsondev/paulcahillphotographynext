"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/nav-button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

const schema = z.object({
  name: z.string().regex(/^[a-zA-Z-]+$/, "Only letters and hyphen allowed."),
  surname: z.string().regex(/^[a-zA-Z-]+$/, "Only letters and hyphen allowed."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    emailjs
      .send(
        "service_d1rfy3c",
        "template_tv7vbrs",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        "Tk-zw7Tnb0BfGcXW1"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        form.reset();
        window.history.pushState({}, "", "/");
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        toast.error("An error occurred while sending the message.");
      });
  };

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      <div className="flex flex-col px-4 md:px-10 lg:px-20 items-center pb-20 mt-28 sm:mt-60">
        <Card className="w-full border-black max-w-lg h-full">
          <CardContent className="flex flex-col pt-8 gap-8 justify-center">
            <div className="text-center">
              <span className="text-black font-old-standard md:text-3xl text-xl font-bold leading-tight">
                Got questions?
              </span>
              <span className="text-black font-old-standard md:text-xl text-lg font-medium leading-tight block mt-4">
                Contact me and let&apos;s have a chat.
              </span>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-black font-old-standard">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-md font-black font-old-standard">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-black font-old-standard">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-black font-old-standard">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-40"
                          placeholder="..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardFooter className="flex justify-end">
                  <Button type="submit">
                    <span className="font-old-standard text-md font-semibold">
                      Submit
                    </span>
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
