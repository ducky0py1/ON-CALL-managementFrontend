// Fichier: src/components/dashboard/DashboardMainContent.js
import React from 'react';
import { motion } from 'motion/react';
// We import all the possible content components that will be displayed.
// We will create them in the next steps, so we use placeholders for now.
import { DashboardOverview } from "./DashboardOverview";
import { DashboardPeriods } from "./DashboardPeriods";
import  DashboardAgents from "./DashboardAgents";
import { DashboardServices } from "./DashboardServices";
import { DashboardReports } from "./DashboardReports";
import { DashboardSettings } from "./DashboardSettings";
import { DashboardPlanning } from "./DashboardPlanning";
import { DashboardAnalytics } from "./DashboardAnalytics";
import { DashboardNotifications } from "./DashboardNotifications";

// The main content component. It acts as a switch to show the correct view.
export function DashboardMainContent({
  currentView,
  //  Pass all the necessary data down to the children
  periods,
  selectedPeriods,
  selectedService,
  periodsByService,
  stats,
  onCreatePeriod,
  onEditPeriod,
  onDeletePeriod,
  onBulkDelete,
  onSelectPeriods,
  onNavigateToSchedule
}) {
  
  // This is the main logic: a function that returns the correct component based on 'currentView'.
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview {...{ periods, periodsByService, stats, onCreatePeriod, onNavigateToSchedule }} />;
      case "planning":
        return <DashboardPlanning {...{ periods, periodsByService, selectedService, stats, onCreatePeriod, onNavigateToSchedule }} />;
      case "agents":
        // return <DashboardAgents {...props} />;

        return <DashboardAgents {...{ periods, periodsByService, selectedService, stats }} />;
      case "periods":
        return <DashboardPeriods {...{ periods, selectedPeriods, selectedService, onSelectPeriods, onEditPeriod, onDeletePeriod, onBulkDelete, onCreatePeriod }} />;
      case "reports":
        return <DashboardReports {...{ periods, periodsByService, selectedService, stats }} />;
      case "analytics":
        return <DashboardAnalytics {...{ periods, periodsByService, stats }} />;
      case "notifications":
        return <DashboardNotifications {...{ periods, periodsByService, selectedService, stats }} />;
      case "settings":
        return <DashboardSettings />;
      default:
        // A fallback to the overview in case the view is unknown.
        return <DashboardOverview {...{ periods, periodsByService, stats, onCreatePeriod, onNavigateToSchedule }} />;
    }
  };

  return (
    // The 'key={currentView}' on the motion.main is important. It tells React to
    // re-render the component with the animation every time the view changes.
    <motion.main
      key={currentView}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* The result of our 'renderContent' switch is rendered here. */}
        {renderContent()}
      </div>
    </motion.main>
  );
}