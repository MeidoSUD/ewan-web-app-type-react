
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { WebsiteNavbar } from './WebsiteNavbar';
import { Footer } from './Footer';
import { BookOpen, Users, Globe, Award, ChevronRight, PlayCircle, Star, Smartphone } from 'lucide-react';

interface HomePageProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLoginClick, onRegisterClick }) => {
    const { t, language, direction } = useLanguage();

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
            <WebsiteNavbar onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />

            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 -z-10 transform -skew-y-6 origin-top-left scale-110"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-start">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 animate-fade-in">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                {language === 'ar' ? 'منصة التعليم الأولى' : '#1 E-Learning Platform'}
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                                {language === 'ar' ? 'أطلق العنان لقدراتك مع' : 'Unlock Your Potential with'} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Ewan</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {language === 'ar'
                                    ? 'نربطك بأفضل المعلمين والخبراء لتجربة تعليمية مخصصة تساعدك على التفوق في دراستك وتطوير مهاراتك.'
                                    : 'Connect with expert tutors and access comprehensive courses designed to help you excel in your studies and career.'}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Button size="lg" className="shadow-xl shadow-primary/20 px-8 py-4 text-base" onClick={onRegisterClick}>
                                    {t.registerBtn}
                                </Button>
                                <Button size="lg" variant="outline" className="px-8 py-4 text-base flex items-center gap-2">
                                    <PlayCircle size={20} /> {language === 'ar' ? 'كيف نعمل' : 'How it works'}
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 relative animate-fade-in">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl opacity-20"></div>
                            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/assets/cover.png"
                                    alt="Students learning"
                                    className="rounded-xl w-full object-cover h-[400px]"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-50 flex items-center gap-4 animate-bounce-slow">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Active Students</p>
                                        <p className="text-xl font-bold text-slate-900">5,000+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{language === 'ar' ? 'خدماتنا التعليمية' : 'Our Educational Services'}</h2>
                        <p className="text-slate-500">
                            {language === 'ar'
                                ? 'نقدم مجموعة متنوعة من الخدمات التعليمية لتلبية جميع احتياجاتك الدراسية.'
                                : 'We provide a diverse range of educational services to meet all your learning needs.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: language === 'ar' ? 'دروس خصوصية' : 'Private Lessons',
                                desc: language === 'ar' ? 'جلسات فردية مع معلمين متخصصين لضمان التركيز الكامل والتقدم السريع.' : 'One-on-one sessions with specialized teachers to ensure full focus and rapid progress.',
                                color: 'bg-blue-100 text-blue-600'
                            },
                            {
                                icon: Globe,
                                title: language === 'ar' ? 'تعلم اللغات' : 'Language Learning',
                                desc: language === 'ar' ? 'تعلم لغات جديدة مع متحدثين أصليين ومناهج متطورة تناسب جميع المستويات.' : 'Learn new languages with native speakers and advanced curriculums for all levels.',
                                color: 'bg-purple-100 text-purple-600'
                            },
                            {
                                icon: BookOpen,
                                title: language === 'ar' ? 'دورات متخصصة' : 'Specialized Courses',
                                desc: language === 'ar' ? 'دورات شاملة في مختلف المجالات الأكاديمية والمهنية لتطوير مهاراتك.' : 'Comprehensive courses in various academic and professional fields to upgrade your skills.',
                                color: 'bg-orange-100 text-orange-600'
                            }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-100">
                                <div className={`h-14 w-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
                                <button className="text-primary font-semibold flex items-center gap-2 group">
                                    {language === 'ar' ? 'اقرأ المزيد' : 'Learn More'} <ChevronRight size={16} className={`transform transition-transform group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Stats Section */}
            <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                {language === 'ar' ? 'لماذا تختار Ewan' : 'Why Choose Ewan?'}
                            </h2>
                            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                                {language === 'ar'
                                    ? 'نحن نؤمن بأن التعليم يجب أن يكون متاحاً ومخصصاً وممتعاً. منصتنا تجمع بين التكنولوجيا الحديثة والخبرة التعليمية لتقديم أفضل تجربة ممكنة.'
                                    : 'We believe education should be accessible, personalized, and engaging. Our platform combines modern technology with educational expertise to deliver the best possible experience.'}
                            </p>
                            <div className="space-y-4">
                                {[
                                    language === 'ar' ? 'معلمون معتمدون وذوي خبرة' : 'Certified & Experienced Teachers',
                                    language === 'ar' ? 'جداول مرنة تناسب وقتك' : 'Flexible Schedules fitting your time',
                                    language === 'ar' ? 'أسعار تنافسية وباقات متنوعة' : 'Competitive Prices & Various Packages',
                                    language === 'ar' ? 'شهادات إتمام معتمدة' : 'Verified Certificates of Completion'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-primary/20 p-1 rounded-full text-primary"><Award size={16} /></div>
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
    
                            {/* App Download Links */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Smartphone size={20} className="text-primary" />
                                    <span className="font-semibold text-lg">
                                        {language === 'ar' ? 'حمل التطبيق الآن' : 'Download Our App'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.ewan_mobile_app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-xl border border-white/10"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-xs text-slate-400">{language === 'ar' ? 'تحميل من' : 'Get it on'}</div>
                                            <div className="font-semibold">Google Play</div>
                                        </div>
                                    </a>
                                    <a
                                        href="https://apps.apple.com/us/app/ewan-%D8%A5%D9%8A%D9%88%D8%A7%D9%86/id6754520719"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 rounded-xl border border-white/10"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z"/>
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-xs text-slate-400">{language === 'ar' ? 'تحميل من' : 'Download on'}</div>
                                            <div className="font-semibold">App Store</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { val: '500+', label: language === 'ar' ? 'معلم خبير' : 'Expert Teachers' },
                                { val: '10k+', label: language === 'ar' ? 'ساعة تعليمية' : 'Teaching Hours' },
                                { val: '5k+', label: language === 'ar' ? 'طالب سعيد' : 'Happy Students' },
                                { val: '4.9', label: language === 'ar' ? 'تقييم عام' : 'Average Rating', icon: true }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-3xl font-bold text-primary mb-1 flex items-center justify-center gap-1">
                                        {stat.val} {stat.icon && <Star size={20} fill="currentColor" className="text-amber-400" />}
                                    </div>
                                    <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 p-20 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
                            {language === 'ar' ? 'جاهز لبدء رحلتك التعليمية؟' : 'Ready to Start Your Learning Journey?'}
                        </h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">
                            {language === 'ar'
                                ? 'انضم إلى آلاف الطلاب الذين يحققون أهدافهم مع Ewan Geniuses اليوم.'
                                : 'Join thousands of students achieving their goals with Ewan today.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Button className="bg-white text-primary hover:bg-slate-100 border-0 px-8 py-4 text-base shadow-lg" onClick={onRegisterClick}>
                                {language === 'ar' ? 'سجل مجاناً' : 'Sign Up for Free'}
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-base" onClick={onLoginClick}>
                                {t.loginBtn}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
