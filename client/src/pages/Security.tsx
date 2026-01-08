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
                <p className="text-xs text-slate-500">下一代 CDISC 转换器</p>
              </div>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-slate-600 hover:text-slate-900 text-sm">Home</a>
            </Link>
            <Link href="/services">
              <a className="text-slate-600 hover:text-slate-900 text-sm">Services</a>
            </Link>
            <Link href="/security">
              <a className="text-emerald-600 font-medium text-sm">Security</a>
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
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Security First</h1>
          <p className="mb-8 text-lg text-slate-600">
            Your clinical trial data stays completely under your control. No uploads, no servers, no risks.
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
                <CardTitle>Local Browser Processing</CardTitle>
              </div>
              <CardDescription>All processing happens on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                HandyCT runs entirely in your browser. Your CSV files are processed locally on your computer, never transmitted to any server.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>No network transmission of sensitive data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Works offline - no internet required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Instant processing - no server latency</span>
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
                <CardTitle>Zero Server Storage</CardTitle>
              </div>
              <CardDescription>Your data never touches our servers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                We don't store, cache, or log any of your clinical trial data. Every conversion is temporary and deleted immediately after download.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>No database storage of your files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>No audit logs of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Compliant with GDPR, HIPAA, and FDA regulations</span>
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
              <CardTitle>Compliance & Standards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">FDA Compliant</h3>
                <p className="text-sm text-slate-600">
                  Follows FDA guidance for SDTM and ADaM data standards. Your converted data meets regulatory requirements.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">CDISC Standards</h3>
                <p className="text-sm text-slate-600">
                  Implements CDISC SDTM, ADaM, and Define-XML standards. Ensures data consistency across your organization.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Data Privacy</h3>
                <p className="text-sm text-slate-600">
                  No personal data collection. No tracking. No third-party integrations. Complete privacy by design.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to convert your data securely?</h2>
          <Link href="/">
            <a>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Converting Now
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
