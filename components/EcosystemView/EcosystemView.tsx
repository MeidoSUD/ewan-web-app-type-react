import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Globe, Layout, Receipt, GraduationCap, Phone, ChevronLeft, 
  Settings, UserPlus, FileText, PieChart, TrendingUp, ShieldCheck, 
  Smartphone, MessageSquare, Mail, RefreshCw, BarChart3, Database, 
  MapPin, CheckCircle2, AlertTriangle, Lightbulb, TrendingDown,
  Users, Rocket, Award, Monitor, Heart, PlayCircle, Star, BookOpen
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ecosystemStyles as s } from './EcosystemView.styles';

const Handshake = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m11 17 2 2 6-7c.3-.3.5-.7.5-1.1v-2.4c0-.4-.2-.8-.5-1.1l-1.1-1.1c-.3-.3-.7-.5-1.1-.5h-2.1c-.4 0-.8.2-1.1.5l-6.5 6.5c-.3.3-.5.7-.5 1.1v2.1c0 .4.2.8.5 1.1l1.1 1.1c.3.3.7.5 1.1.5h2.1c.4 0 .8-.2 1.1-.5l3.9-3.9"/>
    <path d="m4.89 12.11 3 3"/>
  </svg>
);

const adminData = [
  { name: 'Manual Processes', value: 100 },
  { name: 'Automated System', value: 60 }
];

const financeData = [
  { name: 'Collected', value: 85, color: '#3ABEF9' },
  { name: 'Pending', value: 10, color: '#FCD34D' },
  { name: 'Overdue', value: 5, color: '#F87171' }
];

const academicData = [
  { subject: 'Attendance', A: 85, full: 100 },
  { subject: 'Exam Scores', A: 75, full: 100 },
  { subject: 'Participation', A: 90, full: 100 },
  { subject: 'Assignments', A: 70, full: 100 },
];

interface EcosystemViewProps {
  onSwitchToProfile: () => void;
}

