'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const AnnouncementBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was already shown in this session
    const bannerShown = sessionStorage.getItem('bannerShown');

    if (!bannerShown) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('bannerShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm" onClick={handleClose} />

      {/* Banner */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full relative animate-fadeIn">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors"
            aria-label="Zavřít"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center">
                <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-dark mb-4">
              <span className="text-gradient">Nová III. etapa</span> v prodeji!
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-2 text-lg">
              <strong>51 bytů</strong> | Dispozice <strong>1+kk až 5+kk</strong>
            </p>
            <p className="text-gray-600 mb-6">
              Výhodné předprodejové ceny
            </p>

            {/* CTA Button */}
            <Link href="/byty" onClick={handleClose}>
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Zobrazit byty →
              </Button>
            </Link>

            {/* Additional info */}
            <p className="text-sm text-gray-400 mt-6">
              Rezervace již od 100.000 Kč
            </p>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
