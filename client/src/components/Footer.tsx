import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();

  const handleStandardsLink = (anchor: string) => {
    setLocation(`/security#${anchor}`);
  };

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
              <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 flex items-center gap-2">
                <span>LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a></li>
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
              <li><button onClick={() => handleStandardsLink('fda')} className="hover:text-slate-900 text-left">{t('footer.fdaCompliant')}</button></li>
              <li><button onClick={() => handleStandardsLink('cdisc')} className="hover:text-slate-900 text-left">{t('footer.cdisc')}</button></li>
              <li><button onClick={() => handleStandardsLink('compliance')} className="hover:text-slate-900 text-left">{t('footer.gdprHipaa')}</button></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-xs text-amber-900">
            <strong>⚠️ 免责声明 / Disclaimer:</strong> HandyCT 是一款辅助工具。所有转换后的数据必须经过具备资质的临床数据专家验证后方可用于监管申报。开发者不对数据的绝对准确性及后续法律后果负责。
          </p>
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
