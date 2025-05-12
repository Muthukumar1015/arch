import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Create a test SMTP service for development
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "ethereal.user@ethereal.email",
    pass: process.env.EMAIL_PASS || "ethereal_pass",
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for creating bookings
  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Store booking in database
      const booking = await storage.createBooking(bookingData);
      
      // Send confirmation email
      await sendBookingConfirmationEmail(booking);
      
      res.status(201).json({
        message: "Booking created successfully",
        data: booking
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      } else {
        console.error("Booking error:", error);
        res.status(500).json({ message: "Failed to create booking" });
      }
    }
  });

  // API endpoint for creating contact form submissions
  app.post("/api/contacts", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Store contact message in database
      const contact = await storage.createContact(contactData);
      
      // Send notification email about new contact message
      await sendContactNotificationEmail(contact);
      
      res.status(201).json({
        message: "Message sent successfully",
        data: contact
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      } else {
        console.error("Contact error:", error);
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to send booking confirmation email
async function sendBookingConfirmationEmail(booking: any) {
  const companyName = "DD Architecture";
  const companyAddress = "24 Anna Main Road, Anna Nagar, Chennai, Tamil Nadu, 600040";
  
  const mailOptions = {
    from: '"DD Architecture" <info@ddarchitecture.com>',
    to: booking.email,
    subject: "Booking Confirmation - DD Architecture",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Your Booking is Confirmed!</h2>
        <p>Dear ${booking.name},</p>
        <p>Thank you for booking a consultation with ${companyName}. We're excited to meet with you and discuss your project!</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #e0c080;">
          <h3 style="margin-top: 0;">Booking Details:</h3>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Project Type:</strong> ${booking.projectType}</p>
          <p><strong>Location:</strong> ${companyAddress}</p>
        </div>
        
        <p>If you need to reschedule or have any questions, please contact us at info@ddarchitecture.com or call +91 99999 88888.</p>
        
        <p>We look forward to meeting you!</p>
        
        <p>Best regards,<br>The DD Architecture Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    throw error;
  }
}

// Function to send notification about new contact form submission
async function sendContactNotificationEmail(contact: any) {
  const mailOptions = {
    from: '"DD Architecture Website" <noreply@ddarchitecture.com>',
    to: 'info@ddarchitecture.com',
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
        <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0;">
          ${contact.message.replace(/\n/g, '<br>')}
        </div>
        <p>Please respond to this inquiry at your earliest convenience.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact notification email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending contact notification email:", error);
    throw error;
  }
}
