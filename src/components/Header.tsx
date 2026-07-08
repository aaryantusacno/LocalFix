import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Language } from '@/i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'hi', label: 'हिंदी', flag: 'https://flagcdn.com/w40/in.png' },
  { code: 'mr', label: 'मराठी', flag: 'https://flagcdn.com/w40/in.png' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut, role } = useAuth();
  const location = useLocation();

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Build nav links based on the user's role
  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/services', label: t('services') },
    // Customers (and guests) can book; providers cannot
    ...(role !== 'provider' ? [{ to: '/book', label: t('bookService') }] : []),
    { to: '/contact', label: t('contact') },
    // Show "Track Booking" for customers or guests (not providers)
    ...(role !== 'provider' ? [{ to: '/track', label: t('trackBooking') }] : []),
    // Show "Provider Portal" for providers or guests (not customers)
    ...(role !== 'customer' ? [{ to: '/provider', label: t('providerPortal') }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div
              className="h-14 w-14 overflow-hidden flex-shrink-0"
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
            >
              <img
                src="/logo_final.jpg"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-foreground">{t('brandName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-medium transition-colors ${isActive(link.to)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <img src={currentLang.flag} alt={currentLang.label} className="w-5 h-auto rounded-sm" />
                <span className="hidden sm:inline text-sm font-medium">{currentLang.label}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-card rounded-lg shadow-lg border border-border z-20 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition-colors ${language === lang.code ? 'bg-secondary font-medium' : ''
                          }`}
                      >
                        <img src={lang.flag} alt={lang.label} className="w-5 h-auto rounded-sm" />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* User Auth Section */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Notification Bell — shown for logged-in users */}
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <User className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <span className="font-medium text-sm">{user.email}</span>
                    </DropdownMenuItem>
                    {role === 'customer' && (
                      <DropdownMenuItem asChild>
                        <Link to="/track">My Bookings</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" className="hidden md:flex">Login</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>


        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-2 text-lg font-medium rounded-lg transition-colors ${isActive(link.to)
                  ? 'text-primary bg-primary/5'
                  : 'text-foreground hover:bg-secondary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
