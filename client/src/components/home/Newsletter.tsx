import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewsletterForm) => {
      const res = await apiRequest("POST", "/api/newsletter", data);
      return res.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: NewsletterForm) {
    mutate(data);
  }

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8">
            Subscribe to receive the latest updates on our projects, articles, and industry insights.
          </p>
          
          {isSubmitted ? (
            <div className="bg-accent/20 p-4 rounded-md">
              <p className="text-lg font-semibold">Thanks for subscribing!</p>
              <p className="mt-2">We'll keep you updated with our latest news and projects.</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder="Your email address" 
                          className="px-4 py-3 text-gray-800 focus:outline-none" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="bg-accent text-white px-6 py-3 font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-all"
                  disabled={isPending}
                >
                  {isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="mt-4 text-sm text-gray-400">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
