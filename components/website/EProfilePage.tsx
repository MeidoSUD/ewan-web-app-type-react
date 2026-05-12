import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Globe, Heart, Rocket, Lightbulb, Users, PlayCircle, Play, GraduationCap, UserCheck, Award, Code, Smartphone, Database, Server, Layers, Zap, BarChart3, Mail, Phone, Target, CheckCircle2, Layout 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { profileStyles as s } from './ProfileView.styles';

// Data for Chart (From Page 14 of E Profile)
const chartData = [
  { year: '2026', initial: 1000, expected: 20000 },
  { year: '2027', initial: 10000, expected: 50000 },
  { year: '2028', initial: 20000, expected: 100000 },
];

export const ProfileView: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white" dir="rtl">
       {/* 1. Hero Page (PDF Page 1) */}
       <section className={s.hero}>
          <div className="absolute top-0 right-0 w-full h-full bg-slate-50/50 -z-10" />
          <div className={`${s.container} grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-right">
                <div className="mb-12">
                   <div className="w-32 h-32 mb-8 flex items-center justify-center text-brand-blue border-4 border-brand-blue rounded-3xl animate-pulse">
                     <BookOpen size={64} strokeWidth={1.5} />
                   </div>
                   <h1 className={s.heroTitle}>ايـوان <br /> <span className="text-brand-blue border-b-[12px] border-brand-green">الـتـعـلـم</span></h1>
                   <p className="text-2xl text-slate-400 font-bold uppercase tracking-[0.2em] font-poppins pt-8">ewan-geniuses.com</p>
                </div>
                <div className="flex gap-4 justify-end">
                   <div className="w-12 h-3 rounded-full bg-brand-blue" />
                   <div className="w-12 h-3 rounded-full bg-brand-green" />
                   <div className="w-12 h-3 rounded-full bg-slate-200" />
                </div>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                <div className="aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                   <img 
                     src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" 
                     alt="online ed" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-12">
                      <div className="text-white">
                        <p className="text-4xl font-black font-cairo mb-2">ONLINE EDUCATION</p>
                        <p className="text-sm opacity-80 uppercase tracking-widest font-poppins">Leading the digital era</p>
                      </div>
                   </div>
                </div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue opacity-10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-green rounded-[3rem] -z-10" />
             </motion.div>
          </div>
       </section>

       {/* 2. What We Are? (PDF Page 2) */}
       <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
          <div className={`${s.container} grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center`}>
             <div className="space-y-6 text-right md:text-right">
                <h3 className="text-4xl font-black font-cairo">Ewan Geniuses</h3>
                <p className="text-xl opacity-90 leading-relaxed font-medium">
                  A smart educational platform that connects students, teachers, and trainers in an integrated learning environment.
                </p>
             </div>
             <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/20 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)]">
                <div className="w-20 h-20 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center text-brand-blue shadow-xl">
                  <Globe size={40} />
                </div>
                <h2 className="text-6xl font-black font-cairo mb-4">من نحن؟</h2>
                <div className="h-2 w-24 bg-brand-green mx-auto mb-6 rounded-full" />
                <p className="text-2xl font-poppins font-bold uppercase tracking-tighter opacity-80">what we are?</p>
             </motion.div>
             <div className="space-y-6 text-right">
                <h3 className="text-4xl font-black font-cairo">ايوان التعلم</h3>
                <p className="text-xl opacity-90 leading-relaxed font-medium">
                  منصة تعليمية ذكية تربط بين الطلاب والمعلمين والمدربين في بيئة تعليمية متكاملة تضمن تجربة فريدة تجمع بين التعلم الفردي والجماعي.
                </p>
             </div>
          </div>
       </section>

       {/* 3. Core Values (PDF Page 3) */}
       <section className="py-32 bg-slate-50">
          <div className={s.container}>
             <div className="text-center mb-24">
                <h2 className={s.heading}>قيمتنا الأساسية <span className="text-brand-blue">| Our Core Values</span></h2>
                <div className="h-1.5 w-32 bg-brand-green mx-auto rounded-full" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Purpose */}
               <div className={s.card}>
                  <div className="mb-10 p-6 bg-brand-blue/5 rounded-3xl w-fit text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all"><Heart size={48} /></div>
                  <h3 className="text-3xl font-black font-cairo mb-6 uppercase text-slate-900"> Purpose | غايتنا </h3>
                  <p className="text-xl text-slate-600 mb-6 font-medium leading-relaxed">نحن نؤمن بأن كل قرار نتخذه يجب أن يعكس النزاهة والالتزام برضا العملاء.</p>
                  <p className="text-lg text-slate-400 font-poppins">We believe every decision should reflect integrity and commitment to customer satisfaction.</p>
               </div>
               {/* Mission */}
               <div className={`${s.blueCard} lg:-translate-y-8`}>
                  <div className="mb-10 p-6 bg-white/10 rounded-3xl w-fit text-white"><Rocket size={48} /></div>
                  <h3 className="text-3xl font-black font-cairo mb-6 uppercase"> Mission | مهمتنا </h3>
                  <p className="text-2xl font-cairo font-medium leading-relaxed mb-6">دعم الطلاب في رحلتهم من خلال حصص تفاعلية، دورات ممتعة، ومكتبة غنية.</p>
                  <p className="text-lg opacity-60 font-poppins">Provide interactive online classes and a rich digital library for a flexible learning path.</p>
               </div>
               {/* Vision */}
               <div className={`${s.card} border-brand-green/20 hover:border-brand-green`}>
                  <div className="mb-10 p-6 bg-brand-green/5 rounded-3xl w-fit text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all"><Lightbulb size={48} /></div>
                  <h3 className="text-3xl font-black font-cairo mb-6 uppercase text-slate-900"> Vision | الرؤية </h3>
                  <p className="text-xl text-slate-600 mb-6 font-medium leading-relaxed">نحن قصة نجاح تبدأ برؤية وتتحقق على أرض الواقع لنصنع إنسان عبقري.</p>
                  <p className="text-lg text-slate-400 font-poppins">A success story that begins with a vision and creates brilliant individuals on the ground.</p>
               </div>
             </div>
          </div>
       </section>

       {/* 4. Features (PDF Page 4) */}
       <section className="py-24 bg-white">
          <div className={s.container}>
             <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="flex-1 space-y-12">
                   <div className="text-right">
                      <h2 className="text-6xl font-black font-cairo mb-4 tracking-tighter">مميزاتـنا <span className="text-brand-blue">| Our Features</span></h2>
                      <p className={s.subHeading}>تعليم ذكي... تجربة سلسة</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: 'أ', t: 'دروس فردية وجماعية', desc: 'نظام متكامل وواجهة مباشرة', icon: Users },
                        { label: 'ب', t: 'بث مباشر وتسجيل', desc: 'إمكانية المراجعة في أي وقت', icon: PlayCircle },
                        { label: 'ج', t: 'مكتبة رقمية شاملة', desc: 'كتب ومناهج تعليمية معتمدة', icon: BookOpen },
                        { label: 'د', t: 'كورسات تدريبية', desc: 'مهارات حديثة ونخبة من الخبراء', icon: Rocket },
                      ].map((f, i) => (
                        <div key={i} className={s.featureCard}>
                           <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue font-black text-2xl mb-6">{f.label}</div>
                           <h4 className="text-2xl font-black font-cairo mb-3">{f.t}</h4>
                           <p className="text-slate-500 font-medium">{f.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="flex-1 w-full relative">
                   <div className="aspect-[4/5] bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative z-10 flex flex-col items-center justify-center text-center p-12">
                      <img src="https://images.unsplash.com/photo-1577891721396-22c4b8505d9d?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="feature bg" />
                      <div className="relative z-10">
                        <Play size={80} className="text-brand-green fill-brand-green mx-auto mb-10 animate-pulse" />
                        <h3 className="text-5xl font-black font-cairo text-white mb-6">التجربة الذكية</h3>
                        <p className="text-2xl text-white/80 leading-relaxed font-medium">Because we believe that learning should be effective, simple, and accessible.</p>
                      </div>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-full h-full bg-brand-green/20 rounded-[4rem] -z-10" />
                </div>
             </div>
          </div>
       </section>

       {/* 5. Users (PDF Page 5) */}
       <section className="py-32 bg-slate-50">
          <div className={s.container}>
             <div className="text-center mb-24">
                <h2 className="text-5xl font-black font-cairo mb-4 text-slate-800">المستخدمين <span className="text-brand-blue">| Users</span></h2>
                <div className="h-1.5 w-40 bg-brand-blue mx-auto rounded-full" />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 { 
                   titleAr: 'الأستاذ', titleEn: 'Teacher', icon: GraduationCap, color: 'brand-blue',
                   descAr: 'يمكن للأستاذ إنشاء دروس، تحديد المواعيد، ومتابعة النتائج مباشرة.',
                   descEn: 'Can create lessons, set appointments, and follow up directly.'
                 },
                 { 
                   titleAr: 'الطالب', titleEn: 'Student', icon: UserCheck, color: 'brand-green',
                   descAr: 'يمكنه التسجيل، حضور المحاضرات، طرح الأسئلة، واستعراض تقدمه الأكاديمي.',
                   descEn: 'Can register for classes, attend live lectures, and review progress.'
                 },
                 { 
                   titleAr: 'المدرب', titleEn: 'Tutor', icon: Award, color: 'slate-800',
                   descAr: 'يمتلك لوحة تحكم متكاملة لإدارة الكورسات التدريبية وإصدار الشهادات.',
                   descEn: 'Has a control panel to manage training courses and issue certificates.'
                 },
               ].map((u, i) => (
                 <motion.div whileHover={{ y: -15 }} key={i} className={s.userCard}>
                    <div className={`w-24 h-24 rounded-[2rem] bg-${u.color} text-white flex items-center justify-center mb-10 shadow-lg`}>
                       <u.icon size={48} />
                    </div>
                    <h3 className="text-3xl font-black font-cairo mb-2 text-slate-900">{u.titleAr}</h3>
                    <p className={`text-xl font-bold font-poppins text-${u.color} mb-8 uppercase`}>{u.titleEn}</p>
                    <div className="space-y-4 text-center">
                       <p className="text-slate-600 text-xl font-cairo leading-relaxed">{u.descAr}</p>
                       <p className="text-slate-400 font-medium font-poppins">{u.descEn}</p>
                    </div>
                 </motion.div>
               ))}
             </div>
          </div>
       </section>

       {/* 6. Technical Overview (PDF Page 7) */}
       <section className="py-24 bg-white relative overflow-hidden">
          <div className={s.container}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="text-right space-y-12">
                   <div>
                      <h2 className="text-5xl font-black font-cairo text-slate-900 mb-4">نظرة تقنية <span className="text-brand-blue">| Technical</span></h2>
                      <p className="text-3xl font-cairo font-bold text-brand-green">بنية تقنية حديثة تدعم النمو والتوسع</p>
                   </div>
                   <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                      تم تطوير منصتنا باستخدام بنية تحتية حديثة وآمنة، تعتمد على تقنيات متقدمة لضمان الأمان والموثوقية والمرونة اللازمة للنمو والتوسع.
                   </p>
                   <div className="grid grid-cols-3 md:grid-cols-4 gap-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                      <div className="flex flex-col items-center gap-2"><Code size={40} className="text-orange-500" /> <span className="font-bold">HTML5</span></div>
                      <div className="flex flex-col items-center gap-2"><Layout size={40} className="text-blue-500" /> <span className="font-bold">React</span></div>
                      <div className="flex flex-col items-center gap-2"><Smartphone size={40} className="text-brand-blue" /> <span className="font-bold">Flutter</span></div>
                      <div className="flex flex-col items-center gap-2"><Database size={40} className="text-slate-900" /> <span className="font-bold">MySQL</span></div>
                      <div className="flex flex-col items-center gap-2"><Server size={40} className="text-purple-600" /> <span className="font-bold">PHP</span></div>
                      <div className="flex flex-col items-center gap-2"><Layers size={40} className="text-red-500" /> <span className="font-bold">Laravel</span></div>
                   </div>
                </div>

                <div className="bg-brand-green p-1 w-full rounded-[4rem] shadow-2xl">
                   <div className="bg-slate-900 rounded-[3.8rem] p-16 text-white text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-10"><Code size={150} /></div>
                      <div className="relative z-10 py-10">
                         <div className="w-20 h-20 bg-brand-green rounded-3xl mx-auto mb-10 flex items-center justify-center shadow-lg"><Zap size={40} /></div>
                         <h3 className="text-3xl font-black font-cairo mb-6">Modern Technical Infrastructure</h3>
                         <p className="text-xl opacity-80 leading-relaxed font-poppins mb-10">
                           Built on security, reliability, and the flexibility required for future success.
                         </p>
                         <div className="flex items-center justify-center gap-8">
                            <div className="flex flex-col gap-2">
                               <Smartphone size={32} />
                               <span className="font-bold">Android & iOS</span>
                            </div>
                            <div className="w-px h-12 bg-white/20" />
                            <div className="flex flex-col gap-2">
                               <Globe size={32} />
                               <span className="font-bold">Web System</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* 7. Team (PDF Page 10) */}
       <section className="py-24 bg-slate-50">
          <div className={s.container}>
             <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                <div className="text-right">
                   <h2 className="text-5xl font-black font-cairo text-slate-800 tracking-tighter">فريقـنـا <span className="text-brand-blue">| Our Team</span></h2>
                   <div className="h-1 w-24 bg-brand-blue mt-4" />
                </div>
                <p className="text-xl text-slate-500 max-w-xl text-right font-medium">
                  فريق العمل هو جوهر نجاح المنصة، يجمع بين الخبرات الإدارية والتقنية والتعليمية لتقديم تجربة مميزة.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { name: 'Noha Al-Dosari', role: 'CEO | نهى الدوسري', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
                 { name: 'Zera Alsubaie', role: 'General Manager | ذيره السبيعي', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
                 { name: 'Mohamed Al-Fatih', role: 'CTO | محمد الفاتح', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
                 { name: 'Abdulrahman Almahdi', role: 'IT Officer | عبدالرحمن المهدي', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400' },
               ].map((member, i) => (
                 <div key={i} className="group flex flex-col items-center">
                    <div className="w-full aspect-square bg-slate-200 rounded-[3rem] mb-6 overflow-hidden shadow-xl border-4 border-white grayscale group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-100">
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-2xl font-black font-cairo text-slate-900 mb-1">{member.name}</h4>
                    <p className="text-brand-blue font-bold font-cairo">{member.role}</p>
                 </div>
               ))}
             </div>
          </div>
       </section>

       {/* 8. Clients Overview Charts (PDF Page 14) */}
       <section className="py-32 bg-white">
          <div className={s.container}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="bg-slate-50 p-12 lg:p-20 rounded-[5rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-20 opacity-5 -z-0"><BarChart3 size={300} /></div>
                   <div className="relative z-10">
                      <h3 className="text-4xl font-black font-cairo mb-4 text-slate-900">نظرة عن العملاء</h3>
                      <p className="text-2xl text-brand-blue font-poppins font-bold uppercase tracking-widest mb-12">Growth Projection</p>
                      
                      <div className="h-[400px] w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={chartData} margin={{top: 10, right: 0, left: 0, bottom: 0}}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                             <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 16, fontWeight: 'bold'}} dy={10} />
                             <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 14}} />
                             <Tooltip 
                               contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}} 
                               cursor={{fill: '#F1F5F9', radius: 10}}
                             />
                             <Legend verticalAlign="top" align="right" wrapperStyle={{paddingBottom: '30px', fontWeight: 'bold', fontSize: '14px'}} />
                             <Bar name="Initial | المبدئي" dataKey="initial" fill="#00D084" radius={[8, 8, 0, 0]} barSize={45} />
                             <Bar name="Expected | المتوقع" dataKey="expected" fill="#3ABEF9" radius={[8, 8, 0, 0]} barSize={45} />
                           </BarChart>
                        </ResponsiveContainer>
                      </div>
                   </div>
                </div>

                <div className="space-y-12 text-right">
                   <div className="flex items-center gap-6 justify-end">
                      <div className="text-right">
                        <h2 className="text-6xl font-black font-cairo text-slate-900 mb-2">Let's Build</h2>
                        <h2 className="text-5xl font-black font-cairo text-brand-green border-r-8 border-brand-green pr-6">المستقبل معاً</h2>
                      </div>
                      <Rocket size={80} className="text-brand-blue animate-bounce" />
                   </div>
                   <p className="text-2xl text-slate-500 leading-relaxed font-cairo font-medium">
                      نرحب بالشراكة مع المؤسسات التعليمية، مراكز التدريب، ومطوري المحتوى لبناء بيئة تعليمية عربية رقمية موحدة.
                   </p>
                   <div className="flex flex-col gap-6">
                      {[
                        'المؤسسات التعليمية والمدارس الخاصة',
                        'مراكز التدريب المعتمدة والاحترافية',
                        'مطوري المحتوى التعليمي الرقمي',
                        'الشركات التقنية الراغبة في التكامل'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-xl font-bold font-cairo justify-end">
                           {item} <CheckCircle2 className="text-brand-green shrink-0" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </section>
       
       {/* 9. Contact Us (PDF Page 15) */}
       <section className="py-24 bg-brand-blue text-white overflow-hidden">
          <div className={`${s.container} relative z-10 text-center`}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-right">
                   <h2 className="text-7xl font-black font-cairo mb-12 leading-tight">للتواصل معنا <br /> <span className="opacity-40">Contact Us</span></h2>
                   <div className="space-y-10">
                      <div className="flex items-center gap-8 justify-end">
                         <div className="text-right">
                            <p className="text-2xl font-black font-cairo">العنوان | Address</p>
                            <p className="text-xl opacity-80">الحمدانية - جدة - المملكة العربية السعودية</p>
                         </div>
                         <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><Target size={32} /></div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 flex flex-col items-center gap-4">
                            <Mail size={40} />
                            <p className="text-lg font-bold font-poppins">contact@ewan-geniuses.com</p>
                         </div>
                         <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 flex flex-col items-center gap-4">
                            <Phone size={40} />
                            <p className="text-2xl font-black font-poppins tracking-tighter">+966 50857 1495</p>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-white p-12 md:p-16 rounded-[4rem] text-slate-800 shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-2 h-full bg-brand-green" />
                   <h3 className="text-4xl font-black font-cairo mb-8">ابدأ رحلتك معنا</h3>
                   <div className="space-y-6">
                      <div className="text-right"><label className="font-black font-cairo mb-2 block mr-2 text-slate-400">الاسم</label><input type="text" className={s.input} /></div>
                      <div className="text-right"><label className="font-black font-cairo mb-2 block mr-2 text-slate-400">البريد</label><input type="email" className={s.input} /></div>
                      <div className="text-right"><label className="font-black font-cairo mb-2 block mr-2 text-slate-400">الرسالة</label><textarea rows={3} className={s.input} /></div>
                      <button className={s.button}>إرسال البيانات</button>
                   </div>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
};
