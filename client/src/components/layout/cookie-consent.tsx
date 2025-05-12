import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Cookies from "js-cookie";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      // Show the banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookieConsent", "accepted", { expires: 365 });
    setShowConsent(false);
  };

  const rejectCookies = () => {
    Cookies.set("cookieConsent", "rejected", { expires: 365 });
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full bg-primary text-white p-4 z-50 shadow-lg"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <p className="text-sm">
                We use cookies to enhance your experience on our website. By continuing to use our site, you consent to our use of cookies in accordance with our{" "}
                <Link href="/privacy" className="underline text-secondary hover:text-white transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="secondary" 
                onClick={acceptCookies}
                className="font-accent"
              >
                Accept All
              </Button>
              <Button 
                variant="outline" 
                onClick={rejectCookies}
                className="border-white text-white hover:bg-white hover:text-primary font-accent"
              >
                Reject Non-Essential
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
