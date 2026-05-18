import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Shield, Clock, Sparkles, Building, Phone, ChevronRight, ChevronLeft,
  MapPin, Star, ShieldCheck, CheckCircle2, ChevronDown, Instagram, 
  Facebook, Twitter, Award, Droplets, Bug, ArrowRight,
  Leaf, GripVertical, MessageCircle, Quote, Menu, X
} from 'lucide-react';

const PHONE_NUMBER = "+919762815757";
const DISPLAY_PHONE = "+91 97628 15757";
const WHATSAPP_LINK = `https://wa.me/919762815757?text=Hi%20Aditya%20pest%20control,%20I%20am%20looking%20for%20premium%20pest%20control%20services.`;

const GOLD_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C]";
const GOLD_BG = "bg-gradient-to-r from-[#AA771C] via-[#E8C872] to-[#8A5A19]";
const CARD_BG = "bg-gradient-to-br from-[#121212] to-[#080808]";
const PREMIUM_SHADOW = "shadow-[0_20px_50px_rgba(0,0,0,0.8)]";
const HOVER_GLOW = "hover:shadow-[0_25px_60px_rgba(212,175,55,0.22)]";

const LUX_EASE = [0.16, 1, 0.3, 1];

const SERVICES = [
  { 
    title: "Cockroach Control", 
    icon: <Bug size={26} strokeWidth={1.5} />, 
    desc: "Advanced gel baiting and odorless molecular spraying for total eradication in luxury gourmet kitchens.", 
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Termite Treatment", 
    icon: <ShieldCheck size={26} strokeWidth={1.5} />, 
    desc: "Anti-termite precision piping and chemical barriers protecting precious teak wood structures permanently.", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Bed Bug Eradication", 
    icon: <Sparkles size={26} strokeWidth={1.5} />, 
    desc: "Intensive deep chemical sanitization treatment to eliminate micro-infestations for flawless night rest.", 
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Rodent Management", 
    icon: <Bug size={26} strokeWidth={1.5} />, 
    desc: "Discreet strategic trapping and seamless physical sealing of entryways behind custom cabinetry.", 
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Mosquito Fogging", 
    icon: <Droplets size={26} strokeWidth={1.5} />, 
    desc: "High-volume thermal fogging and larvicidal controls to keep expansive lawns and pool decks completely pest-free.", 
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Commercial AMC", 
    icon: <Building size={26} strokeWidth={1.5} />, 
    desc: "Tailored continuous Annual Maintenance Contracts designed for corporate towers, premium retail, and luxury hotels.", 
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Wood Borer Control", 
    icon: <Leaf size={26} strokeWidth={1.5} />, 
    desc: "Specialized micro-injection wood preservation treatments to safeguard heritage woodcraft and expensive antiques.", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    title: "Deep Sanitization", 
    icon: <Shield size={26} strokeWidth={1.5} />, 
    desc: "Premium grade eco-certified bacterial and viral disinfection designed for pristine medical facilities and luxury lobbies.", 
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop" 
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
];

const STATS = [
  { value: "5000+", label: "Elite Estates Sanitized" },
  { value: "24/7", label: "Priority Fast Response" },
  { value: "100%", label: "Govt. Certified Safety" },
  { value: "15+", label: "Years of Masterpiece Service" }
];

const REVIEWS = [
  { 
    name: "Rahul Singhania", 
    role: "Heritage Villa Owner, Terwad", 
    rating: 5, 
    text: "Truly a masterclass in home safety operations. Aditya pest control handled our family estate with absolute privacy, leaving everything pristine and beautifully scent-free. Highly recommended.", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    verified: "Verified VIP Residence Audit"
  },
  { 
    name: "Dr. Priya Kulkarni", 
    role: "Founder, Kulkarni Diagnostics", 
    rating: 5, 
    text: "Aditya pest control manages our regular sanitation and AMC. Their hygiene protocol exceeds the stringent diagnostic safety standards. It feels like experiencing high-end hospitality in pest control.", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    verified: "Verified Healthcare Facility AMC"
  },
  { 
    name: "Amit Deshmukh", 
    role: "Chief Exec, Corporate Spaces", 
    rating: 5, 
    text: "Extremely meticulous. Their specialized wood borer treatment restored our boardroom teak antiques without any damage. Outstanding execution, absolutely zero operational disruption.", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    verified: "Verified Corporate Asset Protection"
  }
];

const FAQS = [
  { q: "Are your premium chemicals safe for exotic pets and infant rooms?", a: "Yes. We source premium-grade bio-rational formulations approved by the CIBRC. These target pests at microscopic levels but remain completely odorless and safe for infants, premium upholstery, and pets once set." },
  { q: "Do your service vehicles carry corporate branding?", a: "We understand your need for absolute discretion. Upon request, our elite team can arrive in clean, unmarked luxury utility vehicles to keep your service entirely private." },
  { q: "Is there a comprehensive warranty on residential termite control?", a: "Yes, our certified termite barriers carry an executive warranty ranging from 1 to 5 years, accompanied by complimentary, scheduled maintenance check-ups." },
  { q: "How fast can your team respond in Terwad?", a: "We operate a dedicated local rapid-response squad for the Terwad region. Emergencies are addressed with priority same-day scheduling." },
  { q: "Will chemical spraying stain our imported Italian marble or custom wood finishes?", a: "Not at all. We employ precision gel application, dust baiting, and targeted micro-injection. This leaves zero liquid pooling or stains on expensive marble, teakwood, or silk wallpaper." }
];

const PROCESS = [
  { title: "Thermal Auditing", desc: "Using advanced thermal and acoustic sensors to track unseen pest nests behind marble and woodwork." },
  { title: "Bespoke Architecting", desc: "Formulating a tailored treatment recipe suited precisely to the layout and materials of your property." },
  { title: "Precision Shielding", desc: "Applying low-odor, targeted treatments with surgical accuracy, leaving the air fresh and surfaces clean." },
  { title: "Eternal Protection", desc: "Periodic premium monitoring and barrier enforcement for complete, year-round peace of mind." }
];

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: LUX_EASE } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
      
      <div className="relative flex flex-col items-center px-4 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: LUX_EASE }}
          className="text-center bg-[#0b0b0b] p-8 md:p-12 rounded-[30px] md:rounded-[40px] shadow-[0_30px_60px_rgba(212,175,55,0.08)] border border-white/5 backdrop-blur-3xl w-full"
        >
          <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" strokeWidth={1} />
          <h1 className="text-xl md:text-2xl tracking-[0.2em] font-serif text-white uppercase mb-4 text-center leading-relaxed">ADITYA PEST</h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 1.2, ease: LUX_EASE }}
            className={`h-[1px] ${GOLD_BG} mb-4`}
          />
          <h2 className={`text-[9px] md:text-[10px] tracking-[0.3em] ${GOLD_TEXT} uppercase font-semibold text-center`}>CONTROL</h2>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const detectTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };
    
    detectTouch();
    window.addEventListener('resize', detectTouch);

    const updateMousePosition = (e) => {
      if (!isTouchDevice) setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('[role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('resize', detectTouch);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-[0_0_10px_rgba(212,175,55,1)]"
        animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#D4AF37]/60 rounded-full pointer-events-none z-[9998] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        animate={{
          x: mousePosition.x - 24, y: mousePosition.y - 24,
          scale: isHovering ? 1.6 : 1,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
          borderColor: isHovering ? 'rgba(212, 175, 55, 1)' : 'rgba(212, 175, 55, 0.4)'
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </>
  );
};

