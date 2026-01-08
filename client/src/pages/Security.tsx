import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Server, Shield, Zap } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Security() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">HandyCT 2.0</h1>
                <p className="text-xs text-slate-500">{t('home.subtitle')}</p>
              </div>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('common.home')}</a>
            </Link>
            <Link href="/services">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.services')}</a>
            </Link>
            <Link href="/security">
              <a className="text-emerald-600 font-medium text-sm">{t('footer.security')}</a>
            </Link>
            <Link href="/contact">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('common.contact')}</a>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('security.title')}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('security.subtitle')}
          </p>
        </div>
      </section>

      {/* Security Features */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Local Browser Processing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>{t('security.localBrowserProcessing')}</CardTitle>
              </div>
              <CardDescription>{t('security.localBrowserProcessingDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                {t('security.localBrowserProcessingContent')}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.noNetworkTransmission')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.worksOffline')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.instantProcessing')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Zero Server Storage */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Server className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('security.zeroServerStorage')}</CardTitle>
              </div>
              <CardDescription>{t('security.zeroServerStorageDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                {t('security.zeroServerStorageContent')}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.noDatabaseStorage')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.noAuditLogs')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.compliantWithGDPR')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compliance & Standards */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>{t('security.complianceStandards')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">{t('security.fdaCompliant')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.fdaCompliantDesc')}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">{t('security.cdisc')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.cdiscDesc')}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">{t('security.dataPrivacy')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.dataPrivacyDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('security.readyToConvert')}</h2>
          <Link href="/">
            <a>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                {t('security.startConvertingNow')}
              </Button>
            </a>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/"><a className="hover:text-slate-900">{t('footer.converter')}</a></Link></li>
                <li><Link href="/services"><a className="hover:text-slate-900">{t('footer.services')}</a></Link></li>
                <li><Link href="/security"><a className="hover:text-slate-900">{t('footer.security')}</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('footer.company')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/blog"><a className="hover:text-slate-900">{t('footer.blog')}</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-slate-900">{t('footer.contact')}</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">{t('footer.privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-slate-900">{t('footer.termsOfService')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">{t('footer.standards')}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>{t('footer.fdaCompliant')}</li>
                <li>{t('footer.cdisc')}</li>
                <li>{t('footer.gdprHipaa')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2026 HandyCT. {t('footer.allRightsReserved')} | <a href="#" className="hover:text-slate-900">{t('footer.privacy')}</a> | <a href="#" className="hover:text-slate-900">{t('footer.terms')}</a></p>
            <p className="mt-2">{t('footer.disclaimer')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
