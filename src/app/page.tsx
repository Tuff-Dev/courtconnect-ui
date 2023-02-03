"use client";

import React, { useState } from "react";

import Sidebar from "@/components/partials/Sidebar";
import Header from "@/components/partials/Header";
import WelcomeBanner from "@/components/partials/dashboard/WelcomeBanner";
import DashboardAvatars from "@/components/partials/dashboard/DashboardAvatars";
import FilterButton from "@/components/DropdownFilter";
import Datepicker from "@/components/Datepicker";
import DashboardCard01 from "@/components/partials/dashboard/DashboardCard01";
import DashboardCard02 from "@/components/partials/dashboard/DashboardCard02";
import DashboardCard03 from "@/components/partials/dashboard/DashboardCard03";
import DashboardCard04 from "@/components/partials/dashboard/DashboardCard04";
import DashboardCard05 from "@/components/partials/dashboard/DashboardCard05";
import DashboardCard06 from "@/components/partials/dashboard/DashboardCard06";
import DashboardCard07 from "@/components/partials/dashboard/DashboardCard07";
import DashboardCard08 from "@/components/partials/dashboard/DashboardCard08";
import DashboardCard09 from "@/components/partials/dashboard/DashboardCard09";
import DashboardCard10 from "@/components/partials/dashboard/DashboardCard10";
import DashboardCard11 from "@/components/partials/dashboard/DashboardCard11";

type Props = {};

const Dashboard = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
