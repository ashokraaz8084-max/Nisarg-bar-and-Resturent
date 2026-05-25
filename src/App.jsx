import React, { useState, useEffect, useRef } from 'react';

const COLORS = {
  matteBlack: '#121212',
  pureWhite: '#FFFFFF',
  champagneGold: '#D4AF37',
  softBeige: '#F5F2EB',
  walnutBrown: '#4E3629',
  charcoal: '#1E1E1E',
  goldGradient: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)'
};

const CATEGORIES = [
  { id: 'sofas', name: 'Luxury Sofas', count: '48+ Designs', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', desc: 'Italian master craftsmanship meeting supreme velvet lounge comfort.' },
  { id: 'beds', name: 'Designer Beds', count: '32+ Designs', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', desc: 'Opulent bedroom sanctuaries tailor-made for royal slumber.' },
  { id: 'curtains', name: 'Premium Curtains', count: '120+ Fabrics', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', desc: 'Elegant bespoke drapes crafted from high-end global silk weaves.' },
  { id: 'modular', name: 'Modular Furniture', count: '15+ Concepts', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', desc: 'Sleek, high-functioning spatial optimizations with marble & wood.' },
  { id: 'dining', name: 'Dining Sets', count: '24+ Designs', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', desc: 'Bespoke high-gloss marble and solid walnut dining centerpieces.' },
  { id: 'office', name: 'Office Furniture', count: '18+ Designs', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', desc: 'Executive luxury layouts prioritizing clean lines & absolute ergonomics.' },
  { id: 'fabrics', name: 'Sofa Fabrics', count: '500+ Texture Rolls', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', desc: 'Exclusive imported velvets, jacquards, and premium natural cotton-linen blends.' },
  { id: 'custom', name: 'Bespoke Designs', count: 'Infinite Options', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', desc: 'Custom structural furniture custom-scaled precisely for your mansion layout.' }
];

const SHOWCASE_PRODUCTS = [
  { id: 1, name: 'Venezia Royal Velvet Sectional', cat: 'sofas', price: '₹4,50,000', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'Aurelia Champagne Gold Suite', cat: 'beds', price: '₹5,80,000', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'Belgian Pure Silk Drapes', cat: 'curtains', price: '₹1,20,000', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'Milano Walnut 8-Seater Dining Set', cat: 'dining', price: '₹7,20,000', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'Florentine Velvet Accent Armchair', cat: 'sofas', price: '₹1,80,000', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'Imperial Tufted Chesterfield Sofa', cat: 'sofas', price: '₹3,90,000', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'Emperor Premium Wooden Headboard', cat: 'beds', price: '₹2,60,000', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'Gold-weave Venetian Jacquard Drapes', cat: 'curtains', price: '₹1,95,000', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80' }
];

const REVIEWS = [
  { name: "Rajesh Singhania", role: "Vesu Resident", text: "Harikrishna Furnishing transformed our luxury penthouse with their velvet sofas. The gold-leafing details on our dining table are simply majestic. A truly international, world-class experience right here in Surat!", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { name: "Aaradhya Shah", role: "Adajan Villa Owner", text: "The custom curtains and silk weaves they designed perfectly complement our architectural layout. The team handled precise measurement down to the millimeter. Highly recommended premium brand!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
  { name: "Vikramaditya Patel", role: "Real Estate Developer", text: "We partner with Harikrishna for all our luxury model houses in Katargam and VIP Road. Their design aesthetics raise property value instantly. The attention to detail is unmatched in Gujarat.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
];

export default function App() {
  const [themeMode, setThemeMode] = useState('dark');
  const [activeTab, setActiveTab] = useState('all');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Welcome to Harikrishna Furnishing. I am Aria, your luxury design concierge. Would you like assistance styling your home today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [beforeAfterProgress, setBeforeAfterProgress] = useState(50);
  const [activeModelColor, setActiveModelColor] = useState('#D4AF37'); // Gold default for 3D Customizer
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);

  const beforeAfterRef = useRef(null);
  const canvasRef = useRef(null); 
  const particlesCanvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = themeMode === 'dark' ? 'rgba(212, 175, 55, ' : 'rgba(78, 54, 41, ';
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ctx.fillStyle.split(', ').slice(0, 3).join(', ')}, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [themeMode]);

  useEffect(() => {
    if (window.THREE) {
      setIsThreeLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => {
      setIsThreeLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isThreeLoaded || !window.THREE) return;
    const canvasContainer = canvasRef.current;
    if (!canvasContainer) return;

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(themeMode === 'dark' ? 0x121212 : 0xF5F2EB);

    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    
    canvasContainer.innerHTML = ''; // Ensure canvas clean rebuild
    canvasContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldLight = new THREE.PointLight(0xD4AF37, 1.5, 10);
    goldLight.position.set(-2, 2, 2);
    scene.add(goldLight);

    const sofaGroup = new THREE.Group();

    const sofaMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeModelColor),
      roughness: 0.5,
      metalness: 0.1
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: 0x4E3629,
      roughness: 0.3
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.9,
      roughness: 0.1
    });

    const baseGeo = new THREE.BoxGeometry(2.4, 0.15, 0.9);
    const baseMesh = new THREE.Mesh(baseGeo, woodMaterial);
    baseMesh.position.y = 0.3;
    sofaGroup.add(baseMesh);

    const cushionLGeo = new THREE.BoxGeometry(1.1, 0.25, 0.8);
    const cushionL = new THREE.Mesh(cushionLGeo, sofaMaterial);
    cushionL.position.set(-0.58, 0.45, 0.02);
    sofaGroup.add(cushionL);

    const cushionRGeo = new THREE.BoxGeometry(1.1, 0.25, 0.8);
    const cushionR = new THREE.Mesh(cushionRGeo, sofaMaterial);
    cushionR.position.set(0.58, 0.45, 0.02);
    sofaGroup.add(cushionR);

    const backGeo = new THREE.BoxGeometry(2.4, 0.6, 0.25);
    const back = new THREE.Mesh(backGeo, sofaMaterial);
    back.position.set(0, 0.75, -0.35);
    sofaGroup.add(back);

    const armLGeo = new THREE.BoxGeometry(0.2, 0.5, 0.9);
    const armL = new THREE.Mesh(armLGeo, sofaMaterial);
    armL.position.set(-1.2, 0.6, 0);
    sofaGroup.add(armL);

    const armRGeo = new THREE.BoxGeometry(0.2, 0.5, 0.9);
    const armR = new THREE.Mesh(armRGeo, sofaMaterial);
    armR.position.set(1.2, 0.6, 0);
    sofaGroup.add(armR);

    const legGeo = new THREE.CylinderGeometry(0.03, 0.015, 0.3, 8);
    for (let x of [-1.1, 1.1]) {
      for (let z of [-0.38, 0.38]) {
        const leg = new THREE.Mesh(legGeo, goldMaterial);
        leg.position.set(x, 0.15, z);
        sofaGroup.add(leg);
      }
    }

    scene.add(sofaGroup);
    sofaGroup.position.y = -0.3;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      sofaGroup.rotation.y += deltaMove.x * 0.01;
      sofaGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      sofaGroup.rotation.y += deltaMove.x * 0.01;
      sofaGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvasContainer.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasContainer.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    const handleResize = () => {
      if (!canvasContainer || !renderer || !camera) return;
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animateLoop = () => {
      animationFrameId = requestAnimationFrame(animateLoop);
      if (!isDragging) {
        sofaGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animateLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasContainer.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasContainer.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isThreeLoaded, themeMode, activeModelColor]);

  const handleBeforeAfterMove = (clientX) => {
    if (!beforeAfterRef.current) return;
    const rect = beforeAfterRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setBeforeAfterProgress(percentage);
  };

  const onSliderTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleBeforeAfterMove(e.touches[0].clientX);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg = userInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setUserInput('');
    setIsTyping(true);

    try {
      const systemPrompt = "You are 'Aria', the ultra-luxury AI Interior Consultant for Harikrishna Furnishing in Surat, Gujarat. Speak in an extremely sophisticated, elegant, and polite manner. Suggest fabric options like silks, velvets, customized Italian sofa frames, custom drapes, and modern layouts. Keep your answers brief (3 sentences max), but exceptionally welcoming. Highlight that we design for top Surat residences.";
      const userQuery = `User asks: ${userMsg}. Provide a luxury interior styling response.`;

      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const answer = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I would be honored to assist you with bespoke interior layout design. Please join us at our luxury gallery in Katargam, Surat or connect on WhatsApp (+91 88666 60748) to review premium velvet and silk catalogs.";

      setChatMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Forgive me, my connection is momentarily interrupted. Please do message our main design studio directly on WhatsApp at +91 88666 60748 for immediate assistance." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden select-none ${
      themeMode === 'dark' ? 'bg-[#121212] text-white' : 'bg-[#F5F2EB] text-[#121212]'
    }`}>
      
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 150%; }
        }
        .animate-shine-hover:hover .shine-overlay {
          animation: shine 0.9s ease-in-out forwards;
        }
      `}</style>

      {/* Floating Golden Particles Layer */}
      <canvas ref={particlesCanvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* High-End Floating Golden Glow Cursor */}
      <div 
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block transition-all duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          border: `2px solid ${COLORS.champagneGold}`,
          boxShadow: `0 0 15px ${COLORS.champagneGold}`
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 backdrop-blur-md border-b transition-all duration-300 ${
        themeMode === 'dark' ? 'bg-[#121212]/80 border-white/10' : 'bg-[#F5F2EB]/80 border-black/10'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-serif tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] font-bold">
              HARIKRISHNA
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.4em] text-gray-400 border-l border-white/20 pl-2">
              Furnishing
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold">
            <a href="#hero" className="hover:text-[#D4AF37] transition">Home</a>
            <a href="#categories" className="hover:text-[#D4AF37] transition">Collections</a>
            <a href="#customizer" className="hover:text-[#D4AF37] transition">3D Studio</a>
            <a href="#transformation" className="hover:text-[#D4AF37] transition">Before/After</a>
            <a href="#reviews" className="hover:text-[#D4AF37] transition">Testimonials</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition">Showroom & Maps</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-full border transition duration-300 ${
                themeMode === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'
              }`}
            >
              {themeMode === 'dark' ? (
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#4E3629]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Ultra Luxury Button - Nav CTA */}
            <a 
              href="https://wa.me/918866660748?text=Hello%20Harikrishna%20Furnishing%2C%20I%20am%20interested%20in%20arranging%20a%20private%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-[10px] tracking-[0.25em] font-black uppercase px-6 py-3 rounded-[40px] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.7)] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center animate-shine-hover"
            >
              <span className="absolute inset-y-0 left-0 w-16 bg-white/30 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
              <span className="relative z-10">Consult Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center brightness-[0.35] z-0 transition-all duration-1000" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80')`
        }} />
        
        <div className="absolute top-1/4 left-10 w-[1px] h-1/2 bg-gradient-to-b from-[#D4AF37]/50 to-transparent animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[1px] h-1/2 bg-gradient-to-t from-[#D4AF37]/50 to-transparent animate-pulse" />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 mt-12">
          <div className="inline-flex items-center space-x-2 border border-[#D4AF37]/30 px-5 py-2 rounded-full backdrop-blur-md bg-black/40">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#FCF6BA]">SURAT'S PREMIER LUXURY INTERIOR HUB</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif tracking-tight leading-tight max-w-5xl mx-auto">
            Luxury Furniture That <br/>
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">Defines Your Lifestyle</span>
          </h1>

          <p className="text-sm md:text-lg max-w-2xl mx-auto font-light text-gray-300 tracking-wide leading-relaxed">
            Custom-crafted premium living concepts, luxury velvets, and elegant furnishings tailor-made for Surat's most sophisticated residences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            {/* Ultra Luxury Button - Hero CTA 1 */}
            <a 
              href="#categories" 
              className="relative group overflow-hidden w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-xs font-black uppercase tracking-[0.2em] rounded-[40px] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.8)] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center animate-shine-hover"
            >
              <span className="absolute inset-y-0 left-0 w-20 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
              <span className="relative z-10">Explore Collections</span>
            </a>

            {/* Ultra Luxury Button - Hero CTA 2 */}
            <a 
              href="https://wa.me/918866660748?text=Hello!%20I%20would%20love%20to%20view%20your%20luxury%20furniture%20catalogues."
              target="_blank"
              className="relative group overflow-hidden w-full sm:w-auto px-10 py-5 border border-[#D4AF37] hover:border-transparent bg-black/40 backdrop-blur-md text-white hover:text-black text-xs font-bold uppercase tracking-[0.2em] rounded-[40px] shadow-[0_4px_20px_rgba(212,175,55,0.1)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] bg-gradient-to-r hover:from-[#BF953F] hover:via-[#FCF6BA] hover:to-[#B38728] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-[#D4AF37] group-hover:text-black relative z-10 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.008-1.15-.567-1.321-.63-.173-.063-.3-.093-.427.093-.127.188-.49.63-.6.743-.109.115-.22.128-.442.017-1.155-.583-2.03-1.026-2.833-2.424-.075-.133-.075-.244-.02-.37.054-.124.127-.245.19-.367.064-.118.085-.205.127-.341.041-.137.02-.258-.01-.37-.03-.115-.29-.707-.4-.975-.102-.252-.226-.214-.32-.219-.083-.004-.178-.005-.275-.005-.098 0-.258.037-.393.184-.135.148-.52.507-.52 1.238 0 .731.533 1.436.607 1.534.075.099 1.05 1.602 2.54 2.246.354.153.63.245.847.315.356.113.679.097.934.059.285-.043.876-.358 1.002-.704.127-.348.127-.647.088-.707-.038-.06-.153-.095-.27-.154" />
              </svg>
              <span className="relative z-10">WhatsApp Inquiry</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-5xl mx-auto border-t border-white/10">
            {[
              { val: '15+', label: 'Years of Artistry' },
              { val: '10,000+', label: 'Homes Transformed' },
              { val: 'Bespoke', label: 'Custom Dimensioning' },
              { val: 'Katargam', label: 'Luxury Showroom' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 backdrop-blur-md rounded-[40px] bg-white/5 border border-white/5">
                <div className="text-2xl md:text-3xl font-serif text-[#D4AF37] font-bold">{stat.val}</div>
                <div className="text-[10px] tracking-widest text-gray-400 uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Categories Section */}
      <section id="categories" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Uncompromising Craftsmanship</span>
          <h2 className="text-3xl md:text-5xl font-serif">Luxury Collections</h2>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
            Browse through our premium design systems curated beautifully for elite homes across Vesu, Adajan, and dynamic Surat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="group relative h-[450px] rounded-[40px] overflow-hidden bg-black/40 border border-white/10 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] transition-all duration-700 flex flex-col justify-between"
            >
              {/* Ultra High Resolution Category Image with Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              </div>

              <div className="relative z-20 p-8 pt-6 flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest font-bold text-black bg-[#D4AF37] px-3.5 py-1.5 rounded-[40px]">
                  {cat.count}
                </span>
              </div>

              <div className="relative z-20 p-8 space-y-4">
                <div>
                  <h3 className="text-2xl font-serif text-white tracking-wide">{cat.name}</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                {/* Ultra Luxury Inner Card Button */}
                <a 
                  href={`https://wa.me/918866660748?text=Hello!%20I%20am%20interested%20in%20exploring%20the%20${encodeURIComponent(cat.name)}%20options.`}
                  target="_blank"
                  className="relative group/btn overflow-hidden w-full py-3.5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-[10px] tracking-[0.2em] font-black uppercase rounded-[40px] text-center shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.7)] transition-all duration-500 flex items-center justify-center animate-shine-hover"
                >
                  <span className="absolute inset-y-0 left-0 w-12 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
                  <span className="relative z-10">Inquire Fabric & Sizing</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Customizer Studio */}
      <section id="customizer" className="py-24 bg-black/20 border-t border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Harikrishna 3D Design Lab</span>
              <h2 className="text-3xl md:text-5xl font-serif">Bespoke Fabric Studio</h2>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Interact with our flagship modular velvet lounge concept in real-time. Simply drag your cursor or swipe on mobile to rotate, customize color layers, and explore dimensions.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Select Bespoke Fabrics:</span>
              <div className="flex flex-wrap gap-4">
                {[
                  { color: '#D4AF37', label: 'Gold Suede' },
                  { color: '#1B4D3E', label: 'Emerald Velvet' },
                  { color: '#4E3629', label: 'Walnut Chocolate' },
                  { color: '#121212', label: 'Matte Charcoal' },
                  { color: '#0F2C59', label: 'Imperial Indigo' }
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveModelColor(item.color)}
                    style={{ backgroundColor: item.color }}
                    className={`w-10 h-10 rounded-full border-2 transition-transform transform hover:scale-110 ${
                      activeModelColor === item.color ? 'border-white ring-2 ring-[#D4AF37]' : 'border-transparent'
                    }`}
                    title={item.label}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 rounded-[40px] bg-white/5 border border-white/5 flex gap-4 items-center">
              <span className="p-3.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <div>
                <h4 className="text-sm font-semibold tracking-wide text-white">Full-Scale Dimensioning</h4>
                <p className="text-xs text-gray-400 mt-0.5">Contact our Katargam designers to customize frame width & seat cushions exactly to your layout.</p>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Ultra Luxury Button - Customizer Action */}
              <a 
                href={`https://wa.me/918866660748?text=Hello%20Harikrishna%20Furnishing%2C%20I%20want%20to%20customize%20the%203D%20sofa%20in%20color%20${encodeURIComponent(activeModelColor)}.`}
                target="_blank"
                className="relative group overflow-hidden w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-xs font-black uppercase tracking-[0.2em] rounded-[40px] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.7)] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center animate-shine-hover"
              >
                <span className="absolute inset-y-0 left-0 w-20 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
                <span className="relative z-10">Configure Selection</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Canvas Box in rounded-[40px] */}
          <div className="relative h-[480px] lg:h-[550px] w-full rounded-[40px] overflow-hidden border border-white/10 bg-[#121212]/50 shadow-2xl">
            <div ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
            
            <div className="absolute top-6 right-6 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-[40px] border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] tracking-widest font-bold uppercase text-[#D4AF37]">3D Studio Active</span>
            </div>
          </div>

        </div>
      </section>

      {/* Product Showcase */}
      <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Uncompromising Masterpieces</span>
          <h2 className="text-3xl md:text-5xl font-serif">Curated Showcase</h2>
        </div>

        {/* Premium Tab Bar in rounded-[40px] */}
        <div className="flex flex-wrap justify-center gap-4 bg-white/5 border border-white/5 p-3 rounded-[40px] max-w-3xl mx-auto">
          {['all', 'sofas', 'beds', 'curtains', 'dining'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-[40px] text-xs uppercase tracking-[0.2em] font-bold border transition-all duration-500 transform hover:-translate-y-0.5 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black border-transparent shadow-[0_4px_15px_rgba(212,175,55,0.4)]' 
                  : themeMode === 'dark' 
                    ? 'border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5 text-white' 
                    : 'border-black/10 hover:border-[#D4AF37]/50 hover:bg-black/5 text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid of rounded-[40px] cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SHOWCASE_PRODUCTS
            .filter(p => activeTab === 'all' || p.cat === activeTab)
            .map((prod) => (
              <div 
                key={prod.id} 
                className="group relative overflow-hidden rounded-[40px] bg-black/30 border border-white/10 p-5 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden rounded-[40px]">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/80 text-[#D4AF37] text-[10px] tracking-widest font-bold uppercase rounded-[40px] border border-white/10">
                      Bespoke
                    </span>
                  </div>
                </div>

                <div className="pt-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-serif tracking-wide text-white">{prod.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">Estimate Frame Cost: {prod.price}</p>
                  </div>

                  {/* Ultra Luxury Action Button */}
                  <a 
                    href={`https://wa.me/918866660748?text=Hello%20Harikrishna%20Furnishing%2C%20I%20am%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(prod.name)}.`}
                    target="_blank"
                    className="relative group overflow-hidden w-full py-3.5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-[10px] tracking-[0.2em] font-black uppercase rounded-[40px] text-center shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.6)] transition-all duration-500 flex items-center justify-center animate-shine-hover"
                  >
                    <span className="absolute inset-y-0 left-0 w-12 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
                    <span className="relative z-10">Send Spec Inquiry</span>
                  </a>
                </div>
              </div>
          ))}
        </div>
      </section>

      {/* Space Transformations */}
      <section id="transformation" className="py-24 bg-black/10 border-t border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Unveiling Grandeur</span>
            <h2 className="text-3xl md:text-5xl font-serif">Space Transformations</h2>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
              Drag the golden central divider to reveal how bare spaces are converted into fully customized, luxurious master sanctuaries.
            </p>
          </div>

          {/* Interactive Slider Container with rounded-[40px] */}
          <div 
            ref={beforeAfterRef}
            onMouseMove={(e) => handleBeforeAfterMove(e.clientX)}
            onTouchMove={onSliderTouchMove}
            className="relative h-[550px] w-full rounded-[40px] overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl"
          >
            {/* Background Empty Room (BEFORE) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80" 
                alt="Before Bare Space" 
                className="w-full h-full object-cover brightness-[0.6]" 
              />
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-[40px] border border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Before • Bare Canvas</span>
              </div>
            </div>

            {/* Foreground Luxury Living Room (AFTER) */}
            <div 
              className="absolute inset-y-0 left-0 h-full overflow-hidden transition-all duration-75"
              style={{ width: `${beforeAfterProgress}%` }}
            >
              <div className="absolute inset-0 w-full h-full" style={{ width: beforeAfterRef.current?.clientWidth || '100%' }}>
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
                  alt="After Furnished Living Room" 
                  className="w-full h-full object-cover brightness-[0.8]" 
                />
                <div className="absolute top-6 left-6 bg-[#D4AF37] text-black px-4 py-2 rounded-[40px] shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-widest">After • Harikrishna Furnishing</span>
                </div>
              </div>
            </div>

            {/* Slider Bar & Controller */}
            <div 
              className="absolute inset-y-0 w-1.5 bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#B38728] z-30 flex items-center justify-center cursor-ew-resize"
              style={{ left: `${beforeAfterProgress}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-black border-2 border-[#D4AF37] text-[#D4AF37] shadow-xl flex items-center justify-center text-xs font-black">
                ↔
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Unmatched Sophistication</span>
          <h2 className="text-3xl md:text-5xl font-serif">Why Harikrishna Furnishing</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Custom Furniture Design", text: "Every sofa, dining system, and drapery set is custom-dimensioned to fit your residence precisely." },
            { title: "Premium Quality Materials", text: "We import finest quality Belgian silks, Italian velvets, and solid wood frames to ensure generations of comfort." },
            { title: "Expert Craftsmanship", text: "Our team consists of master craftsmen who apply meticulous traditional techniques with contemporary modern design aesthetics." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-[#D4AF37]/50 shadow-lg transition-all duration-500 space-y-4">
              <span className="inline-block p-4 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xl font-bold font-serif">
                0{idx + 1}
              </span>
              <h4 className="text-xl font-serif text-white">{item.title}</h4>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-black/20 border-t border-b border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Our Illustrious Clientele</span>
          <h2 className="text-3xl md:text-5xl font-serif">Client Testimonials</h2>
          
          <div className="p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/5 relative shadow-xl">
            <p className="text-lg md:text-2xl font-serif italic text-gray-200 leading-relaxed">
              "{REVIEWS[activeReview].text}"
            </p>

            <div className="flex justify-center space-x-1.5 text-yellow-500 py-6">
              {[...Array(REVIEWS[activeReview].rating)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <img 
                src={REVIEWS[activeReview].avatar} 
                alt={REVIEWS[activeReview].name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]" 
              />
              <div className="text-left">
                <h5 className="font-serif font-bold text-white">{REVIEWS[activeReview].name}</h5>
                <p className="text-xs text-gray-400">{REVIEWS[activeReview].role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            {REVIEWS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveReview(i)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeReview === i ? 'bg-[#D4AF37] border-transparent scale-125' : 'bg-transparent border-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* VIP Design Bookings */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#121212] via-[#1E1E1E] to-[#121212] border-t border-b border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">VIP Private Design Bookings</span>
          <h2 className="text-4xl md:text-6xl font-serif">Design Your Dream Mansion Today</h2>
          <p className="text-sm md:text-base text-gray-300 font-light max-w-xl mx-auto">
            Book an absolute private styling session with our lead architects and engineers in Surat. Walk away with exact structural drafts and velvet fabric templates.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {/* Ultra Luxury Button - CTA Book Booking */}
            <a 
              href="https://wa.me/918866660748?text=Hello!%20I%20would%20love%20to%20arrange%20a%20site%20visit%20or%20luxury%20design%20consultation."
              target="_blank"
              className="relative group overflow-hidden px-10 py-5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black text-xs font-black uppercase tracking-[0.2em] rounded-[40px] shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.8)] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center animate-shine-hover"
            >
              <span className="absolute inset-y-0 left-0 w-20 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
              <span className="relative z-10">WhatsApp Studio Booking</span>
            </a>

            {/* Ultra Luxury Button - Call CTA */}
            <a 
              href="tel:+918866660748" 
              className="relative group overflow-hidden px-10 py-5 border border-white/20 hover:border-transparent bg-black/40 backdrop-blur-md text-white hover:text-black text-xs font-bold uppercase tracking-[0.2em] rounded-[40px] shadow-[0_4px_25px_rgba(212,175,55,0.15)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.5)] bg-gradient-to-r hover:from-[#BF953F] hover:via-[#FCF6BA] hover:to-[#B38728] transition-all duration-500 transform hover:-translate-y-0.5 flex items-center justify-center animate-shine-hover"
            >
              <span className="absolute inset-y-0 left-0 w-20 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
              <span className="relative z-10">Call Live Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* Showroom & Maps */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Form Box in rounded-[40px] */}
        <div className="space-y-8 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Premium Inquiries</span>
            <h2 className="text-3xl md:text-5xl font-serif">Submit Design Customization</h2>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const fullMsg = `Hello Harikrishna Furnishing. My Name is: ${inquiryName}, Phone: ${inquiryPhone}. I want to inquire about: ${inquiryMsg}`;
            window.open(`https://wa.me/918866660748?text=${encodeURIComponent(fullMsg)}`, '_blank');
          }} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Your Full Name</label>
                <input 
                  type="text" 
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Amit Patel" 
                  required
                  className="w-full p-4 rounded-2xl bg-[#121212] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Phone Number</label>
                <input 
                  type="tel" 
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="e.g. +91 99999 99999" 
                  required
                  className="w-full p-4 rounded-2xl bg-[#121212] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Dimensions & Preferred Sizing Specifications</label>
              <textarea 
                value={inquiryMsg}
                onChange={(e) => setInquiryMsg(e.target.value)}
                placeholder="Describe your dining room space, Italian velvet choices, or custom silk curtain layout configurations..." 
                rows={5}
                required
                className="w-full p-4 rounded-2xl bg-[#121212] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]" 
              />
            </div>

            {/* Ultra Luxury Form Button */}
            <button 
              type="submit" 
              className="relative group overflow-hidden w-full py-5 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black font-black uppercase text-xs tracking-[0.25em] rounded-[40px] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.8)] transition-all duration-500 transform hover:-translate-y-0.5 animate-shine-hover"
            >
              <span className="absolute inset-y-0 left-0 w-24 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
              <span className="relative z-10">Send Spec via WhatsApp</span>
            </button>
          </form>
        </div>

        {/* Location & Contact Information Column */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Physical Gallery</span>
            <h2 className="text-3xl md:text-5xl font-serif">Visit Our Showroom</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              We warmly welcome you to witness real-life leather, velvet texture rolls and majestic furniture mockups first hand.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <span className="text-[#D4AF37] text-lg">📍</span>
                <div>
                  <p className="font-semibold text-white">Harikrishna Furnishing Studio</p>
                  <p className="text-xs text-gray-400">Purshotam Park Society, Lalita Chowk Road, Opp. Kantareshvar Mahadev Temple, Katargam, Surat, Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-[#D4AF37] text-lg">📞</span>
                <p className="text-xs text-gray-400">Call Us Direct: +91 88666 60748</p>
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Frame in rounded-[40px] */}
          <div className="relative h-80 rounded-[40px] overflow-hidden border border-white/10 shadow-xl">
            <iframe 
              title="Harikrishna Furnishing Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.167812975877!2d72.825225!3d21.22524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f26b5aa619d%3A0xe7261d71bcbbd5ab!2sHarikrishna%20Furnishing!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="w-full h-full border-0 brightness-75 contrast-125"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </section>

      {/* Floating Chat Concierge */}
      <div className="fixed bottom-6 right-6 z-50">
        
        <button 
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="relative group overflow-hidden p-4 rounded-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-[length:200%_auto] hover:bg-right text-black shadow-2xl hover:scale-110 transition-transform duration-500 animate-shine-hover"
        >
          <span className="absolute inset-y-0 left-0 w-12 bg-white/40 transform -skew-x-12 -translate-x-full shine-overlay pointer-events-none" />
          {chatbotOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-black hidden md:inline-block pl-2">AI Interior Concierge</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          )}
        </button>

        {chatbotOpen && (
          <div className="absolute bottom-20 right-0 w-[350px] md:w-[420px] rounded-[40px] overflow-hidden shadow-2xl bg-[#1E1E1E] border border-[#D4AF37]/30 flex flex-col z-50 animate-fade-in">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#121212] to-[#1e1e1e] border-b border-[#D4AF37]/20 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-serif text-[#D4AF37] font-semibold tracking-wide">Aria • Design Concierge</h4>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">Harikrishna Bespoke Services</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
            </div>

            {/* Message Box */}
            <div className="p-6 h-80 overflow-y-auto space-y-4 bg-[#121212]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-3xl text-xs max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#D4AF37] text-black font-semibold rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white/5 rounded-xl text-xs text-gray-400 animate-pulse">
                    Aria is configuring a personalized design draft...
                  </div>
                </div>
              )}
            </div>

            {/* Input Panel */}
            <div className="p-4 border-t border-[#D4AF37]/20 bg-[#1E1E1E] flex gap-2">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                placeholder="Ask about fabrics, sizes, or showroom..."
                className="flex-1 p-3 rounded-2xl bg-black text-white text-xs border border-white/10 focus:outline-none focus:border-[#D4AF37]"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-black rounded-xl transition"
              >
                <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-20 px-6 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white tracking-widest uppercase">HARIKRISHNA</h3>
            <p className="text-xs font-light leading-relaxed">
              Surat's leading ultra-luxury home furnishing brand. We design and deliver custom architectural furniture that stands the test of time.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">Collections</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#categories" className="hover:text-white transition">Italian Velvet Sofas</a></li>
              <li><a href="#categories" className="hover:text-white transition">Royal Bed Sanctuary</a></li>
              <li><a href="#categories" className="hover:text-white transition">Silk Drapery & Curtains</a></li>
              <li><a href="#categories" className="hover:text-white transition">Bespoke Living Rooms</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">Contact Studio</h4>
            <p className="text-xs font-light">
              📍 Katargam, Surat, Gujarat, India <br/>
              📞 +91 88666 60748 <br/>
              📧 concierge@harikrishnafurnishings.com
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold">Elite Experiences</h4>
            <p className="text-xs font-light leading-relaxed">
              Reach out via our WhatsApp integration for premium catalog selections and priority dimensioning appointments.
            </p>
            <div className="pt-2">
              <a 
                href="https://wa.me/918866660748" 
                target="_blank"
                className="inline-block text-xs font-bold text-[#D4AF37] hover:underline uppercase tracking-widest"
              >
                Access Catalog Files →
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 Harikrishna Furnishing. Crafted to World-Class Luxury Standards.</p>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-white transition">Back to Top</a>
            <span>•</span>
            <a href="https://wa.me/918866660748" className="hover:text-white transition">WhatsApp Admin Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}