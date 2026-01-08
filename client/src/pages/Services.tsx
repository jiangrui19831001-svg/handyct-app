import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.freeTool'),
      description: t('services.freeToolDesc'),
      price: t('services.free'),
      features: [
        t('services.unlimitedConversions'),
        t('services.csvUploadDownload'),
        t('services.basicValidation'),
        t('services.localProcessing'),
        t('services.noRegistration'),
      ],
      cta: t('services.startConverting'),
      ctaLink: '/',
      highlighted: false,
    },
    {
      title: t('services.validationReports'),
      description: t('services.validationReportsDesc'),
      price: '$99',
      period: t('services.month'),
      features: [
        t('services.everythingInFree'),
        t('services.detailedReports'),
        t('services.fdaAuditTrail'),
        t('services.dataQualityMetrics'),
        t('services.prioritySupport'),
        t('services.monthlyUpdates'),
      ],
      cta: t('services.getStarted'),
      ctaLink: '/contact',
      highlighted: true,
    },
    {
      title: t('services.fullMappingSupport'),
      description: t('services.fullMappingSupportDesc'),
      price: '$499',
      period: t('services.month'),
      features: [
        t('services.everythingInFree'),
        t('services.customMappings'),
        t('services.dedicatedExpert'),
        t('services.apiIntegration'),
        t('services.multiUserCollaboration'),
        t('services.24Support'),
        t('services.trainingSession'),
      ],
      cta: t('services.scheduleDemo'),
      ctaLink: '/contact',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: t('services.canUpgradeAnytime'),
      answer: t('services.canUpgradeAnyTimeAnswer'),
    },
    {
      question: t('services.isThereTrial'),
      answer: t('services.isThereTrialAnswer'),
    },
    {
      question: t('services.whatAboutSecurity'),
      answer: t('services.whatAboutSecurityAnswer'),
    },
    {
      question: t('services.customEnterprise'),
      answer: t('services.customEnterpriseAnswer'),
    },
  ];

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
              <a className="text-emerald-600 font-medium text-sm">{t('footer.services')}</a>
            </Link>
            <Link href="/security">
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.security')}</a>
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
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('services.title')}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={service.highlighted ? 'ring-2 ring-emerald-600 md:scale-105' : ''}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">{service.price}</span>
                  {service.period && <span className="text-slate-600">{service.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={service.ctaLink}>
                  <a>
                    <Button
                      className={`w-full ${
                        service.highlighted
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                      }`}
                    >
                      {service.cta}
                    </Button>
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{t('services.faq')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('services.readyToGetStarted')}</h2>
          <p className="text-slate-600 mb-8">
            {t('services.readyToGetStartedDesc')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <a>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  {t('services.tryFreeTool')}
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button size="lg" variant="outline">
                  {t('services.scheduleDemo')}
                </Button>
              </a>
            </Link>
          </div>
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
