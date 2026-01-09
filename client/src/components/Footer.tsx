import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/"><a className="hover:text-slate-900">{t('footer.converter')}</a></Link></li>
              <li><Link href="/services"><a className="hover:text-slate-900">{t('footer.services')}</a></Link></li>
              <li><Link href="/security"><a className="hover:text-slate-900">{t('footer.security')}</a></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/blog"><a className="hover:text-slate-900">{t('footer.blog')}</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-slate-900">{t('footer.contact')}</a></Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy"><a className="hover:text-slate-900">{t('footer.privacyPolicy')}</a></Link></li>
              <li><Link href="/terms"><a className="hover:text-slate-900">{t('footer.termsOfService')}</a></Link></li>
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">{t('footer.standards')}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/security#fda"><a className="hover:text-slate-900">{t('footer.fdaCompliant')}</a></Link></li>
              <li><Link href="/security#cdisc"><a className="hover:text-slate-900">{t('footer.cdisc')}</a></Link></li>
              <li><Link href="/security#compliance"><a className="hover:text-slate-900">{t('footer.gdprHipaa')}</a></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2026 HandyCT. {t('footer.allRightsReserved')} | <Link href="/privacy"><a className="hover:text-slate-900">{t('footer.privacy')}</a></Link> | <Link href="/terms"><a className="hover:text-slate-900">{t('footer.terms')}</a></Link></p>
          <p className="mt-2">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
