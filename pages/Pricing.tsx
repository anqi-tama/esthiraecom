import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../App';
import { supabase } from '../lib/supabase';

interface ROIResults {
  monthlyIncrease: number;
  annualImpact: number;
  roiMultiplier: number;
}

const Pricing: React.FC = () => {
  const { lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  
  // ROI Inputs
  const [patients, setPatients] = useState<number>(400);
  const [avgValue, setAvgValue] = useState<number>(750000);
  const [noShowRate, setNoShowRate] = useState<number>(12);
  const [repeatVisit, setRepeatVisit] = useState<number>(1.2);

  // Lead Info State
  const [leadData, setLeadData] = useState({
    clinic_name: '',
    owner_name: '',
    email: '',
    whatsapp: ''
  });
  
  const [roiResults, setRoiResults] = useState<ROIResults>({
    monthlyIncrease: 0,
    annualImpact: 0,
    roiMultiplier: 0
  });

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeadData({
      ...leadData,
      [e.target.name]: e.target.value
    });
  };

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const sendWhatsApp = async (
    projectedRevenueNum: number,
    monthlyProfitIncreaseNum: number,
    annualGrowthNum: number,
    roiMultiplierVal: number
  ) => {
    const clinicName = leadData.clinic_name;
    const ownerName = leadData.owner_name;
    const whatsapp = leadData.whatsapp;
    const email = leadData.email;
    
    const projectedRevenue = formatRupiah(projectedRevenueNum);
    const monthlyProfitIncrease = formatRupiah(monthlyProfitIncreaseNum);
    const annualGrowth = formatRupiah(annualGrowthNum);
    const roiMultiplier = roiMultiplierVal;

    try {
      const response = await fetch(
        "https://hwnifhbazxqqjxxyrqoi.supabase.co/functions/v1/clever-processor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "roi",
            internalMessage: `
New Esthirae ROI Lead 🔥

Clinic:
${clinicName}

Owner:
${ownerName}

Email:
${email}

WhatsApp:
${whatsapp}

Projected Revenue:
Rp ${projectedRevenue}

Monthly Profit Increase:
Rp ${monthlyProfitIncrease}

Annual Growth Potential:
Rp ${annualGrowth}

ROI Multiplier:
${roiMultiplier}x Subscription Value
`,
            userPhone: whatsapp.replace(/^0/, "62"),
            userMessage: `
Halo ${ownerName},
Owner dari ${clinicName}

Alamat Email:
${email}
Nomor WhatsApp:
${whatsapp}

Berikut estimasi potensi pertumbuhan klinik Anda:

Projected Revenue Impact:
Rp ${projectedRevenue} per bulan

Peningkatan Profit Bulanan:
Rp ${monthlyProfitIncrease}

Potensi Pertumbuhan Tahunan:
Rp ${annualGrowth}

ROI Multiplier:
${roiMultiplier}x Subscription Value

Dengan kecerdasan terintegrasi Esthirae, klinik Anda dapat memulihkan hingga 45% pendapatan yang hilang dari no-show dan meningkatkan retensi hingga 20%.

Balas WhatsApp ini untuk diskusi strategi transformasi digital klinik Anda bersama tim Esthirae.

— Esthirae AI-Based Aesthetic Clinic Management System.
`
          }),
        }
      );

      if (!response.ok) {
        console.error("Edge function HTTP error:", response.status);
        return;
      }

      const data = await response.json();
      console.log("WA result:", data);

    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);

    // Perform Calculation
    const baseline = patients * avgValue;
    const noShowLoss = baseline * (noShowRate / 100);
    const recoveredNoShow = noShowLoss * 0.45; 
    const retentionGain = baseline * 0.12; 
    const upsellGain = baseline * 0.08; 
    
    const monthlyIncrease = recoveredNoShow + retentionGain + upsellGain;
    const annualImpact = monthlyIncrease * 12;
    const subscription = 1250000; 
    const roiMultiplier = Math.round(monthlyIncrease / subscription);

    // Save to Supabase
    const { error } = await supabase
      .from('leads_roi')
      .insert([
        {
          clinic_name: leadData.clinic_name,
          owner_name: leadData.owner_name,
          email: leadData.email,
          whatsapp: leadData.whatsapp,
          monthly_patients: patients,
          avg_treatment_value: avgValue,
          no_show_rate: noShowRate,
          repeat_visit: repeatVisit,
          projected_revenue: monthlyIncrease,
          roi_multiplier: roiMultiplier
        }
      ]);

    if (error) {
      console.error('Error saving ROI lead:', error);
    } else {
      // Success save -> trigger notification
      await sendWhatsApp(monthlyIncrease, monthlyIncrease, annualImpact, roiMultiplier);
    }

    // Results delay for feel
    setTimeout(() => {
      setRoiResults({
        monthlyIncrease,
        annualImpact,
        roiMultiplier
      });
      setCalculating(false);
      setResultsVisible(true);
    }, 800);
  };

  const i18n = {
    header: {
      title: lang === 'ID' ? 'Investasi Strategis untuk Klinik dengan Standar yang Lebih Tinggi.' : 'Strategic Investment for Clinics Operating at a Higher Standard.',
      sub: lang === 'ID' ? 'Pilih infrastruktur yang selaras dengan tahap pertumbuhan klinik Anda.' : 'Choose the infrastructure that aligns with your clinic’s growth stage.'
    },
    tiers: {
      perMonth: lang === 'ID' ? '/ bulan' : '/ month',
      regular: lang === 'ID' ? 'Harga Normal' : 'Regular Price',
      recommended: lang === 'ID' ? 'PILIHAN PALING CERDAS' : 'MOST INTELLIGENT CHOICE',
      ctaDemo: lang === 'ID' ? 'Request Private Demo' : 'Request Private Demo',
      ctaConsult: lang === 'ID' ? 'Jadwalkan Konsultasi Executive' : 'Schedule Executive Consultation'
    },
    roi: {
      title: lang === 'ID' ? 'Ukur Dampak Operasional Terstruktur.' : 'Measure the Impact of Structured Operations.',
      sub: lang === 'ID' ? 'Lihat bagaimana efisiensi operasional dan retensi meningkatkan pendapatan bulanan Anda.' : 'See how operational efficiency and retention can increase your monthly revenue.',
      labelVisits: lang === 'ID' ? 'Kunjungan Pasien / Bulan' : 'Monthly Patient Visits',
      labelAvgValue: lang === 'ID' ? 'Rata-rata Nilai Treatment (Rp)' : 'Avg Treatment Value (Rp)',
      labelNoShow: lang === 'ID' ? 'Estimasi No-Show Rate (%)' : 'Estimated No-Show Rate (%)',
      labelRepeat: lang === 'ID' ? 'Rata-rata Kunjungan Berulang' : 'Avg Repeat Visit / Patient',
      btnCalculate: lang === 'ID' ? 'Hitung Proyeksi Pertumbuhan' : 'Calculate Impact',
      resultTitle: lang === 'ID' ? 'Proyeksi Peningkatan Performa' : 'Projected Performance Increase',
      monthlyInc: lang === 'ID' ? 'Peningkatan Profit Bulanan' : 'Monthly Revenue Increase',
      annualInc: lang === 'ID' ? 'Potensi Pertumbuhan Tahunan' : 'Annual Growth Potential',
      multiplier: lang === 'ID' ? 'ROI Multiplier' : 'ROI Multiplier',
      placeholder: lang === 'ID' ? 'Masukkan data klinik Anda untuk membuka proyeksi pendapatan.' : 'Enter your clinic data to unlock revenue projection.',
      insight: lang === 'ID' ? 'Bahkan peningkatan efisiensi 10% sudah jauh melampaui biaya berlangganan sistem.' : 'Even a 10% efficiency improvement can exceed your monthly subscription investment.'
    },
    projection: {
      title: lang === 'ID' ? 'Klinik Terstruktur Berkembang Berbeda.' : 'Structured Clinics Scale Differently.',
      sub: lang === 'ID' ? 'Inilah evolusi performa yang biasanya terjadi setelah standarisasi digital.' : 'Here’s how performance typically evolves after digital standardization.',
      efficiency: lang === 'ID' ? 'Efisiensi Operasional' : 'Operational Efficiency',
      revenue: lang === 'ID' ? 'Optimalisasi Pendapatan' : 'Revenue Optimization',
      visibility: lang === 'ID' ? 'Visibilitas Finansial' : 'Financial Visibility',
      before: lang === 'ID' ? 'Sebelum' : 'Before',
      after: lang === 'ID' ? 'Sesudah' : 'After',
      scenarioTitle: lang === 'ID' ? 'Skenario: Klinik dengan Performa Standar' : 'Scenario: Standard Performance Clinic',
      uplift: lang === 'ID' ? 'Dampak Esthirae (15% Uplift)' : 'Esthirae Impact (15% Uplift)',
      roiNote: lang === 'ID' ? 'Biaya berlangganan menjadi tidak terasa dibandingkan pertumbuhan struktural yang dicapai klinik Anda.' : 'The subscription cost becomes negligible when compared to the structural growth your clinic achieves.'
    },
    modal: {
      calculating: lang === 'ID' ? 'Menghitung Potensi Pertumbuhan...' : 'Calculating Growth Potential...',
      unlockTitle: lang === 'ID' ? 'Buka Proyeksi Pendapatan Lengkap Anda.' : 'Unlock Your Full Revenue Projection.',
      unlockSub: lang === 'ID' ? 'Masukkan detail Anda untuk melihat estimasi ROI detail dan proyeksi pertumbuhan klinik Anda.' : 'Enter your details to view detailed ROI estimation and growth projection for your clinic.',
      clinicName: lang === 'ID' ? 'Nama Klinik' : 'Clinic Name',
      ownerName: lang === 'ID' ? 'Nama Pemilik' : 'Owner Name',
      email: lang === 'ID' ? 'Alamat Email' : 'Email Address',
      whatsapp: lang === 'ID' ? 'Nomor WhatsApp (Opsional)' : 'WhatsApp Number (Optional)',
      btnView: lang === 'ID' ? 'Lihat Proyeksi Saya' : 'View My Projection',
      confidential: lang === 'ID' ? 'Data Anda bersifat rahasia dan hanya digunakan untuk tujuan konsultasi.' : 'Your data is confidential and will only be used for consultation purposes.',
      dashTitle: lang === 'ID' ? 'Dashboard Proyeksi Anda.' : 'Your Growth Projection.',
      keyInsight: lang === 'ID' ? 'Klinik terstruktur tidak hanya bekerja lebih keras; mereka beroperasi dengan presisi lebih tinggi. Proyeksi ini mencerminkan transformasi dari workflow manual ke infrastruktur berbasis data.' : '"Structured clinics don\'t just work harder; they operate with higher precision. This projection reflects the transformation from a manual workflow to a data-driven infrastructure."',
      recommendedStart: lang === 'ID' ? 'Mulai dengan Paket' : 'Recommended Start'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const tiers = [
    {
      id: 'growth',
      tagline: lang === 'ID' ? 'Untuk Klinik yang Membangun Struktur' : 'For Clinics Building Structure',
      name: 'Growth Clinic',
      regular: '1.000.000',
      launch: '400.000',
      positioning: lang === 'ID' 
        ? 'Didesain untuk klinik yang bertransisi dari sistem manual ke operasional digital yang terstructured.' 
        : 'Designed for clinics that are transitioning from manual systems to structured digital operations.',
      includes: [
        'Appointment Intelligence',
        'Interactive Calendar & Smart Booking',
        'Digital EMR & Clinical Records',
        'Before–After Visual Tracking',
        'Standardized Service Catalog',
        'Integrated POS',
        'Inventory Management',
        'Executive Dashboard (Basic BI)'
      ],
      excludes: [
        'WhatsApp Automation',
        'Advanced CRM & Loyalty Engine',
        'Accounting & Financial Reporting Advanced'
      ],
      theme: 'white'
    },
    {
      id: 'premium',
      tagline: i18n.tiers.recommended,
      name: 'Premium Clinic',
      regular: '1.500.000',
      launch: '1.250.000',
      positioning: lang === 'ID' 
        ? 'Dibangun untuk klinik premium yang memprioritaskan retensi, pelacakan performa, dan pertumbuhan terukur.' 
        : 'Built for premium clinics that prioritize retention, performance tracking, and scalable growth.',
      includes: [
        lang === 'ID' ? 'Semua fitur Growth Clinic' : 'All Growth Clinic features',
        'Full WhatsApp Automation (Official API Ready)',
        'Customer 360° CRM',
        'Membership & Loyalty Engine',
        'Dynamic Promo Generator',
        'Lifecycle Follow-up Automation',
        'Accounting & Profit & Loss Report',
        'Marketing ROI Analytics',
        'Clinical Performance Analytics'
      ],
      isRecommended: true,
      theme: 'elevated'
    },
    {
      id: 'enterprise',
      tagline: lang === 'ID' ? 'Multi-Cabang & Skala Besar' : 'Multi-Branch & Large-Scale Operations',
      name: 'Enterprise Clinic',
      priceText: lang === 'ID' ? 'Harga Khusus' : 'Custom Pricing',
      subPrice: lang === 'ID' ? 'Hubungi Kami' : 'Contact Us',
      positioning: lang === 'ID' 
        ? 'Didesain untuk grup klinik mapan dan brand estetika yang beroperasi dalam skala enterprise.' 
        : 'Designed for established clinic groups and aesthetic brands operating at enterprise scale.',
      includes: lang === 'ID' ? [
        'Semua fitur Premium',
        'Dedicated Private Server',
        'Opsi White-Label',
        'Dashboard Konsolidasi Multi-Cabang',
        'Custom Feature Development',
        'Integrasi API',
        'Dukungan Prioritas',
        'Dedicated Account Manager',
        'Bantuan Migrasi Data'
      ] : [
        'All Premium features',
        'Dedicated Private Server',
        'White-Label Option',
        'Multi-Branch Consolidated Dashboard',
        'Custom Feature Development',
        'API Integration',
        'Priority Support',
        'Dedicated Account Manager',
        'Data Migration Assistance'
      ],
      theme: 'dark'
    }
  ];

  return (
    <div className="bg-esthirae-bg min-h-screen pt-24 pb-0 font-sans overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <header className="mb-24 animate-fade-up text-center">
          <h1 className="text-4xl lg:text-6xl font-serif text-esthirae-text mb-8 font-bold max-w-4xl mx-auto leading-tight italic">
            {i18n.header.title}
          </h1>
          <p className="text-esthirae-muted text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {i18n.header.sub}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.id}
              className={`relative flex flex-col rounded-4xl p-10 lg:p-12 transition-all duration-700 animate-fade-up border ${
                tier.theme === 'elevated' 
                  ? 'bg-white border-esthirae-accent shadow-[0_40px_80px_-20px_rgba(198,169,105,0.15)] z-10 lg:-translate-y-4 border-t-8' 
                  : tier.theme === 'dark'
                  ? 'bg-esthirae-footer text-white border-white/10 shadow-2xl'
                  : 'bg-white border-esthirae-border shadow-sm hover:shadow-md'
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {tier.isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-esthirae-accent text-white text-[10px] font-bold tracking-[0.2em] px-6 py-2 rounded-full whitespace-nowrap">
                  {lang === 'ID' ? 'REKOMENDASI' : 'RECOMMENDED'}
                </div>
              )}

              <div className="mb-10">
                <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-4 ${tier.theme === 'dark' ? 'text-esthirae-accent' : 'text-esthirae-muted'}`}>
                  {tier.tagline}
                </p>
                <h3 className={`text-3xl font-serif font-bold italic mb-6 ${tier.theme === 'dark' ? 'text-white' : 'text-esthirae-text'}`}>
                  {tier.name}
                </h3>
                
                <div className="mb-6 h-20">
                  {tier.launch ? (
                    <>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-serif font-bold">Rp {tier.launch}</span>
                        <span className={`text-[10px] tracking-widest uppercase font-bold ${tier.theme === 'dark' ? 'text-esthirae-border/50' : 'text-esthirae-muted'}`}>
                          {i18n.tiers.perMonth}
                        </span>
                      </div>
                      <p className={`text-[10px] mt-2 font-light opacity-60 ${tier.theme === 'dark' ? 'text-white' : 'text-esthirae-muted'}`}>
                        {i18n.tiers.regular} <span className="line-through">Rp {tier.regular}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl font-serif font-bold">{tier.priceText}</div>
                      <p className={`text-sm mt-1 font-light ${tier.theme === 'dark' ? 'text-esthirae-accent' : 'text-esthirae-muted'}`}>
                        {tier.subPrice}
                      </p>
                    </>
                  )}
                </div>

                <p className={`text-xs font-light leading-relaxed min-h-[48px] ${tier.theme === 'dark' ? 'text-esthirae-border/70' : 'text-esthirae-muted'}`}>
                  {tier.positioning}
                </p>
              </div>

              <div className="flex-grow space-y-8 mb-12">
                <ul className="space-y-4">
                  {tier.includes.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 group">
                      <svg className="w-4 h-4 text-esthirae-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-xs font-light leading-snug ${tier.theme === 'dark' ? 'text-esthirae-border/80' : 'text-esthirae-text'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.excludes && (
                  <ul className="space-y-4 opacity-40">
                    {tier.excludes.map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <span className="w-4 text-center text-xs font-light text-esthirae-muted">—</span>
                        <span className="text-xs font-light leading-snug text-esthirae-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link 
                to="/contact" 
                className={`w-full py-5 rounded-full text-center text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 shadow-xl ${
                  tier.theme === 'dark' 
                    ? 'bg-white text-esthirae-text hover:bg-esthirae-accent hover:text-white' 
                    : tier.theme === 'elevated'
                    ? 'bg-esthirae-text text-white hover:bg-esthirae-accent'
                    : 'bg-esthirae-bgSecondary text-esthirae-text hover:bg-esthirae-text hover:text-white'
                }`}
              >
                {tier.id === 'enterprise' ? i18n.tiers.ctaConsult : i18n.tiers.ctaDemo}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-esthirae-bgSecondary py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold italic mb-6">{i18n.roi.title}</h2>
            <p className="text-esthirae-muted text-lg font-light">{i18n.roi.sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white p-10 lg:p-12 rounded-4xl border border-esthirae-border shadow-sm">
              <form onSubmit={handleCalculate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-esthirae-muted">{i18n.roi.labelVisits}</label>
                    <input 
                      type="number" 
                      value={patients} 
                      onChange={(e) => setPatients(Number(e.target.value))}
                      className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-esthirae-accent transition-all text-sm font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-esthirae-muted">{i18n.roi.labelAvgValue}</label>
                    <input 
                      type="number" 
                      value={avgValue} 
                      onChange={(e) => setAvgValue(Number(e.target.value))}
                      className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-esthirae-accent transition-all text-sm font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-esthirae-muted">{i18n.roi.labelNoShow}</label>
                    <input 
                      type="number" 
                      value={noShowRate} 
                      onChange={(e) => setNoShowRate(Number(e.target.value))}
                      className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-esthirae-accent transition-all text-sm font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-esthirae-muted">{i18n.roi.labelRepeat}</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      value={repeatVisit} 
                      onChange={(e) => setRepeatVisit(Number(e.target.value))}
                      className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-esthirae-accent transition-all text-sm font-light"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-esthirae-accent text-white py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-esthirae-text transition-all duration-500 shadow-xl"
                >
                  {i18n.roi.btnCalculate}
                </button>
              </form>
            </div>

            <div className="h-full">
              <div className={`bg-white border-l-4 border-esthirae-accent rounded-4xl p-10 lg:p-12 shadow-xl h-full flex flex-col justify-center transition-all duration-1000 ${resultsVisible ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4 grayscale'}`}>
                {resultsVisible ? (
                  <div className="animate-fade-up">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-esthirae-accent font-bold mb-10">{i18n.roi.resultTitle}</h3>
                    <div className="space-y-8">
                      <div>
                        <div className="text-esthirae-muted text-[10px] uppercase tracking-[0.1em] mb-1">{i18n.roi.monthlyInc}</div>
                        <div className="text-4xl lg:text-5xl font-serif font-bold italic text-esthirae-text">{formatIDR(roiResults.monthlyIncrease)}</div>
                      </div>
                      <div>
                        <div className="text-esthirae-muted text-[10px] uppercase tracking-[0.1em] mb-1">{i18n.roi.annualInc}</div>
                        <div className="text-3xl font-serif font-bold text-esthirae-text">{formatIDR(roiResults.annualImpact)}</div>
                      </div>
                      <div className="pt-8 border-t border-esthirae-border">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-esthirae-muted uppercase tracking-widest">{i18n.roi.multiplier}</span>
                          <span className="bg-esthirae-bgSecondary px-4 py-1 rounded-full text-esthirae-accent font-bold text-xs">{roiResults.roiMultiplier}x investment</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-esthirae-muted italic font-light leading-relaxed mt-4">
                        {i18n.roi.insight}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 border border-esthirae-border rounded-full flex items-center justify-center mx-auto mb-6 opacity-30">
                       <svg className="w-6 h-6 text-esthirae-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-esthirae-muted text-sm font-light italic">{i18n.roi.placeholder}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold italic mb-6">{i18n.projection.title}</h2>
            <p className="text-esthirae-muted text-lg font-light">{i18n.projection.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="animate-fade-up">
              <div className="text-esthirae-accent font-serif text-2xl italic font-bold mb-6">01. {i18n.projection.efficiency}</div>
              <div className="space-y-6">
                <div className="bg-esthirae-bg p-6 rounded-3xl border border-esthirae-border opacity-60">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-muted mb-2">{i18n.projection.before}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'Penjadwalan manual, no-show rate 10–15%.' : 'Manual scheduling, 10–15% no-show rate.'}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border-l-4 border-esthirae-accent shadow-lg">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-accent mb-2">{i18n.projection.after}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'No-show berkurang 40%, utilitas ruang & jadwal dokter optimal.' : 'Reduced no-show by 40%, optimized doctor room utilization.'}</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="text-esthirae-accent font-serif text-2xl italic font-bold mb-6">02. {i18n.projection.revenue}</div>
              <div className="space-y-6">
                <div className="bg-esthirae-bg p-6 rounded-3xl border border-esthirae-border opacity-60">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-muted mb-2">{i18n.projection.before}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'Upsell tidak terpantau, tanpa strategi retensi CRM.' : 'Untracked upsells, no CRM retention strategy.'}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border-l-4 border-esthirae-accent shadow-lg">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-accent mb-2">{i18n.projection.after}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'Komitmen paket lebih tinggi, LTV pasien meningkat.' : 'Higher package commitment, improved customer LTV.'}</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="text-esthirae-accent font-serif text-2xl italic font-bold mb-6">03. {i18n.projection.visibility}</div>
              <div className="space-y-6">
                <div className="bg-esthirae-bg p-6 rounded-3xl border border-esthirae-border opacity-60">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-muted mb-2">{i18n.projection.before}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'Pelaporan lambat, kebocoran inventaris tidak terkontrol.' : 'Delayed reporting, unmonitored inventory leakage.'}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border-l-4 border-esthirae-accent shadow-lg">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-esthirae-accent mb-2">{i18n.projection.after}</div>
                  <p className="text-xs font-light">{lang === 'ID' ? 'P&L Real-time, COGS terkontrol, cashflow dapat diprediksi.' : 'Real-time P&L, controlled COGS, and predictable cashflow.'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 p-12 lg:p-20 bg-esthirae-footer text-white rounded-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-10">
               <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
               </svg>
             </div>
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold italic mb-6">{i18n.projection.scenarioTitle}</h3>
                  <ul className="space-y-4 text-esthirae-border/70 font-light text-sm mb-10">
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>{i18n.roi.labelVisits}</span> <span>400 Visits</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>{lang === 'ID' ? 'Rata-rata Nilai Treatment' : 'Avg Treatment Value'}</span> <span>Rp 750.000</span></li>
                    <li className="flex justify-between border-b border-white/10 pb-2"><span>{lang === 'ID' ? 'Pendapatan Dasar Bulanan' : 'Monthly Base Revenue'}</span> <span>Rp 300.000.000</span></li>
                  </ul>
                  <div className="bg-esthirae-accent/20 border border-esthirae-accent/30 p-8 rounded-3xl">
                     <div className="text-[10px] font-bold uppercase tracking-widest mb-2 text-esthirae-accent">{i18n.projection.uplift}</div>
                     <div className="text-3xl font-serif font-bold italic text-white">+ Rp 45.000.000 / {lang === 'ID' ? 'bulan' : 'month'}</div>
                  </div>
               </div>
               <div className="text-center lg:text-right">
                  <div className="inline-block bg-white text-esthirae-text px-10 py-4 rounded-full font-serif font-bold italic text-3xl mb-6">ROI Multiple &gt; 30x</div>
                  <p className="text-esthirae-border/50 font-light leading-relaxed max-w-sm ml-auto">
                    {i18n.projection.roiNote}
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-esthirae-bg text-center px-6 border-t border-esthirae-border">
         <h2 className="text-4xl lg:text-6xl font-serif font-bold italic mb-12 max-w-4xl mx-auto leading-tight">
          {lang === 'ID' ? 'Siap Upgrade Standar Klinik Anda?' : 'Ready to Upgrade Your Clinic Standard?'}
        </h2>
        <Link 
          to="/contact" 
          className="inline-block bg-esthirae-text text-white px-16 py-6 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-esthirae-accent transition-all duration-700 shadow-2xl"
        >
          {i18n.tiers.ctaConsult}
        </Link>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-esthirae-footer/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-4xl p-10 lg:p-14 shadow-2xl animate-fade-up border border-esthirae-accent/20">
            {calculating ? (
              <div className="py-20 text-center space-y-8">
                <div className="w-16 h-16 border-4 border-esthirae-border border-t-esthirae-accent rounded-full animate-spin mx-auto"></div>
                <p className="font-serif italic text-2xl font-bold">{i18n.modal.calculating}</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl lg:text-4xl font-serif font-bold italic mb-4">{i18n.modal.unlockTitle}</h3>
                <p className="text-esthirae-muted text-sm font-light mb-10">{i18n.modal.unlockSub}</p>
                
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest font-bold text-esthirae-muted">{i18n.modal.clinicName}</label>
                      <input required name="clinic_name" value={leadData.clinic_name} onChange={handleLeadChange} type="text" className="w-full bg-esthirae-bg border border-esthirae-border rounded-xl px-5 py-3 text-xs" placeholder="e.g. Luminique Aesthetic" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest font-bold text-esthirae-muted">{i18n.modal.ownerName}</label>
                      <input required name="owner_name" value={leadData.owner_name} onChange={handleLeadChange} type="text" className="w-full bg-esthirae-bg border border-esthirae-border rounded-xl px-5 py-3 text-xs" placeholder="Dr. Adeline Smith" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-esthirae-muted">{i18n.modal.email}</label>
                    <input required name="email" value={leadData.email} onChange={handleLeadChange} type="email" className="w-full bg-esthirae-bg border border-esthirae-border rounded-xl px-5 py-3 text-xs" placeholder="owner@clinic.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] uppercase tracking-widest font-bold text-esthirae-muted">{i18n.modal.whatsapp}</label>
                    <input required name="whatsapp" value={leadData.whatsapp} onChange={handleLeadChange} type="tel" className="w-full bg-esthirae-bg border border-esthirae-border rounded-xl px-5 py-3 text-xs" placeholder="+62 ..." />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-esthirae-text text-white py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-esthirae-accent transition-all duration-500 mt-4"
                  >
                    {i18n.modal.btnView}
                  </button>
                  <p className="text-[8px] text-center text-esthirae-muted italic font-light">{i18n.modal.confidential}</p>
                </form>
              </>
            )}
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-esthirae-muted hover:text-esthirae-text transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {resultsVisible && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-esthirae-footer/90 backdrop-blur-md" onClick={() => setResultsVisible(false)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-4xl overflow-hidden shadow-2xl animate-fade-up border border-esthirae-accent/30">
             <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                <div className="lg:col-span-3 p-10 lg:p-14 bg-white">
                    <h3 className="text-4xl font-serif font-bold italic mb-10">{i18n.modal.dashTitle}</h3>
                    <div className="space-y-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="animate-fade-up">
                          <div className="text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{i18n.roi.monthlyInc}</div>
                          <div className="text-3xl font-serif font-bold italic text-esthirae-accent">{formatIDR(roiResults.monthlyIncrease)}</div>
                        </div>
                        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
                          <div className="text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{i18n.roi.annualInc}</div>
                          <div className="text-3xl font-serif font-bold italic text-esthirae-text">{formatIDR(roiResults.annualImpact)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-esthirae-bg p-8 rounded-3xl border border-esthirae-border animate-fade-up" style={{ animationDelay: '200ms' }}>
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-esthirae-muted">{i18n.roi.multiplier}</span>
                           <span className="text-2xl font-serif font-bold italic text-esthirae-accent">{roiResults.roiMultiplier}x Subscription Value</span>
                        </div>
                        <p className="text-xs font-light text-esthirae-muted leading-relaxed">
                          {lang === 'ID' 
                            ? 'Dengan kecerdasan terintegrasi Esthirae, klinik Anda dapat memulihkan hingga 45% pendapatan yang hilang dari no-show dan meningkatkan retensi hingga 20%.' 
                            : 'With Esthirae\'s integrated intelligence, your clinic can recover up to 45% of lost revenue from no-shows and increase retention-driven revenue by 20%.'}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                        <Link to="/contact" className="flex-1 bg-esthirae-text text-white py-5 rounded-full text-center text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-esthirae-accent transition-all shadow-xl">
                          {i18n.tiers.ctaConsult}
                        </Link>
                        <button onClick={() => setResultsVisible(false)} className="flex-1 border border-esthirae-border py-5 rounded-full text-center text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-esthirae-bg transition-all">
                          {lang === 'ID' ? 'Tutup Dashboard' : 'Close Dashboard'}
                        </button>
                      </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-esthirae-footer p-10 lg:p-14 flex flex-col justify-center text-white relative">
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-esthirae-accent to-transparent"></div>
                   <div className="relative z-10 space-y-8">
                     <h4 className="text-2xl font-serif italic font-bold">Key Insight</h4>
                     <p className="text-sm font-light text-esthirae-border/70 leading-relaxed">
                       {i18n.modal.keyInsight}
                     </p>
                     <div className="pt-8 border-t border-white/10">
                        <div className="text-[8px] uppercase tracking-[0.3em] text-esthirae-accent font-bold mb-2">{i18n.modal.recommendedStart}</div>
                        <div className="text-lg font-serif italic">Premium Clinic Tier</div>
                     </div>
                   </div>
                </div>
             </div>
             
             <button 
              onClick={() => setResultsVisible(false)}
              className="absolute top-6 right-6 text-esthirae-muted hover:text-esthirae-text transition-colors lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;