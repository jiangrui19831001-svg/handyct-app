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
      title: 'Free Tool',
      description: 'For individual researchers and small teams',
      price: 'Free',
      features: [
        'Unlimited SDTM conversions',
        'CSV file upload and download',
        'Basic data validation',
        'Local browser processing',
        'No registration required',
      ],
      cta: 'Start Converting',
      ctaLink: '/',
      highlighted: false,
    },
    {
      title: 'Validation Reports',
      description: 'For compliance teams and QA departments',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Free Tool',
        'Detailed compliance reports',
        'FDA audit trail generation',
        'Data quality metrics',
        'Priority email support',
        'Monthly updates',
      ],
      cta: 'Get Started',
      ctaLink: '/contact',
      highlighted: true,
    },
    {
      title: 'Full Mapping Support',
      description: 'For enterprises and clinical trial sponsors',
      price: '$499',
      period: '/month',
      features: [
        'Everything in Validation Reports',
        'Custom mapping templates',
        'Dedicated compliance expert',
        'API integration support',
        'Multi-user collaboration',
        '24/7 priority support',
        'Custom training sessions',
      ],
      cta: 'Schedule Demo',
      ctaLink: '/contact',
      highlighted: false,
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
                <p className="text-xs text-slate-500">下一代 CDISC 转换器</p>
              </div>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-slate-600 hover:text-slate-900 text-sm">Home</a>
            </Link>
            <Link href="/services">
              <a className="text-emerald-600 font-medium text-sm">Services</a>
            </Link>
            <Link href="/security">
              <a className="text-slate-600 hover:text-slate-900 text-sm">Security</a>
            </Link>
            <Link href="/contact">
              <a className="text-slate-600 hover:text-slate-900 text-sm">Contact</a>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h1>
          <p className="mb-8 text-lg text-slate-600">
            Choose the plan that fits your organization's needs
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
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes, you can change your plan at any time. Changes take effect immediately, and we'll prorate your billing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial for paid plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We offer a 14-day free trial for Validation Reports and Full Mapping Support. No credit card required.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What about data security?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All plans include local browser processing and zero server storage. Your data never leaves your device.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer custom enterprise plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Yes! Contact our sales team for custom pricing and dedicated support tailored to your organization.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to get started?</h2>
          <p className="text-slate-600 mb-8">
            Start with our free tool, or contact us to learn more about our enterprise solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <a>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  Try Free Tool
                </Button>
              </a>
            </Link>
            <Link href="/contact">
              <a>
                <Button size="lg" variant="outline">
                  Schedule Demo
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
              <h3 className="font-bold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/"><a className="hover:text-slate-900">Converter</a></Link></li>
                <li><Link href="/services"><a className="hover:text-slate-900">Services</a></Link></li>
                <li><Link href="/security"><a className="hover:text-slate-900">Security</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/blog"><a className="hover:text-slate-900">Blog</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-slate-900">Contact</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Standards</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>FDA Compliant</li>
                <li>CDISC Standards</li>
                <li>GDPR & HIPAA Ready</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2026 HandyCT. All rights reserved. | <a href="#" className="hover:text-slate-900">Privacy</a> | <a href="#" className="hover:text-slate-900">Terms</a></p>
            <p className="mt-2">HandyCT is a tool for CDISC data conversion. Always verify converted data before submission.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
