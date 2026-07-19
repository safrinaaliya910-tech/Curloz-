'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-off-white py-16 md:py-24 border-t border-copper/20 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" className="mb-6 relative block w-32 h-12">
              <Image
                src="/images/logo/curloz-logo-full.png"
                alt="CURLOZ Logo"
                fill
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.8)' }}
              />
            </Link>
            <p className="text-sm text-off-white/70 text-center md:text-left mb-6 font-sans">
              Crowned by Curls. Premium care for the royalty of hair.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-copper hover:text-copper-light transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-copper hover:text-copper-light transition-colors" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-copper hover:text-copper-light transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 text-center md:text-left">
            <h4 className="font-serif text-lg text-copper mb-6 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-4 font-sans text-sm text-off-white/80">
              <li><Link href="/shop" className="hover:text-copper-light transition-colors">All Products</Link></li>
              <li><Link href="/shop/shampoo-moisturizing" className="hover:text-copper-light transition-colors">Shampoo</Link></li>
              <li><Link href="/shop/conditioner-nourishing" className="hover:text-copper-light transition-colors">Conditioner</Link></li>
              <li><Link href="/shop/curl-cream-ultra" className="hover:text-copper-light transition-colors">Curl Cream</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1 text-center md:text-left">
            <h4 className="font-serif text-lg text-copper mb-6 uppercase tracking-wider">Brand</h4>
            <ul className="space-y-4 font-sans text-sm text-off-white/80">
              <li><Link href="/about" className="hover:text-copper-light transition-colors">Our Story</Link></li>
              <li><Link href="/usage" className="hover:text-copper-light transition-colors">How to Use</Link></li>
              <li><Link href="/contact" className="hover:text-copper-light transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-copper-light transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-serif text-lg text-copper mb-6 uppercase tracking-wider text-center md:text-left">Newsletter</h4>
            <p className="font-sans text-sm text-off-white/70 mb-4 text-center md:text-left">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent border border-off-white/30 px-4 py-3 text-sm text-off-white placeholder:text-off-white/50 focus:outline-none focus:border-copper transition-colors w-full font-sans"
              />
              <button
                type="submit"
                className="bg-copper hover:bg-copper-light text-white font-sans text-sm uppercase tracking-widest py-3 px-6 transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-off-white/10 flex flex-col md:flex-row justify-between items-center font-sans text-xs text-off-white/50">
          <p>&copy; {new Date().getFullYear()} CURLOZ. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-off-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-off-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
