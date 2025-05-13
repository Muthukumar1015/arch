import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ThemedButton } from "@/components/ui/themed-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Loader2, Mail, Info } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

export default function EmailTester() {
  const [email, setEmail] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [status, setStatus] = useState<null | Record<string, any>>(null);
  const [testResult, setTestResult] = useState<null | { success: boolean; message: string }>(null);
  const [smtpOpen, setSmtpOpen] = useState(false);
  const [smtpConfig, setSmtpConfig] = useState({
    server: "",
    port: "587",
    username: "",
    password: ""
  });
  const { toast } = useToast();

  // Check email service status
  const checkStatus = async () => {
    setStatusLoading(true);
    setStatus(null);
    
    try {
      const response = await apiRequest("GET", "/api/email-service-status");
      const data = await response.json();
      
      setStatus(data);
      
      if (response.ok) {
        if (data.status === "configured") {
          toast({
            title: "Email Service Ready",
            description: "The email service is configured and ready to send emails.",
          });
        } else {
          toast({
            title: "Email Configuration Required",
            description: "The email service needs SMTP credentials to be configured.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Service Check Failed",
          description: "Failed to connect to the email service. It may not be running.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking email service:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect to the email service. Check if it's running.",
        variant: "destructive",
      });
    } finally {
      setStatusLoading(false);
    }
  };

  // Save SMTP configuration
  const [configLoading, setConfigLoading] = useState(false);
  
  const saveSmtpConfig = async () => {
    // Validate inputs
    if (!smtpConfig.server || !smtpConfig.port || !smtpConfig.username || !smtpConfig.password) {
      toast({
        title: "Missing Fields",
        description: "All SMTP configuration fields are required.",
        variant: "destructive",
      });
      return;
    }
    
    setConfigLoading(true);
    
    try {
      const response = await apiRequest("POST", "/api/smtp-config", smtpConfig);
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast({
          title: "Configuration Saved",
          description: "SMTP settings have been saved successfully.",
        });
        setSmtpOpen(false);
        // Refresh status after configuring
        await checkStatus();
      } else {
        toast({
          title: "Configuration Failed",
          description: data.message || "Failed to save SMTP configuration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving SMTP config:", error);
      toast({
        title: "Request Failed",
        description: "There was a problem communicating with the server.",
        variant: "destructive",
      });
    } finally {
      setConfigLoading(false);
    }
  };
  
  // Send test email
  const sendTestEmail = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setSendLoading(true);
    setTestResult(null);
    
    try {
      const response = await apiRequest("POST", "/api/send-test-email", { email });
      const data = await response.json();
      
      setTestResult({
        success: response.ok && data.success,
        message: data.message || (response.ok ? "Email sent successfully!" : "Failed to send email")
      });
      
      if (response.ok && data.success) {
        toast({
          title: "Test Email Sent",
          description: `A test email has been sent to ${email}. Please check your inbox.`,
        });
      } else {
        toast({
          title: "Email Sending Failed",
          description: data.message || "There was a problem sending the test email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending test email:", error);
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred"
      });
      
      toast({
        title: "Request Failed",
        description: "There was a problem communicating with the server.",
        variant: "destructive",
      });
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-heading font-bold mb-4">Email Service Tester</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Check Email Service Status</h3>
        <div className="flex items-center gap-4">
          <ThemedButton 
            onClick={checkStatus} 
            disabled={statusLoading}
            className="flex items-center gap-2"
          >
            {statusLoading && <Loader2 className="animate-spin" size={16} />}
            Check Status
          </ThemedButton>
          
          <Dialog open={smtpOpen} onOpenChange={setSmtpOpen}>
            <DialogTrigger asChild>
              <ThemedButton variant="outline" className="flex items-center gap-2">
                <Mail size={16} />
                Configure SMTP
              </ThemedButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>SMTP Configuration</DialogTitle>
                <DialogDescription>
                  Enter your SMTP server details to enable email sending functionality.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="server" className="text-right text-sm font-medium">
                    Server
                  </label>
                  <Input
                    id="server"
                    value={smtpConfig.server}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, server: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="port" className="text-right text-sm font-medium">
                    Port
                  </label>
                  <Input
                    id="port"
                    value={smtpConfig.port}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
                    placeholder="587"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    value={smtpConfig.username}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                    placeholder="your-email@gmail.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={smtpConfig.password}
                    onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                    placeholder="app password"
                    className="col-span-3"
                  />
                </div>
                <div className="col-span-4">
                  <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Gmail users</AlertTitle>
                    <AlertDescription>
                      For Gmail, you need to use an App Password instead of your regular password. 
                      Two-factor authentication must be enabled on your Google account.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <ThemedButton 
                  variant="outline"
                  onClick={() => setSmtpOpen(false)}
                >
                  Cancel
                </ThemedButton>
                <ThemedButton 
                  onClick={saveSmtpConfig}
                  disabled={configLoading}
                  className="flex items-center gap-2"
                >
                  {configLoading && <Loader2 className="animate-spin" size={16} />}
                  Save Configuration
                </ThemedButton>
              </div>
            </DialogContent>
          </Dialog>
          
          {status && (
            <span className={`text-sm font-medium ${status.status === "configured" ? "text-green-600" : "text-amber-600"}`}>
              {status.status === "configured" ? "Configured ✓" : "Not Configured ⚠"}
            </span>
          )}
        </div>
        
        {status && (
          <div className="mt-4 text-sm bg-gray-50 p-4 rounded-md">
            <p><strong>SMTP Server:</strong> {status.server}</p>
            <p><strong>SMTP Port:</strong> {status.port}</p>
            <p><strong>Username:</strong> {status.username || "Not set"}</p>
            <p><strong>Status:</strong> {status.message}</p>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Send Test Email</h3>
        <p className="text-sm text-gray-600 mb-4">Enter an email address to receive a test message from the system.</p>
        
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full"
            />
          </div>
          <ThemedButton 
            onClick={sendTestEmail} 
            disabled={sendLoading || !email}
            className="flex items-center gap-2"
          >
            {sendLoading && <Loader2 className="animate-spin" size={16} />}
            Send Test Email
          </ThemedButton>
        </div>
        
        {testResult && (
          <Alert className={`mt-4 ${testResult.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertTitle>{testResult.success ? "Success!" : "Failed!"}</AlertTitle>
            <AlertDescription>
              {testResult.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}