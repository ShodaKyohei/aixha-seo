'use client';

import { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  nameJa: string;
  icon: string;
  category: 'blog' | 'social' | 'tech' | 'visual' | 'business' | 'qa' | 'pr' | 'local' | 'creative' | 'academic';
  priority: 'must' | 'high' | 'medium' | 'low';
  url: string;
  domainAuthority?: number;
  backlinkType: 'dofollow' | 'nofollow' | 'mixed';
  description: string;
  setupDifficulty: 'easy' | 'medium' | 'hard';
  japanFocused?: boolean;
  accountCreated?: boolean;
  profileUrl?: string;
}

const platforms: Platform[] = [
  // ========== 必須プラットフォーム ==========
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
    japanFocused: true,
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
    japanFocused: true,
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
  {
    id: 'ameblo',
    name: 'Ameba Blog',
    nameJa: 'アメブロ',
    icon: '🌸',
    category: 'blog',
    priority: 'must',
    url: 'https://ameblo.jp',
    domainAuthority: 89,
    backlinkType: 'nofollow',
    description: '国内最大級のブログサービス。芸能人も多数利用。一般層へのリーチ力が高い。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'yahoo-chiebukuro',
    name: 'Yahoo! Chiebukuro',
    nameJa: 'Yahoo!知恵袋',
    icon: '❓',
    category: 'qa',
    priority: 'must',
    url: 'https://chiebukuro.yahoo.co.jp',
    domainAuthority: 91,
    backlinkType: 'nofollow',
    description: '日本最大のQ&Aサイト。質問への回答でリンク設置可能。信頼性とSEO効果が高い。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },

  // ========== 高優先度（日本向け）==========
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
    japanFocused: true,
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
    japanFocused: true,
  },
  {
    id: 'wantedly',
    name: 'Wantedly',
    nameJa: 'ウォンテッドリー',
    icon: '🤝',
    category: 'business',
    priority: 'high',
    url: 'https://www.wantedly.com',
    domainAuthority: 72,
    backlinkType: 'nofollow',
    description: 'ビジネスSNS。企業・個人ページからリンク設置可能。採用にも活用。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'newspicks',
    name: 'NewsPicks',
    nameJa: 'ニューズピックス',
    icon: '📰',
    category: 'business',
    priority: 'high',
    url: 'https://newspicks.com',
    domainAuthority: 68,
    backlinkType: 'nofollow',
    description: 'ビジネスニュース共有プラットフォーム。オピニオンリーダーが多数在籍。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'pr-times',
    name: 'PR TIMES',
    nameJa: 'PR TIMES',
    icon: '📢',
    category: 'pr',
    priority: 'high',
    url: 'https://prtimes.jp',
    domainAuthority: 83,
    backlinkType: 'nofollow',
    description: '日本最大級のプレスリリース配信サービス。メディア露出とSEO効果が高い。',
    setupDifficulty: 'hard',
    japanFocused: true,
  },
  {
    id: 'fc2-blog',
    name: 'FC2 Blog',
    nameJa: 'FC2ブログ',
    icon: '📔',
    category: 'blog',
    priority: 'high',
    url: 'https://blog.fc2.com',
    domainAuthority: 87,
    backlinkType: 'nofollow',
    description: '老舗ブログサービス。自由度が高くカスタマイズ性に優れる。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'livedoor-blog',
    name: 'livedoor Blog',
    nameJa: 'ライブドアブログ',
    icon: '📓',
    category: 'blog',
    priority: 'high',
    url: 'https://blog.livedoor.com',
    domainAuthority: 86,
    backlinkType: 'nofollow',
    description: 'LINE傘下の大手ブログサービス。まとめサイトも多数運営。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },

  // ========== 中優先度（グローバル）==========
  {
    id: 'pinterest',
    name: 'Pinterest',
    nameJa: 'ピンタレスト',
    icon: '📌',
    category: 'visual',
    priority: 'medium',
    url: 'https://pinterest.com',
    domainAuthority: 94,
    backlinkType: 'nofollow',
    description: 'ビジュアルコンテンツの発見エンジン。長期的なトラフィック獲得に有効。',
    setupDifficulty: 'medium',
  },
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
  {
    id: 'tiktok',
    name: 'TikTok',
    nameJa: 'TikTok',
    icon: '🎵',
    category: 'social',
    priority: 'medium',
    url: 'https://www.tiktok.com',
    domainAuthority: 91,
    backlinkType: 'nofollow',
    description: '短尺動画SNS。若年層へのリーチに最適。プロフィールリンクのみ。',
    setupDifficulty: 'easy',
  },

  // ========== 中優先度（日本向け）==========
  {
    id: 'connpass',
    name: 'connpass',
    nameJa: 'コンパス',
    icon: '🎫',
    category: 'tech',
    priority: 'medium',
    url: 'https://connpass.com',
    domainAuthority: 65,
    backlinkType: 'nofollow',
    description: 'エンジニア向けイベント管理サービス。イベント告知でリンク設置可能。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'pixiv',
    name: 'pixiv',
    nameJa: 'ピクシブ',
    icon: '🎨',
    category: 'creative',
    priority: 'medium',
    url: 'https://www.pixiv.net',
    domainAuthority: 85,
    backlinkType: 'nofollow',
    description: 'イラストSNS最大手。クリエイター向けコンテンツで高い影響力。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'nicovideo',
    name: 'Niconico',
    nameJa: 'ニコニコ動画',
    icon: '😊',
    category: 'visual',
    priority: 'medium',
    url: 'https://www.nicovideo.jp',
    domainAuthority: 84,
    backlinkType: 'nofollow',
    description: '日本独自の動画共有サービス。コメント文化が特徴的。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'togetter',
    name: 'Togetter',
    nameJa: 'トゥギャッター',
    icon: '🗞️',
    category: 'social',
    priority: 'medium',
    url: 'https://togetter.com',
    domainAuthority: 71,
    backlinkType: 'nofollow',
    description: 'Twitterまとめサービス。話題のツイートをまとめてリンク設置可能。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'oshiete-goo',
    name: 'Oshiete! goo',
    nameJa: '教えて!goo',
    icon: '💭',
    category: 'qa',
    priority: 'medium',
    url: 'https://oshiete.goo.ne.jp',
    domainAuthority: 76,
    backlinkType: 'nofollow',
    description: '老舗Q&Aサービス。NTTレゾナント運営で信頼性高い。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'tabelog',
    name: 'Tabelog',
    nameJa: '食べログ',
    icon: '🍽️',
    category: 'local',
    priority: 'medium',
    url: 'https://tabelog.com',
    domainAuthority: 88,
    backlinkType: 'nofollow',
    description: '日本最大級のグルメサイト。店舗情報にリンク設置可能。',
    setupDifficulty: 'hard',
    japanFocused: true,
  },
  {
    id: 'coconala',
    name: 'coconala',
    nameJa: 'ココナラ',
    icon: '🛍️',
    category: 'business',
    priority: 'medium',
    url: 'https://coconala.com',
    domainAuthority: 73,
    backlinkType: 'nofollow',
    description: 'スキル販売マーケットプレイス。プロフィールと商品ページからリンク可能。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'base',
    name: 'BASE',
    nameJa: 'ベイス',
    icon: '🏪',
    category: 'business',
    priority: 'medium',
    url: 'https://thebase.com',
    domainAuthority: 75,
    backlinkType: 'nofollow',
    description: 'ネットショップ作成サービス。ショップページからリンク設置可能。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },

  // ========== 低優先度（日本向け）==========
  {
    id: 'seesaa-blog',
    name: 'Seesaa Blog',
    nameJa: 'シーサーブログ',
    icon: '📄',
    category: 'blog',
    priority: 'low',
    url: 'https://blog.seesaa.jp',
    domainAuthority: 80,
    backlinkType: 'nofollow',
    description: '無料ブログサービス。複数ブログ運営可能。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'rakuten-blog',
    name: 'Rakuten Blog',
    nameJa: '楽天ブログ',
    icon: '🛒',
    category: 'blog',
    priority: 'low',
    url: 'https://plaza.rakuten.co.jp',
    domainAuthority: 84,
    backlinkType: 'nofollow',
    description: '楽天運営のブログサービス。楽天サービスとの連携が強み。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'goo-blog',
    name: 'goo blog',
    nameJa: 'gooブログ',
    icon: '📑',
    category: 'blog',
    priority: 'low',
    url: 'https://blog.goo.ne.jp',
    domainAuthority: 81,
    backlinkType: 'nofollow',
    description: 'NTTレゾナント運営のブログサービス。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'excite-blog',
    name: 'Excite Blog',
    nameJa: 'エキサイトブログ',
    icon: '📝',
    category: 'blog',
    priority: 'low',
    url: 'https://www.exblog.jp',
    domainAuthority: 79,
    backlinkType: 'nofollow',
    description: 'エキサイト運営のブログサービス。デザイン性が高い。',
    setupDifficulty: 'easy',
    japanFocused: true,
  },
  {
    id: 'line-voom',
    name: 'LINE VOOM',
    nameJa: 'LINE VOOM',
    icon: '💚',
    category: 'social',
    priority: 'low',
    url: 'https://line.me',
    domainAuthority: 89,
    backlinkType: 'nofollow',
    description: 'LINEのタイムライン機能。国内ユーザー数最大のメッセンジャー。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'at-press',
    name: '@Press',
    nameJa: 'アットプレス',
    icon: '📣',
    category: 'pr',
    priority: 'low',
    url: 'https://www.atpress.ne.jp',
    domainAuthority: 76,
    backlinkType: 'nofollow',
    description: 'プレスリリース配信サービス。中小企業向け。',
    setupDifficulty: 'hard',
    japanFocused: true,
  },
  {
    id: 'valuepress',
    name: 'ValuePress!',
    nameJa: 'バリュープレス',
    icon: '📨',
    category: 'pr',
    priority: 'low',
    url: 'https://www.value-press.com',
    domainAuthority: 68,
    backlinkType: 'nofollow',
    description: 'プレスリリース無料配信サービス。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'retty',
    name: 'Retty',
    nameJa: 'レッティ',
    icon: '🍜',
    category: 'local',
    priority: 'low',
    url: 'https://retty.me',
    domainAuthority: 72,
    backlinkType: 'nofollow',
    description: '実名グルメサービス。信頼性の高い口コミサイト。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'ekiten',
    name: 'Ekiten',
    nameJa: 'エキテン',
    icon: '🏢',
    category: 'local',
    priority: 'low',
    url: 'https://www.ekiten.jp',
    domainAuthority: 70,
    backlinkType: 'nofollow',
    description: '店舗・施設の口コミサイト。地域ビジネス向け。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'minne',
    name: 'minne',
    nameJa: 'ミンネ',
    icon: '🎁',
    category: 'creative',
    priority: 'low',
    url: 'https://minne.com',
    domainAuthority: 74,
    backlinkType: 'nofollow',
    description: 'ハンドメイド作品販売サイト。GMOペパボ運営。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'booth',
    name: 'BOOTH',
    nameJa: 'ブース',
    icon: '🎪',
    category: 'creative',
    priority: 'low',
    url: 'https://booth.pm',
    domainAuthority: 76,
    backlinkType: 'nofollow',
    description: 'pixiv連携の創作物販売プラットフォーム。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },
  {
    id: 'cinii',
    name: 'CiNii',
    nameJa: 'サイニィ',
    icon: '🎓',
    category: 'academic',
    priority: 'low',
    url: 'https://ci.nii.ac.jp',
    domainAuthority: 82,
    backlinkType: 'nofollow',
    description: '学術論文データベース。研究者・学術機関向け。',
    setupDifficulty: 'hard',
    japanFocused: true,
  },
  {
    id: 'j-stage',
    name: 'J-STAGE',
    nameJa: 'J-STAGE',
    icon: '📚',
    category: 'academic',
    priority: 'low',
    url: 'https://www.jstage.jst.go.jp',
    domainAuthority: 81,
    backlinkType: 'nofollow',
    description: '科学技術情報発信・流通総合システム。学術論文公開プラットフォーム。',
    setupDifficulty: 'hard',
    japanFocused: true,
  },
  {
    id: 'researchmap',
    name: 'researchmap',
    nameJa: 'リサーチマップ',
    icon: '🔬',
    category: 'academic',
    priority: 'low',
    url: 'https://researchmap.jp',
    domainAuthority: 75,
    backlinkType: 'nofollow',
    description: '研究者情報データベース。研究者プロフィールページ作成可能。',
    setupDifficulty: 'medium',
    japanFocused: true,
  },

  // ========== 低優先度（グローバル）==========
  {
    id: 'tumblr',
    name: 'Tumblr',
    nameJa: 'タンブラー',
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
  const [filter, setFilter] = useState<'all' | 'must' | 'created' | 'pending' | 'japan'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'da' | 'name'>('priority');

  const toggleAccount = (id: string) => {
    setAccounts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  let filteredPlatforms = platforms.filter(platform => {
    if (filter === 'must' && platform.priority !== 'must') return false;
    if (filter === 'created' && !accounts[platform.id]) return false;
    if (filter === 'pending' && accounts[platform.id]) return false;
    if (filter === 'japan' && !platform.japanFocused) return false;
    if (categoryFilter !== 'all' && platform.category !== categoryFilter) return false;
    return true;
  });

  // ソート処理
  filteredPlatforms = [...filteredPlatforms].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { must: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'da') {
      return (b.domainAuthority || 0) - (a.domainAuthority || 0);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const stats = {
    total: platforms.length,
    created: Object.values(accounts).filter(Boolean).length,
    must: platforms.filter(p => p.priority === 'must').length,
    mustCreated: platforms.filter(p => p.priority === 'must' && accounts[p.id]).length,
    japanFocused: platforms.filter(p => p.japanFocused).length,
    dofollow: platforms.filter(p => p.backlinkType === 'dofollow').length,
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
    pr: '📢',
    local: '📍',
    creative: '🎨',
    academic: '🎓',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        外部リンク用アカウント管理
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {stats.created}/{stats.total}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">作成済み</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-red-600 dark:text-red-400">
            {stats.mustCreated}/{stats.must}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">必須</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round((stats.created / stats.total) * 100)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">完了率</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {stats.japanFocused}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">日本向け</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-green-600 dark:text-green-400">
            {stats.dofollow}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">DoFollow</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
            {filteredPlatforms.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">表示中</div>
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
            onClick={() => setFilter('japan')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'japan'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            日本向け
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

        <div className="flex flex-wrap gap-2 mb-3">
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

        <div className="flex gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">並び替え:</span>
          <button
            onClick={() => setSortBy('priority')}
            className={`px-2 py-1 rounded text-xs ${
              sortBy === 'priority'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            優先度
          </button>
          <button
            onClick={() => setSortBy('da')}
            className={`px-2 py-1 rounded text-xs ${
              sortBy === 'da'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            DA順
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-2 py-1 rounded text-xs ${
              sortBy === 'name'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            名前順
          </button>
        </div>
      </div>

      {/* Platform List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 ${
              accounts[platform.id] ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{platform.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {platform.name}
                    {platform.japanFocused && (
                      <span className="ml-1 text-xs text-purple-600 dark:text-purple-400">🇯🇵</span>
                    )}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className={`px-1.5 py-0.5 text-xs rounded ${priorityColors[platform.priority]}`}>
                      {platform.priority === 'must' ? '必須' :
                       platform.priority === 'high' ? '高' :
                       platform.priority === 'medium' ? '中' : '低'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      DA:{platform.domainAuthority}
                    </span>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      platform.backlinkType === 'dofollow'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : platform.backlinkType === 'nofollow'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {platform.backlinkType === 'dofollow' ? 'DF' : platform.backlinkType === 'nofollow' ? 'NF' : 'MX'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleAccount(platform.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  accounts[platform.id]
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {accounts[platform.id] ? '✓' : '未'}
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {platform.description}
            </p>

            <div className="flex items-center justify-between">
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[200px]"
              >
                {platform.url}
              </a>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                platform.setupDifficulty === 'easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : platform.setupDifficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {platform.setupDifficulty === 'easy' ? '簡' :
                 platform.setupDifficulty === 'medium' ? '中' : '難'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 日本市場向けSEO戦略のアカウント作成ガイド
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">📌 必須5アカウント（最初の1週間）</h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-blue-700 dark:text-blue-300">
              <li><strong>note</strong> - 最もSEO効果が高い</li>
              <li><strong>はてなブログ</strong> - 技術系に強い</li>
              <li><strong>X (Twitter)</strong> - 拡散力No.1</li>
              <li><strong>アメブロ</strong> - 一般層リーチ</li>
              <li><strong>Yahoo!知恵袋</strong> - Q&A最強</li>
            </ol>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">🎯 高優先（2週間目）</h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-blue-700 dark:text-blue-300">
              <li><strong>Qiita/Zenn</strong> - 技術記事向け</li>
              <li><strong>Wantedly</strong> - ビジネス展開</li>
              <li><strong>NewsPicks</strong> - ビジネス層</li>
              <li><strong>PR TIMES</strong> - プレスリリース</li>
              <li><strong>FC2/ライブドア</strong> - サブブログ</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h3 className="font-semibold text-sm text-yellow-800 dark:text-yellow-200 mb-1">⚡ 効率的な運用のコツ</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-yellow-700 dark:text-yellow-300">
            <li>同じコンテンツを複数プラットフォームで再利用（リライトして投稿）</li>
            <li>プラットフォーム特性に合わせて内容を調整</li>
            <li>相互リンクは避ける（ペナルティリスク）</li>
            <li>定期的な更新でドメイン評価を維持</li>
          </ul>
        </div>
      </div>
    </div>
  );
}