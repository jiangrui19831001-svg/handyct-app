import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import Footer from '@/components/Footer';

export default function Converter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const { t, i18n } = useTranslation();
  const [selectedStandard, setSelectedStandard] = useState<string>('sdtm');
  const [selectedVersion, setSelectedVersion] = useState<string>('sdtm-3.4');
  
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
  const [disclaimerAgreed, setDisclaimerAgreed] = useState<boolean>(false);

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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.name.endsWith('.csv')) {
        setErrorMessage(t('home.csvFormatError') || '请上传 CSV 格式的文件');
        return;
      }
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
      };
      reader.readAsText(file);
    }
  };

  const handleConvert = async () => {
    if (!csvData) {
      setErrorMessage(t('home.pleaseUploadFile') || '请先上传 CSV 文件');
      return;
    }
    if (!disclaimerAgreed) {
      setErrorMessage(t('home.disclaimerRequired') || '请同意免责声明');
      return;
    }

    setIsLoading(true);
    try {
      const result = convertCSVToSDTM(csvData);
      setConversionResult(result);
    } catch (err) {
      setErrorMessage(`${t('home.conversionFailed') || '转换失败'}: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!conversionResult) {
      setErrorMessage(t('home.pleaseConvertFirst') || '请先进行转换');
      return;
    }

    setIsLoading(true);
    try {
      const result = validateSDTMCompliance(conversionResult);
      setValidationResult(result);
    } catch (err) {
      setErrorMessage(`${t('home.validationFailed') || '验证失败'}: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!conversionResult) {
      setErrorMessage(t('home.pleaseConvertFirst') || '请先进行转换');
      return;
    }

    setIsLoading(true);
    try {
      const result = generateFDAComplianceReport(conversionResult, selectedStandard);
      setReportResult(result);
    } catch (err) {
      setErrorMessage(`${t('home.reportGenerationFailed') || '报告生成失败'}: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (data: string, filename: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t('home.cdiscConverter') || 'CDISC 数据转换工具'}
          </h1>
          <p className="text-slate-600 mb-8">
            {t('home.converterDescription') || '快速、安全、合规的临床试验数据标准化转换'}
          </p>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          <Tabs defaultValue="convert" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="convert">{t('home.convert') || '转换'}</TabsTrigger>
              <TabsTrigger value="validate">{t('home.validate') || '验证'}</TabsTrigger>
              <TabsTrigger value="report">{t('home.report') || '报告'}</TabsTrigger>
            </TabsList>

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
                          {currentStandard?.versions.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.version} ({v.status})
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
                  <CardTitle>{t('home.uploadDataFile') || '上传数据文件'}</CardTitle>
                  <CardDescription>{t('home.csvFormatDescription') || 'CSV 格式的临床试验数据'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                      dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 mb-2">
                      {t('home.dragDropText') || '拖拽文件到此处或点击选择'}
                    </p>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="inline-block">
                      <Button variant="outline" className="cursor-pointer">
                        {t('home.selectFile') || '选择文件'}
                      </Button>
                    </label>
                  </div>

                  {fileName && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">{fileName}</p>
                        <p className="text-sm text-green-700">{rowCount} {t('home.rows') || '行数据'}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="disclaimer"
                      checked={disclaimerAgreed}
                      onChange={(e) => setDisclaimerAgreed(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="disclaimer" className="text-sm text-slate-600">
                      {t('home.disclaimerText') || '我已阅读并同意免责声明'}
                    </label>
                  </div>

                  <Button
                    onClick={handleConvert}
                    disabled={!csvData || !disclaimerAgreed || isLoading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isLoading ? t('home.converting') || '转换中...' : t('home.startConversion') || '开始转换'}
                  </Button>
                </CardContent>
              </Card>

              {conversionResult && (
                <Card className="shadow-md border-emerald-200 bg-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-emerald-900">{t('home.conversionSuccess') || '转换成功'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <pre className="bg-white border border-emerald-200 rounded p-4 overflow-auto text-xs">
                      {JSON.stringify(conversionResult, null, 2)}
                    </pre>
                    <Button
                      onClick={() => handleDownload(JSON.stringify(conversionResult, null, 2), 'conversion_result.json')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('home.downloadResult') || '下载结果'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="validate" className="space-y-6">
              <Card className="shadow-md border-slate-200">
                <CardHeader>
                  <CardTitle>{t('home.validateConversion') || '验证转换结果'}</CardTitle>
                  <CardDescription>{t('home.validateDescription') || '检查转换后的数据是否符合 CDISC 标准'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleValidate}
                    disabled={!conversionResult || isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? t('home.validating') || '验证中...' : t('home.startValidation') || '开始验证'}
                  </Button>
                </CardContent>
              </Card>

              {validationResult && (
                <Card className={`shadow-md border-l-4 ${validationResult.isValid ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <CardHeader>
                    <CardTitle className={validationResult.isValid ? 'text-green-900' : 'text-red-900'}>
                      {validationResult.isValid ? t('home.validationPassed') || '验证通过' : t('home.validationFailed') || '验证失败'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-white rounded p-4 overflow-auto text-xs">
                      {JSON.stringify(validationResult, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="report" className="space-y-6">
              <Card className="shadow-md border-slate-200">
                <CardHeader>
                  <CardTitle>{t('home.generateReport') || '生成 FDA 合规报告'}</CardTitle>
                  <CardDescription>{t('home.reportDescription') || '生成详细的 FDA 21 CFR Part 11 合规报告'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleGenerateReport}
                    disabled={!conversionResult || isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? t('home.generatingReport') || '生成中...' : t('home.startReportGeneration') || '生成报告'}
                  </Button>
                </CardContent>
              </Card>

              {reportResult && (
                <Card className="shadow-md border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-purple-900">{t('home.reportGenerated') || '报告已生成'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <pre className="bg-white border border-purple-200 rounded p-4 overflow-auto text-xs">
                      {JSON.stringify(reportResult, null, 2)}
                    </pre>
                    <Button
                      onClick={() => handleDownload(JSON.stringify(reportResult, null, 2), 'fda_compliance_report.json')}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t('home.downloadReport') || '下载报告'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {uploadHistory.length > 0 && (
            <Card className="mt-8 shadow-md border-slate-200">
              <CardHeader>
                <CardTitle>{t('home.uploadHistory') || '上传历史'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {uploadHistory.map((record) => (
                    <div key={record.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                      <div>
                        <p className="font-semibold text-slate-900">{record.fileName}</p>
                        <p className="text-xs text-slate-600">{record.timestamp} • {record.rowCount} {t('home.rows') || '行'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
