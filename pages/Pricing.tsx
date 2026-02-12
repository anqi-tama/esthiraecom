import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';

const Pricing: React.FC = () => {
  const { lang } = useLanguage();

  const content = {
    title: lang === 'ID' ? 'Investasi Strategis buat Klinik Premium.' : 'Strategic Investment for Premium Clinics.',
    sub: lang === 'ID' ? 'Infrastruktur skalabel yang dirancang untuk memperlancar operasional dan maksimalkan profit klinik di Indonesia & ASEAN.' : 'Scalable infrastructure designed to elevate operations and maximize profitability across Indonesia and ASEAN.',
    offer: lang === 'ID' ? 'Launch Offer' : 'Launch Offer',
    enterprise: lang === 'ID' ? 'ASEAN Network' : 'ASEAN Network',
    unified: lang === 'ID' ? 'Unified Core' : 'Unified Core',
    unifiedSub: lang === 'ID' ? 'Infrastruktur lengkap untuk performa tinggi klinik cabang tunggal.' : 'Complete infrastructure for high-performance single-branch clinics.',
    custom: lang === 'ID' ? 'Enterprise Custom' : 'Enterprise Custom',
    customSub: lang === 'ID' ? 'Strategi penskalaan khusus buat jaringan klinik atau grup medis regional.' : 'Bespoke scaling strategies for clinic chains and regional medical groups.',
    cta1: lang === 'ID' ? 'Request Private Demo' : 'Request Private Demo',
    cta2: lang === 'ID' ? 'Jadwalkan Konsultasi' : 'Schedule Consultation',
    footer: lang === 'ID' ? 'Harga ini mencerminkan posisi strategis untuk kategori klinik mid-to-premium. Untuk komitmen multi-tahun, silakan hubungi kantor regional kami di Yogyakarta.' : 'Pricing reflects strategic positioning for mid-to-premium clinic categories. For multi-year commitments, contact our regional office in Yogyakarta.'
  };

  return (
    <div className="bg-esthirae-bg min-h-screen py-24 px-6 lg:py-32 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <header className="mb-24 animate-fade-up">
          <h1 className="text-5xl lg:text-7xl font-serif text-esthirae-text mb-8 italic font-bold">{content.title}</h1>
          <p className="text-esthirae-muted text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {content.sub}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
          <div className="bg-white border border-esthirae-border rounded-4xl p-12 lg:p-16 text-left shadow-[0_32px_64px_-16px_rgba(0,0,0,0.02)] flex flex-col animate-fade-up [animation-delay:100ms] relative overflow-hidden group">
            <div className="mb-10 relative z-10">
              <span className="text-[10px] font-bold tracking-[0.3em] text-esthirae-accent uppercase bg-esthirae-accent/10 px-6 py-2.5 rounded-full inline-block mb-8">{content.offer}</span>
              <h2 className="text-4xl font-serif text-esthirae-text italic font-bold">{content.unified}</h2>
              <p className="text-esthirae-muted mt-4 font-light text-base">{content.unifiedSub}</p>
            </div>

            <div className="mb-12 relative z-10">
              <div className="flex items-baseline space-x-3">
                <span className="text-5xl font-serif text-esthirae-text font-bold">Rp 250.000</span>
                <span className="text-esthirae-muted text-[10px] tracking-widest uppercase font-bold">/ {lang === 'ID' ? 'Bulan' : 'Month'}</span>
              </div>
              <p className="text-esthirae-muted text-xs line-through mt-2 font-light">{lang === 'ID' ? 'Harga Normal Rp 400.000' : 'Regular Price Rp 400.000'}</p>
            </div>

            <div className="flex-grow relative z-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-esthirae-text mb-6">{lang === 'ID' ? 'Fitur Utama' : 'Included Features'}</h4>
              <ul className="space-y-5 mb-12">
                {[
                  lang === 'ID' ? "Akses penuh ke semua modul inti" : "Full access to all 6 core modules",
                  lang === 'ID' ? "EMR & Patient Record tanpa batas" : "Unlimited Patient EMR records",
                  lang === 'ID' ? "Otomatisasi WhatsApp Reminder" : "Automated WhatsApp Reminder engine",
                  lang === 'ID' ? "Executive Dashboard real-time" : "Real-time Executive Dashboard",
                  lang === 'ID' ? "Akun staf & roles tanpa batas" : "Unlimited staff accounts & roles",
                  lang === 'ID' ? "Cloud storage buat foto klinis" : "Cloud storage for clinical imagery",
                  lang === 'ID' ? "Standard priority technical support" : "Standard priority technical support"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4 text-xs text-esthirae-text leading-tight">
                    <svg className="w-4 h-4 text-esthirae-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="w-full bg-esthirae-text text-white py-5 rounded-full text-center text-[10px] font-bold tracking-widest uppercase hover:bg-esthirae-accent transition-all duration-500 shadow-xl relative z-10">
              {content.cta1}
            </Link>
          </div>

          <div className="bg-esthirae-footer text-white border border-esthirae-border/10 rounded-4xl p-12 lg:p-16 text-left shadow-2xl flex flex-col animate-fade-up [animation-delay:200ms] relative overflow-hidden group">
            <div className="mb-10 relative z-10">
               <span className="text-[10px] font-bold tracking-[0.3em] text-esthirae-accent uppercase bg-esthirae-accent/20 px-6 py-2.5 rounded-full inline-block mb-8">{content.enterprise}</span>
              <h2 className="text-4xl font-serif italic font-bold">{content.custom}</h2>
              <p className="text-esthirae-muted mt-4 font-light text-base">{content.customSub}</p>
            </div>

            <div className="mb-12 relative z-10">
              <div className="text-5xl font-serif italic text-white tracking-wide font-bold">{lang === 'ID' ? 'Hubungi Kami' : 'Contact Sales'}</div>
              <p className="text-esthirae-muted text-xs mt-2 font-light">{lang === 'ID' ? 'Custom volume-based pricing' : 'Custom volume-based pricing'}</p>
            </div>

            <div className="flex-grow relative z-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-esthirae-accent mb-6">Enterprise Capabilities</h4>
              <ul className="space-y-5 mb-12">
                {[
                  lang === 'ID' ? "Dedicated regional account manager" : "Dedicated regional account manager",
                  lang === 'ID' ? "Custom API & EHR integration" : "Custom API & EHR integrations",
                  lang === 'ID' ? "White-labeled patient experience portal" : "White-labeled patient experience portal",
                  lang === 'ID' ? "Multi-level audit logging" : "Advanced multi-level audit logging",
                  lang === 'ID' ? "Business review & analytics per kuartal" : "Quarterly business review & analytics",
                  lang === 'ID' ? "On-site team training" : "On-site team onboarding & training",
                  lang === 'ID' ? "SLA priority support" : "Tier-1 SLA guaranteed response"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-4 text-xs text-esthirae-border/70 leading-tight">
                    <svg className="w-4 h-4 text-esthirae-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="w-full bg-white text-esthirae-text py-5 rounded-full text-center text-[10px] font-bold tracking-widest uppercase hover:bg-esthirae-accent hover:text-white transition-all duration-500 shadow-xl relative z-10">
              {content.cta2}
            </Link>
          </div>
        </div>

        <div className="mt-24 text-esthirae-muted text-sm font-light max-w-2xl mx-auto italic leading-relaxed">
          <p>{content.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;