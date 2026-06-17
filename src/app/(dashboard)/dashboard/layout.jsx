import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


const DashboardLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex-1">
        <div className="p-4 border-b">
          <SidebarTrigger />
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;