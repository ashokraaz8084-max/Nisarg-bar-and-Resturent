import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MapPin, Clock, Calendar, ChevronRight, Menu, X, 
  Activity, Heart, Brain, Leaf, Droplets, Sun, Wind, 
  ShieldCheck, Award, Users, Star, ArrowRight, MessageCircle,
  Moon, Sun as SunIcon, Stethoscope, ChevronDown, CheckCircle2
} from 'lucide-react';

// --- CONFIGURATION & DATA ---
const CLINIC_INFO = {
  name: "Dr. Patil Homeopathy Clinic",
  shortName: "Dr. Patil's Clinic",
  phone: "+91 98330 41468",
  whatsapp: "919833041468",
  address: "2RFX+6WF Dr. Talwalkar Poly Clinic, opposite Ruia College, Mumbai, Maharashtra",
  email: "care@drpatilclinic.com",
  timings: "Mon - Sat: 10:00 AM - 8:00 PM"
};

const IMAGES = {
  logo: "https://www.image2url.com/r2/default/images/1778727089202-d9599629-92c6-46f3-8c97-7116626b5676.jpg",
  hero: "https://www.image2url.com/r2/default/images/1778727395405-edb13cda-d5ae-455c-8e1d-d26aca764e1f.jpg",
  about: "https://www.image2url.com/r2/default/images/1778727338239-b0c7f104-42bb-4947-83c9-5f9709cd786f.jpg",
  gallery: [
    "https://www.image2url.com/r2/default/images/1778727276125-d9c71be2-fdd2-4474-8647-f2cfcdea5397.jpg",
    "https://www.image2url.com/r2/default/images/1778727205538-f395e33d-feef-407e-834e-bb6ed998930e.jpg",
    "https://www.image2url.com/r2/default/images/1778727089202-d9599629-92c6-46f3-8c97-7116626b5676.jpg",
    "https://www.image2url.com/r2/default/images/1778727144396-6629324b-62fa-457b-9f4f-a7c61b81d61b.jpg",
    "https://www.image2url.com/r2/default/images/1778727338239-b0c7f104-42bb-4947-83c9-5f9709cd786f.jpg",
    "https://www.image2url.com/r2/default/images/1778727395405-edb13cda-d5ae-455c-8e1d-d26aca764e1f.jpg"
  ]
};



const TREATMENTS = [
  { id: 1, title: 'Skin & Hair', icon: Sun, desc: 'Acne, Eczema, Psoriasis, Hair Fall, Alopecia' },
  { id: 2, title: 'Respiratory & Allergies', icon: Wind, desc: 'Asthma, Bronchitis, Allergic Rhinitis, Sinusitis' },
  { id: 3, title: 'Women\'s Health', icon: Heart, desc: 'PCOS, Menstrual Issues, Menopause, Thyroid' },
  { id: 4, title: 'Digestive Disorders', icon: Droplets, desc: 'IBS, Acidity, Gastritis, Constipation' },
  { id: 5, title: 'Stress & Anxiety', icon: Brain, desc: 'Depression, Insomnia, Migraines, Tension' },
  { id: 6, title: 'Child Care', icon: Activity, desc: 'Immunity boosting, Teething issues, ADHD' },
];

const FAQS = [
  { q: "Is homeopathic treatment safe?", a: "Yes, homeopathic medicines are highly diluted, natural, and completely safe for people of all ages, including infants and pregnant women, with zero side effects." },
  { q: "How long does the treatment take?", a: "The duration varies depending on whether the condition is acute or chronic. Acute problems like colds can resolve in days, while chronic issues like PCOS or Psoriasis may take a few months of consistent care." },
  { q: "Do I need to avoid certain foods?", a: "Generally, we advise avoiding strong-smelling substances like raw onion, garlic, or coffee 15 minutes before and after taking the medicine, as it can interfere with absorption." },
  { q: "Can I take homeopathy with allopathic medicines?", a: "Yes. In most cases, homeopathic remedies can be taken safely alongside conventional treatments. However, always inform the doctor about all medications you are currently taking." }
];

// --- CUSTOM HOOKS ---

// Intersection Observer Hook for smooth scroll animations
const useScrollReveal = (options = { threshold: 0.1, triggerOnce: true }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && ref.current) observer.unobserve(ref.current);
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options.threshold, options.triggerOnce]);

  return [ref, isVisible];
};

// --- COMPONENTS ---

