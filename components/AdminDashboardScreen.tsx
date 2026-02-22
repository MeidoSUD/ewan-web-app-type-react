
import React, { useState } from 'react';
import { AuthResponse } from '../services/api';
import { AdminSidebar } from './admin/AdminSidebar';
import { UsersTab } from './admin/UsersTab';
import { EducationTab } from './admin/EducationTab';
import { PayoutsTab } from './admin/PayoutsTab';
import { VerificationsTab } from './admin/VerificationsTab';
import { BookingsTab } from './admin/BookingsTab';
import { AdminDisputesTab } from './admin/DisputesTab';
import { CoursesTab } from './admin/CoursesTab';
import { SettingsTab } from './dashboard/SettingsTab';
import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdsTab } from './admin/AdsTab';
import { Menu } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

interface AdminDashboardScreenProps {
  data: AuthResponse;
  onLogout: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ data, onLogout }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab />;
      case 'users':
        return <UsersTab />;
      case 'courses':
        return <CoursesTab />;
      case 'bookings':
        return <BookingsTab />;
      case 'education':
        return <EducationTab />;
      case 'payouts':
        return <PayoutsTab />;
      case 'verifications':
        return <VerificationsTab />;
      case 'disputes':
        return <AdminDisputesTab />;
      case 'ads':
        return <AdsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <AdminOverviewTab />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-sans">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">{t.adminPanel}</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
