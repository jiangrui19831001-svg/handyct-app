import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Download, Upload, Zap, Menu, X } from 'lucide-react';
import { CDISC_STANDARDS, validateSDTMCompliance, convertCSVToSDTM, generateFDAComplianceReport } from '@/lib/cdisc';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const { t } = useTranslation();
  const [selectedStandard, setSelectedStandard] = useState<string>('sdtm');
  const [selectedVersion, setSelectedVersion] = useState<string>('sdtm-3.4'); // 默认设为 SDTM 3.4
  const [csvData, setCsvData] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const currentStandard = CDISC_STANDARDS.find((s) => s.id === selectedStandard);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvData(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // 处理拖拽事件
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCsvData(event.target?.result as string);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      const result = convertCSVToSDTM(csvData);
      setConversionResult(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = () => {
    if (!conversionResult?.data) return;
    const validation = validateSDTMCompliance({ DM: conversionResult.data });
    setConversionResult(validation);
  };

  const handleGenerateReport = () => {
    if (!conversionResult?.data) return;
    const report = generateFDAComplianceReport(
      { DM: conversionResult.data },
      { records: conversionResult.data }
    );
    setConversionResult(report);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="rounded-lg bg-emerald-600 p-2">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">HandyCT 2.0</h1>
              <p className="text-xs text-slate-500">{t('home.nextGenCDISCConverter')}</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-slate-900">HandyCT</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <a href="/#/blog" className="no-underline">
              <Button variant="ghost" size="sm">
                {t('nav.blog')}
              </Button>
            </a>
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="container py-3 space-y-2">
              <a href="/#/blog" className="block no-underline" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {t('nav.blog')}
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Side: Conversion Configuration */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="convert" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="convert">{t('home.convert')}</TabsTrigger>
                <TabsTrigger value="validate">{t('home.validate')}</TabsTrigger>
                <TabsTrigger value="report">{t('home.report')}</TabsTrigger>
              </TabsList>

              {/* Convert Tab */}
              <TabsContent value="convert" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('home.selectCDISCStandard')}</CardTitle>
                    <CardDescription>{t('home.selectDataStandardVersion')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">{t('home.standard')}</label>
                        <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CDISC_STANDARDS.map((std) => (
                              <SelectItem key={std.id} value={std.id}>
                                {std.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-slate-500">{currentStandard?.description}</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">{t('home.version')}</label>
                        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('home.selectVersionPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            {currentStandard?.versions.map((ver) => (
                              <SelectItem key={ver.id} value={ver.id}>
                                {ver.version} ({ver.status})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('home.uploadFile')}</CardTitle>
                    <CardDescription>{t('home.clinicalTrialData')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <label
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`flex items-center justify-center rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors ${
                        dragActive
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-600">
                          {t('home.dragDrop')}
                        </p>
                        <p className="mt-1 text-xs text-emerald-600 font-medium">
                          或点击此处选择文件
                        </p>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </label>

                    {csvData && (
                      <div className="rounded-lg bg-emerald-50 p-4">
                        <p className="text-sm text-emerald-800">
                          ✓ {csvData.split('\n').length - 1} {t('home.rowsUploaded')}
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={handleConvert}
                      disabled={!csvData || !selectedVersion || isLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isLoading ? `${t('home.startConverting')}...` : t('home.startConverting')}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Validate Tab */}
              <TabsContent value="validate" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('home.complianceValidation')}</CardTitle>
                    <CardDescription>{t('home.checkDataCompliance')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {conversionResult ? (
                      <div className="space-y-4">
                        <div
                          className={`rounded-lg p-4 ${
                            conversionResult.status === 'success'
                              ? 'bg-emerald-50'
                              : conversionResult.status === 'warning'
                                ? 'bg-amber-50'
                                : 'bg-red-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {conversionResult.status === 'success' ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium text-slate-900">{conversionResult.message}</p>
                              {conversionResult.data?.errors?.length > 0 && (
                                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                                  {conversionResult.data.errors.map((error: string, i: number) => (
                                    <li key={i}>• {error}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button onClick={handleValidate} className="w-full">
                          {t('home.revalidate')}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-center text-slate-500">{t('home.noDataValidate')}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Report Tab */}
              <TabsContent value="report" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('home.fdaComplianceReport')}</CardTitle>
                    <CardDescription>{t('home.generateReport')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {conversionResult?.report ? (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-slate-200 p-4">
                          <p className="text-sm text-slate-700">{conversionResult.report}</p>
                        </div>
                        <Button onClick={handleGenerateReport} className="w-full">
                          {t('home.regenerateReport')}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          {t('home.downloadReport')}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-center text-slate-500">{t('home.noDataReport')}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side: Quick Reference */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('home.learningResources')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  {t('home.readTechBlog')}
                </p>
                <a href="/#/blog" className="no-underline">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {t('home.visitTechBlog')}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
