"use client";

import Header from "@/components/ui/header";
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
import Footer from "@/components/ui/footer";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import imagesArray from "@/data/imagesArray";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().regex(/^[a-zA-Z-]+$/, "Only letters and hyphen allowed."),
  surname: z.string().regex(/^[a-zA-Z-]+$/, "Only letters and hyphen allowed."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  gallery: z.string().optional(),
  image: z.string().min(1, "Please enter a valid image number.").optional(),
  tab: z.string().optional(),
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
      gallery: "",
      image: "",
      tab: new URLSearchParams(window.location.search).get("tab") || "general",
    },
  });

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab) {
      form.setValue("tab", tab);
    }
  }, []);

  const onSubmit = (data: FormData) => {
    emailjs
      .send(
        "service_j47mjsh",
        "template_tv7vbrs",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,

          gallery: data.gallery,
          image: data.image,
        },
        "Tk-zw7Tnb0BfGcXW1"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        form.reset(); // Clear the form
        window.history.pushState({}, "", "/");
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        toast.error("An error occurred while sending the message.");
      });
  };

  const handleTabChange = (value: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tab", value);
    window.history.pushState({}, "", currentUrl.toString());
  };

  return (
    <div className="flex flex-col gap-8 md:gap-20 pb-20">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-md overflow-hidden">
        <Header />
      </div>
      <div className="xl:col-span-2 col-span-1 justify-self-center xl:justify-self-center">
        <Tabs
          defaultValue={form.getValues("tab")}
          className="grid grid-cols-1 2xl:gap-20 items-center justify-center mx-4 xl:mx-40 sm:mx-20 mt-40 xl:mt-60"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex col-span-1 gap-4 justify-center">
            <TabsTrigger
              value="general"
              className="px-4 py-2 text-sm font-medium rounded-md border hover:text-black border-gray-300 hover:bg-gray-100"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="purchase"
              className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:text-black hover:bg-white"
            >
              Purchasing
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="general"
            className="grid grid-cols-1 place-items-center"
          >
            <Card className="w-full border-black max-w-lg h-full">
              <CardContent className="flex flex-col pt-8 gap-8 justify-center">
                <div className="text-center">
                  <span className="text-black font-old-standard md:text-3xl text-xl font-bold leading-tight">
                    Got questions?
                  </span>
                  <span className="text-black font-old-standard md:text-xl text-lg font-medium leading-tight block mt-4">
                    Contact me and let's have a chat.
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
                            <FormLabel className="text-md font-old-standard">
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
                            <FormLabel className="text-md font-old-standard">
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
                          <FormLabel className="text-md font-old-standard">
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
                          <FormLabel className="text-md font-old-standard">
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
          </TabsContent>

          <TabsContent
            value="purchase"
            className="grid grid-cols-1 mt-0 xl:mt-0 2xl:-mt-20 place-items-center"
          >
            <Card className="w-full max-w-lg h-full">
              <CardContent className="flex flex-col gap-8 justify-center">
                <div className="text-center">
                  <span className="text-black font-old-standard md:text-3xl text-xl font-bold leading-tight">
                    Interested in purchasing?
                  </span>
                  <span className="text-black font-old-standard md:text-xl text-lg font-medium leading-tight block mt-4">
                    Select the <strong>gallery</strong> and{" "}
                    <strong>image number</strong> and I'll get back to you.
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
                          <FormItem className="w-1/2">
                            <FormLabel className="text-md font-old-standard">
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
                          <FormItem className="w-1/2">
                            <FormLabel className="text-md font-old-standard">
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
                          <FormLabel className="text-md font-old-standard">
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
                          <FormLabel className="text-md font-old-standard">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-20"
                              placeholder="..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Gallery</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a gallery" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {imagesArray.map((image, index) => (
                                  <SelectItem
                                    className="hover:cursor-pointer"
                                    key={index}
                                    value={image.title}
                                  >
                                    {image.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-md font-old-standard">
                              Image Number
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
          </TabsContent>
        </Tabs>
      </div>

      <Toaster position="bottom-right" />

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-white shadow-md flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
