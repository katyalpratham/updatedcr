import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import NotificationPanel from "../notifications/NotificationPanel.jsx";
import { notificationsData } from "../data/dashboard.js";

const PAGE_META = {
  "/dashboard":          { title:"Manager Dashboard",    subtitle:"Monitor your team's leave & attendance" },
  "/dashboard/students": { title:"Student Attendance",   subtitle:"Track and manage student records"       },
  "/dashboard/reports":  { title:"Reports & Analytics",  subtitle:"Insights, trends, and distributions"    },
  "/dashboard/settings": { title:"Settings",             subtitle:"Preferences and configuration"          },
};

export default function DashboardLayout() {
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [headerAction, setHeaderAction] = useState(null);
  const location = useLocation();

  const meta       = PAGE_META[location.pathname] || PAGE_META["/dashboard"];
  const unread     = notifications.filter(n => !n.read).length;

  const handleNewRequest = () => { if (typeof headerAction === "function") headerAction(); };
  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read:true })));

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <Sidebar isOpen={sidebarOpen} />

      {/* Notification panel */}
      <NotificationPanel
        notifications={notifications}
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main column */}
      <div className="main">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          unreadCount={unread}
          onNewRequest={handleNewRequest}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
          onToggleNotif={() => setNotifOpen(o => !o)}
        />
        <div className="page-body">
          <Outlet context={{ setHeaderAction }} />
        </div>
      </div>
    </div>
  );
}
