import React, { useState } from 'react';
import { useLanguage } from '../App';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    clinic_name: '',
    owner_name: '',
    email: '',
    whatsapp: '',
    location: '',
    monthly_patient_volume: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendWhatsAppNotification = async () => {
    const { clinic_name: clinicName, owner_name: ownerName, location, whatsapp, email } = formData;

    try {
      const response = await fetch(
        "https://hwnifhbazxqqjxxyrqoi.supabase.co/functions/v1/clever-processor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "contact",
            internalMessage: `
New Contact Lead

Clinic:
${clinicName}

Owner:
${ownerName}

Location:
${location}

Contact:
${whatsapp}
${email}
`,
            userPhone: whatsapp.replace(/^0/, "62"),
            userMessage: `
Terima kasih atas minat Anda.

Tim konsultan Esthirae bakal hubungi Anda dalam 1 hari kerja buat diskusiin transformasi digital klinik Anda.

Jika ada pertanyaan urgent, Anda bisa langsung balas WhatsApp ini.

— Esthirae | AI-Based Aesthetic Clinic Management System.
`
          }),
        }
      );

      if (!response.ok) {
        console.error("Edge function HTTP error:", response.status);
        return; // jangan throw
      }

      const data = await response.json();
      console.log("WA result:", data);

    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Map string ranges to integers to fix Supabase "invalid input syntax for type integer" error
    const volumeMapping: Record<string, number> = {
      "< 100": 50,
      "100 - 300": 200,
      "300 - 600": 450,
      "> 600": 800
    };

    const numericVolume = volumeMapping[formData.monthly_patient_volume] || 0;

    const { error } = await supabase
      .from('leads_contact')
      .insert([
        {
          clinic_name: formData.clinic_name,
          owner_name: formData.owner_name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          location: formData.location,
          monthly_patient_volume: numericVolume, // Send as integer
          message: formData.message
        }
      ]);

    if (error) {
      console.error('Error saving lead:', error);
      setLoading(false);
      alert(lang === 'ID' ? 'Terjadi kesalahan. Silakan coba lagi.' : 'An error occurred. Please try again.');
    } else {
      console.log("Lead saved");
      await sendWhatsAppNotification();
      setLoading(false);
      setSubmitted(true);
    }
  };

  const labels = {
    clinic: lang === 'ID' ? 'Nama Klinik' : 'Clinic Name',
    owner: lang === 'ID' ? 'Nama Pemilik' : 'Principal Name',
    email: lang === 'ID' ? 'Alamat Email' : 'Email Address',
    phone: lang === 'ID' ? 'No WhatsApp' : 'WhatsApp Number',
    location: lang === 'ID' ? 'Lokasi / Kota' : 'Location / City',
    volume: lang === 'ID' ? 'Volume Pasien / Bulan' : 'Monthly Patient Volume',
    goals: lang === 'ID' ? 'Pesan / Goals Bisnis' : 'Message / Business Goals',
    cta: lang === 'ID' ? 'Request Strategic Consultation' : 'Request Strategic Consultation'
  };

  return (
    <div className="bg-esthirae-bg min-h-screen py-24 px-6 lg:py-32 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="animate-fade-up">
          <h1 className="text-5xl lg:text-7xl font-serif text-esthirae-text mb-10 leading-[1.1] italic font-bold">
            {lang === 'ID' ? 'Diskusikan Rencana Pertumbuhan Klinik Anda.' : 'Let’s Discuss Your Clinic’s Growth.'}
          </h1>
          <p className="text-esthirae-muted text-xl font-light leading-relaxed mb-16 max-w-lg">
            {lang === 'ID' 
              ? 'Ngobrol dengan tim kami dan cari tahu gimana Esthirae bisa bantu operasional klinik Anda jadi lebih presisi dan makin premium.'
              : 'Connect with our team to discover how Esthirae can redefine your operational precision and elevate your patient’s luxury journey.'}
          </p>
          
          <div className="space-y-12">
            <div className="flex items-center space-x-8 group">
              <div className="w-16 h-16 rounded-full border border-esthirae-accent flex items-center justify-center text-esthirae-accent transition-all duration-500 group-hover:bg-esthirae-accent group-hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-1 italic font-bold">{lang === 'ID' ? 'Hubungi Kami' : 'Direct Inquiry'}</h4>
                <a href="mailto:hello@esthirae.com" className="text-esthirae-muted font-light tracking-wide text-sm hover:text-esthirae-accent transition-colors">hello@esthirae.com</a>
              </div>
            </div>
            <div className="flex items-center space-x-8 group">
              <div className="w-16 h-16 rounded-full border border-esthirae-accent flex items-center justify-center text-esthirae-accent transition-all duration-500 group-hover:bg-esthirae-accent group-hover:text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-1 italic font-bold">WhatsApp / Phone</h4>
                <a href="https://wa.me/628980966611?text=Halo%20Esthirae%2C%20saya%20ingin%20tahu%20lebih%20lanjut" target="_blank" rel="noopener noreferrer" className="text-esthirae-muted font-light tracking-wide text-sm hover:text-esthirae-accent transition-colors">+62 898-0966-611</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-esthirae-border rounded-4xl p-10 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] animate-fade-up [animation-delay:200ms]">
          {submitted ? (
            <div className="text-center py-20 animate-fade-up">
              <h3 className="text-4xl font-serif mb-6 text-esthirae-text italic font-bold">{lang === 'ID' ? 'Terima kasih atas minat Anda' : 'Consultation Request Received'}</h3>
              <p className="text-esthirae-muted font-light text-base mb-10 leading-relaxed">
                {lang === 'ID' 
                  ? 'Tim konsultan Esthirae bakal hubungi Anda dalam 1 hari kerja buat diskusiin transformasi digital klinik Anda.'
                  : 'A specialized Esthirae consultant will connect with you within one business day to discuss your clinic\'s digital transformation.'}
              </p>
              <button onClick={() => setSubmitted(false)} className="text-esthirae-accent hover:text-esthirae-text text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">{lang === 'ID' ? 'Kirim Inquiry Lain' : 'Submit Another Request'}</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.clinic}</label>
                  <input required name="clinic_name" value={formData.clinic_name} onChange={handleChange} type="text" className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light" placeholder="e.g. Luminique Aesthetic" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.owner}</label>
                  <input required name="owner_name" value={formData.owner_name} onChange={handleChange} type="text" className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light" placeholder="Dr. Adeline Smith" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.email}</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light" placeholder="owner@clinic.com" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.phone}</label>
                  <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light" placeholder="+62 ..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.location}</label>
                  <input required name="location" value={formData.location} onChange={handleChange} type="text" className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light" placeholder="e.g. Jakarta Selatan" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.volume}</label>
                  <select required name="monthly_patient_volume" value={formData.monthly_patient_volume} onChange={handleChange} className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-3.5 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light">
                    <option value="">{lang === 'ID' ? 'Pilih Volume' : 'Select Volume'}</option>
                    <option value="< 100">{'< 100'}</option>
                    <option value="100 - 300">100 - 300</option>
                    <option value="300 - 600">300 - 600</option>
                    <option value="> 600">{'> 600'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.2em] text-esthirae-muted font-bold mb-2">{labels.goals}</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} className="w-full bg-esthirae-bg border border-esthirae-border rounded-2xl px-5 py-4 focus:outline-none focus:border-esthirae-accent transition-all text-xs font-light min-h-[120px] resize-none" placeholder={lang === 'ID' ? 'Apa target utama klinik Anda dalam 12 bulan ke depan?' : 'How can we help optimize your clinic\'s performance?'}></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-esthirae-text text-white py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-esthirae-accent transition-all duration-500 shadow-2xl flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (lang === 'ID' ? 'Sedang Memproses...' : 'Processing Request...') : labels.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;