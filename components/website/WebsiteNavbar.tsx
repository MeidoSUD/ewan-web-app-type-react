
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Logo } from '../Logo';
import { Menu, X, Globe } from 'lucide-react';

interface WebsiteNavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const WebsiteNavbar: React.FC<WebsiteNavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: language === 'ar' ? 'الرئيسية' : 'Home', href: '#' },
    { id: 'services', label: language === 'ar' ? 'خدماتنا' : 'Services', href: '#services' },
    { id: 'about', label: language === 'ar' ? 'من نحن' : 'About Us', href: '#about' },
    { id: 'contact', label: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href === '#' ? 'body' : href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('#')}>
            <Logo className="scale-75" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <button 
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors flex items-center gap-1 text-sm font-medium"
             >
                <Globe size={18} />
                {language === 'en' ? 'AR' : 'EN'}
             </button>
             <div className="h-6 w-px bg-slate-200"></div>
             <button onClick={onLoginClick} className="text-slate-900 font-semibold hover:text-primary">
                 {t.loginBtn}
             </button>
             <Button onClick={onRegisterClick} size="sm">
                 {t.registerBtn}
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-start px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                 <button 
                    onClick={() => { setLanguage(language === 'en' ? 'ar' : 'en'); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-slate-600"
                 >
                    <Globe size={18} /> {t.language}
                 </button>
                 <Button variant="outline" onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full justify-center">
                     {t.loginBtn}
                 </Button>
                 <Button onClick={() => { onRegisterClick(); setIsMenuOpen(false); }} className="w-full justify-center">
                     {t.registerBtn}
                 </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
