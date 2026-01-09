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
import Footer from '@/components/Footer';

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
            {/* Privacy Radar - 安全自检说明 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <div className="flex gap-4">
                <div className="text-2xl">🔒</div>
                <div className="flex-1">
                  <p className="font-bold text-green-900 mb-2">隐私雷达：100% 物理断网可用</p>
                  <p className="text-sm text-green-800 mb-3">
                    HandyCT 采用 Web-AI 技术。所有 CDISC 转换（SDTM、ADaM、Define-XML）均在您的浏览器本地内存运行。您的数据永不上传服务器。
                  </p>
                  <div className="bg-white border border-green-200 rounded p-3 text-xs text-green-800">
                    <p className="font-semibold mb-2">✅ 安全自检 1-2-3：</p>
                    <ol className="space-y-1 ml-4 list-decimal">
                      <li><strong>打开网页</strong> → 上传您的 CSV 文件</li>
                      <li><strong>断开网络</strong> → 禁用浏览器网络或拔掉网线</li>
                      <li><strong>照常转换</strong> → 转换仍可进行。证明您的数据从未触网。</li>
                    </ol>
                  </div>
                  <p className="text-xs text-green-700 mt-2 mb-3 font-semibold">💡 数据处理逻辑：Client-side JavaScript，无任何后端接收接口</p>
                  <a href="/#/security-whitepaper" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition">
                    <span>📄</span>
                    查看 IT 安全白皮书
                  </a>
                </div>
              </div>
            </div>

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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-blue-800 font-semibold mb-2">🌐 Web-AI 技术说明</p>
              <p className="text-xs text-blue-700">
                HandyCT 采用客户端 JavaScript 处理。所有转换在您的浏览器中进行，无需服务器参与。即使断网，转换功能仍可正常使用。
              </p>
            </div>

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
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={disclaimerAgreed}
                        onChange={(e) => setDisclaimerAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4"
                      />
                      <span className="text-xs text-amber-900">
                        我已了解并确认：本数据由 AI 辅助生成，我将履行最终核查义务，确保数据符合 CDISC/FDA 规范。
                      </span>
                    </label>
                  </div>
                  
                  <Button
                    onClick={handleDownloadResult}
                    disabled={!disclaimerAgreed}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

      <Footer />
    </div>
  );
}
