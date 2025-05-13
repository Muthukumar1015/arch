from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from email_service import handle_request, send_booking_confirmation, send_contact_notification

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "email-service"})

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