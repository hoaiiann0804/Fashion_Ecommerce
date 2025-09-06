
import React from "react";
import {Sidebar} from "../../components/layouts/Sidebar";
import Header from "../../components/layouts/Header";

export const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
