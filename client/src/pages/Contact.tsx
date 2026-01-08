import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Zap } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    studyPhase: '',
    estimatedSubjects: '',
    projectTimeline: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          company: '',
          studyPhase: '',
          estimatedSubjects: '',
          projectTimeline: '',
        });
      }, 5000);
    }, 1500);
  };

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
              <a className="text-slate-600 hover:text-slate-900 text-sm">{t('footer.security')}</a>
            </Link>
            <Link href="/contact">
              <a className="text-emerald-600 font-medium text-sm">{t('common.contact')}</a>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('contact.title')}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            // Success Message
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-900 mb-2">{t('contact.thankYou')}</h2>
                <p className="text-emerald-700 mb-4">
                  {t('contact.inquiryReceived')}
                </p>
                <p className="text-sm text-emerald-600">
                  {t('contact.lookingForward')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.inquiryForm')}</CardTitle>
                <CardDescription>
                  {t('contact.inquiryFormDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact.fullName')}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.fullNamePlaceholder')}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact.companyName')}
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t('contact.companyNamePlaceholder')}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Study Phase */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact.studyPhase')}
                    </label>
                    <Select value={formData.studyPhase} onValueChange={(value) => handleSelectChange('studyPhase', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.selectStudyPhase')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">{t('contact.phaseI')}</SelectItem>
                        <SelectItem value="phase2">{t('contact.phaseII')}</SelectItem>
                        <SelectItem value="phase3">{t('contact.phaseIII')}</SelectItem>
                        <SelectItem value="phase4">{t('contact.phaseIV')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estimated Subjects */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact.estimatedSubjects')}
                    </label>
                    <Input
                      type="number"
                      name="estimatedSubjects"
                      value={formData.estimatedSubjects}
                      onChange={handleInputChange}
                      placeholder={t('contact.estimatedSubjectsPlaceholder')}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t('contact.projectTimeline')}
                    </label>
                    <Select value={formData.projectTimeline} onValueChange={(value) => handleSelectChange('projectTimeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('contact.selectTimeline')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">{t('contact.urgent')}</SelectItem>
                        <SelectItem value="short">{t('contact.shortTerm')}</SelectItem>
                        <SelectItem value="medium">{t('contact.mediumTerm')}</SelectItem>
                        <SelectItem value="long">{t('contact.longTerm')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isLoading ? t('contact.submitting') : t('contact.submitInquiry')}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    {t('contact.privacyNote')}
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
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
