import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { ThemedButton } from "@/components/ui/themed-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema, type BookingFormValues } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { companyInfo, projectTypes, timeSlots, getAvailableDates } from "@/lib/utils";
import MotionImage from "@/components/ui/motion-image";
import { CheckCircle2, MapPin, Phone, Clock } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Get available dates (next 14 days, excluding Sundays)
  const availableDates = getAvailableDates();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      date: "",
      time: "",
      message: "",
      terms: false,
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Remove terms field as it's not part of the API schema
    const { terms, ...bookingData } = data;
    
    try {
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Booking confirmed!",
          description: "Your consultation has been scheduled. Check your email for confirmation details.",
          variant: "default",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Failed to book consultation",
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
            <h1 className="text-5xl font-heading font-bold mb-6">Book a Consultation</h1>
            <p className="text-xl text-gray-300">
              Schedule a meeting with our expert architects to discuss your project and vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <SectionHeading
                label="Consultation"
                title="Book a Meeting With Our Architects"
                subtitle="Schedule a consultation with our expert team to discuss your architectural vision. Whether you're planning a new build, renovation, or seeking professional advice, we're here to help bring your ideas to life."
                className="text-left mb-8"
                light
              />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-start mb-6">
                  <MapPin className="text-secondary text-2xl mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-bold text-lg">Visit Our Office</h3>
                    <p className="text-gray-300">
                      {companyInfo.address.street}, {companyInfo.address.area}, {companyInfo.address.city}, {companyInfo.address.state}, {companyInfo.address.zip}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Clock className="text-secondary text-2xl mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-bold text-lg">Office Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: {companyInfo.hours.weekdays}<br />
                      Saturday: {companyInfo.hours.saturday}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-secondary text-2xl mr-4 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading font-bold text-lg">Contact Us</h3>
                    <p className="text-gray-300">
                      Phone: {companyInfo.contact.phone}<br />
                      Email: {companyInfo.contact.email}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* A professional office meeting space with architects and clients */}
                <MotionImage 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Architectural consultation meeting" 
                  className="rounded-lg shadow-xl" 
                />
              </motion.div>
            </div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-dark p-8 rounded-lg">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-6">
                      <CheckCircle2 size={64} className="text-secondary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">Your Booking is Confirmed!</h3>
                    <p className="text-gray-300 mb-6">
                      Thank you for scheduling a consultation with DD Architecture. We're excited to meet with you and discuss your project!
                      <br /><br />
                      A confirmation email has been sent to your email address with all the details.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 bg-secondary text-primary font-accent font-medium rounded-sm hover:bg-white transition-colors"
                    >
                      Book Another Consultation
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-heading font-bold mb-6">Schedule Your Consultation</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Full Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your name"
                                    {...field}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
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
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Phone Number *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your phone number"
                                    {...field}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Project Type *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary">
                                      <SelectValue placeholder="Select Project Type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                    {projectTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Preferred Date *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary">
                                      <SelectValue placeholder="Select Date" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                    {availableDates.map((date) => {
                                      const formattedDate = new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short'
                                      });
                                      
                                      return (
                                        <SelectItem key={date} value={date}>
                                          {formattedDate}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Preferred Time *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary">
                                      <SelectValue placeholder="Select Time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                                    {timeSlots.map((slot) => (
                                      <SelectItem key={slot.value} value={slot.value}>
                                        {slot.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-300">Project Details</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please provide details about your project, requirements, and any questions you may have."
                                  rows={4}
                                  {...field}
                                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400 text-xs">
                                This helps us prepare for your consultation.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="terms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 data-[state=checked]:bg-secondary data-[state=checked]:text-primary"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-gray-300">
                                  I agree to the <a href="#" className="text-secondary hover:underline">terms and conditions</a> and consent to having my submitted information collected and stored.
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <ThemedButton
                          variant="primary"
                          className="w-full"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Processing..." : "Book Consultation"}
                        </ThemedButton>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Consultation Process"
            title="What to Expect"
            subtitle="Our consultation process is designed to help us understand your vision and provide tailored architectural solutions."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {consultationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Client Experiences"
            title="What Our Clients Say"
            subtitle="Hear from clients who have experienced our consultation process and worked with our team."
            center
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-primary bg-opacity-50 p-8 rounded-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="text-secondary text-5xl leading-none font-serif">"</div>
                </div>
                <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold">{testimonial.name}</h4>
                    <p className="text-secondary text-sm">{testimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Common Questions"
            title="Booking FAQs"
            subtitle="Find answers to frequently asked questions about our consultation process."
            center
          />
          
          <div className="max-w-3xl mx-auto mt-12">
            <div className="space-y-6">
              {bookingFaqs.map((faq, index) => (
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
          </div>
        </div>
      </section>
    </>
  );
}

// Consultation process steps
const consultationSteps = [
  {
    title: "Initial Discussion",
    description: "During the first meeting, we'll discuss your vision, requirements, budget, and timeline to understand your project goals."
  },
  {
    title: "Site Assessment",
    description: "If applicable, we'll visit the site to evaluate conditions, constraints, and opportunities that will inform the design process."
  },
  {
    title: "Design Concepts",
    description: "Based on our discussions, we'll present initial design concepts and explore various approaches to your project."
  }
];

// Testimonials
const testimonials = [
  {
    quote: "The initial consultation with DD Architecture was incredibly valuable. They asked insightful questions that helped clarify our vision and provided practical suggestions that we hadn't considered. This led to a design that exceeded our expectations.",
    name: "Priya & Karthik Sundaram",
    project: "Residential Client",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    quote: "As a first-time commercial property developer, I appreciated how the team took time to explain the entire process during our consultation. Their expertise helped guide our project from a vague concept to a clearly defined vision with practical next steps.",
    name: "Arjun Mehta",
    project: "Commercial Client",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

// Booking FAQs
const bookingFaqs = [
  {
    question: "How long does a typical consultation last?",
    answer: "Initial consultations typically last 60-90 minutes, allowing enough time to discuss your project in detail, understand your requirements, and address any questions you may have."
  },
  {
    question: "Should I prepare anything for the consultation?",
    answer: "It's helpful to bring any inspiration images, sketches, or documents related to your project. For existing properties, bringing floor plans or photographs can be valuable. A list of requirements or questions will also help make the most of our time together."
  },
  {
    question: "Is there a fee for the initial consultation?",
    answer: "The initial consultation is complimentary for potential clients. This allows us to understand your project and determine if we're the right fit for your needs before any commitments are made."
  },
  {
    question: "Can I reschedule my booking if needed?",
    answer: "Yes, you can reschedule your consultation up to 24 hours before the appointed time. Please contact us at info@ddarchitecture.com or call +91 99999 88888 to make changes to your booking."
  }
];
