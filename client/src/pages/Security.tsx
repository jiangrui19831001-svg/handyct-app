import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Server, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">{t('security.title')}</h1>
          <p className="mb-8 text-lg text-slate-600">
            {t('security.subtitle')}
          </p>
        </div>
      </section>

      {/* Security Features */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16" id="fda">
          {/* Local Browser Processing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Lock className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>{t('security.localBrowserProcessing')}</CardTitle>
              </div>
              <CardDescription>{t('security.localBrowserProcessingDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                {t('security.localBrowserProcessingContent')}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.noNetworkTransmission')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.worksOffline')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t('security.instantProcessing')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Zero Server Storage */}
          <Card id="cdisc">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Server className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t('security.zeroServerStorage')}</CardTitle>
              </div>
              <CardDescription>{t('security.zeroServerStorageDesc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                {t('security.zeroServerStorageContent')}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-3">
                <p className="text-xs text-blue-900 font-semibold">
                  🔐 <strong>法律保障：</strong>因为我们不存储任何用户数据，所以我们无法泄露数据。这是最强的数据保护承诺——没有数据留在我们的服务器上，就没有数据泄露的法律风险。
                </p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.noDatabaseStorage')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.noAuditLogs')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{t('security.compliantWithGDPR')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose HandyCT vs Generic AI */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">为什么选择 HandyCT 而非通用 AI？</h2>
          <p className="text-slate-600 mb-8">HandyCT 专为 CDISC 数据标准化设计，相比通用大模型具有显著优势</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Advantage A */}
            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">A</div>
                <h3 className="font-bold text-slate-900">垂直领域模型</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                HandyCT 深度集成 CDISC IG 最新标准库，无需反复调试 Prompt。开箱即用的 SDTM、ADaM、Define-XML 转换规则，省去 CRO 程序员 80% 的调试时间。
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-3">✓ 专业级精度 | ✓ 零学习曲线</p>
            </div>

            {/* Advantage B */}
            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">B</div>
                <h3 className="font-bold text-slate-900">实时合规校验</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                内置 FDA 级验证规则库，直接指出格式错误、缺失字段、数据类型不匹配等问题。规避通用 AI 的幻觉风险，确保数据 100% 符合监管要求。
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-3">✓ FDA 级验证 | ✓ 零风险交付</p>
            </div>

            {/* Advantage C */}
            <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">C</div>
                <h3 className="font-bold text-slate-900">零集成成本</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                无需公司 IT 部门部署、无需 API 密钥配置、无需服务器维护。浏览器本地运行，立即可用。对标内网大模型的部署成本，HandyCT 成本为零。
              </p>
              <p className="text-xs text-blue-600 font-semibold mt-3">✓ 即插即用 | ✓ 无维护成本</p>
            </div>
          </div>
        </section>

        {/* Privacy Radar */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex gap-4">
            <div className="text-2xl">🔍</div>
            <div className="flex-1">
              <p className="font-bold text-purple-900 mb-2">隐私雷达：端侧 AI 技术透明化</p>
              <p className="text-sm text-purple-800 mb-3">
                HandyCT 采用 Web-AI 技术。所有 CDISC 标准转换均在您的浏览器本地内存运行，100% 物理断网可用。您的数据永不上传到任何服务器。
              </p>
              <ul className="text-xs text-purple-700 space-y-1 ml-4 list-disc">
                <li><strong>数据处理：</strong>Client-side JavaScript，无任何后端接收接口</li>
                <li><strong>数据存储：</strong>零服务器存储，浏览器关闭后自动删除</li>
                <li><strong>离线可用：</strong>断网状态下仍可继续转换，证明数据从未触网</li>
                <li><strong>数据主权：</strong>您的数据完全归您所有，HandyCT 无访问能力</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Standards */}
        <Card className="shadow-md border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>{t('security.complianceStandards')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8" id="compliance" style={{ scrollMarginTop: '100px' }}>
              <div id="fda" style={{ scrollMarginTop: '100px' }}>
                <h3 className="font-bold text-slate-900 mb-2">🏛️ {t('security.fdaCompliant')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.fdaCompliantDesc')}
                </p>
                <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                  <p className="text-xs text-purple-700 font-semibold">📋 规则库版本</p>
                  <p className="text-xs text-purple-600 mt-1">FDA 21 CFR Part 11</p>
                  <p className="text-xs text-purple-600">ICH-GCP E6(R2)</p>
                </div>
              </div>
              <div id="cdisc" style={{ scrollMarginTop: '100px' }}>
                <h3 className="font-bold text-slate-900 mb-2">📊 {t('security.cdisc')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.cdiscDesc')}
                </p>
                <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                  <p className="text-xs text-purple-700 font-semibold">📋 规则库版本</p>
                  <p className="text-xs text-purple-600 mt-1">SDTM v1.7 / ADaM v1.1</p>
                  <p className="text-xs text-purple-600">Define-XML v2.1</p>
                </div>
              </div>
              <div id="compliance-privacy" style={{ scrollMarginTop: '100px' }}>
                <h3 className="font-bold text-slate-900 mb-2">🔐 {t('security.dataPrivacy')}</h3>
                <p className="text-sm text-slate-600">
                  {t('security.dataPrivacyDesc')}
                </p>
                <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                  <p className="text-xs text-purple-700 font-semibold">📋 规则库版本</p>
                  <p className="text-xs text-purple-600 mt-1">GDPR 2018/679</p>
                  <p className="text-xs text-purple-600">HIPAA 45 CFR 164</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('security.readyToConvert')}</h2>
          <Link href="/">
            <a>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                {t('security.startConvertingNow')}
              </Button>
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
