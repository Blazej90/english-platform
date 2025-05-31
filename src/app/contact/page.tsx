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
import { TypewriterEffectLoop } from "@/components/ui/typewriter-effect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

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

  async function onSubmit(values: ContactForm) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Message sent successfully! 🚀");
        form.reset({
          name: user?.firstName || "",
          email: defaultEmail,
          message: "",
        });
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-8 flex flex-col items-center justify-center min-h-[70vh]">
      <TypewriterEffectLoop
        words={[
          {
            text: "Contact",
            className: "text-emerald-600 dark:text-emerald-400",
          },
          { text: "Let's Talk", className: "text-blue-600 dark:text-blue-400" },
          {
            text: "Write Us",
            className: "text-yellow-500 dark:text-yellow-300",
          },
        ]}
        className="!text-2xl sm:!text-3xl md:!text-4xl font-bold mb-4 text-center"
        cursorClassName="bg-blue-500"
      />
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        If you have any questions or want to book a lesson, fill out the form
        below and we will get back to you as soon as possible.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
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
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold px-8 py-3 text-base
              bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-600
              text-white shadow-lg hover:shadow-emerald-400/60
              focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
              relative overflow-hidden active:scale-95 transition duration-150"
          >
            <Send className="w-5 h-5 mr-1" />
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
