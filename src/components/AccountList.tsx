'use client';

import { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  nameJa: string;
  icon: string;
  category: 'blog' | 'social' | 'tech' | 'visual' | 'business' | 'qa';
  priority: 'must' | 'high' | 'medium' | 'low';
  url: string;
  domainAuthority?: number;
  backlinkType: 'dofollow' | 'nofollow' | 'mixed';
  description: string;
  setupDifficulty: 'easy' | 'medium' | 'hard';
  accountCreated?: boolean;
  profileUrl?: string;
}

const platforms: Platform[] = [
  // 必須プラットフォーム
  {
    id: 'note',
    name: 'note',
    nameJa: 'ノート',
    icon: '📝',
    category: 'blog',
    priority: 'must',
    url: 'https://note.com',
    domainAuthority: 82,
    backlinkType: 'nofollow',
    description: '日本最大級のクリエイター向けプラットフォーム。SEO効果は高く、記事の拡散力も強い。',
    setupDifficulty: 'easy',
  },
  {
    id: 'hatena',
    name: 'Hatena Blog',
    nameJa: 'はてなブログ',
    icon: '📖',
    category: 'blog',
    priority: 'must',
    url: 'https://hatenablog.com',
    domainAuthority: 85,
    backlinkType: 'nofollow',
    description: '技術系記事に強く、はてなブックマーク経由での拡散力が高い。開発者コミュニティで人気。',
    setupDifficulty: 'easy',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    nameJa: 'X (旧Twitter)',
    icon: '🐦',
    category: 'social',
    priority: 'must',
    url: 'https://x.com',
    domainAuthority: 95,
    backlinkType: 'nofollow',
    description: 'リアルタイム情報発信と拡散力No.1。プロフィールからのリンクは重要。',
    setupDifficulty: 'easy',
  },

  // 高優先度
  {
    id: 'qiita',
    name: 'Qiita',
    nameJa: 'Qiita',
    icon: '💻',
    category: 'tech',
    priority: 'high',
    url: 'https://qiita.com',
    domainAuthority: 78,
    backlinkType: 'nofollow',
    description: '日本最大の技術情報共有サービス。エンジニア向けコンテンツで高い権威性。',
    setupDifficulty: 'easy',
  },
  {
    id: 'zenn',
    name: 'Zenn',
    nameJa: 'Zenn',
    icon: '📚',
    category: 'tech',
    priority: 'high',
    url: 'https://zenn.dev',
    domainAuthority: 65,
    backlinkType: 'nofollow',
    description: 'エンジニアのための情報共有コミュニティ。技術書の販売も可能。',
    setupDifficulty: 'easy',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    nameJa: 'ピンタレスト',
    icon: '📌',
    category: 'visual',
    priority: 'high',
    url: 'https://pinterest.com',
    domainAuthority: 94,
    backlinkType: 'nofollow',
    description: 'ビジュアルコンテンツの発見エンジン。長期的なトラフィック獲得に有効。',
    setupDifficulty: 'medium',
  },

  // 中優先度
  {
    id: 'medium',
    name: 'Medium',
    nameJa: 'Medium',
    icon: '✍️',
    category: 'blog',
    priority: 'medium',
    url: 'https://medium.com',
    domainAuthority: 96,
    backlinkType: 'nofollow',
    description: '世界的な執筆プラットフォーム。英語圏への展開に有効。',
    setupDifficulty: 'easy',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    nameJa: 'LinkedIn',
    icon: '💼',
    category: 'business',
    priority: 'medium',
    url: 'https://linkedin.com',
    domainAuthority: 98,
    backlinkType: 'nofollow',
    description: 'ビジネス向けSNS。B2B市場で特に重要。記事投稿機能あり。',
    setupDifficulty: 'medium',
  },
  {
    id: 'github',
    name: 'GitHub',
    nameJa: 'GitHub',
    icon: '🐙',
    category: 'tech',
    priority: 'medium',
    url: 'https://github.com',
    domainAuthority: 96,
    backlinkType: 'dofollow',
    description: '開発者向けコード共有プラットフォーム。READMEからのリンクは効果的。',
    setupDifficulty: 'easy',
  },
  {
    id: 'dev-to',
    name: 'DEV Community',
    nameJa: 'DEV',
    icon: '🏗️',
    category: 'tech',
    priority: 'medium',
    url: 'https://dev.to',
    domainAuthority: 82,
    backlinkType: 'dofollow',
    description: '国際的な開発者コミュニティ。技術記事の共有に最適。',
    setupDifficulty: 'easy',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    nameJa: 'YouTube',
    icon: '📹',
    category: 'visual',
    priority: 'medium',
    url: 'https://youtube.com',
    domainAuthority: 100,
    backlinkType: 'nofollow',
    description: '動画プラットフォーム。説明欄からのリンクとチャンネル概要からのリンクが可能。',
    setupDifficulty: 'medium',
  },

  // 低優先度
  {
    id: 'tumblr',
    name: 'Tumblr',
    nameJa: 'Tumblr',
    icon: '🎨',
    category: 'blog',
    priority: 'low',
    url: 'https://tumblr.com',
    domainAuthority: 93,
    backlinkType: 'nofollow',
    description: 'マイクロブログプラットフォーム。クリエイティブコンテンツに強い。',
    setupDifficulty: 'easy',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    nameJa: 'Reddit',
    icon: '👽',
    category: 'qa',
    priority: 'low',
    url: 'https://reddit.com',
    domainAuthority: 91,
    backlinkType: 'nofollow',
    description: '世界最大の掲示板サイト。関連サブレディットでの活動が重要。',
    setupDifficulty: 'hard',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    nameJa: 'インスタグラム',
    icon: '📷',
    category: 'visual',
    priority: 'low',
    url: 'https://instagram.com',
    domainAuthority: 96,
    backlinkType: 'nofollow',
    description: 'ビジュアル中心のSNS。プロフィールリンクのみ設置可能。',
    setupDifficulty: 'easy',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    nameJa: 'Facebook',
    icon: '👍',
    category: 'social',
    priority: 'low',
    url: 'https://facebook.com',
    domainAuthority: 96,
    backlinkType: 'nofollow',
    description: '世界最大のSNS。ページ作成で複数リンク設置可能。',
    setupDifficulty: 'medium',
  },
  {
    id: 'speakerdeck',
    name: 'Speaker Deck',
    nameJa: 'Speaker Deck',
    icon: '🎤',
    category: 'visual',
    priority: 'low',
    url: 'https://speakerdeck.com',
    domainAuthority: 82,
    backlinkType: 'nofollow',
    description: 'プレゼンテーション共有サービス。スライド内でリンク設置可能。',
    setupDifficulty: 'easy',
  },
  {
    id: 'slideshare',
    name: 'SlideShare',
    nameJa: 'SlideShare',
    icon: '📊',
    category: 'visual',
    priority: 'low',
    url: 'https://slideshare.net',
    domainAuthority: 95,
    backlinkType: 'nofollow',
    description: 'LinkedIn傘下のプレゼンテーション共有サービス。',
    setupDifficulty: 'easy',
  },
];

