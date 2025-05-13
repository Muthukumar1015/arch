import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";
import axios from "axios";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { spawn } from "child_process";
import path from "path";

// Python email service URL (default localhost:5001)
const PYTHON_EMAIL_SERVICE_URL = process.env.PYTHON_EMAIL_SERVICE_URL || "http://localhost:5001";

// Start Python email service
function startPythonEmailService() {
  try {
    const pythonServicePath = path.join(process.cwd(), 'python_services', 'start_email_service.sh');
    console.log(`Starting Python email service from: ${pythonServicePath}`);
    
    const pythonProcess = spawn('sh', [pythonServicePath], {
      detached: true,
      stdio: 'ignore'
    });
    
    pythonProcess.unref();
    
    console.log('Python email service started with PID:', pythonProcess.pid);
  } catch (error) {
    console.error('Failed to start Python email service:', error);
  }
}

// Start the Python email service when the server starts
startPythonEmailService();

export async function registerRoutes(app: Express): Promise<Server> {
  // Email service test endpoint
  app.get("/api/email-service-status", async (_req: Request, res: Response) => {
    try {
      // Check if Python email service is running
      const response = await axios.get(`${PYTHON_EMAIL_SERVICE_URL}/api/test-email`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Failed to connect to Python email service:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to connect to Python email service",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Send test email
  app.post("/api/send-test-email", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required"
        });
      }
      
      // Forward request to Python service
      const response = await axios.post(`${PYTHON_EMAIL_SERVICE_URL}/api/send-test-email`, { email });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Failed to send test email:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send test email",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
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

// Function to send booking confirmation email using Python service
async function sendBookingConfirmationEmail(booking: any) {
  try {
    console.log("Sending booking confirmation via Python email service");
    
    // Call the Python email service API
    const response = await axios.post(`${PYTHON_EMAIL_SERVICE_URL}/api/send-email/booking`, booking);
    
    console.log("Python email service response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error calling Python email service for booking:", error);
    // Don't throw the error to prevent booking failure due to email issues
    console.log("Continuing despite email failure");
    return { success: false, message: "Failed to send email but booking was stored" };
  }
}

// Function to send notification about new contact form submission using Python service
async function sendContactNotificationEmail(contact: any) {
  try {
    console.log("Sending contact notification via Python email service");
    
    // Call the Python email service API
    const response = await axios.post(`${PYTHON_EMAIL_SERVICE_URL}/api/send-email/contact`, contact);
    
    console.log("Python email service response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error calling Python email service for contact:", error);
    // Don't throw the error to prevent contact submission failure due to email issues
    console.log("Continuing despite email failure");
    return { success: false, message: "Failed to send email but contact was stored" };
  }
}
