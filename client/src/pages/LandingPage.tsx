import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import { CheckCircle2, Zap, Lock, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const handleStartConversion = () => {
    setLocation('/converter');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-1 py-24 px-4 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 50%, #0F172A 100%)',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(16, 185, 129, 0.03) 35px, rgba(16, 185, 129, 0.03) 70px), repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(16, 185, 129, 0.03) 35px, rgba(16, 185, 129, 0.03) 70px)'
      }}>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            {t('home.landing.heroTitle') || 'AI 驱动的临床数据合规引擎'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('home.landing.heroSubtitle') || '让 CDISC 转换告别手动映射。从数天到数分钟，端侧 AI 实现 100% 数据隐私。'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartConversion}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-2xl transition shadow-soft-lg"
            >
              <Zap className="w-5 h-5" />
              {t('home.landing.startButton') || '立即开始转换'}
            </button>
            <a
              href="/#/security-whitepaper"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white text-lg font-bold rounded-2xl transition shadow-soft-lg hover:shadow-soft-lg"
            >
              📄 {t('home.landing.whitepaper') || '查看安全白皮书'}
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {t('home.landing.painPointsTitle') || '手动 vs AI：效率对比'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Manual Process */}
            <div className="border border-red-200 rounded-lg p-8 bg-red-50">
              <h3 className="text-xl font-bold text-red-900 mb-4">
                {t('home.landing.manualProcess') || '❌ 手动映射'}
              </h3>
              <ul className="space-y-3 text-red-800">
                <li>⼏️ {t('home.landing.manual1') || '5-10 天转换时间'}</li>
                <li>👥 {t('home.landing.manual2') || '需要 2-3 名专家'}</li>
                <li>🐛 {t('home.landing.manual3') || '30% 错误率'}</li>
                <li>💾 {t('home.landing.manual4') || '数据存储在服务器'}</li>
                <li>📋 {t('home.landing.manual5') || '大量重复工作'}</li>
              </ul>
            </div>

            {/* AI Process */}
            <div className="border border-green-200 rounded-lg p-8 bg-green-50">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✅ {t('home.landing.aiProcess') || 'HandyCT AI'}
              </h3>
              <ul className="space-y-3 text-green-800">
                <li>⚡ {t('home.landing.ai1') || '2 分钟快速转换'}</li>
                <li>🤖 {t('home.landing.ai2') || '完全自动化'}</li>
                <li>🎯 {t('home.landing.ai3') || '99.9% 准确率'}</li>
                <li>🔐 {t('home.landing.ai4') || '100% 端侧处理'}</li>
                <li>📋 {t('home.landing.ai5') || '实时验证报告'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {t('home.landing.coreValuesTitle') || '为什么选择 HandyCT？'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1: Security */}
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-green-600">
              <Lock className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('home.landing.value1Title') || '端侧 AI 安全'}
              </h3>
              <p className="text-slate-600 mb-4">
                {t('home.landing.value1Desc') || '所有数据在您的浏览器本地处理，无需上传服务器。100% 物理断网可用。'}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t('home.landing.value1Item1') || 'GDPR 完全合规'}</li>
                <li>✓ {t('home.landing.value1Item2') || 'HIPAA 无需 BAA'}</li>
                <li>✓ {t('home.landing.value1Item3') || 'FDA 21 CFR Part 11'}</li>
              </ul>
            </div>

            {/* Value 2: Speed */}
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-blue-600">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('home.landing.value2Title') || '极速转换'}
              </h3>
              <p className="text-slate-600 mb-4">
                {t('home.landing.value2Desc') || '毫秒级处理，支持 SDTM、ADaM、Define-XML 一键转换。'}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t('home.landing.value2Item1') || '2 分钟完成转换'}</li>
                <li>✓ {t('home.landing.value2Item2') || '支持批量处理'}</li>
                <li>✓ {t('home.landing.value2Item3') || '实时验证反馈'}</li>
              </ul>
            </div>

            {/* Value 3: Compliance */}
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-purple-600">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t('home.landing.value3Title') || '合规保证'}
              </h3>
              <p className="text-slate-600 mb-4">
                {t('home.landing.value3Desc') || '内置 FDA 级验证规则，自动检测格式错误，规避 AI 幻觉。'}
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t('home.landing.value3Item1') || 'CDISC IG 最新标准'}</li>
                <li>✓ {t('home.landing.value3Item2') || '99.9% 准确率'}</li>
                <li>✓ {t('home.landing.value3Item3') || '自动合规报告'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Whitepaper Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {t('home.landing.trustTitle') || '技术透明化与安全自证'}
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              {t('home.landing.trustDesc') || 'HandyCT 采用端侧 AI 技术，所有数据处理在您的浏览器本地进行。我们发布了详细的 IT 安全白皮书，支持 Network 抓包验证。'}
            </p>
            <a
              href="/#/security-whitepaper"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              📄 {t('home.landing.whitepaper') || '查看 IT 安全白皮书'}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.landing.ctaTitle') || '准备好提升您的数据转换效率了吗？'}
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            {t('home.landing.ctaDesc') || '免费试用 HandyCT，无需信用卡，无需注册。'}
          </p>
          <button
            onClick={handleStartConversion}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-lg hover:bg-emerald-50 transition shadow-lg"
          >
            <Zap className="w-5 h-5" />
            {t('home.landing.startButton') || '立即开始转换'}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
