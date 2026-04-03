import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="#home" className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Centered Intelligence Logo"
                  fill
                  className="object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="font-spaceGrotesk font-bold tracking-wide text-[var(--text)]">
                CENTERED<br />INTELLIGENCE
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm max-w-sm mt-4">
              Empowering businesses in Bangladesh to scale and thrive by delivering custom AI agents tailored to specific operational needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-spaceGrotesk font-bold text-lg mb-4 text-[var(--text)]">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Why Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-spaceGrotesk font-bold text-lg mb-4 text-[var(--text)]">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[var(--text-muted)] text-sm">
                <MapPin className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                <span>Shiyalbari 6/11, Mirpur,<br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
                <Mail className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                <a href="mailto:centeredintelligencebd@gmail.com" className="hover:text-[var(--text)] transition-colors">
                  centeredintelligencebd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
                <FaFacebook className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <a 
                  href="https://www.facebook.com/centeredintelligencebd" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  /centeredintelligencebd
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between text-[var(--text-muted)] text-xs">
          <p>&copy; {currentYear} Centered Intelligence BD. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[var(--text)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--text)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
