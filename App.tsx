
// =====================================================
// !! CRITICAL UPDATE - V10 (ROLE & TUNNEL FIX) !!
// =====================================================

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { TeacherDashboardScreen } from './components/TeacherDashboardScreen';
import { StudentDashboardScreen } from './components/StudentDashboardScreen';
import { AdminDashboardScreen } from './components/AdminDashboardScreen';
import { HomePage } from './components/website/HomePage';
import { ServerCrash, Loader2 } from 'lucide-react';
import { AuthResponse, authService, tokenService, UserData, AUTH_SESSION_EXPIRED, studentService, teacherService } from './services/api';
import { useFcm } from './hooks/useFcm';

const USER_DATA_KEY = 'user_session_data';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState<'website' | 'login' | 'register' | 'dashboard'>('website');
  const [userData, setUserData] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const { getFcmToken, permission } = useFcm();

  useEffect(() => {
    const syncToken = async () => {
      if (userData && tokenService.isAuthenticated() && userData.user.role) {
        if (permission === 'granted') {
          try {
            const token = await getFcmToken();
            if (token) {
              if (userData.user.role === 'student') {
                await studentService.saveFcmToken(token);
              } else if (userData.user.role === 'teacher') {
                await teacherService.saveFcmToken(token);
              }
            }
          } catch (err) {
            console.error("[App] Token sync failed:", err);
          }
        }
      }
    };
    const timer = setTimeout(syncToken, 3000);
    return () => clearTimeout(timer);
  }, [userData, permission]);

  const processUserObject = (userObj: any, token: string): AuthResponse | null => {
    if (!userObj) return null;

    const rid = Number(userObj.role_id !== undefined ? userObj.role_id : userObj.roleId);

    if (isNaN(rid)) {
      console.error("Auth Failed: role_id is not a number:", userObj);
      return null;
    }

    let finalRole: string;
    switch (rid) {
      case 1: finalRole = 'admin'; break;
      case 3: finalRole = 'teacher'; break;
      case 4: finalRole = 'student'; break;
      default:
        console.error(`CRITICAL: Unknown Role ID '${rid}'.`);
        return null;
    }

    return { user: { role: finalRole, data: userObj }, token };
  };

  const initAuth = async () => {
    setIsLoading(true);
    setAuthError(null);
    const token = tokenService.getToken();

    if (!token) {
      setIsLoading(false);
      setCurrentScreen('website');
      return;
    }

    const cached = localStorage.getItem(USER_DATA_KEY);
    if (cached) {
      try {
        const cachedData = JSON.parse(cached);
        if (cachedData && cachedData.user) {
          setUserData(cachedData);
          setCurrentScreen('dashboard');
        }
      } catch (e) { localStorage.removeItem(USER_DATA_KEY); }
    }

    try {
      const response = await authService.getProfile();

      const candidates = [
        response.user?.data,
        response.data,
        response.user,
        response
      ];

      const isValidUser = (obj: any) => obj && (obj.role_id !== undefined || obj.roleId !== undefined);
      const finalUserObj = candidates.find(isValidUser);

      if (!finalUserObj) {
        if (!userData) throw new Error("Invalid Profile Data: Server response was malformed.");
        return;
      }

      const processedData = processUserObject(finalUserObj, token);

      if (!processedData) {
        throw new Error("Invalid Role ID in fetched data");
      }

      setUserData(processedData);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(processedData));
      setCurrentScreen('dashboard');

    } catch (error: any) {
      if (error.status === 401 || error.message?.includes('expired')) {
        tokenService.removeToken();
        localStorage.removeItem(USER_DATA_KEY);
        setUserData(null);
        setCurrentScreen('login');
      } else {
        if (!userData && !localStorage.getItem(USER_DATA_KEY)) {
          setAuthError(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
    const handleSessionExpired = () => {
      setUserData(null);
      tokenService.removeToken();
      localStorage.removeItem(USER_DATA_KEY);
      setCurrentScreen('login');
    };
    window.addEventListener(AUTH_SESSION_EXPIRED, handleSessionExpired);
    return () => window.removeEventListener(AUTH_SESSION_EXPIRED, handleSessionExpired);
  }, []);

  const handleLoginSuccess = (incomingData: any) => {
    console.log("[App] handleLoginSuccess called. Raw:", incomingData);

    // 1. Normalize the data structure
    // The API returns { success: true, data: { token: "...", user: { ... } } }
    // But sometimes might return { token: "...", user: { ... } } directly
    let authData = incomingData;
    if (incomingData && incomingData.data && incomingData.data.token) {
      console.log("[App] Detected nested 'data' property. Unwrapping...");
      authData = incomingData.data;
    }

    const token = authData.token;

    if (!token) {
      console.error("[App] Login success but no token present in authData:", authData);
      return;
    }

    tokenService.setToken(token);

    // 2. Find the user object that contains the role_id
    // authData.user should be { role: "...", data: { role_id: ..., ... } }
    const candidates = [
      authData.user?.data,      // Standard location: data.user.data
      authData.user,            // Fallback
      authData.data,            // Fallback
      authData                  // Fallback
    ];

    const isValidUser = (obj: any) => obj && (obj.role_id !== undefined || obj.roleId !== undefined);
    const finalUserObj = candidates.find(isValidUser);

    console.log("[App] User Candidates:", candidates);
    console.log("[App] Selected User Object:", finalUserObj);

    if (!finalUserObj) {
      console.error("[App] Could not find a valid user object with role_id in login response.");
      // If we have a token but can't find the user, let's try to fetch the profile
      console.log("[App] Have token but missing user details. Fetching profile...");
      initAuth();
      return;
    }

    // 3. Process the user object (converts role_id to string role, etc.)
    const processedData = processUserObject(finalUserObj, token);
    console.log("[App] Processed Data:", processedData);

    if (processedData) {
      setUserData(processedData);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(processedData));
      console.log("[App] Set user data and redirecting to dashboard...");
      setCurrentScreen('dashboard');
    } else {
      console.error("[App] processUserObject returned null. Role ID might be invalid.");
      initAuth();
    }
  };

  const handleLogout = () => {
    authService.logout().catch(() => { });
    setUserData(null);
    localStorage.removeItem(USER_DATA_KEY);
    tokenService.removeToken();
    setCurrentScreen('website');
    setAuthError(null);
  };

  const renderDashboard = () => {
    if (!userData || !userData.user.role) {
      handleLogout();
      return null;
    }

    switch (userData.user.role) {
      case 'admin': return <AdminDashboardScreen data={userData} onLogout={handleLogout} />;
      case 'student': return <StudentDashboardScreen data={userData} onLogout={handleLogout} />;
      case 'teacher': return <TeacherDashboardScreen data={userData} onLogout={handleLogout} />;
      default:
        handleLogout();
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-primary h-12 w-12" />
        <p className="text-slate-500 font-medium animate-pulse">Initializing Application...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
          <ServerCrash className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Connection Error</h2>
          <p className="text-slate-500 mb-6 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{authError}</p>
          <div className="flex gap-2">
            <button onClick={initAuth} className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700">Retry</button>
            <button onClick={handleLogout} className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 rounded-lg font-semibold hover:bg-slate-200">Go Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      {currentScreen === 'website' && <HomePage onLoginClick={() => setCurrentScreen('login')} onRegisterClick={() => setCurrentScreen('register')} />}
      {currentScreen === 'login' && (
        <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50 relative">
          <LoginScreen onSwitch={() => setCurrentScreen('register')} onLoginSuccess={handleLoginSuccess} />
          <button onClick={() => setCurrentScreen('website')} className="absolute top-4 left-4 text-sm text-slate-500 hover:text-primary font-medium">← Back</button>
        </div>
      )}
      {currentScreen === 'register' && (
        <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50 relative">
          <RegisterScreen
            onSwitch={() => setCurrentScreen('login')}
            onVerifySuccess={() => initAuth()}
          />
          <button onClick={() => setCurrentScreen('website')} className="absolute top-4 left-4 text-sm text-slate-500 hover:text-primary font-medium">← Back</button>
        </div>
      )}
      {currentScreen === 'dashboard' && renderDashboard()}
    </div>
  );
};

const App = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