export const EcosystemView: React.FC<EcosystemViewProps> = ({ onSwitchToProfile }) => {
  return (
    <div className="animate-fade-in bg-white" dir="rtl">
       {/* PAGE 4: Hero Section */}
       <section className={s.hero}>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
          <div className="absolute top-0 right-20 w-[400px] h-full bg-brand-blue/10 transform -skew-x-12 z-0 hidden lg:block" />
          <div className="absolute bottom-0 right-80 w-[300px] h-40 bg-brand-green transform -skew-x-12 z-0 hidden lg:block" />
          
          <div className={`${s.container} flex flex-col lg:flex-row items-center gap-16 py-32`}>
             <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               whileInView={{ opacity: 1, x: 0 }}
               className="lg:w-1/2 text-right z-10"
             >
                <div className="mb-12">
                   <div className="w-40 h-40 mb-10 flex items-center justify-center text-brand-blue border-4 border-brand-blue rounded-3xl">
                      <Zap size={80} className="fill-brand-blue/10" />
                   </div>
                   <h1 className="text-7xl md:text-[6rem] font-black font-cairo text-slate-900 leading-[0.9] mb-8">
                      EWAN <br /> 
                      <span className="text-brand-blue">SMART SCHOOL</span> <br />
                      ECOSYSTEM
                   </h1>
                   <h2 className="text-5xl font-black font-cairo text-slate-800 mb-6">نظام ايوان التعليمي الذكي</h2>
                </div>
                
                <div className="bg-brand-green/10 border-r-8 border-brand-green p-6 mb-12">
                   <p className="text-2xl font-black font-cairo text-brand-green">Integrated Digital Transformation for Schools</p>
                   <p className="text-3xl font-black font-cairo text-slate-800 mt-2">التحول الرقمي للمدارس</p>
                </div>

                <div className="flex gap-4 justify-end">
                   <div className="flex items-center gap-3 px-6 py-3 bg-slate-100 rounded-full">
                      <Globe size={24} className="text-brand-blue" />
                      <span className="font-poppins font-bold text-slate-500">ewan-geniuses.com</span>
                   </div>
                </div>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }}
                className="lg:w-1/2 relative z-10"
             >
                <div className="grid grid-cols-2 gap-4 h-[600px]">
                   <div className="rounded-[4rem] overflow-hidden rotate-[-5deg] shadow-2xl border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col gap-4">
                      <div className="h-2/3 rounded-[3rem] overflow-hidden rotate-[5deg] shadow-2xl border-8 border-white">
                         <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-1/3 rounded-[2rem] bg-brand-blue p-8 flex items-center justify-center text-white">
                         <Zap size={60} strokeWidth={3} />
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
       </section>

       {/* PAGE 5: The Challenge */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div 
                   initial={{ opacity: 0, x: -50 }} 
                   whileInView={{ opacity: 1, x: 0 }}
                   className="text-right space-y-10"
                >
                   <div>
                      <h2 className="text-5xl font-black font-cairo text-slate-800 mb-4 leading-tight">
                        Schools Are <span className="text-brand-blue">Digitizing...</span> <br /> 
                        But Not <span className="text-slate-900 border-b-8 border-brand-green">Transforming</span>
                      </h2>
                      <h3 className="text-3xl font-bold font-cairo text-slate-500">المدارس تتحول رقمياً... <br/> لكنها غير متكاملة</h3>
                   </div>

                   <div className="bg-brand-blue p-12 rounded-[3.5rem] text-white shadow-2xl">
                      <div className="flex items-center gap-6 mb-8 justify-end">
                         <h4 className="text-4xl font-black font-cairo text-right">The Challenge / التحدي</h4>
                         <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                      <ul className="space-y-6 text-2xl font-bold">
                         <li className="flex items-center gap-4 justify-end"><span>أنظمة منفصلة وغير مترابطة</span> <div className="w-2 h-2 bg-brand-green rounded-full" /></li>
                         <li className="flex items-center gap-4 justify-end"><span>عمليات يدوية تستهلك الوقت</span> <div className="w-2 h-2 bg-brand-green rounded-full" /></li>
                         <li className="flex items-center gap-4 justify-end"><span>ضعف التحكم المالي</span> <div className="w-2 h-2 bg-brand-green rounded-full" /></li>
                         <li className="flex items-center gap-4 justify-end"><span>غياب الرؤية الفورية للإدارة</span> <div className="w-2 h-2 bg-brand-green rounded-full" /></li>
                      </ul>
                   </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: 50 }} 
                   whileInView={{ opacity: 1, x: 0 }}
                >
                   <div className="relative group">
                      <div className="bg-white p-12 rounded-[4rem] shadow-2xl relative z-10">
                         <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] w-full shadow-lg" />
                      </div>
                      <div className="absolute -bottom-10 -right-10 bg-brand-green p-12 rounded-[3.5rem] shadow-2xl text-white z-20 max-w-sm text-right">
                         <p className="text-2xl font-black font-cairo mb-4 leading-tight">The problem is not lack of tools... its lack of integration</p>
                         <div className="h-1 w-20 bg-white mb-4 mr-auto" />
                         <p className="text-3xl font-black font-cairo">المشكلة ليست في الأدوات... بل في غياب التكامل</p>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
       </section>

       {/* PAGE 6: Market Drivers */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="text-center mb-20">
                <h2 className="text-6xl font-black font-cairo text-slate-900 mb-4">Vision 2030 Drives Digital Education</h2>
                <div className="h-2 w-40 bg-brand-blue mx-auto rounded-full" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                   { tEn: 'Growing demand for smart schools', tAr: 'تزايد الطلب على المدارس الذكية', icon: TrendingUp, color: 'bg-blue-500' },
                   { tEn: 'Increasing competition between schools', tAr: 'زيادة المنافسة بين المدارس', icon: Users, color: 'bg-emerald-500' },
                   { tEn: 'Need for data-driven decisions', tAr: 'الحاجة إلى اتخاذ قرارات مبنية على البيانات', icon: Lightbulb, color: 'bg-blue-500' },
                ].map((item, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ y: -20 }}
                     className={`${item.color} p-12 rounded-[4rem] text-white shadow-2xl flex flex-col items-center gap-8`}
                   >
                      <div className="p-8 bg-white/20 rounded-[2.5rem]">
                         <item.icon size={64} strokeWidth={2.5} />
                      </div>
                      <div>
                         <h4 className="text-2xl font-bold font-poppins mb-4">{item.tEn}</h4>
                         <h4 className="text-3xl font-black font-cairo">{item.tAr}</h4>
                      </div>
                   </motion.div>
                ))}
             </div>

             <div className="mt-20 bg-slate-900 p-12 rounded-[4rem] text-center text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-brand-blue/10 transform skew-x-12 group-hover:skew-x-0 transition-transform duration-700" />
                <h3 className="text-3xl font-bold font-poppins mb-4 relative z-10">Schools that digitize fully will dominate the market!</h3>
                <h2 className="text-5xl font-black font-cairo relative z-10 mt-6">المدارس التي تتحول رقمياً بشكل كامل ستقود السوق!</h2>
             </div>
          </div>
       </section>

       {/* PAGE 7: Full Ecosystem One Login */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="text-right">
                   <h2 className="text-7xl font-black font-cairo text-slate-900 mb-8 leading-tight">
                      One Platform ... <br />
                      <span className="text-brand-blue">One login ...</span> <br />
                      Total Control!
                   </h2>
                   <div className="space-y-6">
                      <p className="text-3xl font-bold text-slate-500">We don't offer software. We deliver a complete ecosystem.</p>
                      <h3 className="text-4xl font-black font-cairo text-slate-800">نحن لا نقدم مجرد برنامج. نحن نقدم منظومة متكاملة.</h3>
                   </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                   {[
                      { name: 'ERP', icon: Database, bg: 'bg-blue-50' },
                      { name: 'LMS', icon: BookOpen, bg: 'bg-emerald-50' },
                      { name: 'Website', icon: Globe, bg: 'bg-purple-50' },
                      { name: 'Mobile App', icon: Smartphone, bg: 'bg-orange-50' },
                      { name: 'Marketing', icon: Rocket, bg: 'bg-pink-50' }
                   ].map((item, i) => (
                      <div key={i} className={`${item.bg} p-10 rounded-[3rem] flex flex-col items-center justify-center gap-6 shadow-lg hover:scale-110 transition-all border border-slate-100`}>
                         <item.icon size={50} className={item.name === 'LMS' ? 'text-brand-green' : 'text-brand-blue'} />
                         <span className="text-2xl font-black font-poppins text-slate-800">{item.name}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 8: Mobile Application */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2 grid grid-cols-2 gap-8 justify-center items-center">
                   <div className="bg-brand-blue p-6 rounded-[3rem] shadow-2xl relative z-10 translate-y-10">
                      <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full" />
                   </div>
                   <div className="bg-brand-green p-6 rounded-[3rem] shadow-2xl relative z-0">
                      <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full" />
                   </div>
                </div>

                <div className="lg:w-1/2 text-right">
                   <h2 className="text-6xl font-black font-cairo text-slate-800 mb-10 tracking-tighter">تطبيق الهاتف | <span className="text-brand-blue tracking-normal">Mobile Application</span></h2>
                   
                   <div className="flex flex-col md:flex-row gap-6 mb-12 justify-end">
                      <div className="bg-brand-blue text-white p-10 rounded-[3rem] flex-1 text-right shadow-xl">
                         <div className="flex gap-2 mb-4 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                         <h4 className="text-3xl font-black font-cairo mb-2">Fully branded mobile app</h4>
                         <p className="text-xl font-bold opacity-80">(iOS & Android)</p>
                      </div>
                      <div className="bg-brand-green text-white p-10 rounded-[3rem] flex-1 text-right shadow-xl">
                        <div className="flex gap-2 mb-4 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                         <h4 className="text-3xl font-black font-cairo mb-2">تطبيق جوال متكامل</h4>
                         <p className="text-xl font-bold opacity-80">(أندرويد و iOS)</p>
                      </div>
                   </div>

                   <ul className="grid grid-cols-2 gap-8 text-2xl font-black text-slate-600 mb-16">
                      <li className="flex items-center gap-4 justify-end">Attendance | الحضور <CheckCircle2 className="text-brand-green"/></li>
                      <li className="flex items-center gap-4 justify-end">Homework | الواجبات <CheckCircle2 className="text-brand-green"/></li>
                      <li className="flex items-center gap-4 justify-end">Fees | الرسوم <CheckCircle2 className="text-brand-green"/></li>
                      <li className="flex items-center gap-4 justify-end">Notifications | الإشعارات <CheckCircle2 className="text-brand-green"/></li>
                   </ul>

                   <div className="bg-slate-100 p-10 rounded-[3rem] text-center">
                      <p className="text-3xl font-black font-cairo text-slate-800">متصل دائماً... في أي وقت ومن أي مكان</p>
                      <p className="text-xl font-bold text-slate-400 mt-2 uppercase font-poppins">Always connected. Anytime. Anywhere</p>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 9: Live System */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="bg-white rounded-[5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-12 lg:p-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-4 h-full bg-brand-blue" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="text-right space-y-12">
                      <div>
                         <h2 className="text-7xl font-black font-cairo text-slate-900 mb-4">Real System. <span className="text-brand-blue">Real Results</span></h2>
                         <h3 className="text-5xl font-black font-cairo text-slate-500">نظام حقيقي يعمل الآن</h3>
                      </div>

                      <div className="bg-brand-blue/10 p-4 rounded-full w-fit pr-8 ml-auto flex items-center gap-4 border border-brand-blue/20">
                         <span className="text-2xl font-black text-brand-blue font-cairo">Live System</span>
                         <div className="flex gap-2"><div className="w-3 h-3 bg-brand-blue rounded-full"/><div className="w-3 h-3 bg-brand-blue rounded-full opacity-30"/></div>
                      </div>

                      <div className="space-y-8">
                         <p className="text-3xl font-bold text-slate-400 italic">"Fully operational system currently in use <br/> Real-time dashboard for school management"</p>
                         <h4 className="text-4xl font-black font-cairo text-slate-800">نظام يعمل فعلياً على أرض الواقع <br/> لوحة تحكم فورية لإدارة المدرسة</h4>
                      </div>
                   </div>

                   <div className="relative">
                      <div className="bg-slate-900 p-8 rounded-[4rem] shadow-2xl relative z-10 border-8 border-slate-800">
                         <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] w-full" />
                      </div>
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green rounded-full blur-3xl opacity-30" />
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 10: Modules Overview */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="text-center mb-20">
                <h2 className="text-6xl font-black font-cairo text-slate-900 mb-4 tracking-tighter">System Modules... مكونات النظام</h2>
                <div className="h-2 w-32 bg-brand-green mx-auto rounded-full" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                   { t: 'Administration | الإدارة', color: 'bg-blue-500', icon: Layout },
                   { t: 'Finance | النظام المالي', color: 'bg-emerald-500', icon: Receipt },
                   { t: 'Academics | الأكاديمي', color: 'bg-blue-500', icon: GraduationCap },
                   { t: 'Communication | التواصل', color: 'bg-emerald-500', icon: Phone },
                ].map((m, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ y: -15, scale: 1.05 }}
                     className={`${m.color} text-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col justify-between h-[350px] relative overflow-hidden group`}
                   >
                      <div className="absolute top-0 right-0 p-10 opacity-10 transform group-hover:scale-150 transition-transform duration-700">
                         <m.icon size={150} />
                      </div>
                      <div className="flex gap-2 justify-end mb-10"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                      <h4 className="text-3xl font-black font-cairo text-right leading-tight relative z-10">{m.t}</h4>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* PAGE 11: Administration */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="bg-white rounded-[5rem] shadow-2xl p-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="text-right space-y-10">
                   <div className="bg-brand-blue p-5 rounded-full w-fit pr-10 ml-auto flex items-center gap-5">
                      <h3 className="text-3xl font-black text-white font-cairo">Administration | الإدارة</h3>
                      <div className="flex gap-2"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                   </div>
                   
                   <ul className="text-2xl font-bold text-slate-500 space-y-4">
                      <li>• Full student lifecycle management</li>
                      <li>• Staff & payroll management</li>
                      <li>• Digital records</li>
                   </ul>

                   <ul className="text-3xl font-black font-cairo text-slate-800 space-y-4">
                      <li>• إدارة كاملة لدورة حياة الطالب</li>
                      <li>• إدارة الموظفين والرواتب</li>
                      <li>• سجلات رقمية متكاملة</li>
                   </ul>

                   <div className="bg-slate-900 p-10 rounded-[3rem] text-center text-white">
                      <p className="text-3xl font-black">Reduce workload by up to 40% !</p>
                      <p className="text-4xl font-black font-cairo mt-2 text-brand-green">تقليل الجهد الإداري حتى 40%!</p>
                   </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-[4rem] text-center border-2 border-slate-100 h-[600px] flex flex-col items-center">
                   <h4 className="text-2xl font-black mb-10 text-slate-800 font-poppins">Administration Workload Reduction</h4>
                   <ResponsiveContainer width="100%" height="80%">
                      <BarChart data={adminData}>
                         <CartesianGrid strokeDasharray="3 3" opacity={0.1}/>
                         <XAxis dataKey="name" fontSize={14} fontWeight="black" />
                         <YAxis hide />
                         <Tooltip />
                         <Bar dataKey="value" fill="#3ABEF9" radius={[20, 20, 0, 0]} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 12: Finance */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="bg-slate-900 rounded-[5rem] shadow-2xl p-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-white">
                <div className="order-2 lg:order-1 bg-white p-10 rounded-[4rem] shadow-xl h-[600px] flex flex-col items-center text-slate-900">
                   <h4 className="text-2xl font-black mb-10 text-slate-800 font-poppins">Fee Collection Status</h4>
                   <ResponsiveContainer width="100%" height="80%">
                      <RePieChart>
                         <Pie
                           data={financeData}
                           innerRadius={100}
                           outerRadius={150}
                           paddingAngle={5}
                           dataKey="value"
                         >
                           {financeData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                         </Pie>
                         <Tooltip />
                      </RePieChart>
                   </ResponsiveContainer>
                   <div className="flex gap-8 mt-4">
                      {financeData.map(f => (
                         <div key={f.name} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ background: f.color }} />
                            <span className="font-bold">{f.name} {f.value}%</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="order-1 lg:order-2 text-right space-y-12">
                   <div className="bg-brand-green p-5 rounded-full w-fit pr-10 ml-auto flex items-center gap-5">
                      <h3 className="text-3xl font-black text-white font-cairo">Finance | النظام المالي</h3>
                      <div className="flex gap-2"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                   </div>

                   <ul className="text-2xl font-bold text-white/70 space-y-4">
                      <li>• Automated fee collection</li>
                      <li>• Real-time financial dashboards</li>
                      <li>• Expense tracking</li>
                   </ul>

                   <ul className="text-3xl font-black font-cairo text-white space-y-4">
                      <li>• تحصيل الرسوم تلقائياً</li>
                      <li>• لوحات مالية لحظية</li>
                      <li>• تتبع المصروفات</li>
                   </ul>

                   <div className="bg-brand-blue p-10 rounded-[3rem] text-center text-white shadow-2xl shadow-brand-blue/40">
                      <p className="text-3xl font-black">Full financial transparency !</p>
                      <p className="text-4xl font-black font-cairo mt-2">شفافية مالية كاملة !</p>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 13: Academics */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="bg-white rounded-[5rem] shadow-2xl p-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="text-right space-y-10">
                   <div className="bg-brand-blue p-5 rounded-full w-fit pr-10 ml-auto flex items-center gap-5">
                      <h3 className="text-3xl font-black text-white font-cairo">Academics | الأكاديمي</h3>
                      <div className="flex gap-2"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                   </div>

                   <ul className="text-2xl font-bold text-slate-500 space-y-4">
                      <li>• Lesson planning</li>
                      <li>• Online exams</li>
                      <li>• Performance analytics</li>
                   </ul>

                   <ul className="text-3xl font-black font-cairo text-slate-800 space-y-4">
                      <li>• تخطيط الدروس</li>
                      <li>• اختبارات إلكترونية</li>
                      <li>• تحليل الأداء</li>
                   </ul>

                   <div className="bg-slate-900 p-12 rounded-[3.5rem] text-center text-white">
                      <p className="text-2xl font-bold mb-2">Transform learning into measurable, data-driven excellence</p>
                      <p className="text-4xl font-black font-cairo text-brand-green">تحويل التعليم إلى تميز قابل للقياس قائم على البيانات</p>
                   </div>
                </div>

                <div className="bg-slate-50 p-10 rounded-[4rem] h-[600px] flex flex-col items-center">
                   <h4 className="text-2xl font-black mb-10 text-slate-800 font-poppins">Student Performance</h4>
                   <ResponsiveContainer width="100%" height="80%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={academicData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Student A" dataKey="A" stroke="#3ABEF9" fill="#3ABEF9" fillOpacity={0.6} />
                      </RadarChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 14: Communication */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="bg-brand-green rounded-[5rem] shadow-2xl p-16 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-white">
                <div className="order-2 lg:order-1 bg-white p-10 rounded-[4rem] h-[600px] flex flex-col items-center text-slate-900 justify-center">
                   <h4 className="text-2xl font-black mb-16 text-slate-800 font-poppins">Communication Network</h4>
                   <div className="relative w-80 h-80 flex items-center justify-center">
                      <div className="w-32 h-32 bg-brand-blue rounded-full flex items-center justify-center text-white font-black text-2xl z-20 shadow-2xl">School</div>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 shadow-lg"><Smartphone className="text-brand-blue" /><span>Mobile</span></div>
                      <div className="absolute top-0 left-0 w-24 h-24 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 shadow-lg"><MessageSquare className="text-brand-green" /><span>WhatsApp</span></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 shadow-lg"><Mail className="text-red-500" /><span>Email</span></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 shadow-lg"><FileText className="text-orange-500" /><span>SMS</span></div>
                      <div className="absolute w-[300px] h-0.5 bg-slate-100 rotate-45" />
                      <div className="absolute w-[300px] h-0.5 bg-slate-100 -rotate-45" />
                   </div>
                </div>

                <div className="order-1 lg:order-2 text-right space-y-12">
                   <div className="bg-white/20 p-5 rounded-full w-fit pr-10 ml-auto flex items-center gap-5 backdrop-blur-xl">
                      <h3 className="text-3xl font-black text-white font-cairo">Communication | التواصل</h3>
                      <div className="flex gap-2"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                   </div>

                   <ul className="text-2xl font-bold text-white/80 space-y-4">
                      <li>• Parent mobile application</li>
                      <li>• Real-time notifications</li>
                      <li>• SMS & WhatsApp integration</li>
                   </ul>

                   <ul className="text-3xl font-black font-cairo text-white space-y-4">
                      <li>• تطبيق لأولياء الأمور</li>
                      <li>• إشعارات فورية</li>
                      <li>• تكامل مع واتساب والرسائل</li>
                   </ul>

                   <div className="bg-slate-900/40 p-12 rounded-[3.5rem] text-center text-white border-4 border-white/20">
                      <p className="text-3xl font-black italic">Stronger engagement, better trust !</p>
                      <p className="text-5xl font-black font-cairo mt-4">تواصل أقوى وثقة أكبر!</p>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 15: Beyond Software */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="bg-white rounded-[5rem] shadow-2xl p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-slate-900/5 -z-0 transform translate-x-1/2 -skew-x-12" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                   <div className="text-right space-y-12">
                      <h2 className="text-6xl font-black font-cairo text-slate-900 uppercase">ما بعد النظام | <span className="text-brand-blue tracking-tighter">BEYOND SOFTWARE</span></h2>
                      
                      <div className="flex gap-6 justify-end">
                         <div className="bg-brand-blue p-8 rounded-[3rem] text-white flex-1 text-right shadow-2xl">
                            <div className="flex gap-2 mb-4 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                            <ul className="space-y-4 text-xl font-bold">
                               <li>• Website development</li>
                               <li>• Social media management</li>
                               <li>• Digital marketing campaigns</li>
                            </ul>
                         </div>
                         <div className="bg-brand-green p-8 rounded-[3rem] text-white flex-1 text-right shadow-2xl">
                            <div className="flex gap-2 mb-4 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                            <ul className="space-y-4 text-2xl font-black font-cairo">
                               <li>• تصميم موقع المدرسة</li>
                               <li>• إدارة وسائل التواصل الاجتماعي</li>
                               <li>• حملات تسويقية رقمية</li>
                            </ul>
                         </div>
                      </div>

                      <div className="bg-slate-900 p-12 rounded-[4rem] text-center text-white shadow-2xl">
                         <p className="text-4xl font-bold font-poppins mb-2 italic">We <span className="text-brand-green">grow</span> your school!</p>
                         <p className="text-5xl font-black font-cairo text-brand-blue">نساعد مدرستك على النمو!</p>
                      </div>
                   </div>

                   <div className="relative">
                      <div className="bg-white p-10 rounded-[4rem] shadow-2xl border-8 border-slate-50 relative">
                         <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] w-full" />
                         <div className="absolute -top-10 -left-10 bg-brand-green p-8 rounded-full shadow-2xl text-white transform rotate-12">
                            <Rocket size={48} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 16: The Impact */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-slate-900 p-16 rounded-[5rem] shadow-2xl text-white relative group"
                >
                   <div className="absolute -top-10 -right-10 bg-brand-blue/20 w-40 h-40 rounded-full blur-3xl" />
                   <h2 className="text-[12rem] font-black font-cairo absolute -top-32 -left-10 opacity-5 -z-0">IMPACT</h2>
                   <div className="relative z-10">
                      <h2 className="text-8xl font-black font-cairo mb-4 text-right">The Impact!</h2>
                      <h3 className="text-6xl font-black font-cairo mb-12 text-brand-green text-right">النتائج !</h3>
                      
                      <div className="space-y-10">
                         {[
                            { en: '30-40% reduction in administrative work', ar: 'تقليل العمل الإداري بنسبة 30-40%' },
                            { en: '20-30% improvement in fee collection', ar: 'تحسين تحصيل الرسوم بنسبة 20-30%' },
                            { en: 'Higher parent satisfaction', ar: 'زيادة رضا أولياء الأمور' },
                            { en: 'Increased student enrollment', ar: 'ارتفاع معدل تسجيل الطلاب' },
                         ].map((impact, i) => (
                            <div key={i} className="flex flex-col items-end gap-2 group/item">
                               <p className="text-2xl font-bold flex items-center gap-4 transition-all group-hover/item:text-brand-blue group-hover/item:translate-x-[-10px]">
                                   {impact.en} <div className="w-4 h-0.5 bg-brand-green"/>
                               </p>
                               <p className="text-3xl font-black font-cairo text-white/60 group-hover/item:text-white">{impact.ar}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>

                <div className="relative">
                   <div className="bg-slate-50 p-20 rounded-[5rem] shadow-xl relative overflow-hidden border border-slate-100 flex items-center justify-center group">
                      <div className="absolute top-0 right-0 w-full h-full bg-brand-blue/5 transform skew-y-12 translate-y-1/2" />
                      <div className="text-center relative z-10 space-y-8">
                         <div className="w-64 h-64 bg-white rounded-full shadow-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <Users size={120} className="text-brand-blue" />
                         </div>
                         <h4 className="text-5xl font-black font-cairo text-slate-800">شريككم في النجاح</h4>
                         <div className="h-2 w-32 bg-brand-green mx-auto rounded-full" />
                      </div>
                   </div>
                   <div className="absolute -bottom-10 -right-10 bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white transform -rotate-3">
                      <TrendingUp size={48} className="text-brand-green mb-4" />
                      <p className="text-2xl font-black">Efficiency <br/> Boost</p>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 17: Implementation */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="bg-slate-100/50 border-8 border-slate-200 rounded-[5rem] p-16 text-center">
                <h2 className="text-8xl font-black font-cairo text-slate-900 mb-20 tracking-tighter">التنفيذ | Implementation</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                   {[
                      { tAr: 'تنفيذ سريع (4-8 أسابيع)', tEn: 'Fast deployment (4-8 weeks)', icon: Zap, color: 'bg-blue-500' },
                      { tAr: 'تدريب كامل للفريق', tEn: 'Full training and onboarding', icon: Users, color: 'bg-emerald-500' },
                      { tAr: 'دعم فني مستمر', tEn: 'Continuous support', icon: ShieldCheck, color: 'bg-blue-500' },
                   ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center group">
                         <div className={`${item.color} w-32 h-32 text-white rounded-full flex items-center justify-center shadow-2xl mb-8 group-hover:scale-110 transition-transform`}>
                            <item.icon size={50} />
                         </div>
                         <h4 className="text-3xl font-black font-cairo mb-4 leading-tight">{item.tAr}</h4>
                         <p className="text-xl font-bold text-slate-400 font-poppins">{item.tEn}</p>
                      </div>
                   ))}
                </div>

                <div className="bg-slate-900 p-12 rounded-[4rem] text-center text-white relative group">
                   <div className="absolute inset-0 bg-brand-green/10 transform skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-5xl font-black font-cairo text-brand-green mb-4">بدون أي تعقيد</h3>
                   <p className="text-3xl font-black font-poppins uppercase tracking-widest">Zero disruption</p>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 18: Why Us? */}
       <section className={s.section}>
          <div className={s.container}>
             <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2 relative order-2 lg:order-1">
                   <div className="bg-brand-blue/5 p-20 rounded-[5rem] border-4 border-dashed border-brand-blue/20 flex items-center justify-center">
                      <div className="relative text-black text-center space-y-12">
                         <div className="text-[12rem] font-black opacity-10">?</div>
                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
                            <h2 className="text-9xl font-black font-cairo">Why US</h2>
                            <h2 className="text-7xl font-black font-cairo text-brand-blue">لماذا نحن ؟</h2>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:w-1/2 text-right space-y-10 order-1 lg:order-2">
                   <div className="flex flex-col gap-8">
                       <div className="bg-brand-green p-10 rounded-[3.5rem] text-white shadow-2xl">
                          <div className="flex gap-2 mb-6 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                          <ul className="text-2xl font-bold space-y-4">
                             <li>• All-in-one solution</li>
                             <li>• Localized for Saudi market</li>
                             <li>• Bilingual support</li>
                             <li>• Cost-efficient</li>
                          </ul>
                       </div>
                       <div className="bg-brand-blue p-10 rounded-[3.5rem] text-white shadow-2xl">
                          <div className="flex gap-2 mb-6 justify-end"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                          <ul className="text-3xl font-black font-cairo space-y-4">
                             <li>• حل متكامل في منصة واحدة</li>
                             <li>• مخصص للسوق السعودي</li>
                             <li>• دعم عربي وإنجليزي</li>
                             <li>• توفير في التكاليف</li>
                          </ul>
                       </div>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 19: Business Model */}
       <section className={s.sectionLight}>
          <div className={s.container}>
             <div className="text-center mb-24">
                <h2 className="text-7xl font-black font-cairo text-slate-900 mb-4 tracking-tighter">Business Model... نموذج العمل</h2>
                <div className="h-2 w-48 bg-brand-green mx-auto rounded-full" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2 space-y-10">
                   {[
                      { en: 'Subscription-based model', ar: 'نموذج اشتراك سنوي', color: 'bg-blue-500' },
                      { en: 'Scalable packages', ar: 'باقات متعددة حسب الحاجة', color: 'bg-emerald-500' },
                      { en: 'Recurring revenue', ar: 'إيرادات مستمرة قابلة للنمو', color: 'bg-blue-500' },
                   ].map((item, i) => (
                      <div key={i} className={`${item.color} p-10 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl`}>
                        <div className="flex gap-2"><div className="w-3 h-3 bg-white rounded-full"/><div className="w-3 h-3 bg-white rounded-full opacity-30"/></div>
                        <div className="text-center md:text-right">
                           <p className="text-2xl font-bold font-poppins mb-2">{item.en}</p>
                           <h4 className="text-4xl font-black font-cairo">{item.ar}</h4>
                        </div>
                      </div>
                   ))}
                </div>

                <div className="flex flex-col gap-6">
                   {['Basic', 'Standard', 'Premium'].map((tier, i) => (
                      <div key={tier} className={`${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-slate-900'} p-8 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl`}>
                         <div className="flex gap-2"><div className="w-2 h-2 bg-white rounded-full"/><div className="w-2 h-2 bg-white rounded-full opacity-30"/></div>
                         <span className="text-3xl font-black font-poppins">{tier}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </section>

       {/* PAGE 20: Final CTA */}
       <section className="py-0 overflow-hidden bg-white">
          <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2">
             <div className="p-16 lg:p-32 text-right flex flex-col justify-center">
                <h2 className="text-7xl font-black font-cairo text-slate-800 mb-8 leading-[1.1]">
                   TRANSFORM YOUR SCHOOL INTO A <br /> 
                   <span className="text-brand-blue uppercase">Smart Institution</span>
                </h2>
                <h3 className="text-6xl font-black font-cairo text-slate-900 mb-16 underline decoration-brand-green decoration-[12px] underline-offset-8">حوّل مدرستك إلى مدرسة ذكية</h3>
                
                <div className="space-y-12">
                   <div className="text-center md:text-right">
                      <p className="text-3xl font-bold font-poppins text-slate-400 mb-2">Schedule a demo today!</p>
                      <h4 className="text-5xl font-black font-cairo text-brand-green">احجز عرضاً توضيحياً اليوم!</h4>
                   </div>
                   
                   <div className="flex gap-12 justify-end items-center">
                      <button 
                        onClick={onSwitchToProfile}
                        className="text-2xl font-black font-cairo text-slate-400 hover:text-brand-blue transition-colors flex items-center gap-4"
                      >
                         <ChevronLeft size={32} /> العودة للبروفايل
                      </button>
                      <button className="bg-brand-blue text-white px-16 py-8 rounded-[3rem] text-3xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">احجز العرض الآن</button>
                   </div>
                </div>

                <div className="mt-32 pt-12 border-t flex justify-between items-center">
                   <div className="text-brand-blue font-black font-poppins text-2xl">EWAN GENIUSES</div>
                   <div className="flex items-center gap-4 text-slate-400 font-bold font-poppins uppercase tracking-widest">
                      ewan-geniuses.com <MapPin size={20} />
                   </div>
                </div>
             </div>

             <div className="relative min-h-[600px] lg:min-h-0 bg-slate-900">
                <img src="https://images.unsplash.com/photo-1523240795204-5a2fe2126839?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent hidden lg:block" />
                <div className="absolute top-0 right-0 w-40 h-full bg-brand-blue/30 transform -skew-x-12 translate-x-20 z-10" />
             </div>
          </div>
       </section>

{/* Footer Branding Area */}
        <footer className="py-12 bg-slate-50 border-t border-slate-100 mt-20">
           <div className={s.container}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">E</div>
                    <span className="text-2xl font-black font-cairo">ايوان التـعلـم <span className="text-brand-blue">| الجيل القادم</span></span>
                 </div>
<div className="flex gap-8 text-slate-400 font-bold font-poppins uppercase tracking-widest text-sm">
                    <span>ERP</span>
                    <span>LMS</span>
                    <span>MOBILE</span>
                    <span>WEB</span>
                 </div>
                 <div className="text-slate-300 font-bold">© 2024 EWAN GENIUSES. ALL RIGHTS RESERVED.</div>
              </div>
           </div>
        </footer>
    </div>
  );
};