
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Logo } from '../Logo';
import { authService, tokenService } from '../../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface VerificationScreenProps {
  userId: number;
  onSuccess: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ userId, onSuccess }) => {
  const { t, language } = useLanguage();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verifyCode({ user_id: userId, code });
      if (response.token) {
          tokenService.setToken(response.token);
      }
      setSuccess("Verification successful!");
      setTimeout(onSuccess, 1500);
    } catch (err: any) {
      setError(err.message || "Verification failed. Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await authService.resendCode({ user_id: userId });
      setSuccess("Code resent successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
      <Logo />
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
          {language === 'ar' ? 'تفعيل الحساب' : 'Verify Account'}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {language === 'ar' 
            ? 'أدخل رمز التحقق المرسل إلى هاتفك'
            : 'Enter the verification code sent to your phone'}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleVerify}>
        {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}
        {success && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
                <CheckCircle size={16} /> {success}
            </div>
        )}

        <Input
          label={language === 'ar' ? 'رمز التحقق' : 'Verification Code'}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          className="text-center tracking-widest text-lg font-bold"
        />

        <Button type="submit" className="w-full" isLoading={loading}>
          {language === 'ar' ? 'تفعيل' : 'Verify'}
        </Button>

        <div className="text-center">
          <button 
            type="button" 
            onClick={handleResend} 
            className="text-sm text-primary hover:underline font-medium"
            disabled={loading}
          >
            {language === 'ar' ? 'إعادة إرسال الرمز' : 'Resend Code'}
          </button>
        </div>
      </form>
    </div>
  );
};
