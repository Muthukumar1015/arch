import { useState } from "react";
import SectionHeading from "@/components/ui/section-heading";
import EmailTester from "@/components/admin/EmailTester";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Database, Settings } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("email");
  const { toast } = useToast();

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 bg-primary text-white">
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
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6">Admin Panel</h1>
            <p className="text-xl text-gray-300">
              Manage website settings and services
            </p>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              label="Admin Tools"
              title="Website Management"
              subtitle="Access various tools to manage website functionality and settings."
              center
            />
            
            <div className="mt-12">
              <Tabs defaultValue="email" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Email Service</span>
                  </TabsTrigger>
                  <TabsTrigger value="data" className="flex items-center gap-2">
                    <Database size={16} />
                    <span>Database</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield size={16} />
                    <span>Security</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <EmailTester />
                </TabsContent>
                
                <TabsContent value="data">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-heading font-bold mb-4">Database Management</h2>
                    <p className="text-gray-600">Database tools and management features will be available here.</p>
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-amber-800">This feature is under development.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-heading font-bold mb-4">Website Settings</h2>
                    <p className="text-gray-600">Manage global website settings and preferences.</p>
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-amber-800">This feature is under development.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-heading font-bold mb-4">Security Settings</h2>
                    <p className="text-gray-600">Manage security settings and access controls.</p>
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-amber-800">This feature is under development.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}