import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, MapPin, Mail, ArrowRight, Star, 
  MessageCircle, Lock, ChevronRight, ShieldCheck, 
  Clock, Search, ShoppingBag, Plus, Minus, Trash2, 
  Heart, Award, Sparkles, Shield, Compass, Moon, Sun, 
  Calendar, CheckCircle, Info, ChevronLeft
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: "Imperial Sateen Bedsheet Suite", 
    category: "Bedsheets", 
    desc: "1200 TC long-staple Egyptian cotton with a masterfully tailored double-mercerized finish for a high-luster drape.", 
    price: 8999, 
    oldPrice: 12999,
    isBestSeller: true, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781114488589-0f569317-3abf-4ff9-929a-5fcbb0321c79.jpg" 
  },
  { 
    id: 2, 
    name: "Classic Block Mulmul Dohar", 
    category: "Dohars", 
    desc: "Triple-layered organic mulmul, hand-block printed using natural dyes by heritage artisans in Rajasthan.", 
    price: 6499, 
    oldPrice: 8500,
    isBestSeller: true, 
    isFeatured: false,
    image: "https://www.image2url.com/r2/default/images/1781114797258-87404b00-bf2e-468f-af09-692986f9f9ea.jpg" 
  },
  { 
    id: 3, 
    name: "Bespoke Architectural Linen Curtain Set", 
    category: "Curtains", 
    desc: "Heavyweight Belgian flax linen woven with a dense structure, offering premium noise mitigation and light filtering.", 
    price: 18499, 
    oldPrice: 24999,
    isBestSeller: false, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781115051792-42849777-40f0-42c5-bd67-37454d7c2b78.jpg" 
  },
  { 
    id: 4, 
    name: "Royal Velvet Chenille Sofa Fabric", 
    category: "Sofa Fabrics", 
    desc: "A ultra-durable, high Martindale count upholstery velvet woven with rich, multi-tonal dimensional fibers.", 
    price: 3200, 
    oldPrice: 4500,
    isBestSeller: true, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781115198161-9c35b0f1-0361-4593-887b-64ac7b8d70e4.jpg" 
  },
  { 
    id: 5, 
    name: "Royal Cashmere Blend Thermal Blanket", 
    category: "Blankets", 
    desc: "Sourced from high-altitude herds, blended with extra-fine merino wool for breathable all-season insulation.", 
    price: 14500, 
    oldPrice: 19000,
    isBestSeller: false, 
    isFeatured: false,
    image: "https://www.image2url.com/r2/default/images/1781115389142-f2d51bf3-5c91-4a1e-9fea-edb716584f72.jpg" 
  },
  { 
    id: 6, 
    name: "All-Weather Silken Comforter", 
    category: "Comforters", 
    desc: "Encasement crafted from mulberry silk shields, filled with hypoallergenic down-alternative clusters.", 
    price: 11999, 
    oldPrice: 16500,
    isBestSeller: true, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781115548568-06529838-0cfb-4c4b-86dd-debabe4c3f60.jpg" 
  },
  { 
    id: 7, 
    name: "Embellished Jacquard Quilted Bedcover", 
    category: "Bedcovers", 
    desc: "Heavily crafted quilted layers featuring intricate self-weaving patterns and timeless corded borders.", 
    price: 15499, 
    oldPrice: 21999,
    isBestSeller: false, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781115678356-c829971c-03fd-40c4-98ab-64a636a60390.jpg" 
  },
  { 
    id: 8, 
    name: "Orthocare Natural Latex Mattress", 
    category: "Mattresses", 
    desc: "High-density natural latex layered with responsive micro-pocketed coil modules to provide zoned spinal support.", 
    price: 34999, 
    oldPrice: 48999,
    isBestSeller: true, 
    isFeatured: true,
    image: "https://www.image2url.com/r2/default/images/1781115855472-6c6bd0a1-f64b-4f18-9da7-fbb413b283cb.jpg" 
  },
  { 
    id: 9, 
    name: "Memory Contour Ortho Pillow Suite", 
    category: "Pillows & Cushions", 
    desc: "Ergonomically engineered memory foam cores with adaptive heat-dissipating channels and soft cotton bamboo wraps.", 
    price: 4500, 
    oldPrice: 6200,
    isBestSeller: false, 
    isFeatured: false,
    image: "https://www.image2url.com/r2/default/images/1781115916220-ac324ebf-fbf2-43bd-84ad-a6e7f3130224.jpg" 
  }
];

const REVIEWS = [
  { id: 1, author: "Aishwarya Sen", role: "Interior Architect, Indore", text: "D Himmatlal and Company is our go-to partner for premium projects. Their customizable drapery options and high-thread-count sateen sheets bring an elegant Indian touch to contemporary interiors.", stars: 5, date: "Google Review" },
  { id: 2, author: "Rajesh Malhotra", role: "Vasant Vihar Resident", text: "The orthopedic mattresses and pure block mulmul dohars have redefined our comfort standard. This brand represents decades of uncompromising quality.", stars: 5, date: "Verified Buyer" },
  { id: 3, author: "Meenakshi Vadera", role: "Luxury Home Collector", text: "Exceptional fabric longevity. I ordered their Egyptian sateen bedsheets years ago, and they still look as premium as day one. A trusted brand with deep heritage.", stars: 5, date: "Luxury Member" }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Choose Perfect Curtains",
    category: "Bespoke Guides",
    desc: "Learn about fabric weight, custom headers, light filtering, and precise calculations of floor-to-ceiling draperies.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    readTime: "6 Min Read"
  },
  {
    id: 2,
    title: "Best Bedsheets for Luxury Bedrooms",
    category: "Bedding Science",
    desc: "A dive into fabric compositions: Egyptian long-staple cotton versus linen weaves, and thread count thresholds.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    readTime: "8 Min Read"
  },
  {
    id: 3,
    title: "How to Select Sofa Fabric for Your Home",
    category: "Upholstery Design",
    desc: "Understanding the Martindale pill count test, stain resistance structures, and choosing between velvet or linen blends.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    readTime: "5 Min Read"
  }
];

