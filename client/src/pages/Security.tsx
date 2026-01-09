import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Server, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

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
        <div className="grid md:grid-cols-2 gap-8 mb-16" id="fda">
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
          <Card id="cdisc">
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-3">
                <p className="text-xs text-blue-900 font-semibold">
                  🔐 <strong>法律保障：</strong>因为我们不存储任何用户数据，所以我们无法泄露数据。这是最强的数据保护承诺——没有数据留在我们的服务器上，就没有数据泄露的法律风险。
                </p>
              </div>
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
        <Card className="mb-16" id="compliance">
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

      <Footer />
    </div>
  );
}
