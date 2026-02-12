import React from 'react';
import { useLanguage } from '../App';

const About: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="bg-esthirae-bg min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-24 animate-fade-up">
          <h1 className="text-5xl lg:text-7xl font-serif text-esthirae-text mb-8 italic font-bold">
            {lang === 'ID' ? 'Dibangun buat Masa Depan Klinik Estetik.' : 'Built for the Next Generation of Aesthetic Clinics.'}
          </h1>
          <p className="text-esthirae-muted text-xl font-light leading-relaxed">
            {lang === 'ID' 
              ? 'Esthirae lahir dari visi kalau layanan estetik butuh infrastruktur yang se-premium treatment yang diberikan. Kami gabungkan teknologi AI canggih dengan pemahaman mendalam soal operasional klinik Anda.'
              : 'Esthirae was founded on the belief that aesthetic medicine deserves an infrastructure as refined as the services it provides. We combine advanced AI with a deep understanding of clinic operations.'}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div className="animate-fade-up [animation-delay:100ms]">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-esthirae-accent font-bold mb-6">{lang === 'ID' ? 'Misi Kami' : 'Our Mission'}</h2>
            <p className="text-3xl font-serif text-esthirae-text italic font-bold">
              {lang === 'ID' ? 'Membangun standar baru operasional klinik lewat infrastruktur digital cerdas di seluruh ASEAN.' : 'To standardize and elevate clinic operations through intelligent digital infrastructure across ASEAN.'}
            </p>
          </div>
          <div className="animate-fade-up [animation-delay:200ms]">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-esthirae-accent font-bold mb-6">{lang === 'ID' ? 'Visi Kami' : 'Our Vision'}</h2>
            <p className="text-3xl font-serif text-esthirae-text italic font-bold">
              {lang === 'ID' ? 'Jadi beauty-tech management system nomor satu yang menetapkan standar presisi dan luxury di dunia estetika medis.' : 'To become the leading beauty-tech clinic management system, setting the standard for precision and luxury in medical aesthetics.'}
            </p>
          </div>
        </div>

        <div className="bg-white border border-esthirae-border rounded-4xl p-12 lg:p-20 shadow-sm animate-fade-up [animation-delay:300ms]">
          <h2 className="text-4xl font-serif mb-16 text-center italic font-bold">{lang === 'ID' ? 'Pilar Utama Kami' : 'Our Core Values'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: lang === 'ID' ? "Presisi" : "Precision", desc: lang === 'ID' ? "Semua data dan laporan dikelola dengan akurasi tinggi kelas medis." : "Every record, every report, and every byte of data is handled with medical-grade accuracy." },
              { title: lang === 'ID' ? "Integritas" : "Integrity", desc: lang === 'ID' ? "Keamanan data dan etika bisnis jadi prioritas utama dalam arsitektur kami." : "Data security and ethical business practices are at the heart of our architecture." },
              { title: lang === 'ID' ? "Skalabilitas" : "Scalability", desc: lang === 'ID' ? "Dari klinik tunggal sampai grup regional, sistem kami siap dukung pertumbuhan Anda." : "From a single luxury studio to a regional clinic empire, we grow as you grow." },
              { title: lang === 'ID' ? "Premium Experience" : "Premium Experience", desc: lang === 'ID' ? "Software kami didesain supaya terasa semewah ruang perawatan klinik Anda." : "We believe software should feel as high-end as the treatment room itself." }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-esthirae-bgSecondary rounded-full flex items-center justify-center mx-auto mb-6 text-esthirae-accent font-serif text-xl italic leading-none font-bold">
                  {v.title[0]}
                </div>
                <h3 className="text-xl font-serif italic mb-4 font-bold">{v.title}</h3>
                <p className="text-esthirae-muted text-xs font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
