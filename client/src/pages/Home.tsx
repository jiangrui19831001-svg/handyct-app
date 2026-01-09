import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Download, Upload } from 'lucide-react';
import { CDISC_STANDARDS, validateSDTMCompliance, convertCSVToSDTM, generateFDAComplianceReport } from '@/lib/cdisc';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from '@/components/Header';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const { t, i18n } = useTranslation();
  const [selectedStandard, setSelectedStandard] = useState<string>('sdtm'); // 默认选中 SDTM
  const [selectedVersion, setSelectedVersion] = useState<string>('sdtm-3.4');
  
  // 当标准列表变化时，自动设置默认版本
  const handleStandardChange = (standard: string) => {
    setSelectedStandard(standard);
    const newStandard = CDISC_STANDARDS.find((s) => s.id === standard);
    if (newStandard && newStandard.versions.length > 0) {
      setSelectedVersion(newStandard.versions[0].id);
    }
  };
  const [csvData, setCsvData] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [rowCount, setRowCount] = useState<number>(0);
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [reportResult, setReportResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<Array<{ id: string; fileName: string; timestamp: string; rowCount: number }>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentStandard = CDISC_STANDARDS.find((s) => s.id === selectedStandard);

  const validateCSVFormat = (csvContent: string): { valid: boolean; error?: string } => {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      return { valid: false, error: t('home.csvMinRows') || 'CSV 文件必须至少包含标题行和一行数据' };
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const requiredHeaders = ['USUBJID', 'SUBJID', 'RFSTDTC', 'SEX', 'AGE'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

    if (missingHeaders.length > 0) {
      return { valid: false, error: `${t('home.missingColumns') || '缺少必需的列'}: ${missingHeaders.join(', ')}` };
    }

    return { valid: true };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setErrorMessage(t('home.csvFormatError') || '请上传 CSV 格式的文件');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const validation = validateCSVFormat(content);
        if (!validation.valid) {
          setErrorMessage(`${t('home.validationFailed') || '文件验证失败'}: ${validation.error}`);
          return;
        }
        setErrorMessage('');
        setCsvData(content);
        setFileName(file.name);
        const lines = content.trim().split('\n');
        setRowCount(lines.length - 1);
        
        // 添加到历史记录
        const newRecord = {
          id: Date.now().toString(),
          fileName: file.name,
          timestamp: new Date().toLocaleString(i18n.language === 'en' ? 'en-US' : 'zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          rowCount: lines.length - 1
        };
        setUploadHistory([newRecord, ...uploadHistory.slice(0, 9)]);
      };
      reader.readAsText(file);
    }
  };

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
          const content = event.target?.result as string;
          const validation = validateCSVFormat(content);
          if (!validation.valid) {
            setErrorMessage(`${t('home.validationFailed') || '文件验证失败'}: ${validation.error}`);
            return;
          }
          setErrorMessage('');
          setCsvData(content);
          setFileName(file.name);
          const lines = content.trim().split('\n');
          setRowCount(lines.length - 1);
          
          // 添加到历史记录
          const newRecord = {
            id: Date.now().toString(),
            fileName: file.name,
            timestamp: new Date().toLocaleString(i18n.language === 'en' ? 'en-US' : 'zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            rowCount: lines.length - 1
          };
          setUploadHistory([newRecord, ...uploadHistory.slice(0, 9)]);
        };
        reader.readAsText(file);
      } else {
        setErrorMessage(t('home.csvFormatError') || '请上传 CSV 格式的文件');
      }
    }
  };

  const handleConvert = async () => {
    if (!csvData) {
      setErrorMessage(t('home.noDataToConvert') || '请先上传数据');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const result = convertCSVToSDTM(csvData);
      setConversionResult(result);
    } catch (err) {
      setErrorMessage(`${t('home.conversionFailed') || '转换失败'}: ${err instanceof Error ? err.message : '未知错误'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = () => {
    if (!conversionResult?.data) {
      setErrorMessage(t('home.noDataValidate') || '请先上传并转换数据进行验证');
      return;
    }
    try {
      const validation = validateSDTMCompliance({ DM: conversionResult.data });
      setValidationResult(validation);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(`${t('home.validationFailed') || '验证失败'}: ${err instanceof Error ? err.message : '未知错误'}`);
    }
  };

  const handleGenerateReport = () => {
    if (!conversionResult?.data) {
      setErrorMessage(t('home.noDataReport') || '请先上传并转换数据生成报告');
      return;
    }
    try {
      const report = generateFDAComplianceReport(conversionResult.data, {});
      setReportResult(report);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(`${t('home.reportGenerationFailed') || '报告生成失败'}: ${err instanceof Error ? err.message : '未知错误'}`);
    }
  };


  const handleDownloadResult = () => {
    if (!conversionResult?.data) {
      setErrorMessage(t('home.noDataToDownload') || '没有可下载的数据');
      return;
    }

    const csvContent = Array.isArray(conversionResult.data)
      ? [Object.keys(conversionResult.data[0]).join(','), ...conversionResult.data.map((row: any) => Object.values(row).join(','))].join('\n')
      : csvData;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'HandyCT_SDTM.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('home.heroTitle') || 'CDISC 数据转换工具'}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('home.heroSubtitle') || '快速、安全、合规的临床试验数据标准化转换'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <Tabs defaultValue="convert" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100">
            <TabsTrigger value="convert">{t('home.convert') || '转换'}</TabsTrigger>
            <TabsTrigger value="validate">{t('home.validate') || '验证'}</TabsTrigger>
            <TabsTrigger value="report">{t('home.report') || '报告'}</TabsTrigger>
          </TabsList>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Convert Tab */}
          <TabsContent value="convert" className="space-y-6">
            <Card className="shadow-md border-slate-200">
              <CardHeader>
                <CardTitle>{t('home.selectCDISCStandard') || '选择 CDISC 标准'}</CardTitle>
                <CardDescription>{t('home.selectDataStandardVersion') || '选择要转换的数据标准和版本'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('home.standard') || '标准'}</label>
                    <Select value={selectedStandard} onValueChange={handleStandardChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CDISC_STANDARDS.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('home.version') || '版本'}</label>
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger>
                        <SelectValue />
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

            <Card className="shadow-md border-slate-200">
              <CardHeader>
                <CardTitle>{t('home.uploadFile') || '上传数据文件'}</CardTitle>
                <CardDescription>{t('home.clinicalTrialData') || 'CSV 格式的临床试验数据'}</CardDescription>
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
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600">{t('home.dragDropOrClick') || '拖拽文件到此处或点击选择'}</p>
                  </div>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* File Info Display */}
                {fileName && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">{fileName}</p>
                        <p className="text-sm text-blue-700">{t('home.rowCount') || '行数'}: {rowCount}</p>
                        <div className="mt-2 text-xs text-blue-700 bg-white p-2 rounded border border-blue-200 max-h-24 overflow-auto">
                          <p className="font-mono">{csvData.split('\n').slice(0, 3).join('\n')}</p>
                          {csvData.split('\n').length > 3 && <p className="text-blue-600 mt-1">...</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={handleConvert}
              disabled={!csvData || isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg"
            >
              {isLoading ? `${t('home.converting') || '转换中'}...` : t('home.startConverting') || '开始转换'}
            </Button>

            {/* Conversion Result */}
            {conversionResult && (
              <Card className="border-emerald-200 bg-emerald-50">
                <CardHeader>
                  <CardTitle className="text-emerald-900">{t('home.conversionSuccess') || '转换成功'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-emerald-800">{t('home.dataRows') || '数据行数'}: {Array.isArray(conversionResult.data) ? conversionResult.data.length : 0}</p>
                  <Button
                    onClick={handleDownloadResult}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('home.downloadResult') || '下载结果'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Validate Tab */}
          <TabsContent value="validate" className="space-y-6">
            <Card className="shadow-md border-slate-200">
              <CardHeader>
                <CardTitle>{t('home.complianceValidation') || 'CDISC 合规性验证'}</CardTitle>
                <CardDescription>{t('home.validateDataCompliance') || '检查数据是否符合 CDISC 标准'}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleValidate}
                  disabled={!conversionResult?.data}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {t('home.runValidation') || '运行验证'}
                </Button>

                {validationResult && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">{t('home.validationPassed') || '验证通过'}</p>
                        <p className="text-sm text-blue-700 mt-2">{validationResult.message || t('home.dataCompliant') || '数据符合 CDISC 标准'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!conversionResult?.data && (
                  <p className="text-center text-slate-500 mt-4">{t('home.noDataValidate') || '请先上传并转换数据进行验证'}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="space-y-6">
            <Card className="shadow-md border-slate-200">
              <CardHeader>
                <CardTitle>{t('home.fdaComplianceReport') || 'FDA 合规性报告'}</CardTitle>
                <CardDescription>{t('home.reportDescription') || '生成符合 FDA 要求的合规性报告'}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleGenerateReport}
                  disabled={!conversionResult?.data}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {t('home.generateReport') || '生成报告'}
                </Button>

                {reportResult && (
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-purple-900">{t('home.reportGenerated') || '报告已生成'}</p>
                        <p className="text-sm text-purple-700 mt-2">{reportResult.message || t('home.reportContent') || '报告内容已准备好'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {!conversionResult?.data && (
                  <p className="text-center text-slate-500 mt-4">{t('home.noDataReport') || '请先上传并转换数据生成报告'}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upload History */}
        {uploadHistory.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('home.uploadHistory') || '上传历史'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {uploadHistory.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                    <div>
                      <p className="font-medium text-slate-900">{record.fileName}</p>
                      <p className="text-xs text-slate-500">{record.timestamp} · {record.rowCount} {t('home.rows') || '行'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Resources */}
        <Card className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardHeader>
            <CardTitle>{t('home.learningResources') || '学习资源'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">{t('home.readTechBlog') || '阅读我们的技术博客，了解 FDA 合规性最佳实践。'}</p>
            <Link href="/blog">
              <a className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                {t('home.visitTechBlog') || '访问技术博客'}
              </a>
            </Link>
          </CardContent>
        </Card>
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
