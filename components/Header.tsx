'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Container } from './Container';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Úvod', href: '/' },
    { 
      name: 'O projektu', 
      href: '/o-projektu',
      submenu: [
        { name: 'O rezidenci', href: '/o-projektu' },
        { name: 'Důležité informace', href: '/dulezite-informace' },
      ]
    },
    { name: 'Byty', href: '/byty' },
    { name: 'Rodinné domy', href: '/rodinne-domy' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold-primary/20' 
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10 transition-transform duration-300 hover:scale-105">
            <Image
              src={isScrolled ? "/images/logo_rez_black.png" : "/images/logo-rezidence.png"}
              alt="Rezidence U sv. Anny"
              width={240}
              height={80}
              className="object-contain transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
              
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.submenu ? (
                    <>
                      <button
                        className={`font-semibold transition-all duration-300 flex items-center gap-1.5 text-[15px] ${
                          isActive
                            ? 'px-4 py-2 bg-gold-primary text-white rounded-lg'
                            : isScrolled
                            ? 'text-dark hover:text-gold-primary'
                            : 'text-white hover:text-gold-primary'
                        }`}
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 pt-2 w-60">
                          <div className="bg-white rounded-xl shadow-2xl py-2 border border-gold-primary/20 animate-in fade-in slide-in-from-top-2 duration-200">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-5 py-3 transition-all duration-200 font-medium text-[15px] ${
                                  pathname === subItem.href
                                    ? 'text-gold-primary'
                                    : 'text-dark hover:text-gold-primary'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`font-semibold transition-all duration-300 text-[15px] ${
                        isActive
                          ? 'px-4 py-2 bg-gold-primary text-white rounded-lg'
                          : isScrolled
                          ? 'text-dark hover:text-gold-primary'
                          : 'text-white hover:text-gold-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            
            {/* Phone */}
            <a
              href="tel:+420724218841"
              className={`font-medium flex items-center transition-all duration-300 text-[15px] ${
                isScrolled
                  ? 'text-dark hover:text-gold-primary'
                  : 'text-white hover:text-gold-primary'
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +420 724 218 841
            </a>
            
            {/* CTA Button */}
            <Link href="/byty">
              <button className="px-6 py-3 bg-gradient-to-r from-gold-primary to-gold-secondary text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-[15px] whitespace-nowrap">
                Zobrazit byty
              </button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden inline-flex items-center justify-center p-2.5 relative z-10 transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Otevřít menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 bg-white/98 backdrop-blur-md rounded-b-2xl shadow-2xl border-b border-gold-primary/20">
            <div className="flex flex-col space-y-1 pt-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
                
                return (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className={`w-full text-left transition-all duration-300 font-semibold px-5 py-3 flex items-center justify-between rounded-lg ${
                            isActive 
                              ? 'text-gold-primary bg-gold-primary/5' 
                              : 'text-dark hover:text-gold-primary hover:bg-light-grey'
                          }`}
                        >
                          {item.name}
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              openDropdown === item.name ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openDropdown === item.name && (
                          <div className="bg-light-grey/50 ml-4 mr-4 rounded-xl mt-1 mb-1 overflow-hidden">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block transition-all duration-200 font-medium px-5 py-3 ${
                                  pathname === subItem.href
                                    ? 'text-gold-primary bg-gold-primary/10'
                                    : 'text-grey-700 hover:text-gold-primary hover:bg-white/50'
                                }`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block transition-all duration-300 font-semibold px-5 py-3 rounded-lg ${
                          isActive 
                            ? 'text-gold-primary bg-gold-primary/5' 
                            : 'text-dark hover:text-gold-primary hover:bg-light-grey'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
              
              {/* Divider */}
              <div className="h-px bg-grey-200 my-2 mx-4" />
              
              {/* Phone */}
              <a
                href="tel:+420724218841"
                className="text-dark hover:text-gold-primary transition-all duration-300 font-medium px-5 py-3 flex items-center gap-2 hover:bg-light-grey rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +420 724 218 841
              </a>
              
              {/* CTA Button */}
              <div className="px-4 pt-2">
                <Link href="/byty" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3.5 bg-gradient-to-r from-gold-primary to-gold-secondary text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300">
                    Zobrazit byty
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
