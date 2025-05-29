"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message is too short"),
});
type ContactForm = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const { user, isLoaded } = useUser();

  const defaultEmail = user?.primaryEmailAddress?.emailAddress || "";

  const form = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: user?.firstName || "",
      email: defaultEmail,
      message: "",
    },
  });

  useEffect(() => {
    if (isLoaded && user) {
      form.setValue("email", user.primaryEmailAddress?.emailAddress || "");
      form.setValue("name", user.firstName || "");
    }
  }, [isLoaded, user, form]);

  const [status, setStatus] = useState<null | string>(null);

  async function onSubmit(values: ContactForm) {
    setStatus(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) setStatus("Message sent successfully! ✅");
    else setStatus("Failed to send. Please try again.");
    form.reset({
      name: user?.firstName || "",
      email: defaultEmail,
      message: "",
    });
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    className="bg-zinc-900/40 text-muted-foreground cursor-not-allowed"
                  />
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
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your message..."
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send
          </Button>
        </form>
      </Form>
      {status && (
        <div
          className={`mt-4 text-center ${
            status.startsWith("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
}
