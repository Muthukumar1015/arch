import os
import smtplib
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'info@ddarchitecture.com')

# Company Information
COMPANY_INFO = {
    "name": "DD Architecture",
    "address": {
        "street": "123 Anna Nagar Main Road",
        "area": "Anna Nagar",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "zip": "600040",
        "country": "India"
    },
    "contact": {
        "phone": "+91 99999 88888",
        "officePhone": "+91 44 2345 6789",
        "email": "info@ddarchitecture.com",
        "projectEmail": "projects@ddarchitecture.com"
    },
    "hours": {
        "weekdays": "9:00 AM - 6:00 PM",
        "saturday": "10:00 AM - 2:00 PM",
        "sunday": "Closed"
    }
}

def format_date(date_string):
    """Format date string to more readable format"""
    try:
        date_obj = datetime.strptime(date_string, '%Y-%m-%d')
        return date_obj.strftime('%A, %B %d, %Y')
    except:
        return date_string

def send_booking_confirmation(booking_data):
    """Send booking confirmation email"""
    try:
        # Extract booking details
        name = booking_data.get('name', '')
        email = booking_data.get('email', '')
        date = booking_data.get('date', '')
        time = booking_data.get('time', '')
        project_type = booking_data.get('projectType', '')
        
        # Format date for better readability
        formatted_date = format_date(date)
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = f"DD Architecture <{SENDER_EMAIL}>"
        msg['To'] = email
        msg['Subject'] = "Your Architectural Consultation Booking Confirmation"
        
        # Email body
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .booking-details {{ background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #e0c080; }}
                .footer {{ background-color: #f5f5f5; padding: 15px; font-size: 12px; text-align: center; }}
                h1, h2 {{ color: #1a1a1a; }}
                .highlight {{ color: #e0c080; font-weight: bold; }}
                .button {{ display: inline-block; background-color: #e0c080; color: #1a1a1a; padding: 10px 20px; text-decoration: none; font-weight: bold; margin-top: 15px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>DD Architecture</h1>
                    <p>Your Consultation is Confirmed</p>
                </div>
                <div class="content">
                    <p>Dear {name},</p>
                    <p>Thank you for booking a consultation with DD Architecture. We are excited to meet with you and discuss your {project_type.lower()} project.</p>
                    
                    <div class="booking-details">
                        <h2>Your Booking Details:</h2>
                        <p><strong>Date:</strong> {formatted_date}</p>
                        <p><strong>Time:</strong> {time}</p>
                        <p><strong>Project Type:</strong> {project_type}</p>
                        <p><strong>Location:</strong> {COMPANY_INFO['address']['street']}, {COMPANY_INFO['address']['area']}, {COMPANY_INFO['address']['city']}, {COMPANY_INFO['address']['state']}, {COMPANY_INFO['address']['zip']}</p>
                    </div>
                    
                    <p>If you need to reschedule or have any questions before your appointment, please contact us at <span class="highlight">{COMPANY_INFO['contact']['phone']}</span> or reply to this email.</p>
                    
                    <p>We recommend arriving 5-10 minutes early. If you have any existing floor plans, images, or inspiration for your project, please bring them along or email them to us beforehand.</p>
                    
                    <p>We look forward to meeting you and discussing your architectural vision!</p>
                    
                    <p>Warm regards,<br>The DD Architecture Team</p>
                </div>
                <div class="footer">
                    <p>DD Architecture | {COMPANY_INFO['address']['street']}, {COMPANY_INFO['address']['area']}, {COMPANY_INFO['address']['city']}</p>
                    <p>{COMPANY_INFO['contact']['phone']} | {COMPANY_INFO['contact']['email']}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            if SMTP_USERNAME and SMTP_PASSWORD:
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        return {"success": True, "message": "Booking confirmation email sent successfully"}
    
    except Exception as e:
        print(f"Error sending booking confirmation email: {str(e)}")
        return {"success": False, "message": f"Failed to send booking confirmation email: {str(e)}"}

def send_contact_notification(contact_data):
    """Send notification email when someone submits contact form"""
    try:
        # Extract contact details
        name = contact_data.get('name', '')
        email = contact_data.get('email', '')
        subject = contact_data.get('subject', '')
        message = contact_data.get('message', '')
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = f"DD Architecture Website <{SENDER_EMAIL}>"
        msg['To'] = COMPANY_INFO['contact']['email']  # Send to company email
        msg['Subject'] = f"New Contact Form Submission: {subject}"
        
        # Email body - notification to company
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .contact-details {{ background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #e0c080; }}
                .message-box {{ background-color: #f9f9f9; padding: 15px; margin: 15px 0; border: 1px solid #ddd; }}
                .footer {{ background-color: #f5f5f5; padding: 15px; font-size: 12px; text-align: center; }}
                h1, h2 {{ color: #1a1a1a; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Website Contact</h1>
                </div>
                <div class="content">
                    <p>You have received a new message from your website contact form.</p>
                    
                    <div class="contact-details">
                        <h2>Contact Details:</h2>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Subject:</strong> {subject}</p>
                    </div>
                    
                    <h2>Message:</h2>
                    <div class="message-box">
                        <p>{message}</p>
                    </div>
                    
                    <p>Please respond to this inquiry at your earliest convenience.</p>
                </div>
                <div class="footer">
                    <p>This is an automated notification from your website.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            if SMTP_USERNAME and SMTP_PASSWORD:
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
            
        # Send auto-reply to the user
        auto_reply = MIMEMultipart()
        auto_reply['From'] = f"DD Architecture <{SENDER_EMAIL}>"
        auto_reply['To'] = email
        auto_reply['Subject'] = "Thank you for contacting DD Architecture"
        
        # Email body - auto-reply to user
        auto_reply_html = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .footer {{ background-color: #f5f5f5; padding: 15px; font-size: 12px; text-align: center; }}
                h1, h2 {{ color: #1a1a1a; }}
                .highlight {{ color: #e0c080; font-weight: bold; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>DD Architecture</h1>
                </div>
                <div class="content">
                    <p>Dear {name},</p>
                    <p>Thank you for contacting DD Architecture. We have received your message regarding <strong>"{subject}"</strong>.</p>
                    
                    <p>Our team will review your inquiry and get back to you as soon as possible, usually within 1-2 business days.</p>
                    
                    <p>If your matter is urgent, please call us directly at <span class="highlight">{COMPANY_INFO['contact']['phone']}</span> during our business hours:</p>
                    <p>
                        Monday-Friday: {COMPANY_INFO['hours']['weekdays']}<br>
                        Saturday: {COMPANY_INFO['hours']['saturday']}<br>
                        Sunday: {COMPANY_INFO['hours']['sunday']}
                    </p>
                    
                    <p>We appreciate your interest in DD Architecture and look forward to assisting you with your architectural needs.</p>
                    
                    <p>Warm regards,<br>The DD Architecture Team</p>
                </div>
                <div class="footer">
                    <p>DD Architecture | {COMPANY_INFO['address']['street']}, {COMPANY_INFO['address']['area']}, {COMPANY_INFO['address']['city']}</p>
                    <p>{COMPANY_INFO['contact']['phone']} | {COMPANY_INFO['contact']['email']}</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        auto_reply.attach(MIMEText(auto_reply_html, 'html'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            if SMTP_USERNAME and SMTP_PASSWORD:
                server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(auto_reply)
            
        return {"success": True, "message": "Contact notification emails sent successfully"}
    
    except Exception as e:
        print(f"Error sending contact notification email: {str(e)}")
        return {"success": False, "message": f"Failed to send contact notification email: {str(e)}"}

# Helper function to handle API requests
def handle_request(request_type, data):
    """Handle incoming API requests"""
    try:
        # Parse the JSON data if it's a string
        if isinstance(data, str):
            data = json.loads(data)
            
        if request_type == "booking":
            return send_booking_confirmation(data)
        elif request_type == "contact":
            return send_contact_notification(data)
        else:
            return {"success": False, "message": f"Unknown request type: {request_type}"}
    
    except Exception as e:
        return {"success": False, "message": f"Error processing request: {str(e)}"}

# For command-line testing
if __name__ == "__main__":
    # Test booking email
    test_booking = {
        "name": "John Doe",
        "email": "test@example.com",
        "date": "2023-05-20",
        "time": "10:00 AM",
        "projectType": "Residential Renovation"
    }
    
    result = send_booking_confirmation(test_booking)
    print(result)