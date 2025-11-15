import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-rezidence.png"
                alt="Rezidence U sv. Anny"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Moderní bydlení v historickém městě Kutná Hora
            </p>
            <p className="text-sm text-gray-400">
              131 bytů | 14 rodinných domů
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Rychlé odkazy</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/o-projektu" className="text-gray-300 hover:text-gold-primary transition-colors">
                  O projektu
                </Link>
              </li>
              <li>
                <Link href="/byty" className="text-gray-300 hover:text-gold-primary transition-colors">
                  Byty
                </Link>
              </li>
              <li>
                <Link href="/rodinne-domy" className="text-gray-300 hover:text-gold-primary transition-colors">
                  Rodinné domy
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-300 hover:text-gold-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:+420724218841" className="hover:text-gold-primary transition-colors">
                  +420 724 218 841
                </a>
              </li>
              <li>
                <a href="mailto:info@rezidenceusvanny.cz" className="hover:text-gold-primary transition-colors">
                  info@rezidenceusvanny.cz
                </a>
              </li>
              <li className="mt-4">
                <p className="font-semibold">Terezie Příhodová</p>
                <p className="text-sm">Realitní makléřka</p>
              </li>
              <li className="mt-2">
                <p className="font-semibold">Ing. Jan Křivánek</p>
                <p className="text-sm">Realitní makléř</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Rezidence U sv. Anny. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              Prodej zajišťuje:
            </p>
            <a
              href="https://www.anomia.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/images/anomia-logo-white.png"
                alt="ANOMIA Real Estate"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
