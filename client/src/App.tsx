import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Projects from "@/pages/projects";
import Gallery from "@/pages/gallery";
import Team from "@/pages/team";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Booking from "@/pages/booking";
import FAQ from "@/pages/faq";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CookieConsent from "@/components/layout/cookie-consent";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/projects" component={Projects} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/team" component={Team} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/booking" component={Booking} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Update page title when navigating
  useEffect(() => {
    document.title = "DD Architecture | Premier Architectural Firm in Chennai";
    
    // Add SEO meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "DD Architecture is a premier architectural design firm in Chennai creating innovative, sustainable, and beautiful spaces for residential and commercial projects.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "DD Architecture is a premier architectural design firm in Chennai creating innovative, sustainable, and beautiful spaces for residential and commercial projects.";
      document.head.appendChild(meta);
    }
    
    // Add Open Graph tags
    const ogTags = [
      { property: "og:title", content: "DD Architecture | Premier Architectural Firm in Chennai" },
      { property: "og:description", content: "Award-winning architectural design firm in Chennai creating innovative, sustainable, and beautiful spaces." },
      { property: "og:type", content: "website" }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        ogTag.setAttribute('content', tag.content);
        document.head.appendChild(ogTag);
      } else {
        ogTag.setAttribute('content', tag.content);
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
