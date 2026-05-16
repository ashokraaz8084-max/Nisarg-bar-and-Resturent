import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MapPin, Clock, Calendar, ChevronRight, Menu, X, 
  Activity, Heart, Brain, Leaf, Droplets, Sun, Wind, 
  ShieldCheck, Award, Users, Star, ArrowRight, MessageCircle,
  Moon, Sun as SunIcon, Stethoscope, ChevronDown, CheckCircle2,
  Target, Mail, Instagram, Facebook, Twitter
} from 'lucide-react';

// --- CONFIGURATION & DATA ---
const CLINIC_INFO = {
  name: "Dr. Patil Homeopathy Clinic",
  shortName: "Dr. Patil's Clinic",
  phone: "+91 98330 41468",
  whatsapp: "919833041468",
  address: "2RFX+6WF Dr. Talwalkar Poly Clinic, Mumbai, Maharashtra",
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

const REVIEWS = [
  { id: 1, name: "Priya Sharma", role: "Patient", text: "Dr. Patil's treatment for my chronic migraines was life-changing. After years of suffering, I finally found relief through his personalized homeopathic approach. Highly recommended!", rating: 5 },
  { id: 2, name: "Rahul Verma", role: "Patient", text: "I visited for severe skin allergies. The natural remedies provided clear results within a few months without any side effects. The clinic is very professional and welcoming.", rating: 5 },
  { id: 3, name: "Anita Desai", role: "Patient", text: "Excellent experience. Dr. Patil is very patient and listens carefully to all concerns. The immunity-boosting treatment for my son has worked wonders.", rating: 5 }
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
    <div ref={ref} className={`mb-12 lg:mb-16 ${centered ? 'text-center flex flex-col items-center' : ''} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
        {subtitle}
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white tracking-tight leading-tight max-w-4xl">
        {title}
      </h2>
      <div className={`h-[2px] w-24 bg-gradient-to-r from-orange-500 to-green-500 mt-8 ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};

const Button = ({ children, variant = 'primary', className = '', href, onClick, type = "button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-3.5 lg:px-10 lg:py-4 rounded-full text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-500 transform hover:-translate-y-1 cursor-pointer overflow-hidden relative group";
  
  const variants = {
    primary: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:shadow-2xl hover:shadow-gray-900/30 dark:hover:shadow-white/30",
    secondary: "bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-xl shadow-green-900/20 hover:shadow-2xl hover:shadow-green-600/40",
    outline: "border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-800",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-xl hover:shadow-white/10"
  };

  const Component = href ? 'a' : 'button';
  return (
    <Component 
      href={href} 
      onClick={onClick}
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center">{children}</span>
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

  // Scroll Observers correctly defined at the top level
  const [heroRef, heroVisible] = useScrollReveal();
  const [aboutRef, aboutVisible] = useScrollReveal();
  const [treatmentsRef, treatmentsVisible] = useScrollReveal({ threshold: 0.1 });
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [galleryRef, galleryVisible] = useScrollReveal();
  const [reviewsRef, reviewsVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-orange-500/30 transition-colors duration-700 ${darkMode ? 'dark bg-[#0a0a0a]' : 'bg-[#f8f9fa]'}`}>
      
      {/* GLOBAL STYLES & ANIMATIONS FOR LUXURY FEEL */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .dark .glass-panel {
          background: rgba(20, 20, 20, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cinematic-zoom {
          animation: slowZoom 30s infinite alternate linear;
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: currentColor;
          transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .nav-link:hover::after { width: 100%; }
        /* Minimalist Input Styles */
        .luxury-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(156, 163, 175, 0.5);
          border-radius: 0;
          padding: 1rem 0;
          transition: all 0.3s ease;
        }
        .dark .luxury-input { border-bottom-color: rgba(255,255,255,0.2); }
        .luxury-input:focus {
          outline: none;
          box-shadow: none;
          border-bottom-color: #f97316; /* Orange 500 */
        }
      `}} />

      {/* --- HEADER (Navbar + Top Bar) --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'}`}>
        
        {/* --- TOP BAR (Desktop Only) - Auto hides on scroll --- */}
        <div className={`hidden lg:flex justify-between items-center px-12 text-xs tracking-widest uppercase transition-all duration-500 overflow-hidden ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 py-3 border-b border-white/10 text-gray-300'}`}>
          <div className="flex items-center space-x-8">
            <span className="flex items-center hover:text-white transition-colors"><MapPin size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.address}</span>
            <span className="flex items-center hover:text-white transition-colors"><Clock size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.timings}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-white"><Phone size={14} className="mr-2 text-orange-500"/> {CLINIC_INFO.phone}</span>
          </div>
        </div>

        {/* --- MAIN NAVBAR --- */}
        <nav className="transition-all duration-500">
          <div className={`container mx-auto px-4 lg:px-12 max-w-[100rem] flex justify-between items-center transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
            {/* Logo */}
            <a href="#" className="flex items-center space-x-4 group">
              <div className={`rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 ${isScrolled ? 'w-10 h-10 lg:w-12 lg:h-12' : 'w-12 h-12 lg:w-14 lg:h-14'}`}>
                <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover bg-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl lg:text-2xl font-light tracking-tight transition-colors duration-500 ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                  Dr. Patil's
                </span>
                <span className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isScrolled ? 'text-orange-600 dark:text-orange-400' : 'text-orange-400'}`}>
                  Homeopathic Clinic
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {['Home', 'About', 'Treatments', 'Gallery', 'Reviews'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link relative text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                    isScrolled ? 'text-gray-700 hover:text-orange-500 dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all duration-500 hover:scale-110 ${isScrolled ? 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-white' : 'text-white hover:text-orange-400'}`}>
                {darkMode ? <SunIcon size={20} /> : <Moon size={20} />}
              </button>
              <Button onClick={() => document.getElementById('book').scrollIntoView()} variant={isScrolled ? 'primary' : 'glass'} className={isScrolled ? "px-6 py-2.5 text-xs" : "px-8 py-3.5"}>
                Book Appointment
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-4">
              <button onClick={toggleDarkMode} className={`p-2 transition-colors ${isScrolled || mobileMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                {darkMode ? <SunIcon size={22} /> : <Moon size={22} />}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors ${isScrolled || mobileMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              >
                {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 py-8 px-6 flex flex-col space-y-6 shadow-2xl min-h-[50vh]">
            {['Home', 'About', 'Treatments', 'Gallery', 'Reviews'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-light text-gray-900 dark:text-white pb-4 border-b border-gray-200/50 dark:border-gray-800/50 tracking-wide"
              >
                {item}
              </a>
            ))}
            <Button onClick={() => { setMobileMenuOpen(false); document.getElementById('book').scrollIntoView(); }} variant="primary" className="w-full mt-6 py-5">
              Book Appointment
            </Button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 bg-black">
          <img src={IMAGES.hero} alt="Clinic Interior" className="w-full h-full object-cover object-center cinematic-zoom opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 dark:from-black dark:via-black/80 dark:to-black/40"></div>
        </div>

        {/* Subtle Luxury Light Leaks */}
        <div className="absolute top-0 -left-1/4 w-[50vw] h-[50vw] bg-orange-600/20 rounded-full filter blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-emerald-600/20 rounded-full filter blur-[100px] mix-blend-screen pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-12 max-w-[100rem] relative z-10 pt-40 lg:pt-48 pb-20 flex flex-col justify-center h-full">
          <div ref={heroRef} className={`max-w-4xl transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            
            <div className="inline-flex items-center px-5 py-2.5 rounded-full glass-panel mb-8 lg:mb-10 shadow-2xl shadow-black/50">
              <ShieldCheck size={16} className="text-green-400 mr-3" />
              <span className="text-xs lg:text-sm font-bold text-white tracking-[0.15em] uppercase">Trusted Homeopathic Care</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[6.5rem] font-extralight text-white leading-[1.05] mb-8 tracking-tighter">
              Holistic Healing <br />
              <span className="font-light italic bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 text-gradient">Refined</span> Naturally.
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed lg:leading-loose">
              Experience the absolute pinnacle of natural healing. Bespoke, side-effect-free treatments tailored exclusively to your unique constitution for enduring wellness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button onClick={() => document.getElementById('book').scrollIntoView()} variant="primary" className="lg:w-auto w-full">
                Book Consultation <ArrowRight className="ml-3" size={18} />
              </Button>
              <Button onClick={() => handleWhatsAppClick()} variant="glass" className="lg:w-auto w-full group">
                <MessageCircle className="mr-3 text-green-400 group-hover:text-green-300 transition-colors" size={18} /> WhatsApp Connect
              </Button>
            </div>

            <div className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16 pt-10 border-t border-white/10">
              {[
                { label: 'Happy Patients', value: '15,000+' },
                { label: 'Years Experience', value: '20+' },
                { label: 'Natural Remedies', value: '100%' },
                { label: 'Google Rating', value: '4.9/5' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col group cursor-default">
                  <span className="text-3xl lg:text-4xl font-light text-white mb-2 group-hover:text-orange-400 transition-colors duration-500">{stat.value}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT DOCTOR SECTION --- */}
      <section id="about" className="py-24 lg:py-32 relative z-10 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 lg:px-12 max-w-[90rem]">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16 lg:gap-24 xl:gap-32">
            
            <div ref={aboutRef} className={`w-full lg:w-5/12 relative transition-all duration-1000 transform ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              <div className="relative z-10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-900/20 dark:shadow-black/50 aspect-[3/4] lg:aspect-auto lg:h-full">
                <img src={IMAGES.about} alt="Dr. Patil" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <div className="glass-panel rounded-3xl p-6 lg:p-8">
                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-2">Dr. Patil</h3>
                    <p className="text-orange-400 text-sm lg:text-xs font-bold uppercase tracking-widest mb-4">BHMS, MD (Homeopathy)</p>
                    <p className="text-gray-300 text-sm lg:text-base font-light leading-relaxed">Dedicated to resolving the root cause of illness through classical homeopathic principles and state-of-the-art diagnostics.</p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block absolute top-10 -right-10 bottom-10 -left-10 border border-gray-200 dark:border-gray-800 rounded-[3rem] -z-10 pointer-events-none"></div>
            </div>

            <div className={`w-full lg:w-7/12 flex flex-col justify-center transition-all duration-1000 delay-300 transform ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
              <SectionHeading subtitle="The Philosophy" title="True healing begins from within." />
              <div className="prose prose-lg lg:prose-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-12">
                <p>
                  With over two decades of clinical mastery, Dr. Patil brings a deeply personalized, highly attentive approach to homeopathy. We believe in treating the individual, not just the diagnosis.
                </p>
                <p className="mt-6">
                  Our practice seamlessly marries traditional homeopathic wisdom with modern, evidence-based methodologies. This creates a sophisticated healing environment designed for those seeking enduring relief from complex conditions, entirely free from the burden of conventional side effects.
                </p>
              </div>
              
              <div className="space-y-6 lg:space-y-8 mb-12 lg:mb-16">
                {[
                  "Detailed Case Taking & Constitutional Analysis",
                  "Highest Quality German Homeopathic Medicines",
                  "Holistic Lifestyle & Diet Counseling",
                  "Continuous Monitoring & Support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center text-gray-800 dark:text-gray-200 group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center mr-5 border border-gray-100 dark:border-gray-800 group-hover:border-orange-500 transition-colors duration-500 flex-shrink-0">
                      <CheckCircle2 className="text-orange-500" size={20} />
                    </div>
                    <span className="font-light text-lg lg:text-xl tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                 <img src={IMAGES.logo} alt="Clinic Logo" className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl shadow-xl object-cover" />
                 <div>
                   <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Founder & Chief Consultant</p>
                   <p className="text-lg lg:text-2xl font-light text-gray-900 dark:text-white tracking-wide">DR. PATIL HOMEOPATHY</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TREATMENTS SECTION --- */}
      <section id="treatments" className="py-24 lg:py-32 bg-[#f8f9fa] dark:bg-[#0a0a0a] relative border-t border-gray-200/50 dark:border-gray-900">
        <div className="container mx-auto px-4 lg:px-12 max-w-[100rem] relative z-10">
          <SectionHeading subtitle="Areas of Expertise" title="Advanced Treatment Protocols" centered={true} />
          
          <div ref={treatmentsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 xl:gap-12 mt-16 lg:mt-20">
            {TREATMENTS.map((treatment, index) => {
              const Icon = treatment.icon;
              return (
                <div 
                  key={treatment.id} 
                  className={`bg-white dark:bg-[#111] rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 group cursor-pointer ${treatmentsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gray-50 dark:bg-black flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800 group-hover:border-orange-500/30 transition-all duration-500">
                    <Icon className="text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-500" size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors duration-500 tracking-tight">{treatment.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8 text-base">
                    {treatment.desc}
                  </p>
                  <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 mb-6 group-hover:w-16 group-hover:bg-orange-500 transition-all duration-500"></div>
                  <button className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-500">
                    Explore Protocol <ChevronRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-20 lg:mt-24 text-center">
             <Button onClick={() => handleWhatsAppClick("Hi, I want to know if my condition can be treated with homeopathy.")} variant="outline">
               Discuss Your Condition Privately
             </Button>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 lg:py-32 bg-white dark:bg-[#050505] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 max-w-[90rem]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="w-full lg:w-1/2">
              <SectionHeading subtitle="The Standard" title="Uncompromising Quality & Care." />
              <div ref={featuresRef} className="space-y-10 lg:space-y-12 mt-12 lg:mt-16">
                {[
                  { icon: Leaf, title: '100% Natural & Safe', desc: 'Our remedies are derived from the purest natural sources, ensuring zero toxic side effects or chemical dependency.' },
                  { icon: Target, title: 'Bespoke Treatments', desc: 'Medicine selected exclusively based on your unique physical, emotional, and genetic profile.' },
                  { icon: ShieldCheck, title: 'Immunity Fortification', desc: 'We do not suppress symptoms; we fundamentally strengthen your body\'s internal defense mechanisms.' },
                  { icon: Heart, title: 'Compassionate Journey', desc: 'We dedicate extensive time to listen, comprehend, and guide you through every nuance of your healing.' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`flex group transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: `${idx * 150}ms` }}>
                      <div className="flex-shrink-0 mt-1">
                        <Icon className="text-gray-300 dark:text-gray-700 group-hover:text-orange-500 transition-colors duration-500" size={32} strokeWidth={1} />
                      </div>
                      <div className="ml-6 lg:ml-8">
                        <h4 className="text-xl lg:text-2xl font-light text-gray-900 dark:text-white mb-2 tracking-wide">{item.title}</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-base lg:text-lg">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative h-full">
               <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  <img src={IMAGES.gallery[0]} alt="Clinic Treatment" className="rounded-[2rem] lg:rounded-[3rem] w-full h-64 lg:h-80 object-cover mt-12 lg:mt-16 shadow-2xl transition-transform duration-1000 hover:scale-[1.02]" />
                  <img src={IMAGES.gallery[1]} alt="Modern Diagnostics" className="rounded-[2rem] lg:rounded-[3rem] w-full h-64 lg:h-80 object-cover shadow-2xl transition-transform duration-1000 hover:scale-[1.02]" />
               </div>
               {/* Floating Luxury Badge */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-panel p-8 lg:p-10 rounded-full aspect-square flex flex-col items-center justify-center text-center shadow-2xl animate-float">
                 <Award className="text-orange-500 mb-2 lg:mb-3" size={40} strokeWidth={1} />
                 <p className="font-light text-white text-lg lg:text-xl tracking-widest uppercase">Premium</p>
                 <p className="text-[0.65rem] text-gray-300 font-bold uppercase tracking-[0.2em] mt-1">Care Clinic</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 lg:py-32 bg-[#f8f9fa] dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 lg:px-12 max-w-[100rem]">
          <SectionHeading subtitle="The Environment" title="A Space Designed for Healing" centered={true} />
          
          <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-16 lg:mt-20">
            {IMAGES.gallery.map((img, index) => (
              <div 
                key={index} 
                className={`relative group rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[4/5] lg:aspect-square transition-all duration-1000 ${galleryVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img src={img} alt={`Clinic facility ${index + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <Activity size={24} strokeWidth={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" className="py-24 lg:py-32 bg-white dark:bg-[#050505] border-y border-gray-100 dark:border-gray-900">
        <div className="container mx-auto px-4 lg:px-12 max-w-[100rem]">
          <SectionHeading subtitle="Patient Stories" title="Words of Appreciation" centered={true} />

          <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-16 lg:mt-20">
            {REVIEWS.map((review, index) => (
              <div
                key={review.id}
                className={`bg-gray-50 dark:bg-[#111] p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] border border-gray-200/50 dark:border-gray-800 transition-all duration-1000 hover:-translate-y-2 hover:shadow-xl hover:bg-white dark:hover:bg-[#151515] group ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex space-x-2 mb-8 lg:mb-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-orange-400 fill-orange-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-10 lg:mb-12 font-light leading-relaxed text-lg relative">
                  <span className="absolute -top-6 -left-4 text-6xl text-gray-200 dark:text-gray-800 font-serif opacity-50">"</span>
                  {review.text}
                </p>
                <div className="flex items-center pt-8 border-t border-gray-200 dark:border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-black flex items-center justify-center text-gray-500 dark:text-gray-400 font-light text-xl mr-4 flex-shrink-0 border border-gray-300 dark:border-gray-700">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-light text-lg text-gray-900 dark:text-white tracking-wide">{review.name}</h4>
                    <p className="text-[0.65rem] text-orange-500 font-bold uppercase tracking-[0.2em] mt-1">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- APPOINTMENT SECTION --- */}
      <section id="book" className="py-24 lg:py-32 relative overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0">
           <img src={IMAGES.hero} alt="Background" className="w-full h-full object-cover opacity-30 cinematic-zoom mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-12 max-w-[90rem] relative z-10">
          <div className="glass-panel rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-black flex flex-col lg:flex-row backdrop-blur-3xl">
            
            {/* Form Side - Minimalist Luxury */}
            <div className="w-full lg:w-3/5 p-10 lg:p-16 bg-white/95 dark:bg-[#0a0a0a]/95">
              <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Consultation</span>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">Request an Appointment</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-12 font-light text-lg">Take the definitive step towards holistic well-being.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const msg = `New Appointment Request:\nName: ${formData.get('name')}\nPhone: ${formData.get('phone')}\nDate: ${formData.get('date')}\nConcern: ${formData.get('concern')}`;
                handleWhatsAppClick(msg);
              }} className="space-y-8 lg:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Full Name</label>
                    <input required name="name" type="text" className="w-full luxury-input text-gray-900 dark:text-white font-light text-base" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Phone Number</label>
                    <input required name="phone" type="tel" className="w-full luxury-input text-gray-900 dark:text-white font-light text-base" placeholder="+91" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Preferred Date</label>
                    <input required name="date" type="date" className="w-full luxury-input text-gray-900 dark:text-white font-light text-base uppercase" />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Department</label>
                    <select name="department" className="w-full luxury-input text-gray-900 dark:text-white font-light text-base bg-transparent appearance-none">
                      <option className="text-gray-900">General Consultation</option>
                      <option className="text-gray-900">Skin & Hair</option>
                      <option className="text-gray-900">Respiratory</option>
                      <option className="text-gray-900">Child Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Primary Concern (Optional)</label>
                  <textarea name="concern" rows="2" className="w-full luxury-input text-gray-900 dark:text-white font-light text-base resize-none" placeholder="Briefly describe your symptoms..."></textarea>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" variant="primary" className="w-full md:w-auto text-xs">
                    Submit Request <ChevronRight className="ml-3" size={16} />
                  </Button>
                </div>
              </form>
            </div>

            {/* Info Side */}
            <div className="w-full lg:w-2/5 bg-gray-50/90 dark:bg-[#050505]/90 p-10 lg:p-16 flex flex-col justify-center border-l border-gray-200/50 dark:border-gray-900">
               <h3 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white mb-10">Direct Contact</h3>
               
               <div className="space-y-8 lg:space-y-10">
                 <div className="flex items-start group cursor-pointer">
                   <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center flex-shrink-0 mr-5 group-hover:border-orange-500 transition-colors duration-500">
                     <Phone className="text-gray-500 group-hover:text-orange-500 transition-colors" size={18} strokeWidth={1.5} />
                   </div>
                   <div>
                     <p className="text-[0.65rem] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Call Us</p>
                     <p className="text-lg font-light text-gray-900 dark:text-white">{CLINIC_INFO.phone}</p>
                   </div>
                 </div>

                 <div className="flex items-start group cursor-pointer">
                   <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center flex-shrink-0 mr-5 group-hover:border-orange-500 transition-colors duration-500">
                     <MapPin className="text-gray-500 group-hover:text-orange-500 transition-colors" size={18} strokeWidth={1.5} />
                   </div>
                   <div>
                     <p className="text-[0.65rem] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Visit Clinic</p>
                     <p className="text-base font-light text-gray-900 dark:text-white leading-relaxed">{CLINIC_INFO.address}</p>
                   </div>
                 </div>

                 <div className="flex items-start group">
                   <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center flex-shrink-0 mr-5 group-hover:border-orange-500 transition-colors duration-500">
                     <Clock className="text-gray-500 group-hover:text-orange-500 transition-colors" size={18} strokeWidth={1.5} />
                   </div>
                   <div>
                     <p className="text-[0.65rem] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Hours</p>
                     <p className="text-base font-light text-gray-900 dark:text-white mb-1">{CLINIC_INFO.timings}</p>
                     <p className="text-[0.65rem] text-orange-500 font-bold uppercase tracking-widest mt-1">Sunday Closed</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 lg:py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading subtitle="Inquiries" title="Frequently Asked Questions" centered={true} />
          
          <div className="mt-16 lg:mt-20 space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`border-b border-gray-200 dark:border-gray-800 transition-all duration-500`}
              >
                <button 
                  className="w-full py-6 flex justify-between items-center text-left group"
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                >
                  <span className="text-xl lg:text-2xl font-light text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${activeFaq === index ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300 dark:border-gray-700 text-gray-400 group-hover:border-orange-500'}`}>
                    <ChevronDown className={`transition-transform duration-500 ${activeFaq === index ? 'rotate-180' : ''}`} size={16} strokeWidth={1.5} />
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${activeFaq === index ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg pl-4 border-l-2 border-orange-500/30">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#050505] pt-24 lg:pt-32 pb-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-600/5 blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-12 max-w-[100rem] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-20">
            
            {/* Brand */}
            <div className="space-y-6">
              <a href="#" className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white">
                  <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-light text-white tracking-tight">Dr. Patil's</span>
                </div>
              </a>
              <p className="text-gray-400 font-light leading-relaxed text-sm pr-8">
                Committed to providing authentic, highly personalized homeopathic treatment to restore your health naturally and sustainably.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-500 hover:bg-orange-500/10">
                  <Facebook size={16} strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-500 hover:bg-orange-500/10">
                  <Instagram size={16} strokeWidth={1.5} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500 transition-all duration-500 hover:bg-orange-500/10">
                  <Twitter size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-[0.65rem] uppercase tracking-[0.2em] mb-6">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'About Dr. Patil', 'Treatments', 'Gallery', 'Testimonials', 'Contact Us'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-light text-sm flex items-center group">
                      <div className="w-0 h-[1px] bg-orange-400 mr-0 group-hover:w-3 group-hover:mr-3 transition-all duration-300"></div>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments */}
            <div>
              <h4 className="text-white font-bold text-[0.65rem] uppercase tracking-[0.2em] mb-6">Specialties</h4>
              <ul className="space-y-4">
                {TREATMENTS.map((t, i) => (
                  <li key={i}>
                    <a href={`#treatments`} className="text-gray-400 hover:text-orange-400 transition-colors font-light text-sm flex items-center group">
                      <div className="w-0 h-[1px] bg-orange-400 mr-0 group-hover:w-3 group-hover:mr-3 transition-all duration-300"></div>
                      {t.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-white font-bold text-[0.65rem] uppercase tracking-[0.2em] mb-6">Connect</h4>
              <ul className="space-y-5">
                <li className="flex items-start text-gray-400 font-light text-sm">
                  <MapPin size={18} className="text-gray-600 mr-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{CLINIC_INFO.address}</span>
                </li>
                <li className="flex items-center text-gray-400 font-light text-sm">
                  <Phone size={18} className="text-gray-600 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <span>{CLINIC_INFO.phone}</span>
                </li>
                <li className="flex items-center text-gray-400 font-light text-sm">
                  <Mail size={18} className="text-gray-600 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <span>{CLINIC_INFO.email}</span>
                </li>
                <li className="flex items-center text-gray-400 font-light text-sm pt-2">
                  <Clock size={18} className="text-orange-500 mr-4 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-white">{CLINIC_INFO.timings}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-900 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[0.65rem] tracking-widest uppercase">
              &copy; {new Date().getFullYear()} {CLINIC_INFO.name}.
            </p>
            <div className="flex space-x-6 text-[0.65rem] text-gray-600 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}