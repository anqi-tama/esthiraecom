import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Home: React.FC = () => {
  const { lang } = useLanguage();
  const scrollRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    scrollRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !scrollRefs.current.includes(el)) scrollRefs.current.push(el);
  };

  const content = {
    heroTitle: lang === 'ID' ? 'Upgrade Standar Manajemen Klinik Estetik Anda.' : 'Upgrade the Standard of Aesthetic Clinic Management.',
    heroSub: lang === 'ID' ? 'Esthirae adalah infrastruktur manajemen berbasis AI yang menyatukan EMR, CRM, Inventory, POS, dan Business Intelligence dalam satu sistem premium.' : 'Esthirae is an AI-powered management infrastructure integrating EMR, CRM, Inventory, POS, and Business Intelligence into one refined system.',
    heroCTA1: lang === 'ID' ? 'Request Private Demo' : 'Request Private Demo',
    heroCTA2: lang === 'ID' ? 'Explore Fitur' : 'Explore Features',
    dashboardTitle: lang === 'ID' ? 'Executive KPI Dashboard' : 'Executive KPI Dashboard',
    revLabel: lang === 'ID' ? 'Net Monthly Revenue' : 'Net Monthly Revenue',
    schedLabel: lang === 'ID' ? 'Jadwal Hari Ini' : 'Today\'s Schedule',
    invLabel: lang === 'ID' ? 'Inventory Health' : 'Inventory Health',
    problemTitle: lang === 'ID' ? 'Klinik Premium Butuh Infrastruktur Premium.' : 'Premium Clinics Deserve Premium Infrastructure.',
    problemSub: lang === 'ID' ? 'Di industri yang mengutamakan estetika dan presisi, sistem internal Anda jangan sampai berantakan. Esthirae bereskan semua hambatan yang bikin klinik susah scale up.' : 'In an industry defined by aesthetics and precision, your internal systems should never feel fragmented. Esthirae solves the invisible frictions that limit your clinic\'s true scalability.',
    ecoTitle: lang === 'ID' ? 'Eksosistem Cerdas' : 'The Intelligent Ecosystem',
    ecoSub: lang === 'ID' ? 'Enam pilar utama untuk operasional klinik yang sempurna, terintegrasi dalam satu sistem yang mulus.' : 'Six pillars of clinical excellence, integrated into one seamless intelligence layer.',
    closing: lang === 'ID' ? '“Esthirae bukan sekadar sistem baru. Ini adalah upgrade infrastruktur bisnis Anda.”' : '“Esthirae is not a system upgrade. It’s a business infrastructure upgrade.”',
    closingCTA: lang === 'ID' ? 'Jadwalkan Konsultasi Sekarang' : 'Schedule Private Consultation'
  };

  const problems = [
    { title: lang === 'ID' ? "Scheduling Conflict" : "Scheduling Conflicts", desc: lang === 'ID' ? "Input manual bikin jadwal sering tabrakan dan bikin pasien kecewa." : "Manual logs lead to double-bookings and patient frustration." },
    { title: lang === 'ID' ? "Fragmented Patient Record" : "Fragmented Patient Records", desc: lang === 'ID' ? "Riwayat medis pasien berceceran di folder fisik atau spreadsheet yang nggak update." : "Medical history scattered across physical folders and static spreadsheets." },
    { title: lang === 'ID' ? "Inventory Leakage" : "Inventory Leakage", desc: lang === 'ID' ? "Stok batch yang nggak terpantau bikin profit klinik bocor halus." : "Unmonitored batch usage draining clinic margins silently." },
    { title: lang === 'ID' ? "Marketing ROI Nggak Jelas" : "Unmeasured Marketing ROI", desc: lang === 'ID' ? "Nggak tahu promo mana yang beneran jalan atau Customer Lifetime Value yang akurat." : "Guesswork in promotion efficacy and customer lifetime value." },
    { title: lang === 'ID' ? "Financial Reporting Terlambat" : "Delayed Financial Reporting", desc: lang === 'ID' ? "Laporan bulanan lama beresnya karena data belum sinkron dan terverifikasi." : "Closing the month feels like a guessing game of unverified data." }
  ];

  const modules = [
    { title: lang === 'ID' ? "Appointment Intelligence" : "Appointment Intelligence", desc: lang === 'ID' ? "Booking engine cerdas dengan deteksi konflik dan manajemen antrean real-time." : "Smart conflict-detection booking engine and live queue management for doctors." },
    { title: lang === 'ID' ? "Advanced Digital EMR" : "Advanced Digital EMR", desc: lang === 'ID' ? "Rekam medis lengkap dengan fitur visual Before-After dan catatan klinis detail." : "Comprehensive patient history with before-after visual assessment and clinical notes." },
    { title: lang === 'ID' ? "POS & Retail Terintegrasi" : "Integrated POS & Retail", desc: lang === 'ID' ? "Transaksi treatment dan produk retail jadi makin praktis dengan multi-payment support." : "Seamless billing for treatments and retail products with multi-payment support." },
    { title: lang === 'ID' ? "CRM & Loyalty Engine" : "CRM & Loyalty Engine", desc: lang === 'ID' ? "Otomatisasi siklus pasien dan membership tiers untuk tingkatkan retensi." : "Lifecycle automation and membership tiers to maximize patient retention." },
    { title: lang === 'ID' ? "Inventory Intelligence" : "Inventory Intelligence", desc: lang === 'ID' ? "Pantau stok di berbagai lokasi dengan fitur batch tracking dan alert kadaluarsa." : "Multi-location stock monitoring with batch-level tracking and expiry alerts." },
    { title: lang === 'ID' ? "Executive BI" : "Executive Business Intelligence", desc: lang === 'ID' ? "Pantau P&L, Marketing ROI, dan performa klinik secara real-time lewat satu dashboard." : "Real-time P&L, marketing ROI, and clinical performance analytics for owners." }
  ];

  return (
    <div className="overflow-hidden font-sans">
      <section className="relative min-h-[90vh] flex items-center px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-up">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold italic leading-[1.05] mb-8 text-esthirae-text">
              {content.heroTitle}
            </h1>
            <p className="text-lg lg:text-xl text-esthirae-muted mb-12 max-w-xl font-light leading-relaxed">
              {content.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/contact" className="bg-esthirae-text text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-esthirae-accent transition-all duration-500 shadow-2xl shadow-black/10 text-center">
                {content.heroCTA1}
              </Link>
              <Link to="/features" className="bg-white border border-esthirae-border text-esthirae-text px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-esthirae-bgSecondary transition-all duration-500 text-center">
                {content.heroCTA2}
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms] perspective-1000">
            <div className="relative z-10 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-4xl p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] animate-float">
              <div className="bg-esthirae-bg border border-esthirae-border rounded-3xl overflow-hidden shadow-inner font-sans">
                 <div className="p-6 border-b border-esthirae-border flex justify-between items-center bg-white/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-esthirae-accent"></div>
                      <span className="font-serif text-lg tracking-wide font-bold italic">{content.dashboardTitle}</span>
                    </div>
                 </div>
                 <div className="p-8 grid grid-cols-2 gap-6">
                    <div className="col-span-2 bg-white p-6 rounded-2xl border border-esthirae-border shadow-sm">
                       <div className="text-[9px] uppercase tracking-[0.3em] text-esthirae-muted mb-2 font-bold">{content.revLabel}</div>
                       <div className="text-3xl font-serif font-bold text-esthirae-text mb-4">Rp 1.485.500.000</div>
                       <div className="h-16 w-full flex items-end space-x-2">
                          {[25, 40, 30, 65, 55, 85, 45, 70, 60, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-esthirae-accent/30 rounded-t-md" style={{ height: `${h}%` }}></div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-esthirae-border shadow-sm">
                       <div className="text-[9px] uppercase tracking-[0.3em] text-esthirae-muted mb-2 font-bold">{content.schedLabel}</div>
                       <div className="mt-4 text-xl font-serif font-bold italic">18 Appointments</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-esthirae-border shadow-sm">
                       <div className="text-[9px] uppercase tracking-[0.3em] text-esthirae-muted mb-2 font-bold">{content.invLabel}</div>
                       <div className="mt-4 text-xl font-serif font-bold italic">Audit Clear</div>
                    </div>
                 </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 bg-white/90 backdrop-blur-lg border border-esthirae-border rounded-3xl p-6 shadow-2xl w-64 animate-float-delayed font-sans">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-esthirae-bgSecondary border border-esthirae-border flex items-center justify-center font-serif text-esthirae-accent font-bold text-xl italic">M</div>
                <div>
                  <div className="text-sm font-semibold">Mrs. Maria S.</div>
                  <div className="text-[9px] text-esthirae-muted tracking-widest uppercase">Platinum Member</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-esthirae-border">
                <div className="text-[9px] uppercase tracking-[0.2em] text-esthirae-accent font-bold">Recommended Treatment</div>
                <div className="text-xs mt-1 font-light">HIFU Retouch — Week 24</div>
              </div>
            </div>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-esthirae-accent/10 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-esthirae-bgSecondary px-6" ref={addRef}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold italic mb-8 text-esthirae-text leading-tight">
              {content.problemTitle}
            </h2>
            <p className="text-esthirae-muted text-lg font-light leading-relaxed">
              {content.problemSub}
            </p>
          </div>
          <div className="lg:col-span-7 space-y-8">
            {problems.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-8 border-b border-esthirae-border pb-8 group">
                <span className="text-esthirae-accent font-serif font-bold italic text-3xl opacity-30 group-hover:opacity-100 transition-all duration-500">0{idx + 1}</span>
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:text-esthirae-accent transition-colors duration-300 font-sans font-semibold">{item.title}</h3>
                  <p className="text-esthirae-muted font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6" ref={addRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold italic mb-6">{content.ecoTitle}</h2>
            <div className="w-24 h-[1px] bg-esthirae-accent mx-auto mb-6"></div>
            <p className="text-esthirae-muted font-light max-w-2xl mx-auto">{content.ecoSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {modules.map((module, idx) => (
              <div key={idx} className="bg-white border border-esthirae-border p-12 rounded-4xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 group">
                <div className="w-14 h-14 rounded-2xl bg-esthirae-bg flex items-center justify-center mb-8 group-hover:bg-esthirae-accent group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold italic mb-4 text-esthirae-text">{module.title}</h3>
                <p className="text-esthirae-muted text-xs font-light leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 bg-esthirae-footer text-white text-center px-6 relative overflow-hidden" ref={addRef}>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold italic mb-12 leading-tight">
            {content.closing}
          </h2>
          <div className="mt-16">
            <Link to="/contact" className="inline-block bg-esthirae-accent text-white px-14 py-6 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-esthirae-text transition-all duration-700 shadow-2xl">
              {content.closingCTA}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;