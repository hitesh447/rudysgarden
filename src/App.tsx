/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Droplets, 
  Scissors, 
  Sprout, 
  Home, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  ShieldCheck,
  Trash2,
  TreePine,
  Waves
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-green-900 tracking-tight">Rudy's Gardens</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-green-800 hover:text-green-600 font-medium transition-colors">Services</a>
            <a href="#about" className="text-green-800 hover:text-green-600 font-medium transition-colors">Why Choose Us</a>
            <a href="#gallery" className="text-green-800 hover:text-green-600 font-medium transition-colors">Portfolio</a>
            <a href="#contact" className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
              Contact Us
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-green-100 px-4 py-6 space-y-4"
        >
          <a href="#services" className="block text-lg font-medium text-green-800" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#about" className="block text-lg font-medium text-green-800" onClick={() => setIsOpen(false)}>Why Choose Us</a>
          <a href="#gallery" className="block text-lg font-medium text-green-800" onClick={() => setIsOpen(false)}>Portfolio</a>
          <a href="#contact" className="block w-full text-center bg-green-600 text-white py-3 rounded-xl font-bold" onClick={() => setIsOpen(false)}>
            Contact Us
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?q=80&w=2070&auto=format&fit=crop" 
          alt="Beautiful Garden" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block px-4 py-1 bg-green-500/30 backdrop-blur-md border border-green-400/30 rounded-full text-sm font-semibold mb-6 tracking-wider uppercase">
            Landscaping & Home Improvement
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-green-400">Rudy’s Gardens!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed">
            Your dream outdoor space is just a call away. We specialize in offering full-service landscaping and home improvement solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl shadow-green-900/20">
              Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              Our Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

const CoreServices = () => {
  const services = [
    { title: "Irrigation & Drainage", icon: <Droplets className="w-8 h-8" />, color: "bg-blue-50 text-blue-600" },
    { title: "Lawn Service", icon: <Scissors className="w-8 h-8" />, color: "bg-green-50 text-green-600" },
    { title: "Garden Care", icon: <Sprout className="w-8 h-8" />, color: "bg-emerald-50 text-emerald-600" },
    { title: "Residential Services", icon: <Home className="w-8 h-8" />, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-green-100 transition-all text-center group"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DetailedServices = () => {
  const offers = [
    {
      title: "Ground Maintenance",
      desc: "Keep your lawn pristine year-round. Our ground maintenance services include mowing, fertilizing, and seasonal clean-up.",
      img: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Garden Design",
      desc: "Bring your garden dreams to reality. Our experienced designers will work with you to create a unique, sustainable outdoor haven.",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Pruning & Trimming",
      desc: "Shape your plants to perfection. We offer expert pruning and trimming services to enhance your garden’s natural beauty.",
      img: "https://images.unsplash.com/photo-1592150621344-220b29cc052f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Mulching & Planting",
      desc: "Promote healthy plant growth and reduce weeds. Our team can help you select and apply the right mulch and plant choices for your space.",
      img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">What We Offer</h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-900">Complete Landscaping Solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {offers.map((offer, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-8 items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-green-100/50"
            >
              <div className="w-full lg:w-48 h-48 rounded-3xl overflow-hidden flex-shrink-0">
                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{offer.desc}</p>
                <button className="text-green-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    { title: "Expertise", desc: "With years of experience in landscaping and property maintenance, our team brings unmatched expertise to every project.", icon: "🏆" },
    { title: "Attention to Detail", desc: "We believe that the smallest details make the biggest difference. We meticulously plan and execute every project to perfection.", icon: "🔍" },
    { title: "Custom Solutions", desc: "Your property is unique, and we tailor our services to meet your specific needs and preferences.", icon: "🎨" },
    { title: "Quality Materials", desc: "We source high-quality materials to ensure that your outdoor features are not only beautiful but also built to last.", icon: "💎" },
    { title: "Customer Satisfaction", desc: "Your satisfaction is our top priority. We work closely with you to ensure that your vision is realized.", icon: "😊" }
  ];

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Why Choose <span className="text-green-600">Rudy’s Gardens?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Rudy’s Gardens is your trusted partner in creating and maintaining stunning outdoor spaces and improving the interior of your property. We provides complete landscape construction, including design and construction of swimming pools.
            </p>
            <div className="space-y-6">
              {reasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-4 rounded-2xl hover:bg-green-50 transition-colors"
                >
                  <div className="text-3xl">{reason.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{reason.title}</h4>
                    <p className="text-gray-600">{reason.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1592150621344-220b29cc052f?q=80&w=1000&auto=format&fit=crop" 
              alt="Our Work" 
              className="relative z-10 rounded-[3rem] shadow-2xl border-8 border-white"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592150621344-220b29cc052f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507089947368-19c1da97753c?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4">Project Gallery</h2>
            <p className="text-4xl font-bold text-gray-900">Our Recent Works</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
            View All <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-lg group relative"
            >
              <img src={img} alt={`Project ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-green-600 p-4 rounded-full shadow-xl">
                  <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const quotes = [
    {
      text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature. To nurture a garden is to feed not just on the body, but the soul.",
      author: "Alfred Austin"
    },
    {
      text: "Everyone can identify with a fragrant garden, with beauty of sunset, with the quiet of nature, with a warm and cozy cottage.",
      author: "Thomas Kincade"
    },
    {
      text: "A garden requires patient labor and attention. Plants do not grow merely to satisfy ambitions or to fulfill good intentions.",
      author: "Liberty Hyde Bailey"
    }
  ];

  return (
    <section className="py-24 bg-green-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-800 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-green-400 font-bold tracking-widest uppercase text-sm mb-12">What they say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {quotes.map((quote, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div className="text-green-400 text-5xl mb-6 font-serif">“</div>
              <p className="text-xl italic mb-8 leading-relaxed">
                {quote.text}
              </p>
              <div className="font-bold text-green-400">— {quote.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Rudy's Gardens</span>
            </div>
            <p className="mb-8 leading-relaxed">
              Your trusted partner in creating and maintaining stunning outdoor spaces and improving the interior of your property.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8">Our Services</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><CheckCircle2 size={16} className="text-green-600" /> Watering Garden</li>
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><CheckCircle2 size={16} className="text-green-600" /> Tree Cleaning</li>
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><CheckCircle2 size={16} className="text-green-600" /> Rubbish Removal</li>
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><CheckCircle2 size={16} className="text-green-600" /> Planting Tree</li>
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><ShieldCheck size={16} className="text-green-600" /> Certified Experts</li>
              <li className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer"><Clock size={16} className="text-green-600" /> 24/7 Support Center</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-green-600 flex-shrink-0" />
                <span>Owings Mills, Maryland 21117</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-green-600 flex-shrink-0" />
                <span>info@rudysgarden.com</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-green-600 flex-shrink-0" />
                <span>443 762 5056</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8">Your Feedback</h4>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-600 transition-colors"
              />
              <textarea 
                placeholder="Your Message" 
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-green-600 transition-colors"
              ></textarea>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-sm text-gray-500">
          <p>© 2026 Rudy's Gardens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />
      <main>
        <Hero />
        <CoreServices />
        <DetailedServices />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        
        {/* Final CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10"><Sprout size={100} /></div>
                <div className="absolute bottom-10 right-10 rotate-45"><TreePine size={120} /></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 relative z-10">
                For All Your Landscape, Contractor, and Gardening Needs
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto relative z-10">
                Contact us today to schedule a consultation, and let’s embark on a journey to elevate your property’s beauty and functionality.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-2xl shadow-green-200 relative z-10">
                Contact Us Now
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
