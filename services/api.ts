
// =====================================================
// !! API SERVICE - PROD READY V44 !!
// =====================================================

const PRODUCTION_URL = "https://portal.ewan-geniuses.com/api";

const URL_STORAGE_KEY = 'api_base_url';

export let API_BASE_URL = localStorage.getItem(URL_STORAGE_KEY) || PRODUCTION_URL;

export const setApiUrl = (url: string) => {
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  localStorage.setItem(URL_STORAGE_KEY, cleanUrl);
  API_BASE_URL = cleanUrl;
  window.location.reload();
};

export const resetApiUrl = () => {
  localStorage.removeItem(URL_STORAGE_KEY);
  API_BASE_URL = PRODUCTION_URL;
  window.location.reload();
};

const TOKEN_KEY = 'auth_token';
export const tokenService = {
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};

import { 
  WalletResponse, StudentPaymentMethod, AuthResponse, ReferenceItem, 
  TeacherSubject, TeacherSubjectDetail, BankReference, BankAccount, UserData, TeacherProfile,
  BookingPayload, PaymentPayload, Course, Session, Booking, Certificate,
  CourseCategory, CoursePayload, AvailableTime, AvailabilityPayload,
  AdminUser, AdminTeacher, AdminBooking, AdminDispute, PayoutRequest, Service
} from '../types';

export type { 
  AuthResponse, UserData, TeacherProfile, TeacherSubject, TeacherSubjectDetail,
  BookingPayload, PaymentPayload, Booking, Session, Certificate,
  Course, CourseCategory, CoursePayload, AvailableTime, AvailabilityPayload,
  ReferenceItem, StudentPaymentMethod, BankReference, BankAccount, WalletResponse,
  AdminUser, AdminTeacher, AdminBooking, AdminDispute, PayoutRequest, Service
};

export const AUTH_SESSION_EXPIRED = 'auth:session-expired';

const extractArray = (response: any): any[] => {
    if (!response) return [];
    let rawData = response;
    
    if (response.data) {
        rawData = response.data;
        if (rawData.data && Array.isArray(rawData.data)) {
            rawData = rawData.data;
        }
    }
    
    if (Array.isArray(rawData)) {
        if (rawData.length > 0 && Array.isArray(rawData[0])) {
            return rawData.flat(Infinity);
        }
        return rawData;
    }

    if (response.education_levels && Array.isArray(response.education_levels)) return response.education_levels;
    if (response.classes && Array.isArray(response.classes)) return response.classes;
    if (response.subject && Array.isArray(response.subject)) return response.subject; 
    if (response.subjects && Array.isArray(response.subjects)) return response.subjects;
    
    return [];
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = tokenService.getToken();
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Bypass-Tunnel-Reminder': 'true',
    'cf-nnt': '1', 
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
      (headers as any)['Content-Type'] = 'application/json';
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  
  try {
      const response = await fetch(fullUrl, { ...options, headers });
      
      if (response.status === 401) {
          window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED));
          throw new Error("Session expired. Please login again.");
      }

      const text = await response.text();
      
      if (text.trim().startsWith('<!DOCTYPE html>') || text.trim().startsWith('<html')) {
          throw new Error("The API returned HTML. Cloudflare or a firewall might be blocking the request.");
      }

      let data;
      try {
          data = JSON.parse(text);
      } catch (e) {
          throw new Error("Invalid Server Response (JSON Expected)");
      }

      if (!response.ok && data.data?.session_status !== 'waiting_for_teacher') {
        const error: any = new Error(data.message || data.error || "API Request Failed");
        error.status = response.status;
        error.errors = data.errors;
        error.original = data;
        throw error;
      }

      return data;
  } catch (error: any) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
           throw new Error(`Network Connection Failed: ${API_BASE_URL}`);
      }
      throw error;
  }
};

