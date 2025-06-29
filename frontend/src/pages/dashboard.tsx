
import { useState } from "react";
import {  Grid, List, Search, Plus, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GiftCardGrid } from "@/components/dashboard/GiftCardGrid";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs,  
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Dashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  console.log(view);
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <SidebarProvider>
          <div className="flex w-full min-h-[calc(100vh-5rem)]">
            {/* <DashboardSidebar /> */}
            
            <SidebarInset>
              <div className="p-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold">Your Gift Cards</h1>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" /> Create New Gift Card
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search gift cards..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Tabs defaultValue="grid" className="w-[160px]">
                        <TabsList>
                          <TabsTrigger 
                            value="grid"
                            onClick={() => setView("grid")}
                          >
                            <Grid className="h-4 w-4" />
                          </TabsTrigger>
                          <TabsTrigger 
                            value="list"
                            onClick={() => setView("list")}
                          >
                            <List className="h-4 w-4" />
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <GiftCardGrid />
                  </div>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
