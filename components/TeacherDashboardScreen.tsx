
import React, { useState } from 'react';
import { AuthResponse } from '../services/api';
import { Navbar } from './Navbar';
import { OverviewTab } from './dashboard/OverviewTab';
import { ScheduleTab } from './dashboard/ScheduleTab';
import { WalletTab } from './dashboard/WalletTab';
import { SubjectsTab } from './dashboard/SubjectsTab';
import { ProfileTab } from './dashboard/ProfileTab';
import { TeacherServicesTab } from './teacher/TeacherServicesTab';
import { TeacherCoursesTab } from './teacher/TeacherCoursesTab';
import { TeacherLanguagesTab } from './teacher/TeacherLanguagesTab';
import { DisputesTab } from './student/DisputesTab';
import { SettingsTab } from './dashboard/SettingsTab';
import { AlertTriangle, Lock, Bug } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TeacherDashboardScreenProps {
  data: AuthResponse;
  onLogout: () => void;
}

export const TeacherDashboardScreen: React.FC<TeacherDashboardScreenProps> = ({ data, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDebug, setShowDebug] = useState(false);
  const { language } = useLanguage();
  
  const user = data.user.data;

  // =========================================================
  // !! CRITICAL VERIFICATION RULE !!
  // ONLY check 'user.verified' (root level). 
  // Do NOT check profile.verified, profile.is_active, or services.
  // =========================================================
  
  const isVerifiedRaw = user.verified;
  const isVerified = 
      isVerifiedRaw === true || 
      isVerifiedRaw === 1 || 
      String(isVerifiedRaw) === '1' || 
      String(isVerifiedRaw).toLowerCase() === 'true';

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} onNavigate={setActiveTab} />;
      case 'schedule':
        return <ScheduleTab user={user} />;
      case 'private-lessons':
        return <SubjectsTab user={user} />; 
      case 'courses':
        return <TeacherCoursesTab user={user} />;
      case 'languages':
        return <TeacherLanguagesTab user={user} />;
      case 'wallet':
        return <WalletTab user={user} />;
      case 'profile':
        return <ProfileTab />;
      case 'services':
        return <TeacherServicesTab onNavigate={setActiveTab} />;
      case 'disputes':
        return <DisputesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-10">
      <Navbar 
        userData={data} 
        onLogout={onLogout} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isVerified && (
            <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm animate-fade-in">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-amber-800">
                            {language === 'ar' ? 'الحساب غير موثق' : 'Account Not Verified'}
                        </h3>
                        <div className="mt-2 text-sm text-amber-700">
                            <p>
                                {language === 'ar' 
                                    ? 'يرجى اختيار خدمة واحدة ورفع الشهادة الأكاديمية المطلوبة لتفعيل حسابك والبدء في استخدام المنصة.' 
                                    : 'Please choose a service and upload your certificate to verify your account. You cannot manage subjects or courses until verified.'}
                            </p>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setActiveTab('services')}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                            >
                                {language === 'ar' ? 'الذهاب للخدمات' : 'Go to Services'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowDebug(!showDebug)}
                                className="inline-flex items-center px-2 py-1 text-xs text-amber-600/60 hover:text-amber-800"
                            >
                                <Bug size={12} className="mr-1" /> Debug Info
                            </button>
                        </div>

                        {/* DEBUG BLOCK - Helps identify exactly what value is being received */}
                        {showDebug && (
                            <div className="mt-4 p-3 bg-white/80 rounded border border-amber-200 text-xs font-mono text-slate-600 overflow-x-auto">
                                <p className="font-bold text-red-500 mb-1">VERIFICATION DEBUG:</p>
                                <ul className="list-disc pl-4 mb-2 space-y-1">
                                    <li>Raw value (user.verified): <strong>{String(isVerifiedRaw)}</strong> (Type: {typeof isVerifiedRaw})</li>
                                    <li>Calculated isVerified: <strong>{String(isVerified)}</strong></li>
                                </ul>
                                <p className="font-bold text-slate-700 mt-2">Full User Object:</p>
                                <pre>{JSON.stringify(user, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {renderContent()}
      </main>
    </div>
  );
};