const Button = ({ children, variant = 'primary', className = '', href, onClick, type = 'button' }) => {
  const baseStyle = "relative inline-flex items-center justify-center px-6 md:px-10 py-3.5 md:py-4.5 overflow-hidden text-[10px] md:text-xs uppercase tracking-[0.25em] font-bold rounded-[40px] transition-all duration-500 group";
  const variants = {
    primary: `${GOLD_BG} text-black shadow-[0_12px_35px_rgba(212,175,55,0.35)] hover:shadow-[0_18px_45px_rgba(212,175,55,0.55)] hover:-translate-y-1`,
    secondary: `bg-[#0c0c0c] text-white border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#141414] shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_18px_45px_rgba(212,175,55,0.15)] hover:-translate-y-1 backdrop-blur-xl`,
    glow: "bg-black text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black shadow-[0_12px_35px_rgba(212,175,55,0.25)] hover:-translate-y-1"
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick, type };

  return (
    <Component className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2.5 md:gap-3">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-[40px]"></div>
      )}
    </Component>
  );
};

const SectionHeading = ({ subtitle, title, centered = true }) => (
  <div className={`mb-12 md:mb-16 lg:mb-24 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: LUX_EASE }}
      className={`inline-flex items-center gap-3 px-4 md:px-6 py-2 mb-6 md:mb-8 text-[8px] md:text-[9px] font-bold tracking-[0.35em] uppercase text-[#D4AF37] bg-[#D4AF37]/8 rounded-full border border-[#D4AF37]/15 shadow-[0_5px_20px_rgba(212,175,55,0.08)]`}
    >
      <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 1.2, ease: LUX_EASE }}
      className={`text-3xl md:text-5xl lg:text-7xl font-serif text-white leading-[1.12] drop-shadow-2xl`}
    >
      {title}
    </motion.h2>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2, ease: LUX_EASE }}
        className={`fixed top-0 md:top-4 w-full z-50 transition-all duration-700 px-0 md:px-6`}
      >
        <div className={`max-w-7xl mx-auto transition-all duration-500 flex justify-between items-center px-6 md:px-8 py-4 rounded-none md:rounded-[40px] ${scrolled || mobileMenuOpen ? 'bg-[#060606]/95 backdrop-blur-3xl border-b md:border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' : 'bg-transparent'}`}>
          <a href="#" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <div className="w-10 h-10 md:w-11 h-11 bg-[#0f0f0f] rounded-full flex items-center justify-center border border-white/10 shadow-lg group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_5px_20px_rgba(212,175,55,0.25)] transition-all duration-500">
              <Shield className="text-[#D4AF37] w-4.5 h-4.5 md:w-5 md:h-5 transition-transform duration-700 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-base font-serif tracking-[0.05em] text-white uppercase leading-tight">ADITYA PEST</span>
              <span className={`text-[6.5px] md:text-[7px] ${GOLD_TEXT} tracking-[0.1em] uppercase mt-1 font-bold`}>CONTROL</span>
            </div>
          </a>
          
          <div className="hidden lg:flex items-center gap-2 bg-[#0d0d0d]/90 backdrop-blur-2xl p-1.5 rounded-[40px] border border-white/5 shadow-inner">
            {['Services', 'About', 'Gallery', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2.5 rounded-[40px] text-[9px] font-bold text-gray-400 hover:text-black hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#AA771C] transition-all duration-300 uppercase tracking-[0.25em]">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button href={WHATSAPP_LINK} variant="primary" className="hidden sm:flex py-2.5 md:py-3 px-6 md:px-8 text-[9px]">
              Audits & Concierge
            </Button>

            {/* Premium Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden w-10 h-10 rounded-full bg-[#111] border border-white/10 items-center justify-center text-[#D4AF37] active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Screen-fitting Responsive Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: LUX_EASE }}
            className="fixed inset-0 z-40 bg-black/98 pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-6 mt-4">
              {['Services', 'About', 'Gallery', 'Reviews'].map((item, index) => (
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, ease: LUX_EASE }}
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-[#D4AF37] tracking-widest uppercase border-b border-white/5 pb-4"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <Button href={WHATSAPP_LINK} variant="primary" className="w-full py-4.5 text-[10px]">
                WhatsApp Concierge
              </Button>
              <Button href={`tel:${PHONE_NUMBER}`} variant="secondary" className="w-full py-4.5 text-[10px]">
                Call Representative
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] pt-24 pb-16 md:pb-24">
      {/* Background with Ambient Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-[#030303] z-10"></div>
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: LUX_EASE }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center filter grayscale-[45%] contrast-110 opacity-60"
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-12 md:pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease: LUX_EASE }}
            className="inline-flex items-center gap-3 px-5 md:px-6 py-2 md:py-2.5 mb-8 md:mb-10 bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
          >
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-[8px] md:text-[9px] font-bold text-gray-300 tracking-[0.35em] uppercase">Private Estate Environmental Shielding</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.6, ease: LUX_EASE }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[6.8rem] font-serif text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
          >
            Luxury Spaces. <br className="hidden sm:inline" />
            <span className="italic text-gray-400 font-light">Flawless</span> <span className={GOLD_TEXT}>Hygiene.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.8, ease: LUX_EASE }}
            className="text-sm md:text-base lg:text-xl text-gray-400 mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-md"
          >
            The premium pest defense firm trusted by high-end residences, elite restaurants, and major commercial offices across Terwad.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3, ease: LUX_EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <Button href={WHATSAPP_LINK} variant="primary" className="w-full sm:w-auto text-[10px] px-10 md:px-14 py-4 md:py-5">
              Secure Your Residence
            </Button>
            <Button href={`tel:${PHONE_NUMBER}`} variant="secondary" className="w-full sm:w-auto text-[10px] px-10 md:px-14 py-4 md:py-5">
              <Phone className="w-4 h-4 mr-3" strokeWidth={1.5} /> Call Representative
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3.5"
      >
        <span className="text-[7px] md:text-[8px] font-bold text-gray-400 uppercase tracking-[0.4em] bg-[#0c0c0c]/80 px-4 py-2 rounded-full border border-white/5 shadow-lg backdrop-blur-md">Scroll Down</span>
        <div className="w-[1px] h-10 md:h-14 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-40"></div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-36 lg:py-48 bg-[#030303] relative z-10">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/3 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative">
        <SectionHeading subtitle="Elite Operations" title="Specialized Services" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 1.2, ease: LUX_EASE }}
              className={`group relative flex flex-col justify-between h-[450px] md:h-[480px] ${CARD_BG} rounded-[40px] overflow-hidden border border-white/5 ${PREMIUM_SHADOW} ${HOVER_GLOW} transition-all duration-700 ease-out transform hover:-translate-y-2.5`}
            >
              <div className="h-[44%] w-full overflow-hidden relative">
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover filter grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.8s] ease-out"
                />
                <div className="absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>

              <div className="h-[56%] p-6 md:p-8 flex flex-col justify-between relative z-10">
                <div className="absolute -top-7 left-6 md:left-8 w-12 h-12 md:w-13 md:h-13 bg-[#121212] border border-[#D4AF37]/30 rounded-[18px] flex items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all duration-500">
                  <span className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-serif text-white mb-2 md:mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-gray-400 text-[11px] md:text-xs leading-relaxed font-light line-clamp-3">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/5 flex items-center justify-between mt-4">
                  <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-gray-500 group-hover:text-gray-300 transition-colors">Premium Class</span>
                  <a href={WHATSAPP_LINK} className="inline-flex items-center text-[#D4AF37] text-[8.5px] font-bold uppercase tracking-[0.2em] bg-[#D4AF37]/8 px-3 py-1.5 md:px-4 md:py-2 rounded-[40px] border border-[#D4AF37]/15 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shadow-md">
                    Request <ArrowRight className="w-3 h-3 ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-36 lg:py-48 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUX_EASE }}
            className="w-full xl:w-1/2 relative"
          >
            <div className={`relative aspect-[4/5] rounded-[40px] overflow-hidden group ${PREMIUM_SHADOW} border border-white/10`}>
               <img 
                 src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" 
                 alt="Luxury Clean Lobby"
                 className="w-full h-full object-cover filter grayscale-[12%] group-hover:scale-105 transition-transform duration-[2.5s] ease-out opacity-90"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
               
               {/* Floating Luxury Card (Fully Mobile Responsive Sizes) */}
               <motion.div 
                 animate={{ y: [0, -12, 0] }}
                 transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 bg-[#0d0d0d]/95 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] max-w-[280px] sm:max-w-[320px] shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
               >
                  <div className="flex items-center gap-4 sm:gap-5 mb-4 sm:mb-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[15px] sm:rounded-[20px] bg-gradient-to-br from-[#D4AF37] to-[#8A5A19] flex items-center justify-center shadow-[0_8px_20px_rgba(212,175,55,0.4)]">
                      <ShieldCheck className="text-black w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-white font-serif text-2xl sm:text-3xl mb-0.5 drop-shadow-md">100%</div>
                      <div className="text-[#D4AF37] text-[7.5px] sm:text-[8px] uppercase tracking-[0.25em] font-bold">Uncompromising Quality</div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 mb-4 sm:mb-5"></div>
                  <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed font-light">
                    We deploy ultra-refined chemical protocols specifically curated to keep precious marble, fabrics, and woods unharmed.
                  </p>
               </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LUX_EASE }}
            className="w-full xl:w-1/2 xl:pl-8"
          >
            <SectionHeading subtitle="Corporate Legacy" title="Perfecting Pure Living" centered={false} />
            
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-white mb-6 md:mb-10 leading-snug drop-shadow-sm">
              We do not merely control pests;<br/>
              <span className="text-gray-400 italic font-serif">we maintain the ultimate standards of wellness.</span>
            </p>
            <p className="text-gray-400 mb-10 md:mb-16 leading-relaxed text-sm md:text-base font-light">
              Aditya pest control Terwad leads with modern molecular science and deep operational rigor. Our team of premium environmental consultants manages insect, termite, rodent, and disinfection tasks across luxury properties. Our protocol focuses on absolute safety, zero stains, and total relief.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {STATS.map((stat, i) => (
                <div key={i} className={`relative group p-5 md:p-6.5 rounded-[30px] md:rounded-[40px] ${CARD_BG} border border-white/5 ${PREMIUM_SHADOW} hover:-translate-y-1 transition-all duration-500`}>
                  <div className="text-2xl md:text-4xl font-serif text-white mb-1.5 md:mb-2 drop-shadow-md">{stat.value}</div>
                  <div className="text-[7.5px] md:text-[8px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex justify-center xl:justify-start">
              <Button href={WHATSAPP_LINK} variant="secondary" className="w-full sm:w-auto">
                Explore Our Methods
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => isDragging && handleMove(e.clientX);
    const handleTouchMove = (e) => isDragging && handleMove(e.touches[0].clientX);
    const stopDragging = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-[#010101]">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading subtitle="Perfect Restorations" title="The Visible Relief" />
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUX_EASE }}
            className={`relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden cursor-ew-resize bg-[#0f0f0f] border border-white/10 ${PREMIUM_SHADOW} shadow-[0_30px_70px_rgba(0,0,0,0.9)]`}
            ref={containerRef}
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* After Image */}
            <img 
              src="https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop" 
              alt="Impeccable Sanitized Bed Chamber"
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable="false"
            />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 bg-black/70 backdrop-blur-xl rounded-full text-white text-[8px] sm:text-[9px] tracking-[0.25em] border border-white/10 uppercase font-bold shadow-lg">
              After Treatment
            </div>

            {/* Before Image */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop" 
                alt="Dusty Uncleaned Wooden Loft"
                className="absolute inset-0 w-full h-full object-cover filter grayscale-[40%] contrast-125 select-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-black/45 mix-blend-multiply"></div>
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 bg-black/70 backdrop-blur-xl rounded-full text-white text-[8px] sm:text-[9px] tracking-[0.25em] border border-white/10 uppercase font-bold shadow-lg z-10 select-none">
                Before Treatment
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,1)]"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0c0c0c] border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <GripVertical className="text-[#D4AF37] w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={2} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-36 lg:py-48 bg-[#030303] relative">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading subtitle="Surgical Execution" title="Our Blueprint" />
        
        <div className="max-w-6xl mx-auto mt-16 md:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

            {PROCESS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 1, ease: LUX_EASE }}
                className={`relative z-10 flex flex-col items-center text-center p-6 md:p-8 rounded-[40px] ${CARD_BG} border border-white/5 ${PREMIUM_SHADOW} hover:-translate-y-2 transition-all duration-500`}
              >
                <div className="w-16 h-16 md:w-18 md:h-18 bg-[#030303] rounded-[20px] border border-[#D4AF37]/30 flex items-center justify-center text-base md:text-lg font-serif text-[#D4AF37] mb-6 md:mb-8 shadow-inner">
                  0{index + 1}
                </div>
                <h4 className="text-lg md:text-xl font-serif text-white mb-3 md:mb-4 tracking-wide">{step.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 md:py-36 lg:py-48 bg-[#080808]">
      <div className="container mx-auto px-6 lg:px-16">
        <SectionHeading subtitle="Visual Excellence" title="Our Portfolio" />
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8 mt-16 md:mt-20">
          {GALLERY_IMAGES.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 1.2 }}
              className={`relative rounded-[40px] overflow-hidden group break-inside-avoid bg-[#101010] border border-white/5 ${PREMIUM_SHADOW}`}
            >
              <img 
                src={src} 
                alt={`Premium Treatment Portfolio ${index + 1}`} 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center pb-8">
                <span className="text-black bg-[#D4AF37] px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold shadow-lg">Verify Work</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-24 md:py-36 lg:py-48 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#D4AF37]/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionHeading subtitle="Verified Credentials" title="Prestige Client Audits" />
        
        <div className="max-w-5xl mx-auto mt-16 md:mt-20 relative">
          
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-[#111] to-[#080808] p-6 sm:p-10 md:p-20 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
            
            <Quote className="absolute right-6 top-6 sm:right-12 sm:top-12 w-20 h-20 md:w-32 md:h-32 text-white/[0.02] pointer-events-none" strokeWidth={1} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: LUX_EASE }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Client Portrait */}
                <div className="lg:col-span-4 flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-br from-[#AA771C] to-[#E8C872] rounded-[30px] opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-700"></div>
                    <div className="relative w-40 h-48 sm:w-48 sm:h-56 rounded-[24px] overflow-hidden border border-white/20 shadow-2xl">
                      <img 
                        src={REVIEWS[currentIndex].image} 
                        alt={REVIEWS[currentIndex].name} 
                        className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      />
                    </div>
                  </div>
                </div>

                {/* Audit Review Details */}
                <div className="lg:col-span-8 flex flex-col justify-between h-full text-center lg:text-left">
                  
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-4 py-1.5 rounded-full text-[7.5px] sm:text-[8px] tracking-[0.25em] font-bold text-[#D4AF37] uppercase mb-4 sm:mb-6 shadow-inner">
                      <Shield className="w-3 h-3 text-[#D4AF37]" strokeWidth={2} />
                      {REVIEWS[currentIndex].verified}
                    </div>

                    <div className="flex justify-center lg:justify-start text-[#D4AF37] gap-1 mb-4 sm:mb-6">
                      {[...Array(REVIEWS[currentIndex].rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>

                    <p className="text-base sm:text-xl md:text-2xl font-serif text-white leading-relaxed mb-6 sm:mb-8 italic font-light">
                      "{REVIEWS[currentIndex].text}"
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-5 mt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                      <h4 className="text-base md:text-lg font-serif text-white tracking-wide">{REVIEWS[currentIndex].name}</h4>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-[0.25em] font-medium mt-1">{REVIEWS[currentIndex].role}</p>
                    </div>
                    
                    <div className="hidden sm:flex items-center gap-2 border border-white/10 rounded-xl px-4 py-2 bg-black/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                      <span className="text-[8.5px] uppercase tracking-[0.15em] font-bold text-gray-400">Pristine Grade A Certified</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Controls */}
          <div className="flex justify-center lg:justify-end gap-3 md:gap-4 mt-6 md:mt-8">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-md group"
            >
              <ChevronLeft className="w-4.5 h-4.5 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-md group"
            >
              <ChevronRight className="w-4.5 h-4.5 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

const FAQAndCTA = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="py-24 md:py-36 lg:py-48 bg-[#010101] relative">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
          
          {/* FAQ Section */}
          <div className="w-full">
            <div className="mb-10 md:mb-12">
              <span className="inline-flex items-center gap-3 px-5 py-2 mb-6 text-[8.5px] sm:text-[9px] font-bold tracking-[0.35em] uppercase text-[#D4AF37] bg-[#D4AF37]/8 rounded-full border border-[#D4AF37]/15">
                 Firms Directory
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white leading-snug drop-shadow-lg">Executive <br className="hidden sm:inline" />Inquiries</h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-[30px] md:rounded-[40px] ${CARD_BG} border ${openFaq === i ? 'border-[#D4AF37]/35 shadow-[0_15px_40px_rgba(212,175,55,0.08)]' : 'border-white/5'} overflow-hidden transition-all duration-500`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-5 sm:py-6 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`font-serif text-sm md:text-base lg:text-lg transition-colors duration-300 ${openFaq === i ? 'text-[#D4AF37]' : 'text-white group-hover:text-gray-300'}`}>{faq.q}</span>
                    <div className={`shrink-0 ml-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/15 group-hover:border-white/40'}`}>
                      {openFaq === i ? <span className="text-[#D4AF37] text-base leading-none">-</span> : <span className="text-white text-base leading-none">+</span>}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-400 text-xs md:text-sm leading-relaxed pt-1 font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emergency CTA - 3D Volume Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: LUX_EASE }}
            className="relative lg:mt-24 w-full"
          >
             <div className="absolute inset-0 bg-[#D4AF37] rounded-[40px] blur-[80px] opacity-15"></div>
             
             <div className={`relative h-full ${CARD_BG} border border-[#D4AF37]/25 p-8 sm:p-12 md:p-16 rounded-[40px] flex flex-col justify-center text-center ${PREMIUM_SHADOW} overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#030303] border border-[#D4AF37]/30 mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-2xl">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] animate-pulse" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4 sm:mb-6 drop-shadow-md">Express Dispatch</h3>
                  <p className="text-gray-400 mb-8 sm:mb-10 text-xs sm:text-sm leading-relaxed font-light max-w-xs mx-auto">
                    In cases of severe infestation on high-profile corporate assets, dispatch our emergency unit instantly.
                  </p>
                  
                  <div className="flex flex-col gap-4 sm:gap-5">
                    <Button href={`tel:${PHONE_NUMBER}`} variant="primary" className="w-full shadow-lg py-4">
                      Call Representative
                    </Button>
                    <a href={WHATSAPP_LINK} className="text-white hover:text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-[8.5px] sm:text-[9px] transition-colors flex items-center justify-center gap-2 mt-2 bg-white/5 py-3 rounded-[40px] border border-white/10 w-full">
                      <MessageCircle className="w-3.5 h-3.5" /> Message Direct Desk
                    </a>
                  </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const ContactAndFooter = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', location: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Assessment Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Estate Location:* ${formData.location}%0A*Message Details:* ${formData.message}`;
    window.open(`https://wa.me/919762815757?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-36 lg:py-48 bg-[#030303] relative">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <SectionHeading subtitle="Strategic Engagement" title="Request an Assessment" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: LUX_EASE }}
            className={`max-w-5xl mx-auto ${CARD_BG} p-6 sm:p-10 md:p-16 rounded-[40px] border border-white/10 ${PREMIUM_SHADOW}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-[8.5px] md:text-[9px] text-gray-400 mb-2.5 uppercase tracking-[0.25em] font-bold ml-2">Client Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-[#060606] border border-white/10 rounded-[40px] px-6 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 font-light text-xs md:text-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[8.5px] md:text-[9px] text-gray-400 mb-2.5 uppercase tracking-[0.25em] font-bold ml-2">Confidential Contact</label>
                  <input required type="tel" placeholder="+91 XXXXX XXXXX" className="w-full bg-[#060606] border border-white/10 rounded-[40px] px-6 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 font-light text-xs md:text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-[8.5px] md:text-[9px] text-gray-400 mb-2.5 uppercase tracking-[0.25em] font-bold ml-2">Requested Service</label>
                  <div className="relative">
                    <select required className="w-full bg-[#060606] border border-white/10 rounded-[40px] px-6 py-4 md:py-5 text-white focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 appearance-none font-light text-xs md:text-sm cursor-pointer" onChange={e => setFormData({...formData, service: e.target.value})}>
                      <option value="" className="text-gray-650">Choose Treatment Method</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[8.5px] md:text-[9px] text-gray-400 mb-2.5 uppercase tracking-[0.25em] font-bold ml-2">Estate / Office Location</label>
                  <input required type="text" placeholder="Terwad / Nearby Area" className="w-full bg-[#060606] border border-white/10 rounded-[40px] px-6 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 font-light text-xs md:text-sm" onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[8.5px] md:text-[9px] text-gray-400 mb-2.5 uppercase tracking-[0.25em] font-bold ml-2">Special Site Concerns</label>
                <textarea rows="4" placeholder="Briefly specify material concerns, pets, or high ceiling areas..." className="w-full bg-[#060606] border border-white/10 rounded-[40px] px-6 py-4 md:py-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-500 resize-none font-light text-xs md:text-sm" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button type="submit" variant="primary" className="w-full md:w-auto px-16 py-4.5 text-[10px]">
                  Dispatch Assessment Inquiry
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#010101] border-t border-white/10 pt-20 md:pt-32 pb-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
            
            <div className="bg-[#090909] p-6 sm:p-8 rounded-[40px] border border-white/5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="text-[#D4AF37] w-7 h-7 drop-shadow-md" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-sm font-serif tracking-[0.05em] text-white uppercase leading-tight">ADITYA PEST</span>
                    <span className={`text-[7px] ${GOLD_TEXT} tracking-[0.05em] uppercase mt-1 font-bold`}>CONTROL</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs leading-loose mb-6 font-light">
                  Setting the executive standard for pest eradication and environmental hygiene for Terwad's premiere properties.
                </p>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 shadow-inner"><Facebook size={14} /></a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 shadow-inner"><Instagram size={14} /></a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#030303] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 shadow-inner"><Twitter size={14} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 md:mb-8 uppercase tracking-[0.3em] text-[10px] ml-2">Services</h4>
              <ul className="space-y-3.5">
                {SERVICES.slice(0,5).map(s => (
                  <li key={s.title}>
                    <a href="#services" className="text-gray-400 hover:text-[#D4AF37] text-xs transition-colors font-light flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-[#D4AF37] transition-colors"></span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 md:mb-8 uppercase tracking-[0.3em] text-[10px] ml-2">Navigation</h4>
              <ul className="space-y-3.5">
                {['About Us', 'Process', 'Portfolio', 'Testimonials', 'Contact'].map(l => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().split(' ')[0]}`} className="text-gray-400 hover:text-[#D4AF37] text-xs transition-colors font-light flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-white/15 group-hover:bg-[#D4AF37] transition-colors"></span>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 md:mb-8 uppercase tracking-[0.3em] text-[10px] ml-2">Headquarters</h4>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex gap-4 items-start text-gray-400 text-xs font-light bg-[#090909] p-4 rounded-[25px] border border-white/5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="leading-relaxed text-left">Borgaon Road, Terwad, Maharashtra.</span>
                </li>
                <li className="flex gap-4 items-center text-gray-400 text-xs font-light bg-[#090909] p-4 rounded-[25px] border border-white/5">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" strokeWidth={1.5} />
                  <span className="leading-relaxed">{DISPLAY_PHONE}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-[8.5px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-center md:text-left">© {new Date().getFullYear()} ADITYA PEST CONTROL. All rights reserved.</p>
            <div className="text-gray-500 text-[8.5px] sm:text-[9px] flex gap-6 md:gap-8 font-bold uppercase tracking-[0.22em]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modern Capsule WhatsApp Button (Always visible on mobile bottom, perfectly scaled) */}
      <a 
        href={WHATSAPP_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-black px-5 py-3 sm:px-7 sm:py-4 rounded-[40px] flex items-center gap-2 md:gap-3 shadow-[0_12px_35px_rgba(37,211,102,0.4)] hover:shadow-[0_18px_45px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em]"
      >
        <MessageCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={2.2} />
        <span>Contact Office</span>
      </a>
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-[#D4AF37]/35 selection:text-white cursor-none overflow-x-hidden">
          {/* Global cinema grain overlay */}
          <div className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.012] mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>

          <CustomCursor />
          
          {/* Elegant Top Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#AA771C] via-[#E8C872] to-[#8A5A19] origin-left z-[70] shadow-[0_0_15px_rgba(212,175,55,0.85)]"
            style={{ scaleX }}
          />
          
          <Navbar />
          <main className="overflow-x-hidden">
            <Hero />
            <Services />
            <About />
            <BeforeAfter />
            <Process />
            <Gallery />
            <Testimonials />
            <FAQAndCTA />
            <ContactAndFooter />
          </main>
        </div>
      )}
    </>
  );
}