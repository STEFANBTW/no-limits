import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-theme-panel text-theme-text-muted py-16 md:py-24 font-sans relative z-30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-8 h-8 border border-theme-border-strong rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-lg">chair</span>
              </div>
              <span className="font-serif font-bold tracking-[0.2em] uppercase text-lg text-theme-text">No Limits</span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              We manufacture what others import. Redefining boundless living through timeless designs and unmatched comfort.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/nolimits.ng.ltd?igsh=djg0M3Y0ZjJzYjN1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-primary hover:text-theme-base transition-all" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.facebook.com/share/12FjpnqULNJ/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-primary hover:text-theme-base transition-all" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="http://wa.me/2348069983816" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-primary hover:text-theme-base transition-all" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center hover:bg-primary hover:text-theme-base transition-all" aria-label="X (Twitter)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="text-theme-text font-bold uppercase tracking-widest text-xs mb-6">Curated Spaces</h4>
            <ul className="flex flex-col gap-4 text-sm font-light">
              <li><Link to="/dining" className="hover:text-primary transition-colors">The Dining</Link></li>
              <li><Link to="/living" className="hover:text-primary transition-colors">The Living</Link></li>
              <li><Link to="/outdoor" className="hover:text-primary transition-colors">The Outdoor</Link></li>
              <li><Link to="/sanctuary" className="hover:text-primary transition-colors">The Sanctuary Master Suite</Link></li>
              <li><Link to="/study" className="hover:text-primary transition-colors">The Executive Study</Link></li>
              <li><Link to="/cellar" className="hover:text-primary transition-colors">The Connoisseur's Cellar</Link></li>
              <li><Link to="/wellness" className="hover:text-primary transition-colors">The Wellness Suite</Link></li>
              <li><Link to="/entryway" className="hover:text-primary transition-colors">The Grand Entryway</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-theme-text font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-sm font-light">
              <li><Link to="/bespoke" className="hover:text-primary transition-colors">Bespoke Commissions</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Interior Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trade Program</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Restoration & Care</a></li>
              <li><Link to="/archive" className="hover:text-primary transition-colors">The Archive</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-theme-text font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
            <ul className="flex flex-col gap-6 text-sm font-light">
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 text-theme-text-subtle group-hover:text-primary transition-colors">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-primary/60 text-[10px] font-bold uppercase tracking-widest mb-1">Abuja Showroom</span>
                  <span className="text-theme-text-muted leading-relaxed">Plot 506, Obafemi Awolowo way<br />
                  Jabi District Abuja FCT</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 text-theme-text-subtle group-hover:text-primary transition-colors">
                  <MapPin size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-primary/60 text-[10px] font-bold uppercase tracking-widest mb-1">Jos Showroom</span>
                  <span className="text-theme-text-muted leading-relaxed">2B D.B Zang Ibrahim Taiwo<br />
                  Off St Piran's Church, Jos</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 text-theme-text-subtle group-hover:text-primary transition-colors">
                  <Mail size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[#54524F] text-xs uppercase tracking-wider mb-1">Inquiries</span>
                  <a href="mailto:info@nolimitsfurniture.com.ng" className="hover:text-primary transition-colors">info@nolimitsfurniture.com.ng</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="mt-0.5 text-theme-text-subtle group-hover:text-primary transition-colors">
                  <Phone size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[#54524F] text-xs uppercase tracking-wider mb-1">Phone</span>
                  <a href="tel:+2348064757611" className="hover:text-primary transition-colors">+234 8064757611</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#54524F] opacity-70">
          <p>© {currentYear} No Limits Furniture. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-theme-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-theme-text transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
