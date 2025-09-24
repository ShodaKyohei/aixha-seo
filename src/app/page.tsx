'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BacklinkStrategy from '@/components/BacklinkStrategy';
import BacklinkAnalyzer from '@/components/BacklinkAnalyzer';
import AccountList from '@/components/AccountList';

interface SEOMetrics {
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  h1Count: number;
  imageAltCount: number;
  internalLinks: number;
  externalLinks: number;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSEO = async () => {
    setLoading(true);
    // Placeholder for SEO analysis logic
    setMetrics({
      title: 'Example Page Title',
      titleLength: 18,
      description: 'Example meta description',
      descriptionLength: 24,
      h1Count: 1,
      imageAltCount: 5,
      internalLinks: 10,
      externalLinks: 3
    });
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analysis/page-analysis':
        return <PageAnalysisContent url={url} setUrl={setUrl} metrics={metrics} loading={loading} analyzeSEO={analyzeSEO} />;
      case 'backlinks/backlink-strategy':
        return <BacklinkStrategy />;
      case 'backlinks/backlink-analysis':
        return <BacklinkAnalyzer />;
      case 'backlinks/account-list':
        return <AccountList />;
      case 'backlinks/outreach':
        return <OutreachContent />;
      case 'content/content-optimizer':
        return <ContentOptimizerContent />;
      case 'technical/site-audit':
        return <SiteAuditContent />;
      default:
        return <ComingSoonContent section={activeSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Dashboard Component
function DashboardContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        SEO ダッシュボード
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="ドメイン権威"
          value="45"
          unit="/100"
          trend="+5"
          color="blue"
        />
        <StatCard
          title="バックリンク数"
          value="1,247"
          unit=""
          trend="+123"
          color="green"
        />
        <StatCard
          title="オーガニック流入"
          value="23.5K"
          unit="/月"
          trend="+12%"
          color="purple"
        />
        <StatCard
          title="キーワードランク"
          value="342"
          unit="個"
          trend="+28"
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">最近の活動</h2>
          <div className="space-y-3">
            <ActivityItem
              icon="📄"
              title="新規ページ分析完了"
              time="2時間前"
              status="success"
            />
            <ActivityItem
              icon="🔗"
              title="15個の新規バックリンク検出"
              time="5時間前"
              status="info"
            />
            <ActivityItem
              icon="⚠️"
              title="3個のリンク切れを検出"
              time="1日前"
              status="warning"
            />
            <ActivityItem
              icon="✅"
              title="サイトマップ更新完了"
              time="2日前"
              status="success"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">クイックアクション</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton icon="🔍" label="ページ分析" />
            <QuickActionButton icon="🔗" label="バックリンク確認" />
            <QuickActionButton icon="📝" label="コンテンツ最適化" />
            <QuickActionButton icon="📊" label="レポート生成" />
            <QuickActionButton icon="🏷️" label="メタタグ生成" />
            <QuickActionButton icon="🗺️" label="サイトマップ更新" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Page Analysis Component
function PageAnalysisContent({ url, setUrl, metrics, loading, analyzeSEO }: any) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        ページ分析
      </h1>

      {/* URL Input */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="分析するURLを入力 (例: https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={analyzeSEO}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? '分析中...' : '分析開始'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {metrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            分析結果
          </h2>
          <div className="space-y-4">
            <AnalysisItem
              label="タイトルタグ"
              value={metrics.title}
              status={metrics.titleLength >= 30 && metrics.titleLength <= 60 ? 'good' : 'warning'}
              hint={`${metrics.titleLength}文字 (推奨: 30-60文字)`}
            />
            <AnalysisItem
              label="メタディスクリプション"
              value={metrics.description}
              status={metrics.descriptionLength >= 120 && metrics.descriptionLength <= 160 ? 'good' : 'warning'}
              hint={`${metrics.descriptionLength}文字 (推奨: 120-160文字)`}
            />
            <AnalysisItem
              label="H1タグ"
              value={`${metrics.h1Count}個検出`}
              status={metrics.h1Count === 1 ? 'good' : 'error'}
              hint={metrics.h1Count === 1 ? '完璧！' : '1個のH1タグが必要です'}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Outreach Component
function OutreachContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        アウトリーチ管理
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <span className="text-6xl mb-4 block">📧</span>
          <h2 className="text-xl font-semibold mb-2">アウトリーチキャンペーン</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            効果的なメールテンプレートとフォローアップ戦略で、バックリンク獲得率を向上させます。
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            新規キャンペーン作成
          </button>
        </div>
      </div>
    </div>
  );
}

// Content Optimizer Component
function ContentOptimizerContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        コンテンツ最適化
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <span className="text-6xl mb-4 block">✨</span>
          <h2 className="text-xl font-semibold mb-2">AIコンテンツ最適化</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            SEOに最適化されたコンテンツを自動生成・改善します。キーワード密度、見出し構造、内部リンクを最適化。
          </p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            コンテンツを最適化
          </button>
        </div>
      </div>
    </div>
  );
}

// Site Audit Component
function SiteAuditContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        サイト監査
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🔧</span>
          <h2 className="text-xl font-semibold mb-2">技術的SEO監査</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            サイト全体をスキャンして、技術的なSEO問題を検出・修正提案を行います。
          </p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            監査を開始
          </button>
        </div>
      </div>
    </div>
  );
}

// Coming Soon Component
function ComingSoonContent({ section }: { section: string }) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <span className="text-6xl mb-4 block">🚧</span>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          準備中
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {section} は現在開発中です
        </p>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, unit, trend, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <span className={`text-xs font-medium px-2 py-1 rounded ${colorClasses[color]} text-white`}>
          {trend}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}<span className="text-xl">{unit}</span>
      </p>
    </div>
  );
}

function ActivityItem({ icon, title, time, status }: any) {
  const statusColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className={`text-sm font-medium ${statusColors[status]}`}>{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: any) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </button>
  );
}

function AnalysisItem({ label, value, status, hint }: any) {
  const statusColors = {
    good: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const statusIcons = {
    good: '✓',
    warning: '⚠',
    error: '✗',
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">{label}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{hint}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]}`}>
          {statusIcons[status]} {status === 'good' ? '良好' : status === 'warning' ? '注意' : 'エラー'}
        </span>
      </div>
    </div>
  );
}