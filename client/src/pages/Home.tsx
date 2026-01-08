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
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [csvData, setCsvData] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="rounded-lg bg-emerald-600 p-2">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">HandyCT 2.0</h1>
              <p className="text-xs text-slate-500">Next Gen CDISC Converter</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold text-slate-900">HandyCT</h1>
            </div>
          </div>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-2">
            <a href="/#/blog" className="no-underline">
              <Button variant="ghost" size="sm">
                {t('nav.blog')}
              </Button>
            </a>
            <LanguageSwitcher />
          </div>
          
          {/* 移动端菜单按钮 */}
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
        
        {/* 移动端菜单 */}
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

      {/* 主内容区域 */}
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 左侧：转换配置 */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="convert" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="convert">转换</TabsTrigger>
                <TabsTrigger value="validate">验证</TabsTrigger>
                <TabsTrigger value="report">报告</TabsTrigger>
              </TabsList>

              {/* 转换标签页 */}
              <TabsContent value="convert" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>选择 CDISC 标准</CardTitle>
                    <CardDescription>选择要转换的数据标准和版本</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">标准</label>
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
                        <label className="text-sm font-medium text-slate-700">版本</label>
                        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                          <SelectTrigger>
                            <SelectValue placeholder="选择版本" />
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
                    <CardTitle>上传数据文件</CardTitle>
                    <CardDescription>支持 CSV 格式的临床试验数据</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-600">
                          拖拽文件到此处或
                          <label className="cursor-pointer font-medium text-emerald-600 hover:text-emerald-700">
                            点击选择
                            <input
                              type="file"
                              accept=".csv"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </p>
                      </div>
                    </div>

                    {csvData && (
                      <div className="rounded-lg bg-emerald-50 p-4">
                        <p className="text-sm text-emerald-800">
                          ✓ 已上传 {csvData.split('\n').length - 1} 行数据
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={handleConvert}
                      disabled={!csvData || !selectedVersion || isLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isLoading ? '转换中...' : '开始转换'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 验证标签页 */}
              <TabsContent value="validate" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>CDISC 合规性验证</CardTitle>
                    <CardDescription>检查数据是否符合 CDISC 标准</CardDescription>
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
                          重新验证
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">请先上传并转换数据</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 报告标签页 */}
              <TabsContent value="report" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>FDA 合规性报告</CardTitle>
                    <CardDescription>生成详细的 FDA 数据审计报告</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {conversionResult ? (
                      <div className="space-y-4">
                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-sm text-slate-600">
                            合规评分: <span className="font-bold text-emerald-600">
                              {conversionResult.data?.summary?.complianceScore || 0}%
                            </span>
                          </p>
                        </div>
                        <Button onClick={handleGenerateReport} className="w-full">
                          生成报告
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          下载为 PDF
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">请先上传并转换数据</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* 右侧：学习资源（仅桌面端显示） */}
          <div className="hidden lg:block space-y-6">
            {/* 学习资源 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">学习资源</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-600">阅读我们的技术博客，了解 FDA 合规性最佳实践。</p>
                <a href="/#/blog" className="block no-underline">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    访问技术博客
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 底部状态栏 */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600 gap-2">
          <p>HandyCT 2.0 - 现代化 CDISC 数据转换工具</p>
        </div>
      </footer>
    </div>
  );
}
