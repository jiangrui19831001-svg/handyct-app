import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Header />

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

      <Footer />
    </div>
  );
}
