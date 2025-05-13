from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from email_service import handle_request, send_booking_confirmation, send_contact_notification

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "email-service"})

@app.route('/api/test-email', methods=['GET'])
def test_email():
    """Test email sending functionality"""
    # Get SMTP configuration
    smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = os.getenv('SMTP_PORT', '587')
    smtp_username = os.getenv('SMTP_USERNAME', '')
    smtp_password = os.getenv('SMTP_PASSWORD', '')
    
    # Check if credentials are configured
    has_credentials = bool(smtp_username and smtp_password)
    
    return jsonify({
        "status": "configured" if has_credentials else "not_configured",
        "server": smtp_server,
        "port": smtp_port,
        "username": smtp_username[:3] + "***" if smtp_username else None,
        "message": "Email service is ready to send emails" if has_credentials else "Email service requires SMTP credentials"
    })

@app.route('/api/send-test-email', methods=['POST'])
def send_test_email():
    """Send a test email to verify configuration"""
    try:
        # Get recipient email from request
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({
                "success": False,
                "message": "Missing required field: email"
            }), 400
            
        recipient_email = data['email']
        
        # Create test booking data
        test_data = {
            "name": "Test User",
            "email": recipient_email,
            "date": "2023-05-30",
            "time": "10:00 AM",
            "projectType": "Test Project"
        }
        
        # Send test email
        result = send_booking_confirmation(test_data)
        
        if result.get("success", False):
            return jsonify({
                "success": True,
                "message": f"Test email sent successfully to {recipient_email}"
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": result.get("message", "Failed to send test email")
            }), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error sending test email: {str(e)}"
        }), 500

@app.route('/api/send-email/booking', methods=['POST'])
def booking_email():
    """Endpoint to send booking confirmation email"""
    try:
        # Get data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'date', 'time', 'projectType']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False, 
                    "message": f"Missing required field: {field}"
                }), 400
        
        # Send booking confirmation email
        result = send_booking_confirmation(data)
        
        if result["success"]:
            return jsonify(result), 200
        else:
            return jsonify(result), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error processing request: {str(e)}"
        }), 500

@app.route('/api/send-email/contact', methods=['POST'])
def contact_email():
    """Endpoint to send contact notification email"""
    try:
        # Get data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False, 
                    "message": f"Missing required field: {field}"
                }), 400
        
        # Send contact notification email
        result = send_contact_notification(data)
        
        if result["success"]:
            return jsonify(result), 200
        else:
            return jsonify(result), 500
            
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error processing request: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)