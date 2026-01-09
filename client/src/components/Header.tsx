import { useState } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">H</div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">HandyCT</h1>
              <p className="text-xs text-slate-500">{t('home.subtitle') || '下一代 CDISC 转换器'}</p>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('common.home')}</a>
          </Link>
          <Link href="/converter">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('home.converter') || '转换器'}</a>
          </Link>
          <Link href="/services">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.services')}</a>
          </Link>
          <Link href="/security">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.security')}</a>
          </Link>
          <Link href="/blog">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('home.techBlog') || 'Tech Blog'}</a>
          </Link>
          <Link href="/contact">
            <a className="text-slate-600 hover:text-slate-900 text-sm">{t('common.contact')}</a>
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link href="/">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('common.home')}
              </a>
            </Link>
            <Link href="/converter">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('home.converter') || '转换器'}
              </a>
            </Link>
            <Link href="/services">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('footer.services')}
              </a>
            </Link>
            <Link href="/security">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('footer.security')}
              </a>
            </Link>
            <Link href="/blog">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('home.techBlog') || 'Tech Blog'}
              </a>
            </Link>
            <Link href="/contact">
              <a className="block text-slate-600 hover:text-slate-900 text-sm py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('common.contact')}
              </a>
            </Link>
            <div className="pt-2 border-t border-slate-200">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
