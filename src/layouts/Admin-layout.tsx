import { Outlet, Navigate } from "react-router-dom";
import { userStore } from "@/stores/user-store";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin-sidebar";

const AdminLayout = () => {
    const user = userStore((state) => state.user);
    
    if (!user) return <Navigate to="/login" />;
    else if (user && user.role !== "admin") return <Navigate to={`/${user.role}`} />;
    
    return (
        <div>
            <SidebarProvider>
                <AdminSidebar />
                <div className="w-full relative">
                    <SidebarTrigger className="cursor-pointer absolute top-4 left-2" />
                    <Outlet />
                </div>
            </SidebarProvider>
        </div>
    );
};

export default AdminLayout;
