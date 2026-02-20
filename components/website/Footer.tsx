
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Hexagon, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 text-white mb-6">
                            <Hexagon className="text-primary fill-primary" size={32} />
                            <span className="text-xl font-bold tracking-tight">Ewan</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 mb-6">
                            {language === 'ar'
                                ? 'منصة تعليمية رائدة تهدف إلى ربط الطلاب بأفضل المعلمين والخبراء لتجربة تعليمية فريدة ومخصصة.'
                                : 'A leading educational platform connecting students with expert teachers for a unique and personalized learning experience.'}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">{language === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">{language === 'ar' ? 'الرئيسية' : 'Home'}</a></li>
                            <li><a href="#services" className="hover:text-primary transition-colors">{language === 'ar' ? 'الخدمات' : 'Services'}</a></li>
                            <li><a href="#about" className="hover:text-primary transition-colors">{language === 'ar' ? 'من نحن' : 'About Us'}</a></li>
                            <li><a href="#contact" className="hover:text-primary transition-colors">{language === 'ar' ? 'اتصل بنا' : 'Contact'}</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6">{language === 'ar' ? 'خدماتنا' : 'Our Services'}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">{language === 'ar' ? 'دروس خصوصية' : 'Private Lessons'}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{language === 'ar' ? 'تعلم اللغات' : 'Language Learning'}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{language === 'ar' ? 'دورات تدريبية' : 'Specialized Courses'}</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">{language === 'ar' ? 'اختبارات القدرات' : 'Ability Tests'}</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary mt-0.5" size={18} />
                                <span>Riyadh, Saudi Arabia<br />King Fahd Road, Olaya</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary" size={18} />
                                <span dir="ltr">+966 573 83 8872</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary" size={18} />
                                <span>support@ewan-geniuses.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Ewan. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
