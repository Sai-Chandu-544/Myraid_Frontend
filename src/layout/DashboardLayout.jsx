import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../dashboard/sidebar";


export const DashboardLayout = () => {

  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-[#f0f2f5]">

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Page Content */}
        <main className="flex-1 overflow-y-hidden p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};