export const authService = {
  login: (credentials: any) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (data: any) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  verifyCode: (data: { user_id: number, code: string }) => fetchWithAuth('/auth/verify', { method: 'POST', body: JSON.stringify(data) }),
  resendCode: (data: { user_id: number }) => fetchWithAuth('/auth/resend-code', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => fetchWithAuth(`/auth/user/details?_t=${Date.now()}`),
  getUserDetails: () => fetchWithAuth('/auth/user/details'),
  logout: () => fetchWithAuth('/auth/logout', { method: 'POST' }),
  deleteAccount: () => fetchWithAuth('/auth/user', { method: 'DELETE' }),
  resetPassword: (data: { phone_number: string }) => fetchWithAuth('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
  verifyResetCode: (data: { user_id: number, code: string }) => fetchWithAuth('/auth/verify-reset-code', { method: 'POST', body: JSON.stringify(data) }),
  confirmPassword: (data: { password: string }) => fetchWithAuth('/auth/confirm-password', { method: 'POST', body: JSON.stringify(data) }),
  changePassword: (data: any) => fetchWithAuth('/auth/change-password', { method: 'POST', body: JSON.stringify(data) }),
};

export const profileService = {
  updateProfile: (data: FormData) => {
    data.append('_method', 'PUT');
    return fetchWithAuth('/profile/profile/update', { method: 'POST', body: data });
  },
  updateProfileFull: (data: FormData) => {
    data.append('_method', 'PUT');
    return fetchWithAuth('/profile/profile/update', { method: 'POST', body: data });
  },
};

export const teacherService = {
  saveFcmToken: (token: string) => fetchWithAuth('/teacher/save-fcm-token', { method: 'POST', body: JSON.stringify({ fcm_token: token }) }),
  getEducationLevels: () => fetchWithAuth('/teacher/education-levels').then(extractArray),
  getClassesByLevel: (levelId: number) => fetchWithAuth(`/teacher/classes/${levelId}`).then(extractArray),
  getSubjectsByClass: (classId: number) => fetchWithAuth(`/teacher/subjectsClasses/${classId}`).then(extractArray),
  getServicesList: () => fetchWithAuth('/teacher/services').then(extractArray), 
  updateInfo: (data: any) => fetchWithAuth('/teacher/info', { method: 'POST', body: JSON.stringify(data) }),
  addSubjects: (subject_ids: number[]) => fetchWithAuth('/teacher/subjects', { method: 'POST', body: JSON.stringify({ subjects_id: subject_ids }) }),
  getSubjects: () => fetchWithAuth('/teacher/subjects').then(extractArray), 
  deleteSubject: (id: number) => fetchWithAuth(`/teacher/subjects/${id}`, { method: 'DELETE' }),
  getAvailability: () => fetchWithAuth('/teacher/availability').then(extractArray),
  saveAvailability: (payload: AvailabilityPayload) => fetchWithAuth('/teacher/availability', { method: 'POST', body: JSON.stringify(payload) }),
  deleteAvailability: (id: number) => fetchWithAuth(`/teacher/availability/${id}`, { method: 'DELETE' }),
  getCourses: () => fetchWithAuth('/teacher/courses').then(extractArray),
  createCourse: (data: FormData) => fetchWithAuth('/teacher/courses', { method: 'POST', body: data }),
  updateCourse: (id: number, data: any) => fetchWithAuth(`/teacher/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id: number) => fetchWithAuth(`/teacher/courses/${id}`, { method: 'DELETE' }),
  getTeacherSessions: () => fetchWithAuth('/teacher/sessions').then(extractArray), 
  startSession: (id: number) => fetchWithAuth(`/teacher/sessions/${id}/start`, { method: 'POST' }),
  endSession: (id: number) => fetchWithAuth(`/teacher/sessions/${id}/end`, { method: 'POST' }),
  getWallet: () => fetchWithAuth('/teacher/wallet').then(res => res.data || res), 
  getBankAccounts: () => fetchWithAuth('/teacher/payment-methods').then(extractArray),
  withdraw: (data: { amount: number, payment_method_id?: number }) => fetchWithAuth('/teacher/wallet/withdraw', { method: 'POST', body: JSON.stringify(data) }),
  cancelWithdrawal: (id: number) => fetchWithAuth(`/teacher/wallet/withdrawals/${id}`, { method: 'DELETE' }),
  addPaymentMethod: (data: any) => fetchWithAuth('/teacher/payment-methods', { method: 'POST', body: JSON.stringify(data) }),
  deletePaymentMethod: (id: number) => fetchWithAuth(`/teacher/payment-methods/${id}`, { method: 'DELETE' }),
  setDefaultPaymentMethod: (id: number) => fetchWithAuth(`/teacher/payment-methods/set-default/${id}`, { method: 'PUT' }),
};

export const studentService = {
  saveFcmToken: (token: string) => fetchWithAuth('/student/save-fcm-token', { method: 'POST', body: JSON.stringify({ fcm_token: token }) }),
  getServices: () => fetchWithAuth('/student/services').then(extractArray),
  getSubjects: () => fetchWithAuth('/student/subjects').then(extractArray),
  getEducationLevels: () => fetchWithAuth('/education-levels').then(extractArray),
  getClasses: (levelId: number) => fetchWithAuth(`/classes?education_level_id=${levelId}`).then(extractArray),
  getReferenceSubjects: (classId: number) => fetchWithAuth(`/subjects?class_id=${classId}`).then(extractArray),
  getTeachers: (filters: any = {}) => {
      const query = new URLSearchParams(filters).toString();
      return fetchWithAuth(`/student/teachers?${query}`).then(extractArray);
  },
  getCourses: (filters: any = {}) => {
      const query = new URLSearchParams(filters).toString();
      return fetchWithAuth(`/student/courses?${query}`).then(extractArray);
  },
  createBooking: (data: BookingPayload) => fetchWithAuth('/student/booking', { method: 'POST', body: JSON.stringify(data) }),
  getBookings: () => fetchWithAuth('/student/booking').then(extractArray),
  processPayment: (data: any) => fetchWithAuth('/student/booking/pay', { method: 'POST', body: JSON.stringify(data) }),
  getSessions: () => fetchWithAuth('/student/sessions').then(extractArray),
  joinSession: (id: number) => fetchWithAuth(`/student/sessions/${id}/join`, { method: 'POST' }),
  getSessionDetails: (id: number) => fetchWithAuth(`/student/sessions/${id}`),
  getPaymentMethods: () => fetchWithAuth('/student/payment-methods').then(extractArray),
  addPaymentMethod: (data: any) => fetchWithAuth('/student/payment-methods', { method: 'POST', body: JSON.stringify(data) }),
  deletePaymentMethod: (id: number) => fetchWithAuth(`/student/payment-methods/${id}`, { method: 'DELETE' }),
  getCertificates: () => fetchWithAuth('/student/certificates').then(extractArray),
  downloadInvoice: (id: number) => {
      const token = tokenService.getToken();
      const url = `${API_BASE_URL}/student/booking/${id}/invoice?token=${token}`;
      window.open(url, '_blank');
  },
  downloadCertificate: (id: number) => {
      const token = tokenService.getToken();
      const url = `${API_BASE_URL}/student/certificates/${id}/download?token=${token}`;
      window.open(url, '_blank');
  },
};

export const adminService = {
  getStats: () => fetchWithAuth('/admin/stats'),
  getUsers: () => fetchWithAuth('/admin/users').then(extractArray),
  deleteUser: (id: number) => fetchWithAuth(`/admin/users/${id}`, { method: 'DELETE' }),
  suspendUser: (id: number) => fetchWithAuth(`/admin/users/${id}/suspend`, { method: 'PUT' }),
  activateUser: (id: number) => fetchWithAuth(`/admin/users/${id}/activate`, { method: 'PUT' }),
  resetUserPassword: (id: number) => fetchWithAuth(`/admin/users/${id}/reset-password`, { method: 'PUT' }),
  verifyUser: (id: number) => fetchWithAuth(`/admin/users/${id}/verify-teacher`, { method: 'PUT' }),
  getTeachers: () => fetchWithAuth('/admin/teachers').then(extractArray),
  getTeacherDetails: (id: number) => fetchWithAuth(`/admin/teachers/${id}`),
  rejectUser: (id: number) => fetchWithAuth(`/admin/users/${id}/reject-teacher`, { method: 'PUT' }),
  getBookings: () => fetchWithAuth('/admin/bookings').then(extractArray),
  getDisputes: () => fetchWithAuth('/admin/disputes').then(extractArray),
  getPayouts: () => fetchWithAuth('/admin/payout-requests').then(extractArray),
  approvePayout: (id: number, receipt: File) => {
      const formData = new FormData();
      formData.append('receipt', receipt);
      return fetchWithAuth(`/admin/payout-requests/${id}/approve`, { method: 'POST', body: formData });
  },
  rejectPayout: (id: number, reason: string) => fetchWithAuth(`/admin/payout-requests/${id}/reject`, { method: 'POST', body: JSON.stringify({ reason }) }),
  getServices: () => fetchWithAuth('/admin/services').then(extractArray),
};

export const referenceService = {
  getServices: () => fetchWithAuth('/services').then(extractArray),
  getCategories: () => fetchWithAuth('/categories').then(extractArray),
  getBanks: () => fetchWithAuth('/banks').then(extractArray),
};

export const getStorageUrl = (path: string | null | undefined) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    return `${baseUrl}/storage/${path.replace(/^\//, '')}`;
};