export default function AccountList() {
  const [accounts, setAccounts] = useState<Record<string, boolean>>(
    Object.fromEntries(platforms.map(p => [p.id, false]))
  );
  const [filter, setFilter] = useState<'all' | 'must' | 'created' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const toggleAccount = (id: string) => {
    setAccounts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlatforms = platforms.filter(platform => {
    if (filter === 'must' && platform.priority !== 'must') return false;
    if (filter === 'created' && !accounts[platform.id]) return false;
    if (filter === 'pending' && accounts[platform.id]) return false;
    if (categoryFilter !== 'all' && platform.category !== categoryFilter) return false;
    return true;
  });

  const stats = {
    total: platforms.length,
    created: Object.values(accounts).filter(Boolean).length,
    must: platforms.filter(p => p.priority === 'must').length,
    mustCreated: platforms.filter(p => p.priority === 'must' && accounts[p.id]).length,
  };

  const priorityColors = {
    must: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const categoryIcons = {
    blog: '📝',
    social: '🌐',
    tech: '💻',
    visual: '🎨',
    business: '💼',
    qa: '❓',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        外部リンク用アカウント管理
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.created}/{stats.total}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">作成済みアカウント</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.mustCreated}/{stats.must}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">必須アカウント</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round((stats.created / stats.total) * 100)}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">完了率</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {platforms.filter(p => p.backlinkType === 'dofollow').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">DoFollowリンク</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter('must')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'must'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            必須のみ
          </button>
          <button
            onClick={() => setFilter('created')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'created'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            作成済み
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            未作成
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              categoryFilter === 'all'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            全カテゴリ
          </button>
          {Object.entries(categoryIcons).map(([key, icon]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                categoryFilter === key
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {icon} {key}
            </button>
          ))}
        </div>
      </div>

      {/* Platform List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${
              accounts[platform.id] ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      ({platform.nameJa})
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded ${priorityColors[platform.priority]}`}>
                      {platform.priority === 'must' ? '必須' :
                       platform.priority === 'high' ? '高' :
                       platform.priority === 'medium' ? '中' : '低'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      DA: {platform.domainAuthority}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      platform.backlinkType === 'dofollow'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : platform.backlinkType === 'nofollow'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {platform.backlinkType}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleAccount(platform.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  accounts[platform.id]
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {accounts[platform.id] ? '✓ 作成済み' : '未作成'}
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {platform.description}
            </p>

            <div className="flex items-center justify-between">
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {platform.url}
              </a>
              <span className={`text-xs px-2 py-1 rounded ${
                platform.setupDifficulty === 'easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : platform.setupDifficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                設定: {platform.setupDifficulty === 'easy' ? '簡単' :
                       platform.setupDifficulty === 'medium' ? '普通' : '難しい'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 アカウント作成の推奨順序
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li><strong>必須3つ</strong>: note, はてなブログ, X (Twitter) - まずはこの3つから始めましょう</li>
          <li><strong>技術系</strong>: Qiita, Zenn, GitHub - 技術記事を書く場合は必須</li>
          <li><strong>ビジュアル系</strong>: Pinterest, YouTube - コンテンツの種類に応じて</li>
          <li><strong>ビジネス系</strong>: LinkedIn, Medium - B2Bや海外展開を考える場合</li>
          <li><strong>その他</strong>: 必要に応じて追加（Instagram, Facebook, Reddit等）</li>
        </ol>
      </div>
    </div>
  );
}