const GALLERY_PHOTOS = [
  { id: 1, tag: "Bedroom Styling", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80" },
  { id: 2, tag: "Curtain Ideas", src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80" },
  { id: 3, tag: "Sofa Fabric Looks", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80" },
  { id: 4, tag: "Premium Bedding", src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80" },
  { id: 5, tag: "Luxury Home Decor", src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80" }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeGalleryTab, setActiveGalleryTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom interactive states
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Administrative State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [pin, setPin] = useState("");
  const [adminTab, setAdminTab] = useState("products");
  const [newPrice, setNewPrice] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  
  // Global configuration state editable via Admin Panel
  const [bannerAlert, setBannerAlert] = useState("FLAT 10% OFF PRE-APPLIED ON CART INQUIRIES • CELEBRATING 65+ YEARS OF HERITAGE ARTISTRY");
  const [themeMode, setThemeMode] = useState("light"); 
  const [toastMessage, setToastMessage] = useState(null);

  // Floating cursor tracking state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovering, setCursorHovering] = useState(false);

  // Dynamic booking state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    category: "Bedsheets",
    date: "",
    time: "11:00 AM",
    message: ""
  });

  const WAPP_NUMBER = "919827738838";

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Jost:wght@100;200;300;400;500;600;700&display=swap');
      
      :root {
        --luxe-ivory: #FAF9F6;
        --luxe-cream: #F4EFE6;
        --luxe-champagne: #C5A880;
        --luxe-gold-dark: #A48455;
        --luxe-charcoal: #1C1B19;
        --luxe-black: #121212;
      }
      
      body { 
        font-family: 'Jost', sans-serif; 
        background-color: var(--luxe-ivory); 
        color: var(--luxe-black); 
        overflow-x: hidden;
        transition: background-color 0.8s ease, color 0.8s ease;
      }
      
      body.dark-mode {
        background-color: var(--luxe-black);
        color: var(--luxe-ivory);
      }

      .font-serif { font-family: 'Cormorant Garamond', serif; }
      
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #121212; }
      ::-webkit-scrollbar-thumb { background: #C5A880; }
      
      .slow-zoom { animation: zoomBg 24s ease-in-out infinite alternate; }
      @keyframes zoomBg { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
      
      .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
      .scroll-reveal.visible { opacity: 1; transform: translateY(0); }

      .luxury-underline { position: relative; }
      .luxury-underline::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: #C5A880;
        transition: width 0.4s ease;
      }
      .luxury-underline:hover::after { width: 100%; }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05 });

    const timeout = setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
    }, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => { setToastMessage(null); }, 4000);
  };

  const handleAddToCart = (product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    triggerToast(`Added "${product.name}" to your Bespoke Cart`);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.product.id !== id));
    triggerToast("Item removed from Cart");
  };

  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
      triggerToast("Removed from luxury wishlist");
    } else {
      setWishlist([...wishlist, product.id]);
      triggerToast("Saved to your exclusive wishlist");
    }
  };

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) {
      triggerToast("Your boutique cart is empty.");
      return;
    }
    
    let subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    let discount = subtotal * 0.10;
    let grandTotal = subtotal - discount;

    let text = `👑 *D HIMMATLAL & COMPANY — LUXURY ORDER INQUIRY* 👑\n`;
    text += `Established 1959 | Fine Furnishings\n\n`;
    text += `Hello, I'd like to initiate a premium consultation order for the following curated articles:\n\n`;
    
    cart.forEach((item, index) => {
      text += `*${index + 1}. ${item.product.name}*\n`;
      text += `   Category: ${item.product.category}\n`;
      text += `   Quantity: ${item.quantity} Unit(s)\n`;
      text += `   Est. Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });

    text += `------------------------------------\n`;
    text += `Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
    text += `*Flat 10% OFF Discount:* -₹${discount.toLocaleString('en-IN')}\n`;
    text += `*Grand Total Order Estimate:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
    text += `------------------------------------\n\n`;
    text += `Please verify availability and arrange a design consultant call.\n`;
    text += `_Sent via loopsbylj.com-style premium interface_`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const querySingleProduct = (product) => {
    let text = `👑 *D HIMMATLAL & COMPANY — BESPOKE INQUIRY* 👑\n\n`;
    text += `Hi, I am interested in exploring the collection card for: *${product.name}*\n`;
    text += `Category: ${product.category}\n`;
    text += `Offered Price: ₹${product.price.toLocaleString('en-IN')}\n\n`;
    text += `Could you please share custom color books, catalogs, or fabric material specifications for this item? Thank you.`;
    
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const submitAppointment = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      triggerToast("Please input valid dynamic details.");
      return;
    }
    
    let text = `👑 *STORE VISIT / CONSULTATION BOOKING* 👑\n\n`;
    text += `Name: *${bookingForm.name}*\n`;
    text += `Phone Contact: ${bookingForm.phone}\n`;
    text += `Requested Suite Interest: ${bookingForm.category}\n`;
    text += `Date: ${bookingForm.date}\n`;
    text += `Preferred Slot: ${bookingForm.time}\n`;
    text += `Design Notes / Requirements:\n"${bookingForm.message || 'No custom notes.'}"\n\n`;
    text += `Please schedule an executive slot at the Vijay Nagar Showroom.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WAPP_NUMBER}?text=${encoded}`, '_blank');
    triggerToast("Appointment compiled! Redirecting to reservation team on WhatsApp.");
  };

  const verifyPasscode = () => {
    if (pin === "1959") {
      setAdminAuth(true);
      triggerToast("Owner console unlocked.");
    } else {
      triggerToast("Incorrect passcode. Hint: 1959");
    }
  };

  const executePriceUpdate = () => {
    if (!selectedProductEdit || !newPrice) {
      triggerToast("Please select a product and enter the custom price.");
      return;
    }
    setProducts(products.map(p => p.id === selectedProductEdit.id ? { ...p, price: Number(newPrice) } : p));
    triggerToast(`Price of ${selectedProductEdit.name} updated to ₹${Number(newPrice).toLocaleString('en-IN')}`);
    setNewPrice("");
    setSelectedProductEdit(null);
  };

  const executeProductImageUpdate = () => {
    if (!selectedProductEdit || !newProductImg) {
      triggerToast("Please select a product and enter a valid image URL.");
      return;
    }
    setProducts(products.map(p => p.id === selectedProductEdit.id ? { ...p, image: newProductImg } : p));
    triggerToast(`Image of ${selectedProductEdit.name} updated successfully.`);
    setNewProductImg("");
    setSelectedProductEdit(null);
  };

  const handleGlobalBannerTextUpdate = (newText) => {
    setBannerAlert(newText);
    triggerToast("Top banner text updated successfully.");
  };

  const subtotalCart = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountApplied = subtotalCart * 0.10;
  const finalCartTotal = subtotalCart - discountApplied;

  // Real-time Search filtering (AI/smart query mechanism)
  const filteredProducts = products.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(query) || 
                          p.category.toLowerCase().includes(query) || 
                          p.desc.toLowerCase().includes(query);
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen relative ${themeMode === 'dark' ? 'dark-mode bg-[#121212] text-[#FAF9F6]' : 'bg-[#FAF9F6] text-[#121212]'}`}>
      
      {/* Custom exquisite custom cursor for premium feel */}
      <div 
        className="hidden lg:block fixed pointer-events-none z-[110] transition-transform duration-75 mix-blend-difference rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: cursorHovering ? '48px' : '12px',
          height: cursorHovering ? '48px' : '12px',
          backgroundColor: cursorHovering ? 'transparent' : '#C5A880',
          border: cursorHovering ? '1.5px solid #C5A880' : 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Exquisite Top Interactive Header Promotional Alert Strip */}
      <div className="bg-[#121212] text-[#C5A880] text-[10px] md:text-xs py-3 px-4 text-center tracking-[0.25em] uppercase font-semibold z-50 relative border-b border-white/5 flex items-center justify-center gap-2 overflow-hidden">
        <Sparkles size={12} className="animate-pulse text-[#C5A880]" />
        <span className="animate-pulse">{bannerAlert}</span>
        <Sparkles size={12} className="animate-pulse text-[#C5A880]" />
      </div>

      {/* Floating Status Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[60] bg-[#121212]/95 border border-[#C5A880]/30 text-white rounded-lg p-4 shadow-2xl flex items-center gap-3 animate-bounce">
          <Award size={18} className="text-[#C5A880]" />
          <span className="text-xs font-medium tracking-wide uppercase">{toastMessage}</span>
        </div>
      )}

      {/* Primary Header Glassmorphism Navigation bar */}
      <header className={`fixed w-full top-10 z-40 transition-all duration-700 ${scrolled ? 'bg-[#FAF9F6]/90 dark:bg-[#121212]/95 shadow-lg py-3 border-b border-[#C5A880]/10' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo Brand Crest */}
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className={`font-serif text-2xl md:text-3xl tracking-[0.12em] font-medium transition-colors ${scrolled ? 'text-[#121212] dark:text-[#FAF9F6]' : 'text-white'}`}>
              D Himmatlal
            </span>
            <span className={`text-[8px] tracking-[0.35em] uppercase font-bold mt-1 transition-colors ${scrolled ? 'text-[#C5A880]' : 'text-[#C5A880]'}`}>
              &amp; CO. — ESTD. 1959
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {['Heritage', 'Collections', 'Bestsellers', 'Reviews', 'Showroom', 'Inquire'].map((tab) => (
              <a 
                key={tab} 
                href={`#${tab.toLowerCase()}`} 
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
                className={`text-[10px] tracking-[0.25em] uppercase font-bold transition-all luxury-underline ${scrolled ? 'text-[#121212] dark:text-[#FAF9F6]' : 'text-white/90 hover:text-[#C5A880]'}`}
              >
                {tab}
              </a>
            ))}
          </nav>

          {/* Header Action Elements */}
          <div className="flex items-center space-x-5">
            
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
              className={`p-1.5 rounded-full transition-colors ${scrolled ? 'text-[#121212] dark:text-[#FAF9F6] hover:bg-[#C5A880]/15' : 'text-white/90 hover:text-white'}`}
            >
              {themeMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Cart Drawer Toggle */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 transition-transform hover:scale-105"
            >
              <ShoppingBag size={18} className={scrolled ? 'text-[#121212] dark:text-[#FAF9F6]' : 'text-white'} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#121212] text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Admin Portal Trigger */}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className={`transition-colors ${scrolled ? 'text-[#121212] dark:text-[#FAF9F6]' : 'text-white/80 hover:text-[#C5A880]'}`}
              title="Admin Panel"
            >
              <Lock size={15} />
            </button>

            {/* Book Consultation */}
            <a 
              href="#inquire"
              className={`hidden md:inline-block text-[9px] tracking-[0.2em] uppercase font-bold px-6 py-2.5 border transition duration-500 rounded-sm
                ${scrolled ? 'border-[#121212] text-[#121212] dark:border-white dark:text-white hover:bg-[#121212] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#121212]'}`}
            >
              Book Consultation
            </a>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenu(!mobileMenu)} 
              className={`lg:hidden transition-colors ${scrolled ? 'text-[#121212] dark:text-[#FAF9F6]' : 'text-white'}`}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenu && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#FAF9F6] dark:bg-[#121212] border-b border-[#C5A880]/20 shadow-2xl py-6 px-6 flex flex-col space-y-4 text-center">
            {['Heritage', 'Collections', 'Bestsellers', 'Reviews', 'Showroom', 'Inquire'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setMobileMenu(false)} 
                className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#121212] dark:text-[#FAF9F6] hover:text-[#C5A880]"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => { setMobileMenu(false); setIsCartOpen(true); }}
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#121212] dark:text-[#FAF9F6] border-y py-2 border-[#C5A880]/10 flex justify-center gap-1"
            >
              View Luxury Cart ({cart.reduce((tot, it) => tot + it.quantity, 0)})
            </button>
            <a 
              href={`https://wa.me/${WAPP_NUMBER}`}
              onClick={() => setMobileMenu(false)}
              className="text-[9px] tracking-[0.2em] uppercase text-white bg-[#121212] py-3.5 rounded-sm"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        )}
      </header>

      {}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=80" 
            alt="Bespoke Luxury Interiors" 
            className="w-full h-full object-cover slow-zoom opacity-60 filter contrast-[1.05]"
          />
          {/* Bottom vignette gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 via-transparent to-[#FAF9F6] dark:to-[#121212]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12 scroll-reveal">
          
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-3 border border-[#C5A880]/50 bg-[#121212]/85 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold">SINCE 1959 • 65+ YEARS OF REFINED COMFORT</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[1.05] tracking-tight mb-8">
            Heritage Home Furnishings <br />
            for <span className="italic text-[#C5A880]">Elegant Living</span>
          </h1>
          
          <p className="text-white/90 max-w-2xl text-xs md:text-sm font-light tracking-widest leading-relaxed mb-12 uppercase">
            Crafting pure Indian textiles, bespoke window styling curtain lines, and premium memory bedding suites designed by generations of artistic craftsmen in Indore.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <a 
              href="#collections" 
              className="px-10 py-4 bg-[#C5A880] text-[#121212] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-white hover:text-[#121212] transition-all duration-500 w-full sm:w-auto text-center shadow-lg"
            >
              Explore Collections
            </a>
            <a 
              href="#showroom" 
              className="px-10 py-4 bg-transparent border border-[#C5A880] text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#C5A880] hover:text-white transition-all duration-500 w-full sm:w-auto text-center"
            >
              Visit Showroom
            </a>
            <a 
              href={`https://wa.me/${WAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 bg-[#25D366]/20 border border-[#25D366] text-white text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#25D366] transition-all duration-500 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} /> WhatsApp Catalog
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#C5A880]">Scroll</span>
          <div className="w-1 h-12 bg-[#C5A880]/20 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-[#C5A880] animate-bounce"></div>
          </div>
        </div>
      </section>

      {}
      <section id="heritage" className="py-24 bg-[#FAF9F6] dark:bg-[#151515] relative overflow-hidden transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative scroll-reveal">
              <div className="aspect-[4/5] overflow-hidden bg-[#E8E1D7] p-3 relative rounded-sm">
                <div className="absolute inset-0 border border-[#C5A880]/30 m-3 pointer-events-none z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1617103996702-96ff29b1c46b?auto=format&fit=crop&w=1000&q=80" 
                  alt="Fine textile design legacy" 
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#C5A880] text-[#121212] p-8 hidden md:block">
                <p className="font-serif text-3xl font-light">65+</p>
                <p className="text-[8px] tracking-[0.2em] uppercase font-bold">Years of Trust</p>
              </div>
            </div>

            <div className="scroll-reveal">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-4">Our Brand Story</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light leading-[1.15] mb-8">
                Uncompromising Quality. <br />Decades of Devotion.
              </h2>
              <p className="text-[#3D2E24]/80 dark:text-white/70 text-sm font-light leading-relaxed mb-12 max-w-lg">
                For over six decades, D Himmatlal and Company has transformed premium houses into elegant homes through highly precise curtain cuts, bespoke comfort mattresses, and premium cotton weaves. Our story is woven in trust.
              </p>

              {/* Timeline Cards */}
              <div className="border-l-2 border-[#C5A880]/30 pl-8 space-y-10 relative">
                {[
                  { year: "1959", title: "Foundations by late Himmatlal Vadalia", desc: "Instilling deep core values of absolute trust, reliable customer relationship, and handpicked natural textiles." },
                  { year: "1992", title: "Second Gen: Sharad Himmatlal Vadalia", desc: "Expanding business realms into high-density orthopedic comfort mattresses, bespoke draperies, and premium hotel furnishings." },
                  { year: "Present", title: "Continuing the Elite Third Gen Legacy", desc: "Implementing interactive virtual customization protocols, modern digital showcases, and our premiere experiential studio at Vijay Nagar." }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#C5A880] border-4 border-[#FAF9F6] dark:border-[#151515] transition-transform duration-300 group-hover:scale-125"></div>
                    <span className="text-xs font-bold text-[#C5A880] tracking-widest">{item.year}</span>
                    <h4 className="font-serif text-xl text-[#121212] dark:text-white mt-1 mb-2 font-medium">{item.title}</h4>
                    <p className="text-xs text-[#3D2E24]/70 dark:text-white/60 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Luxury Statistics section */}
      <section className="py-16 bg-[#F4EFE6] dark:bg-[#121212] border-y border-[#C5A880]/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { val: "65+", label: "Years Legacy" },
              { val: "3", label: "Generations of trust" },
              { val: "10k+", label: "Customers Styled" },
              { val: "100%", label: "Tactile Luxury Quality" }
            ].map((stat, i) => (
              <div key={i} className="scroll-reveal">
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#C5A880] font-light">{stat.val}</p>
                <p className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#121212] dark:text-white/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="collections" className="py-24 bg-[#FAF9F6] dark:bg-[#151515] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Our Catalog</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light">Featured Curations</h2>
            <div className="w-16 h-[1px] bg-[#C5A880] mx-auto mt-4 mb-8"></div>
            
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["All", "Bedsheets", "Dohars", "Curtains", "Sofa Fabrics", "Blankets", "Comforters", "Bedcovers", "Mattresses", "Pillows & Cushions"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                  className={`text-[9px] tracking-[0.2em] uppercase font-bold px-5 py-2.5 transition-all duration-300 border ${
                    activeCategory === cat 
                      ? 'bg-[#C5A880] text-[#121212] border-[#C5A880]' 
                      : 'bg-transparent text-[#121212]/60 dark:text-white/60 border-[#C5A880]/25 hover:border-[#C5A880]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Smart Search Filter Tool */}
            <div className="relative max-w-md mx-auto mb-12">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bedsheets, curtains, comforters..." 
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#121212] border border-[#C5A880]/30 rounded-full text-xs focus:outline-none focus:border-[#C5A880] text-black dark:text-white transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 text-[#C5A880]" size={14} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-4 top-3.5 text-xs text-[#C5A880] hover:text-[#121212] dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal">
            {filteredProducts.map((p) => {
              const inWishlist = wishlist.includes(p.id);
              return (
                <div key={p.id} className="bg-white dark:bg-[#121212] border border-[#C5A880]/15 hover:border-[#C5A880]/50 transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between shadow-sm relative group">
                  
                  {/* Floating Indicators */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {p.isBestSeller && (
                      <span className="bg-[#121212] dark:bg-[#FAF9F6] text-white dark:text-[#121212] text-[8px] tracking-widest font-black uppercase px-3 py-1">
                        Bestseller
                      </span>
                    )}
                    {p.isFeatured && (
                      <span className="bg-[#C5A880] text-[#121212] text-[8px] tracking-widest font-black uppercase px-3 py-1">
                        Signature
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm text-red-500 shadow-md transition-transform hover:scale-110"
                  >
                    <Heart size={14} fill={inWishlist ? "red" : "none"} />
                  </button>

                  {/* Image Area with luxury hover pan */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E1D7]">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter group-hover:brightness-95"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Meta details */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-1">
                        {p.category}
                      </span>
                      <h3 className="font-serif text-2xl text-[#121212] dark:text-white font-normal mb-3">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#3D2E24]/75 dark:text-white/60 font-light leading-relaxed mb-6">
                        {p.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C5A880]/10">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-sm font-bold text-[#C5A880]">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs line-through text-[#121212]/30 dark:text-white/30">
                          ₹{p.oldPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Order actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => handleAddToCart(p)}
                          className="flex items-center justify-center gap-1.5 py-3 border border-[#C5A880] text-[#121212] dark:text-white text-[9px] tracking-widest uppercase font-bold hover:bg-[#C5A880] hover:text-[#121212] transition-colors"
                        >
                          <ShoppingBag size={12} /> Add to Cart
                        </button>
                        <button 
                          onClick={() => querySingleProduct(p)}
                          className="flex items-center justify-center gap-1.5 py-3 bg-[#121212] dark:bg-white text-white dark:text-[#121212] text-[9px] tracking-widest uppercase font-bold hover:bg-[#C5A880] hover:text-[#121212] transition-colors"
                        >
                          <MessageCircle size={12} /> Inquire
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="bestsellers" className="py-24 bg-[#F4EFE6] dark:bg-[#121212] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Indore's Favorites</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light">Heritage Best Sellers</h2>
            <p className="text-xs text-[#3D2E24]/60 dark:text-white/60 tracking-widest uppercase mt-2">The highest-rated masterworks chosen by local connoisseurs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal">
            {products.filter(p => p.isBestSeller).slice(0, 3).map((p) => (
              <div key={p.id} className="relative group">
                <div className="aspect-[3/4] overflow-hidden bg-[#E8E1D7] mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="text-center">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-2">{p.category}</span>
                  <h3 className="font-serif text-2xl text-[#121212] dark:text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-[#C5A880] font-bold mb-4">₹{p.price.toLocaleString('en-IN')}</p>
                  <button 
                    onClick={() => handleAddToCart(p)}
                    className="text-[9px] tracking-[0.2em] uppercase font-bold border-b border-[#C5A880] text-[#121212] dark:text-white hover:text-[#C5A880] pb-1"
                  >
                    Curate this look
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#FAF9F6] dark:bg-[#151515] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Quality Metrics</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light">Why Choose Us</h2>
            <div className="w-16 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 scroll-reveal">
            {[
              { icon: <Clock size={24} strokeWidth={1} />, title: "65+ Years Legacy", desc: "Serving generations since late Himmatlal Vadalia laid the foundation in 1959." },
              { icon: <Shield size={24} strokeWidth={1} />, title: "3 Generations Trust", desc: "Meticulously sustained standards across generational family leadership." },
              { icon: <Sparkles size={24} strokeWidth={1} />, title: "Premium Quality Fabrics", desc: "Rigorous thread counts, pure dyes, and structural longevity fabric tests." },
              { icon: <Compass size={24} strokeWidth={1} />, title: "Wide Home Range", desc: "Complete curations from custom curtains to high-density orthopedic comfort." },
              { icon: <MessageCircle size={24} strokeWidth={1} />, title: "Personalized Care", desc: "Custom measurement visits and highly tactile showroom styling sessions." }
            ].map((v, idx) => (
              <div key={idx} className="bg-white dark:bg-[#121212] border border-[#C5A880]/15 p-8 rounded-sm hover:border-[#C5A880]/60 transition-colors duration-500 flex flex-col justify-between">
                <div className="text-[#C5A880] mb-6">{v.icon}</div>
                <div>
                  <h4 className="text-xs tracking-[0.15em] uppercase font-bold text-[#121212] dark:text-white mb-3">{v.title}</h4>
                  <p className="text-xs text-[#3D2E24]/70 dark:text-white/60 font-light leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#F4EFE6] dark:bg-[#121212] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 scroll-reveal">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Visual Journal</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#121212] dark:text-white font-light">Interior Inspiration</h2>
            </div>
            <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
              {["All", "Bedroom Styling", "Curtain Ideas", "Sofa Fabric Looks", "Premium Bedding", "Luxury Home Decor"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGalleryTab(tab)}
                  className={`text-[8px] tracking-[0.2em] uppercase font-bold pb-1 border-b transition-colors ${
                    activeGalleryTab === tab 
                      ? 'border-[#121212] dark:border-white text-[#121212] dark:text-white' 
                      : 'border-transparent text-[#121212]/40 dark:text-white/40 hover:text-[#C5A880]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal">
            {GALLERY_PHOTOS
              .filter(p => activeGalleryTab === "All" || p.tag === activeGalleryTab)
              .map((item) => (
                <div key={item.id} className="relative overflow-hidden group aspect-[4/5] bg-gray-200 shadow-md">
                  <img src={item.src} alt={item.tag} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-[9px] tracking-widest uppercase bg-white/95 text-black px-4 py-2 font-bold">{item.tag}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {}
      <section id="reviews" className="py-24 bg-[#FAF9F6] dark:bg-[#151515] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Google Reviews Integration</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light">Client Testimonials</h2>
            <div className="w-16 h-[1px] bg-[#C5A880] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white dark:bg-[#121212] border border-[#C5A880]/15 p-8 rounded-sm shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#C5A880] mb-6">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-serif text-lg text-[#121212] dark:text-white/95 italic font-light leading-relaxed mb-8">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-[#C5A880]/10 pt-4 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-[#121212] dark:text-white uppercase tracking-wider">{review.author}</h5>
                    <p className="text-[10px] text-[#C5A880] tracking-widest uppercase mt-0.5">{review.role}</p>
                  </div>
                  <span className="text-[8px] bg-gray-100 dark:bg-black p-1.5 font-bold tracking-widest text-[#121212]/40 dark:text-white/40 uppercase">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#F4EFE6] dark:bg-[#121212] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex justify-between items-end mb-16 scroll-reveal">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block mb-3">Refined Living Journal</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#121212] dark:text-white font-light">Buying Guides & Trends</h2>
            </div>
            <a href="#inquire" className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#121212] dark:text-white border-b border-[#121212] dark:border-white pb-1">
              Request Print Catalog
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal">
            {BLOG_POSTS.map((blog) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden mb-6 relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 bg-white/95 text-black text-[8px] tracking-widest font-black uppercase px-3 py-1">
                    {blog.category}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-[#121212] dark:text-white group-hover:text-[#C5A880] transition-colors mb-3">
                  {blog.title}
                </h4>
                <p className="text-xs text-[#3D2E24]/70 dark:text-white/60 font-light leading-relaxed mb-4">
                  {blog.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] tracking-widest font-bold uppercase text-[#C5A880]">{blog.readTime}</span>
                  <ChevronRight size={12} className="text-[#C5A880]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="showroom" className="py-24 bg-[#FAF9F6] dark:bg-[#151515] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 scroll-reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">Tactile Showroom Experience</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#121212] dark:text-white font-light leading-tight">
                Step Inside Our <br />Experiential Studio.
              </h2>
              <p className="text-[#3D2E24]/80 dark:text-white/70 text-sm font-light leading-relaxed">
                Nothing compares to physical touch. Walk into our flagship showroom situated in Indore's premium lifestyle district, **Vijay Nagar**. Uncover thousands of sample fabric books, curtain panel variations, and receive direct counsel from styling experts.
              </p>

              <div className="border-t border-[#C5A880]/20 pt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#C5A880] mt-1 shrink-0" strokeWidth={1.5} />
                  <div>
                    <h5 className="text-xs tracking-[0.1em] uppercase font-bold text-[#121212] dark:text-white mb-1">Vijay Nagar Showroom</h5>
                    <p className="text-xs text-[#121212]/60 dark:text-white/60 font-light">Scheme No 54, Vijay Nagar, Indore, Madhya Pradesh</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="https://g.page/r/CWTMtsuG5NfZECI" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C5A880] text-white text-[9px] tracking-widest uppercase font-bold rounded-sm hover:bg-[#121212] hover:text-[#C5A880] transition-colors shadow-lg"
                >
                  Open Google Maps <ArrowRight size={14} className="ml-2" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-[#2A2A2A] relative rounded-sm overflow-hidden shadow-2xl p-1 border border-[#C5A880]/20">
                <iframe 
                  title="D Himmatlal and Co Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5494954471954!2d75.8913945!3d22.7454215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd249a56cb6d%3A0x24d7e5868b4cb465!2sD%20Himmatlal%20And%20Company!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  className="w-full h-full border-0 grayscale opacity-95 hover:grayscale-0 transition-all duration-700" 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="inquire" className="py-24 bg-[#F4EFE6] dark:bg-[#121212] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 scroll-reveal">
          <div className="bg-white dark:bg-[#151515] border border-[#C5A880]/15 rounded-sm p-8 md:p-16 flex flex-col lg:flex-row gap-16 shadow-lg">
            
            <div className="lg:w-1/2 space-y-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880] font-semibold block">Connect Today</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#121212] dark:text-white font-light">Schedule Executive Consultation</h2>
              <p className="text-[#3D2E24]/75 dark:text-white/60 text-xs md:text-sm font-light leading-relaxed">
                Send us your window measurements, select preferred catalog styles, or request specific custom fabric samples.
              </p>
              
              <div className="space-y-6 pt-6 border-t border-[#C5A880]/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center text-lg"><Phone size={16} /></div>
                  <div>
                    <span className="text-[8px] tracking-widest text-[#C5A880] uppercase block">Owner Contact</span>
                    <a href="tel:+919827738838" className="text-sm font-bold text-[#121212] dark:text-white">+91 98277 38838</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 text-[#C5A880] flex items-center justify-center text-lg"><Mail size={16} /></div>
                  <div>
                    <span className="text-[8px] tracking-widest text-[#C5A880] uppercase block">Primary Inbox</span>
                    <a href="mailto:himmatlal1959@gmail.com" className="text-sm font-bold text-[#121212] dark:text-white">himmatlal1959@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <form onSubmit={submitAppointment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold block mb-2 text-[#121212] dark:text-white/80">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      placeholder="E.g. Devendra Singh" 
                      className="w-full bg-transparent border-b border-[#C5A880]/30 py-3 text-sm text-[#121212] dark:text-white focus:outline-none focus:border-[#C5A880]" 
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold block mb-2 text-[#121212] dark:text-white/80">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      placeholder="E.g. +91 98277 38838" 
                      className="w-full bg-transparent border-b border-[#C5A880]/30 py-3 text-sm text-[#121212] dark:text-white focus:outline-none focus:border-[#C5A880]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold block mb-2 text-[#121212] dark:text-white/80">Preferred Consultation Date</label>
                    <input 
                      required 
                      type="date" 
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full bg-transparent border-b border-[#C5A880]/30 py-3 text-sm text-[#121212] dark:text-white focus:outline-none focus:border-[#C5A880]" 
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold block mb-2 text-[#121212] dark:text-white/80">Select Product Suite</label>
                    <select 
                      value={bookingForm.category}
                      onChange={(e) => setBookingForm({...bookingForm, category: e.target.value})}
                      className="w-full bg-transparent border-b border-[#C5A880]/30 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="Bedsheets">Bedsheets Collection</option>
                      <option value="Curtains">Bespoke Curtains</option>
                      <option value="Sofa Fabrics">Premium Sofa Upholstery</option>
                      <option value="Mattresses">Orthocare Mattresses</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold block mb-2 text-[#121212] dark:text-white/80">Your Message / Measurement Details</label>
                  <textarea 
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    rows="3" 
                    placeholder="Please specify customization notes or ideal slot hours here..." 
                    className="w-full bg-transparent border-b border-[#C5A880]/30 py-3 text-sm text-[#121212] dark:text-white focus:outline-none focus:border-[#C5A880]"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#121212] dark:bg-white text-white dark:text-[#121212] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] hover:text-[#121212] text-[10px] tracking-widest uppercase font-bold transition-colors shadow-md"
                >
                  Initiate Booking via WhatsApp
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {}
      <footer className="bg-[#121212] pt-24 pb-12 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <span className="font-serif text-3xl tracking-[0.1em] font-medium text-white block mb-2">D Himmatlal</span>
              <span className="text-[9px] tracking-[0.4em] uppercase font-medium text-[#C5A880] block mb-8">ESTD. 1959</span>
              <p className="text-white/60 text-xs font-light leading-relaxed max-w-sm">
                An ultra-luxury Indian heritage brand specializing in premium bedsheets, custom linen curtains, authentic hand-woven dohars, sofa fabrics, and orthopedic mattress models. Styled for over 65 years.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A880] mb-8">Connect</h4>
              <ul className="space-y-4 text-xs font-light text-white/70">
                <li className="flex items-center gap-3"><Phone size={12} className="text-[#C5A880]" /> +91 98277 38838</li>
                <li className="flex items-center gap-3"><Mail size={12} className="text-[#C5A880]" /> himmatlal1959@gmail.com</li>
                <li className="flex items-start gap-3">
                  <MapPin size={12} className="text-[#C5A880] mt-0.5 shrink-0" />
                  <span>Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A880] mb-8">Quick Navigation</h4>
              <ul className="space-y-3 text-xs font-light text-white/70 uppercase tracking-wider">
                <li><a href="#heritage" className="hover:text-[#C5A880] transition-colors">Legacy Heritage</a></li>
                <li><a href="#collections" className="hover:text-[#C5A880] transition-colors">Signature Catalog</a></li>
                <li><a href="#showroom" className="hover:text-[#C5A880] transition-colors">Showroom Gallery</a></li>
                <li><a href="#bestsellers" className="hover:text-[#C5A880] transition-colors">Best Sellers</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-[0.25em] uppercase font-medium text-white/40">
            <p>&copy; 2026 D Himmatlal and Company. All Rights Reserved.</p>
            <p className="mt-4 sm:mt-0">Premium Heritage Comfort Since 1959.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a 
        href={`https://wa.me/${WAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} />
      </a>

      {}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex justify-end">
          <div className="bg-[#FAF9F6] dark:bg-[#121212] w-full max-w-md h-full flex flex-col justify-between p-8 shadow-2xl relative">
            
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#C5A880]/20 mb-6">
                <h3 className="font-serif text-2xl text-[#121212] dark:text-white flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#C5A880]" /> Bespoke Shopping Cart
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-[#121212] dark:text-white hover:text-[#C5A880]">
                  <X size={20} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={48} className="text-[#C5A880]/35 mx-auto mb-4" strokeWidth={1} />
                  <p className="text-xs tracking-widest text-[#121212]/50 dark:text-white/50 uppercase">Your luxury shopping cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs font-bold text-[#C5A880] tracking-widest uppercase mt-6 block mx-auto underline"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-6 max-h-[55vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between pb-4 border-b border-[#C5A880]/10">
                      <div className="flex items-center gap-4">
                        <img src={item.product.image} className="w-12 h-12 object-cover rounded-sm" alt="" />
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#121212] dark:text-white">{item.product.name}</h4>
                          <span className="text-[10px] text-[#C5A880] font-bold">₹{item.product.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#C5A880]/30 rounded-sm">
                          <button onClick={() => handleUpdateCartQty(item.product.id, -1)} className="p-1 px-2 hover:bg-[#C5A880]/10 text-xs">
                            <Minus size={10} />
                          </button>
                          <span className="text-xs px-2 font-bold">{item.quantity}</span>
                          <button onClick={() => handleUpdateCartQty(item.product.id, 1)} className="p-1 px-2 hover:bg-[#C5A880]/10 text-xs">
                            <Plus size={10} />
                          </button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total summary area with promotional discount calculation */}
            {cart.length > 0 && (
              <div className="border-t border-[#C5A880]/20 pt-6 space-y-4">
                <div className="flex justify-between text-xs tracking-widest uppercase">
                  <span className="text-[#121212]/60 dark:text-white/60">Cart Subtotal</span>
                  <span className="font-bold">₹{subtotalCart.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs tracking-widest uppercase text-green-600">
                  <span>Flat 10% Royal Discount</span>
                  <span>-₹{discountApplied.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm tracking-widest uppercase border-t border-[#C5A880]/10 pt-4">
                  <span className="font-bold">Grand Total</span>
                  <span className="font-bold text-[#C5A880]">₹{finalCartTotal.toLocaleString('en-IN')}</span>
                </div>

                <button 
                  onClick={checkoutViaWhatsApp}
                  className="w-full py-4 bg-[#C5A880] text-[#121212] hover:bg-[#121212] hover:text-[#C5A880] dark:hover:bg-white text-[10px] tracking-widest uppercase font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} /> Order on WhatsApp
                </button>
                <p className="text-[8px] text-[#121212]/40 dark:text-white/40 tracking-widest uppercase text-center">
                  Secure instant inquiry consultation. No payment required upfront.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {}
      {isAdminOpen && (
        <div className="fixed inset-0 bg-[#121212]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative flex flex-col">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="font-serif text-2xl flex items-center gap-2">
                <Lock size={18} className="text-[#C5A880]" /> Owner Admin Control
              </h3>
              <button onClick={() => { setIsAdminOpen(false); setAdminAuth(false); setPin(""); }} className="text-gray-500 hover:text-black">
                <X size={20} />
              </button>
            </div>

            {/* Authentication Passcode Prompt */}
            {!adminAuth ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <ShieldCheck size={48} className="text-[#C5A880] mb-4" strokeWidth={1} />
                <h4 className="font-serif text-xl mb-1 text-gray-800">Passcode Required</h4>
                <p className="text-[9px] tracking-widest uppercase text-gray-400 mb-6 font-semibold">Secured system node. (Hint: 1959)</p>
                <input 
                  type="password" 
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••"
                  className="text-center text-4xl tracking-[0.5em] w-36 bg-transparent border-b border-[#C5A880] focus:outline-none mb-8 text-[#121212]"
                />
                <button 
                  onClick={verifyPasscode}
                  className="px-10 py-3 bg-[#121212] text-white text-[10px] tracking-widest uppercase font-bold hover:bg-[#C5A880] transition"
                >
                  Verify Credentials
                </button>
              </div>
            ) : (
              /* Authorized Admin Panel Dashboard View */
              <div className="flex-1 flex flex-col md:flex-row h-full">
                
                {/* Lateral Control Tabs */}
                <div className="w-full md:w-64 bg-gray-100 p-6 space-y-2 border-r border-gray-200">
                  <button 
                    onClick={() => setAdminTab("products")}
                    className={`w-full text-left p-3 text-[9px] tracking-widest uppercase font-bold ${adminTab === 'products' ? 'bg-[#121212] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                    Adjust Pricing Matrix
                  </button>
                  <button 
                    onClick={() => setAdminTab("banners")}
                    className={`w-full text-left p-3 text-[9px] tracking-widest uppercase font-bold ${adminTab === 'banners' ? 'bg-[#121212] text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                    Modify Top Banners
                  </button>
                </div>

                {/* Sub-panel layout execution */}
                <div className="flex-1 p-8">
                  {adminTab === "products" && (
                    <div>
                      <h4 className="font-serif text-2xl mb-2 text-gray-800">Edit Price Structures & Product Images</h4>
                      <p className="text-xs text-gray-500 mb-6">Select an active collection card to adjust price metrics or custom source image URLs directly.</p>

                      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        {products.map((p) => (
                          <div 
                            key={p.id} 
                            onClick={() => { setSelectedProductEdit(p); setNewPrice(p.price); setNewProductImg(p.image); }}
                            className={`p-4 border rounded-sm cursor-pointer transition flex items-center justify-between ${
                              selectedProductEdit?.id === p.id ? 'border-[#C5A880] bg-[#C5A880]/10' : 'border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <img src={p.image} className="w-10 h-10 object-cover" alt="" />
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider">{p.name}</p>
                                <span className="text-[10px] text-gray-400">{p.category}</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#C5A880]">₹{p.price.toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing / Image adjustments details panel */}
                      {selectedProductEdit && (
                        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Adjusting parameters for: {selectedProductEdit.name}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[9px] uppercase tracking-widest font-bold block text-gray-500">Edit Price (INR)</label>
                              <div className="flex gap-2">
                                <input 
                                  type="number" 
                                  value={newPrice}
                                  onChange={(e) => setNewPrice(e.target.value)}
                                  className="border border-gray-300 rounded-sm p-3 text-xs w-full focus:outline-none focus:border-[#C5A880]"
                                  placeholder="New Price"
                                />
                                <button 
                                  onClick={executePriceUpdate}
                                  className="px-6 py-3 bg-[#121212] text-white text-[9px] tracking-widest uppercase font-bold hover:bg-[#C5A880] shrink-0"
                                >
                                  Apply Price
                                </button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-[9px] uppercase tracking-widest font-bold block text-gray-500">Edit Image URL</label>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  value={newProductImg}
                                  onChange={(e) => setNewProductImg(e.target.value)}
                                  className="border border-gray-300 rounded-sm p-3 text-xs w-full focus:outline-none focus:border-[#C5A880]"
                                  placeholder="https://example.com/image.jpg"
                                />
                                <button 
                                  onClick={executeProductImageUpdate}
                                  className="px-6 py-3 bg-[#121212] text-white text-[9px] tracking-widest uppercase font-bold hover:bg-[#C5A880] shrink-0"
                                >
                                  Apply Image
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {adminTab === "banners" && (
                    <div className="space-y-6">
                      <h4 className="font-serif text-2xl mb-2 text-gray-800">Modify Top Global Promotional Banners</h4>
                      <p className="text-xs text-gray-500">Update global dynamic texts shown at the top strip of the portal in real-time.</p>
                      
                      <div className="space-y-3">
                        <textarea 
                          rows="3"
                          value={bannerAlert}
                          onChange={(e) => handleGlobalBannerTextUpdate(e.target.value)}
                          className="w-full border border-gray-300 rounded-sm p-4 text-xs focus:outline-none focus:border-[#C5A880]"
                          placeholder="Type promotional text alert banner details..."
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}