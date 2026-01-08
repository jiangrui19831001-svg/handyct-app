import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Zap } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Contact() {
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
              <a className="text-slate-600 hover:text-slate-900 text-sm">Security</a>
            </Link>
            <Link href="/contact">
              <a className="text-emerald-600 font-medium text-sm">Contact</a>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">Get in Touch</h1>
          <p className="mb-8 text-lg text-slate-600">
            Tell us about your clinical trial data conversion needs
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
                <h2 className="text-2xl font-bold text-emerald-900 mb-2">Thank You!</h2>
                <p className="text-emerald-700 mb-4">
                  Your inquiry has been received. Our compliance expert will contact you within 24 hours.
                </p>
                <p className="text-sm text-emerald-600">
                  We look forward to helping you streamline your CDISC data conversion process.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Clinical Trial Inquiry Form</CardTitle>
                <CardDescription>
                  Help us understand your requirements so we can provide the best solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name *
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Pharmaceutical Corp"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Study Phase */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Study Phase *
                    </label>
                    <Select value={formData.studyPhase} onValueChange={(value) => handleSelectChange('studyPhase', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select study phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase I</SelectItem>
                        <SelectItem value="phase2">Phase II</SelectItem>
                        <SelectItem value="phase3">Phase III</SelectItem>
                        <SelectItem value="phase4">Phase IV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estimated Subjects */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estimated Number of Subjects *
                    </label>
                    <Input
                      type="number"
                      name="estimatedSubjects"
                      value={formData.estimatedSubjects}
                      onChange={handleInputChange}
                      placeholder="500"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Timeline *
                    </label>
                    <Select value={formData.projectTimeline} onValueChange={(value) => handleSelectChange('projectTimeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                        <SelectItem value="short">Short term (1-3 months)</SelectItem>
                        <SelectItem value="medium">Medium term (3-6 months)</SelectItem>
                        <SelectItem value="long">Long term (6+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    We respect your privacy. Your information will only be used to contact you about your inquiry.
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
