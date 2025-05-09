import { Helmet } from "react-helmet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ContactForm) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactForm) {
    mutate(data);
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Architecture+Design</title>
        <meta 
          name="description" 
          content="Get in touch with Architecture+Design for inquiries, collaborations, or to discuss your project needs."
        />
      </Helmet>
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a project in mind or just want to learn more about our services, use the form below to get in touch.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
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
                              placeholder="Tell us about your project or inquiry" 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="bg-accent text-white w-full"
                      disabled={isPending || isSuccess}
                    >
                      {isPending ? "Sending..." : isSuccess ? "Message Sent" : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">Our Offices</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Milan (Headquarters)</h3>
                    <p className="text-gray-600 mb-1">123 Design Street</p>
                    <p className="text-gray-600 mb-1">20121 Milan, Italy</p>
                    <p className="text-gray-600 mb-3">+39 02 1234 5678</p>
                    <p className="text-gray-600">milan@architectureplus.design</p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">New York</h3>
                    <p className="text-gray-600 mb-1">456 Architecture Avenue</p>
                    <p className="text-gray-600 mb-1">New York, NY 10001, USA</p>
                    <p className="text-gray-600 mb-3">+1 212 555 6789</p>
                    <p className="text-gray-600">newyork@architectureplus.design</p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Singapore</h3>
                    <p className="text-gray-600 mb-1">789 Design Boulevard</p>
                    <p className="text-gray-600 mb-1">Singapore 018956</p>
                    <p className="text-gray-600 mb-3">+65 6789 0123</p>
                    <p className="text-gray-600">singapore@architectureplus.design</p>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="font-display text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-accent text-2xl" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-accent text-2xl" aria-label="Facebook">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-accent text-2xl" aria-label="LinkedIn">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-accent text-2xl" aria-label="Pinterest">
                      <i className="fab fa-pinterest"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-accent text-2xl" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
