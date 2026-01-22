"use client";
// import { useState } from "react";
// import { TopNavbar } from "@/components/shared/Topbar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/shared/Sidebar";
// import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div>{children}</div>
    // <SidebarProvider>
    //   <div className="flex h-screen w-screen overflow-hidden">
    //     {/* Sidebar */}
    //     <div
    //       className={cn(
    //         "fixed top-0 left-0 h-full z-40 transition-all duration-300",
    //         isSidebarOpen ? "w-64" : "w-20"
    //       )}
    //     >
    //       <AppSidebar
    //         isOpen={true} // Always show sidebar when mounted
    //         onClose={() => setIsSidebarOpen(false)}
    //         isCollapsed={!isSidebarOpen}
    //       />
    //     </div>

    //     {/* Main Content */}
    //     <div
    //       className={cn(
    //         "flex-1 flex flex-col h-full overflow-hidden transition-all duration-300",
    //         isSidebarOpen ? "ml-64" : "ml-20"
    //       )}
    //     >
    //       {/* Top Navigation */}
    //       <div
    //         className="fixed top-0 right-0 z-30"
    //         style={{ left: isSidebarOpen ? "16rem" : "5rem" }}
    //       >
    //         <TopNavbar
    //           isSidebarOpen={isSidebarOpen}
    //           toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    //         />
    //       </div>

    //       {/* Page Content */}
    //       <main className="flex-1 overflow-y-auto bg-gray-100 mt-16 p-1">
    //         {children}
    //       </main>
    //     </div>
    //   </div>
    // </SidebarProvider>
  );
};

export default DashboardLayout;