const SectionHeading = ({ subtitle, title, centered = false }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div ref={ref} className={`mb-12 ${centered ? 'text-center' : ''} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
        {subtitle}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <div className={`h-1.5 w-20 bg-gradient-to-r from-orange-500 to-green-500 mt-6 rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', href, onClick }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/30",
    secondary: "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-green-500/30",
    outline: "border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
  };

  const Component = href ? 'a' : 'button';
  return (
    <Component 
      href={href} 
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

// --- MAIN APP ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleWhatsAppClick = (message = "Hello Dr. Patil, I would like to book an appointment.") => {
    const url = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const [heroRef, heroVisible] = useScrollReveal();
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${darkMode ? 'dark bg-gray-950' : 'bg-slate-50'}`}>
      
      {/* GLOBAL STYLES & ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .dark .glass-panel {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}} />

      {/* --- TOP BAR --- */}
      <div className="hidden md:flex justify-between items-center py-2 px-8 bg-gray-900 text-gray-300 text-sm z-50 relative">
        <div className="flex items-center space-x-6">
          <span className="flex items-center"><MapPin size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.address}</span>
          <span className="flex items-center"><Clock size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.timings}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center font-semibold text-white"><Phone size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.phone}</span>
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'glass-panel shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/20 transition-transform group-hover:scale-105">
              <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover bg-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled || mobileMenuOpen || darkMode ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white md:text-white'}`}>
                Dr. Patil's
              </span>
              <span className={`text-xs font-semibold tracking-widest uppercase transition-colors ${isScrolled || mobileMenuOpen || darkMode ? 'text-orange-500' : 'text-orange-500 md:text-orange-300'}`}>
                Homeopathic Clinic
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {['Home', 'About', 'Treatments', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`font-medium text-sm tracking-wide transition-colors hover:text-orange-500 ${
                  isScrolled || darkMode ? 'text-gray-800 dark:text-gray-200' : 'text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-colors ${isScrolled || darkMode ? 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}>
              {darkMode ? <SunIcon size={20} /> : <Moon size={20} />}
            </button>
            <Button onClick={() => document.getElementById('book').scrollIntoView()} variant={isScrolled || darkMode ? 'primary' : 'glass'} className="px-6 py-2.5 text-sm">
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleDarkMode} className={`p-2 ${isScrolled || mobileMenuOpen || darkMode ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              {darkMode ? <SunIcon size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled || mobileMenuOpen || darkMode ? 'text-gray-900 dark:text-white' : 'text-gray-900 md:text-white'}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full glass-panel border-t border-gray-200 dark:border-gray-800 py-6 px-4 flex flex-col space-y-4 shadow-xl">
            {['Home', 'About', 'Treatments', 'Gallery', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-900 dark:text-white py-2 border-b border-gray-100 dark:border-gray-800"
              >
                {item}
              </a>
            ))}
            <Button onClick={() => { setMobileMenuOpen(false); document.getElementById('book').scrollIntoView(); }} variant="primary" className="w-full mt-4">
              Book Appointment
            </Button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.hero} alt="Clinic Interior" className="w-full h-full object-cover object-center transform scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent dark:from-gray-950 dark:via-gray-900/90 dark:to-gray-900/50"></div>
        </div>

        {/* Animated Blobs (Subtle Luxury 3D feel via CSS) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative z-10 pt-24 md:pt-0">
          <div ref={heroRef} className={`max-w-3xl transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel mb-6 border border-white/20">
              <ShieldCheck size={18} className="text-green-400 mr-2" />
              <span className="text-sm font-medium text-white tracking-wide">Trusted Homeopathic Care in Mumbai</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Holistic Healing <br />
              With <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-gradient">Advanced</span> Homeopathy.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-light leading-relaxed">
              Experience the power of natural, side-effect-free healing tailored to your unique constitution. Expert care for you and your family's long-term wellness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => document.getElementById('book').scrollIntoView()} variant="primary" className="text-lg px-8">
                Book Appointment <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button onClick={() => handleWhatsAppClick()} variant="glass" className="text-lg px-8 bg-green-500/20 hover:bg-green-500/40 border-green-400/30">
                <MessageCircle className="mr-2" size={20} /> WhatsApp Consult
              </Button>
            </div>

            {/* Quick Stats Banner under hero */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { label: 'Happy Patients', value: '15,000+' },
                { label: 'Years Experience', value: '20+' },
                { label: 'Natural Remedies', value: '100%' },
                { label: 'Google Rating', value: '4.9/5' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT DOCTOR SECTION --- */}
      <section id="about" className="py-24 relative bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div ref={aboutRef} className={`w-full lg:w-1/2 relative transition-all duration-1000 transform ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={IMAGES.about} alt="Dr. Patil" className="w-full h-auto object-cover aspect-[4/5]" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="glass-panel rounded-2xl p-6 border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-1">Dr. Patil</h3>
                    <p className="text-orange-400 font-medium mb-3">BHMS, MD (Homeopathy)</p>
                    <p className="text-gray-200 text-sm">Dedicated to resolving the root cause of illness through classical homeopathic principles and modern diagnostics.</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 dark:bg-orange-900/30 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-green-100 dark:bg-green-900/30 rounded-full -z-10"></div>
            </div>

            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 transform ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <SectionHeading subtitle="About The Doctor" title="Healing from within, naturally." />
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                With over two decades of clinical experience, Dr. Patil brings a deeply personalized approach to homeopathy. We don't just treat symptoms; we understand your entire physiological and psychological makeup to stimulate your body's innate healing mechanisms.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                Our clinic seamlessly blends traditional homeopathic wisdom with a modern, evidence-based approach, providing a safe haven for patients seeking long-term relief from chronic and acute ailments without the burden of side effects.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Detailed Case Taking & Constitutional Analysis",
                  "Highest Quality German Homeopathic Medicines",
                  "Holistic Lifestyle & Diet Counseling",
                  "Continuous Monitoring & Support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 dark:text-gray-200">
                    <CheckCircle2 className="text-green-500 mr-3 flex-shrink-0" size={24} />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                 <img src={IMAGES.logo} alt="Clinic Logo" className="w-16 h-16 rounded-full shadow-md" />
                 <div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Founder & Chief Consultant</p>
                   <p className="text-xl font-bold text-gray-900 dark:text-white">DR. PATIL HOMEOPATHY CLINIC</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TREATMENTS SECTION --- */}
      <section id="treatments" className="py-24 bg-slate-50 dark:bg-gray-950 relative">
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading subtitle="Our Expertise" title="Advanced Treatment Areas" centered={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {TREATMENTS.map((treatment, index) => {
              const [cardRef, cardVisible] = useScrollReveal({ threshold: 0.1 });
              const Icon = treatment.icon;
              return (
                <div 
                  key={treatment.id} 
                  ref={cardRef}
                  className={`bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 group cursor-pointer ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="text-orange-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">{treatment.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {treatment.desc}
                  </p>
                  <button className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400 group-hover:text-orange-500 transition-colors">
                    Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
             <Button onClick={() => handleWhatsAppClick("Hi, I want to know if my condition can be treated with homeopathy.")} variant="outline" className="px-10">
               Discuss Your Condition
             </Button>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <SectionHeading subtitle="Why Choose Us" title="The Gold Standard in Homeopathic Care." />
              <div className="space-y-8 mt-10">
                {[
                  { icon: Leaf, title: '100% Natural & Safe', desc: 'Our remedies are derived from natural sources, ensuring no toxic side effects or chemical dependency.' },
                  { icon: Target, title: 'Personalized Treatment', desc: 'No generic prescriptions. Medicines are selected based on your unique physical, emotional, and genetic profile.' },
                  { icon: ShieldCheck, title: 'Immunity Boosting', desc: 'Homeopathy doesn\'t just suppress symptoms; it strengthens your body\'s internal defense mechanism.' },
                  { icon: Heart, title: 'Compassionate Care', desc: 'We take the time to listen, understand, and guide you through every step of your healing journey.' }
                ].map((item, idx) => {
                  const [itemRef, itemVisible] = useScrollReveal();
                  const Icon = item.icon;
                  return (
                    <div ref={itemRef} key={idx} className={`flex transition-all duration-700 ${itemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center border border-green-100 dark:border-green-500/20">
                          <Icon className="text-green-600 dark:text-green-400" size={24} />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src={IMAGES.gallery[0]} alt="Clinic Treatment" className="rounded-3xl w-full h-64 object-cover mt-12 shadow-2xl" />
                  <img src={IMAGES.gallery[1]} alt="Modern Diagnostics" className="rounded-3xl w-full h-64 object-cover shadow-2xl" />
               </div>
               {/* Floating Badge */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-panel p-6 rounded-2xl text-center shadow-2xl animate-blob">
                 <Award className="text-orange-500 mx-auto mb-2" size={40} />
                 <p className="font-bold text-gray-900 dark:text-white text-xl">Top Rated</p>
                 <p className="text-sm text-gray-600 dark:text-gray-300">Clinic in Mumbai</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Clinic Tour" title="Premium Healing Environment" centered={true} />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
            {IMAGES.gallery.map((img, index) => {
              const [imgRef, imgVisible] = useScrollReveal();
              return (
                <div 
                  key={index} 
                  ref={imgRef}
                  className={`relative group rounded-2xl md:rounded-3xl overflow-hidden aspect-square transition-all duration-700 ${imgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img src={img} alt={`Clinic facility ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Activity size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- APPOINTMENT SECTION --- */}
      <section id="book" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-900">
           <img src={IMAGES.hero} alt="Background" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto glass-panel rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border-white/10">
            
            {/* Form Side */}
            <div className="w-full md:w-3/5 p-8 md:p-12 bg-white dark:bg-gray-900">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Book a Consultation</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Take the first step towards holistic healing today.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const msg = `New Appointment Request:\nName: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nDate: ${formData.get('date')}\nConcern: ${formData.get('concern')}`;
                handleWhatsAppClick(msg);
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
                    <input required name="date" type="date" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                    <select name="department" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white">
                      <option>General Consultation</option>
                      <option>Skin & Hair</option>
                      <option>Respiratory</option>
                      <option>Child Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Concern (Optional)</label>
                  <textarea name="concern" rows="3" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all dark:text-white resize-none" placeholder="Briefly describe your symptoms..."></textarea>
                </div>

                <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                  Confirm Booking Request
                </Button>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  By clicking submit, your request will be securely sent via WhatsApp to our front desk.
                </p>
              </form>
            </div>

            {/* Info Side */}
            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-green-700/90 backdrop-blur-sm z-0"></div>
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 text-orange-300 flex-shrink-0" />
                    <p className="text-gray-100">{CLINIC_INFO.address}</p>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 text-orange-300 flex-shrink-0" />
                    <p className="text-gray-100">{CLINIC_INFO.phone}</p>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-4 text-orange-300 flex-shrink-0" />
                    <p className="text-gray-100">{CLINIC_INFO.timings}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 glass-panel p-6 rounded-2xl border-white/20">
                <h4 className="font-bold text-lg mb-2">Emergency Consultation?</h4>
                <p className="text-sm text-gray-200 mb-4">For immediate assistance, reach out directly on our dedicated WhatsApp line.</p>
                <button onClick={() => handleWhatsAppClick("EMERGENCY: Need immediate assistance.")} className="w-full py-3 bg-white text-green-600 rounded-xl font-bold flex justify-center items-center hover:bg-green-50 transition-colors">
                  <MessageCircle className="mr-2" /> Chat Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading subtitle="Patient Queries" title="Frequently Asked Questions" centered={true} />
          
          <div className="space-y-4 mt-12">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform duration-300 text-orange-500 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <div className="p-6 pt-0 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LOCATION & MAP --- */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Visit Us" title="Find Our Clinic" centered={true} />
          
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] mt-12 relative border border-gray-200 dark:border-gray-800">
            {/* Google Maps Embed - using a generic query based on address for iframe */}
            <iframe 
              title="Clinic Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.name + " " + CLINIC_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="filter dark:invert-[0.9] dark:hue-rotate-180 transition-all duration-500"
            ></iframe>
            
            {/* Floating Card over Map */}
            <div className="absolute top-8 left-8 glass-panel p-6 rounded-2xl shadow-xl max-w-sm border-white/20 hidden md:block">
              <div className="flex items-center mb-4">
                 <img src={IMAGES.logo} alt="Logo" className="w-12 h-12 rounded-lg bg-white mr-4 shadow-sm" />
                 <div>
                   <h4 className="font-bold text-gray-900 dark:text-white">{CLINIC_INFO.shortName}</h4>
                   <div className="flex items-center text-yellow-500 text-sm">
                     <Star size={14} className="fill-current"/>
                     <Star size={14} className="fill-current"/>
                     <Star size={14} className="fill-current"/>
                     <Star size={14} className="fill-current"/>
                     <Star size={14} className="fill-current"/>
                     <span className="text-gray-500 dark:text-gray-400 ml-2">(4.9/5 on Google)</span>
                   </div>
                 </div>
              </div>
              <Button onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(CLINIC_INFO.name + " " + CLINIC_INFO.address)}`, '_blank')} variant="primary" className="w-full py-2.5 text-sm">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-950 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg p-1">
                  <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-lg font-bold">Dr. Patil's</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Premium homeopathic care combining traditional wisdom with modern diagnostics for complete, side-effect-free healing.
              </p>
              <div className="flex space-x-4">
                {/* Social Placeholders */}
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500 transition-colors">TW</a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Dr. Patil', 'Treatments', 'Patient Reviews', 'Contact Us'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Treatments</h4>
              <ul className="space-y-3">
                {['PCOS & Thyroid', 'Skin & Allergies', 'Hair Fall Solutions', 'Child Immunity', 'Migraine & Stress'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors flex items-center">
                      <ChevronRight size={14} className="mr-1" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start text-sm text-gray-400">
                  <MapPin size={18} className="mr-3 text-orange-500 flex-shrink-0 mt-0.5" />
                  {CLINIC_INFO.address}
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Phone size={18} className="mr-3 text-orange-500 flex-shrink-0" />
                  {CLINIC_INFO.phone}
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <Clock size={18} className="mr-3 text-orange-500 flex-shrink-0" />
                  {CLINIC_INFO.timings}
                </li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Dr. Patil Homeopathy Clinic. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <button 
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Chat with us
        </span>
      </button>

    </div>
  );
}

// Target icon missing from lucide import above, defining here as a simple SVG wrapper
const Target = ({ className, size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);