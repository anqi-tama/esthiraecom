import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

interface Module {
  id: string;
  title: string;
  features: string[];
  impact: string;
  previewImage?: string;
}

const getModules = (lang: string): Module[] => [
  {
    id: "appointment",
    title: lang === 'ID' ? "Appointment Intelligence" : "Appointment Intelligence",
    features: lang === 'ID' ? [
      "Interactive Calendar (Drag & Drop)",
      "Smart Booking Engine (Conflict Detection)",
      "Live Treatment Queue Management",
      "Otomatisasi WhatsApp Reminder"
    ] : [
      "Interactive Calendar View (Drag & Drop)",
      "Smart Booking Engine (Conflict Detection)",
      "Live Treatment Queue Management",
      "Automated WhatsApp Reminder Service"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/appointment.gif",
    impact: lang === 'ID' 
      ? "Turunkan no-show rate sampai 40%, hilangkan jadwal tabrakan, dan optimalkan waktu dokter di klinik."
      : "Reduce no-show rates by 40%, eliminate double booking, and optimize doctor utilization across multi-room clinics."
  },
  {
    id: "emr",
    title: lang === 'ID' ? "Advanced Digital EMR" : "Advanced Digital EMR",
    features: lang === 'ID' ? [
      "Rekam Medis & Patient History Lengkap",
      "Safeguard Alergi & Riwayat Klinis",
      "Visual Before–After Comparison Tool",
      "Standardized Service Catalog Pricing",
      "Smart Treatment Bundle Tracking"
    ] : [
      "Comprehensive Patient Record & History",
      "Allergy & Clinical History Safeguards",
      "Before–After Visual Comparison Tool",
      "Standardized Service Catalog Pricing",
      "Smart Treatment Bundle Tracking"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/ERM.gif",
    impact: lang === 'ID'
      ? "Tingkatkan akurasi klinis, perkuat kepercayaan pasien saat konsultasi, dan bantu naikin konversi paket treatment (upsell)."
      : "Improve clinical accuracy, strengthen patient consultation trust, and increase treatment package upsell commitment."
  },
  {
    id: "pos",
    title: lang === 'ID' ? "POS & Retail" : "POS & Retail",
    features: lang === 'ID' ? [
      "POS Terintegrasi (Treatment & Produk)",
      "Real-time Retail Inventory Sync",
      "Arsip Transaksi Detail & Aman",
      "Multi-payment & Loyalty Point Redemption"
    ] : [
      "Integrated Clinical & Product POS",
      "Direct Retail Sales Inventory Sync",
      "Comprehensive Transaction Archive",
      "Split-Payment & Loyalty Point Redemption"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/cashier.gif",
    impact: lang === 'ID'
      ? "Checkout 2x lebih cepat, monitoring keuangan jadi transparan, dan data selalu audit-ready."
      : "Achieve 2x faster checkout speeds, transparent finance tracking, and complete audit-readiness."
  },
  {
    id: "crm",
    title: lang === 'ID' ? "CRM & Loyalty Engine" : "CRM & Loyalty Engine",
    features: lang === 'ID' ? [
      "Unified Customer 360° Profile",
      "Otomatisasi Membership Tiering",
      "Promo Dinamis & Personalized Voucher",
      "Automated Lifecycle Follow-Up",
      "Targeted WhatsApp Campaign Suite"
    ] : [
      "Customer 360° Unified Profile",
      "Automated Membership Tiering",
      "Dynamic Promo & Personalized Vouchers",
      "Lifecycle Automated Follow-Ups",
      "Targeted WhatsApp Campaign Suite"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/CRM%20all.gif",
    impact: lang === 'ID'
      ? "Naikin retensi pasien hingga 60%, tingkatkan Lifetime Value, dan ukur ROI kampanye secara akurat."
      : "Increase patient retention by 60%, boost lifetime value, and precisely measure per-campaign ROI."
  },
  {
    id: "inventory",
    title: lang === 'ID' ? "Inventory & Procurement" : "Inventory & Procurement",
    features: lang === 'ID' ? [
      "Registri Produk & Barang Konsumsi Master",
      "Multi-Location Stock Visibility (Live)",
      "Sistem Pantau Batch & Kadaluarsa",
      "Digital Stock Audit & Opname",
      "Alur PO & Procurement Teratur"
    ] : [
      "Master Product & Consumable Registry",
      "Live Multi-Location Stock Visibility",
      "Expiry & Batch Monitoring System",
      "Digital Stock Audit & Opname Reports",
      "Purchase Order & Procurement Flow"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/INVENTORY.gif",
    impact: lang === 'ID'
      ? "Berantas kebocoran inventaris, kontrol COGS secara presisi, dan amankan margin operasional Anda."
      : "Completely prevent inventory leakage, control COGS with precision, and protect operational margins."
  },
  {
    id: "bi",
    title: lang === 'ID' ? "Executive BI Dashboard" : "Executive Business Intelligence",
    features: lang === 'ID' ? [
      "C-Level Strategic Dashboard",
      "Real-time P&L Reporting",
      "Clinical & Staff Performance Scorecard",
      "Marketing ROI Attribution",
      "Ekspor Data (CSV, XLSX, PDF)"
    ] : [
      "C-Level Strategic Dashboard",
      "Real-time Profit & Loss Reporting",
      "Clinical Performance Scorecards",
      "Marketing ROI Attribution Reports",
      "Universal Data Export (CSV, XLSX, PDF)"
    ],
    previewImage: "https://bu77wxy33nvwxxme.public.blob.vercel-storage.com/esthirae%20web/dashboard-ALL.gif",
    impact: lang === 'ID'
      ? "Ambil keputusan berbasis data, visibilitas keuangan total, dan kontrol strategis untuk ekspansi cabang."
      : "Enable data-driven growth decisions, full financial visibility, and strategic control over multi-branch expansions."
  }
];

const Features: React.FC = () => {
  const { lang } = useLanguage();
  const modules = getModules(lang);
  const [activeModule, setActiveModule] = useState<string>(modules[0].id);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAnimating(true);
    
    if (contentAreaRef.current) {
      const yOffset = -120;
      const y = contentAreaRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeModule]);

  const activeData = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <div className="bg-esthirae-bg min-h-screen py-24 px-6 lg:py-32 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 animate-fade-up">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-esthirae-text mb-8 italic">
            {lang === 'ID' ? 'Didesain untuk Operasional yang Lebih Efisien.' : 'Designed for Operational Excellence.'}
          </h1>
          <p className="text-esthirae-muted text-xl font-light max-w-2xl leading-relaxed font-sans">
            {lang === 'ID' 
              ? 'Esthirae menyediakan infrastruktur cerdas untuk tiap departemen penting di ekosistem klinik premium Anda.'
              : 'Esthirae provides a cohesive intelligence infrastructure for every critical department in your premium clinic ecosystem.'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-3">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full text-left px-10 py-8 rounded-3xl transition-all duration-500 border ${
                    activeModule === m.id
                      ? 'bg-white border-esthirae-border shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-esthirae-text'
                      : 'border-transparent text-esthirae-muted hover:bg-esthirae-bgSecondary hover:text-esthirae-text'
                  }`}
                >
                  <div className="flex items-center space-x-5">
                    <span className={`w-3 h-3 rounded-full transition-all duration-700 ${activeModule === m.id ? 'bg-esthirae-accent scale-125 shadow-[0_0_10px_rgba(198,169,105,0.5)]' : 'bg-esthirae-border/40'}`}></span>
                    <span className={`text-xl font-serif font-bold italic tracking-wide ${activeModule === m.id ? 'text-esthirae-text' : 'text-esthirae-muted opacity-80'}`}>
                      {m.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8" ref={contentAreaRef}>
            <div 
              className={`bg-white border border-esthirae-border rounded-4xl p-12 lg:p-20 shadow-sm transition-all duration-400 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <h2 className="text-5xl lg:text-6xl font-serif font-bold italic mb-14 text-esthirae-text leading-tight text-center lg:text-left">
                {activeData.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-20">
                <div className="md:col-span-7">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-esthirae-accent font-bold mb-10">
                    {lang === 'ID' ? 'FITUR UNGGULAN' : 'KEY CAPABILITIES'}
                  </h3>
                  <ul className="space-y-6">
                    {activeData.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-4 text-esthirae-text font-light group font-sans">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-esthirae-accent flex-shrink-0"></div>
                        <span className="leading-tight text-base font-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-5">
                  <div className="bg-esthirae-bgSecondary/40 p-10 rounded-3xl border border-esthirae-border/50 h-full">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-esthirae-accent font-bold mb-8">
                      {lang === 'ID' ? 'BUSINESS IMPACT' : 'BUSINESS IMPACT'}
                    </h3>
                    <p className="text-esthirae-text leading-relaxed font-light italic text-lg font-sans">
                      "{activeData.impact}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="aspect-[16/9] bg-esthirae-bg rounded-3xl border border-esthirae-border overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="h-full w-full flex flex-col justify-center items-center overflow-hidden">
                  {activeData.previewImage ? (
                    <img 
                      src={activeData.previewImage} 
                      alt={`${activeData.title} Preview`} 
                      className="w-full h-full object-cover transition-opacity duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="p-12 opacity-30 flex flex-col items-center">
                      <div className="font-serif italic font-bold text-3xl lg:text-4xl tracking-widest uppercase text-center">
                        {lang === 'ID' ? 'PREVIEW MODUL' : 'MODULE PREVIEW'}
                      </div>
                      <div className="w-16 h-[1px] bg-esthirae-text mt-4"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-40 mb-20 animate-fade-up">
          <div className="bg-esthirae-footer text-white rounded-4xl p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-esthirae-accent/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-serif font-bold italic mb-8">
                {lang === 'ID' ? 'Siap Upgrade Standar Klinik Anda?' : 'Ready to Upgrade Your Clinic Standard?'}
              </h2>
              <p className="text-esthirae-border/60 text-lg font-light max-w-2xl mx-auto mb-14 leading-relaxed">
                {lang === 'ID' 
                  ? 'Bergabunglah dengan jaringan klinik premium yang telah beralih ke manajemen berbasis data dengan infrastruktur Esthirae.'
                  : 'Join the network of premium clinics that have transitioned to data-driven management using Esthirae infrastructure.'}
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-esthirae-accent text-white px-14 py-6 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-esthirae-text transition-all duration-700 shadow-2xl"
              >
                {lang === 'ID' ? 'Schedule Private Demo' : 'Schedule Private Demo'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;