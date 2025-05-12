import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ThemedButton } from "@/components/ui/themed-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { companyInfo } from "@/lib/utils";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Globe,
  CheckCircle2
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/contacts", data);
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Message sent successfully",
          description: "Thank you for reaching out. We'll get back to you shortly.",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-primary text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-heading font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Get in touch with our team for inquiries, collaborations, or to discuss your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <SectionHeading
                label="Get In Touch"
                title="Contact Us"
                subtitle="Have questions about our services or want to discuss your project? Reach out to us using the contact form or through our contact information."
                className="text-left mb-8"
                light
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              >
                <div className="bg-primary bg-opacity-50 p-6 rounded-lg">
                  <div className="text-secondary mb-3">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Our Location</h3>
                  <p className="text-gray-300">
                    {companyInfo.address.street}, {companyInfo.address.area}, {companyInfo.address.city}, {companyInfo.address.state}, {companyInfo.address.zip}
                  </p>
                </div>
                
                <div className="bg-primary bg-opacity-50 p-6 rounded-lg">
                  <div className="text-secondary mb-3">
                    <Phone size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Phone</h3>
                  <p className="text-gray-300">
                    {companyInfo.contact.phone}<br />
                    {companyInfo.contact.officePhone}
                  </p>
                </div>
                
                <div className="bg-primary bg-opacity-50 p-6 rounded-lg">
                  <div className="text-secondary mb-3">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Email</h3>
                  <p className="text-gray-300">
                    {companyInfo.contact.email}<br />
                    {companyInfo.contact.projectEmail}
                  </p>
                </div>
                
                <div className="bg-primary bg-opacity-50 p-6 rounded-lg">
                  <div className="text-secondary mb-3">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Working Hours</h3>
                  <p className="text-gray-300">
                    Mon - Fri: {companyInfo.hours.weekdays}<br />
                    Sat: {companyInfo.hours.saturday}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading font-bold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href={companyInfo.social.facebook} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href={companyInfo.social.instagram} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href={companyInfo.social.linkedin} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href={companyInfo.social.pinterest} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-colors">
                    <Globe size={18} />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                <h3 className="font-heading font-bold text-lg mb-4">Our Location</h3>
                <div className="rounded-lg overflow-hidden h-80">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31089.709237505498!2d80.19492193347361!3d13.085716584273041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1657901234567!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DD Architecture Location"
                  ></iframe>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-primary p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h3>
                
                {isSuccess ? (
                  <div className="bg-secondary/20 p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4">
                      <CheckCircle2 size={48} className="text-secondary" />
                    </div>
                    <h4 className="text-xl font-heading font-bold mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-300 mb-6">
                      Thank you for reaching out to DD Architecture. We'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 bg-secondary text-primary font-accent font-medium rounded-sm hover:bg-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-300">Your Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your name"
                                  {...field}
                                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
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
                              <FormLabel className="text-sm font-medium text-gray-300">Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  type="email"
                                  {...field}
                                  className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-300">Subject *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter subject"
                                {...field}
                                className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
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
                            <FormLabel className="text-sm font-medium text-gray-300">Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your message here"
                                rows={5}
                                {...field}
                                className="w-full px-4 py-3 bg-dark border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <ThemedButton
                        variant="primary"
                        className="w-full"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending Message..." : "Send Message"}
                      </ThemedButton>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Quick Answers"
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services and process."
            center
          />
          
          <div className="max-w-3xl mx-auto mt-12">
            <div className="space-y-6">
              {contactFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a href="/faq" className="inline-block px-8 py-3 bg-primary text-white font-accent font-medium rounded-sm hover:bg-secondary transition-colors">
                View All FAQs
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Contact page specific FAQs
const contactFaqs = [
  {
    question: "How quickly can I expect a response to my inquiry?",
    answer: "We aim to respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling our office directly at +91 99999 88888."
  },
  {
    question: "Do you provide architectural services outside of Chennai?",
    answer: "Yes, while our office is based in Chennai, we handle projects throughout Tamil Nadu and across India. We've successfully completed projects in Bangalore, Mumbai, and other major cities."
  },
  {
    question: "What information should I include in my initial project inquiry?",
    answer: "To help us understand your needs better, please include details about the project type, location, approximate size, budget, and timeline. Any initial ideas or inspirations are also helpful."
  }
];
