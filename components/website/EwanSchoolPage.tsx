
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  BarChart3, 
  Settings, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Layers, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Globe,
  Monitor,
  LayoutDashboard,
  Wallet,
  GraduationCap,
  Users2
} from 'lucide-react';

export const EwanSchoolPage: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {isAr ? 'نظام إيوان التعليمي الذكي' : 'Ewan Smart School Ecosystem'}
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {isAr 
                ? 'التحول الرقمي المتكامل للمدارس. منصة واحدة، تسجيل دخول واحد، تحكم كامل.' 
                : 'Integrated Digital Transformation for Schools. One platform, one login, total control.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-2">
                <CheckCircle className="text-emerald-400 w-5 h-5" />
                <span>{isAr ? 'متوافق مع رؤية 2030' : 'Vision 2030 Compliant'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-2">
                <CheckCircle className="text-blue-400 w-5 h-5" />
                <span>{isAr ? 'دعم باللغتين' : 'Bilingual Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">
              {isAr ? 'المدارس تتحول رقمياً.. لكنها غير متكاملة' : 'Schools Are Digitizing… But Not Transforming'}
            </h2>
            <div className="space-y-6">
              {[
                { 
                  ar: 'أنظمة منفصلة وغير مترابطة', 
                  en: 'Multiple disconnected systems',
                  descAr: 'بيانات مشتتة بين تطبيقات مختلفة.',
                  descEn: 'Data scattered across different apps.'
                },
                { 
                  ar: 'عمليات يدوية تستهلك الوقت', 
                  en: 'Manual processes & inefficiencies',
                  descAr: 'استهلاك كبير للجهد البشري في مهام روتينية.',
                  descEn: 'High manual effort in routine tasks.'
                },
                { 
                  ar: 'ضعف التحكم المالي', 
                  en: 'Weak financial control',
                  descAr: 'صعوبة في تتبع الرسوم والمصروفات بدقة.',
                  descEn: 'Difficulty in tracking fees and expenses.'
                },
                { 
                  ar: 'غياب الرؤية الفورية للإدارة', 
                  en: 'Limited visibility for leadership',
                  descAr: 'صعوبة اتخاذ قرارات مبنية على بيانات لحظية.',
                  descEn: 'Hard to make data-driven decisions.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 text-red-500 font-bold">
                    !
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{isAr ? item.ar : item.en}</h3>
                    <p className="text-slate-500 text-sm">{isAr ? item.descAr : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-600 p-12 rounded-[3rem] text-white text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <h3 className="text-3xl font-bold mb-6">
               {isAr ? 'المشكلة ليست في الأدوات.. بل في غياب التكامل' : "The problem is not lack of tools… it's lack of integration"}
             </h3>
             <p className="text-blue-100 text-lg">
               {isAr 
                 ? 'نحن لا نقدم مجرد برنامج، نحن نقدم منظومة متكاملة.' 
                 : "We don't offer software. We deliver a complete ecosystem."}
             </p>
             <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">ERP</div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">LMS</div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">Website</div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">Mobile App</div>
             </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{isAr ? 'مكونات النظام' : 'System Modules'}</h2>
            <p className="text-slate-500">{isAr ? 'حلول متكاملة تغطي كافة جوانب المدرسة' : 'Integrated solutions for every school aspect'}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                titleAr: 'الإدارة', titleEn: 'Administration',
                icon: LayoutDashboard, color: 'blue',
                featuresAr: ['دورة حياة الطالب كاملة', 'إدارة الموظفين والرواتب', 'سجلات رقمية'],
                featuresEn: ['Full student lifecycle', 'Staff & payroll', 'Digital records']
              },
              { 
                titleAr: 'النظام المالي', titleEn: 'Finance',
                icon: Wallet, color: 'emerald',
                featuresAr: ['تحصيل رسوم تلقائي', 'لوحات مالية لحظية', 'تتبع المصروفات'],
                featuresEn: ['Automated fee collection', 'Real-time dashboards', 'Expense tracking']
              },
              { 
                titleAr: 'الأكاديمي', titleEn: 'Academics',
                icon: GraduationCap, color: 'amber',
                featuresAr: ['تخطيط الدروس', 'اختبارات إلكترونية', 'تحليل الأداء'],
                featuresEn: ['Lesson planning', 'Online exams', 'Performance analytics']
              },
              { 
                titleAr: 'التواصل', titleEn: 'Communication',
                icon: MessageSquare, color: 'indigo',
                featuresAr: ['تطبيق أولياء الأمور', 'إشعارات فورية', 'تكامل واتساب'],
                featuresEn: ['Parent application', 'Instant notifications', 'WhatsApp integration']
              }
            ].map((module, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
                <div className={`w-16 h-16 bg-${module.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <module.icon className={`text-${module.color}-600 w-8 h-8`} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-slate-900">{isAr ? module.titleAr : module.titleEn}</h3>
                <ul className="space-y-3">
                  {(isAr ? module.featuresAr : module.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle className={`w-4 h-4 text-${module.color}-500`} />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">40%</div>
                <p className="text-blue-100">{isAr ? 'تقليل العمل الإداري' : 'Admin Work Reduction'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">30%</div>
                <p className="text-blue-100">{isAr ? 'تحسين تحصيل الرسوم' : 'Fee Collection Improvement'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100%</div>
                <p className="text-blue-100">{isAr ? 'تحول رقمي كامل' : 'Full Digitalization'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <p className="text-blue-100">{isAr ? 'دعم فني مستمر' : 'Continuous Support'}</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">{isAr ? 'النتائج الملموسة' : 'Real Impact'}</h2>
              <p className="text-blue-100 text-lg mb-8">
                {isAr 
                  ? 'نظامنا ليس مجرد أداة لإدخال البيانات، بل محرك لنمو وكفاءة مدرستك.' 
                  : 'Our system is not just a data entry tool, it is an engine for your school growth and efficiency.'}
              </p>
              <ul className="space-y-4">
                {[
                  { ar: 'ارتفاع معدل تسجيل الطلاب', en: 'Increased student enrollment' },
                  { ar: 'زيادة رضا أولياء الأمور', en: 'Higher parent satisfaction' },
                  { ar: 'شفافية مالية مطلقة', en: 'Absolute financial transparency' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Zap className="text-emerald-400 w-5 h-5" />
                    <span className="font-medium">{isAr ? item.ar : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Software */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-emerald-400 to-indigo-500"></div>
          <h2 className="text-4xl font-bold text-white mb-6">{isAr ? 'ما بعد النظام' : 'Beyond Software'}</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
            {isAr ? 'نحن نساعد مدرستك على النمو من خلال:' : 'We grow your school through:'}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <Monitor className="text-blue-400 w-10 h-10 mx-auto mb-4" />
               <h3 className="text-white font-bold">{isAr ? 'تصميم موقع المدرسة' : 'Website Development'}</h3>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <Users2 className="text-emerald-400 w-10 h-10 mx-auto mb-4" />
               <h3 className="text-white font-bold">{isAr ? 'إدارة وسائل التواصل' : 'Social Media Management'}</h3>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
               <TrendingUp className="text-indigo-400 w-10 h-10 mx-auto mb-4" />
               <h3 className="text-white font-bold">{isAr ? 'حملات تسويقية رقمية' : 'Digital Marketing'}</h3>
             </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-16">{isAr ? 'التنفيذ والانتشار' : 'Implementation'}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { titleAr: 'تنفيذ سريع', titleEn: 'Fast Deployment', descAr: '4-8 أسابيع', descEn: '4-8 weeks' },
              { titleAr: 'تدريب كامل', titleEn: 'Full Training', descAr: 'لكل الفريق', descEn: 'For all staff' },
              { titleAr: 'بدون أي تعقيد', titleEn: 'Zero Disruption', descAr: 'عملية سلسة', descEn: 'Smooth process' },
              { titleAr: 'دعم فني', titleEn: 'Continuous Support', descAr: 'مستمر 24/7', descEn: 'Always available' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-blue-600 font-bold text-xl mb-2">{isAr ? item.titleAr : item.titleEn}</div>
                <div className="text-slate-500">{isAr ? item.descAr : item.descEn}</div>
              </div>
            ))}
          </div>
          <div className="mt-20">
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-105">
               {isAr ? 'احجز عرضاً توضيحياً اليوم!' : 'Schedule a demo today!'}
             </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} {isAr ? 'إيوان العباقرة. جميع الحقوق محفوظة.' : 'Ewan Geniuses. All rights reserved.'}</p>
      </footer>
    </div>
  );
};
