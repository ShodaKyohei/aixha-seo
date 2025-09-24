'use client';

import { useState } from 'react';

interface BacklinkOpportunity {
  id: string;
  strategy: string;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  impact: number; // 1-5
  description: string;
  actionSteps: string[];
  timeEstimate: string;
  tools?: string[];
}

const opportunities: BacklinkOpportunity[] = [
  {
    id: '1',
    strategy: 'ゲストブログ投稿',
    priority: 'high',
    difficulty: 'medium',
    impact: 5,
    description: '業界関連の高権威サイトにゲスト記事を寄稿し、自然なバックリンクを獲得',
    actionSteps: [
      '業界の主要ブログをリストアップ',
      'ゲスト投稿を受け付けているサイトを特定',
      '価値あるコンテンツのアイデアを提案',
      '高品質な記事を執筆・投稿'
    ],
    timeEstimate: '2-4週間',
    tools: ['Ahrefs', 'SEMrush', 'Google検索']
  },
  {
    id: '2',
    strategy: '競合バックリンク分析',
    priority: 'high',
    difficulty: 'easy',
    impact: 4,
    description: '競合サイトのバックリンクを分析し、同じサイトからリンクを獲得',
    actionSteps: [
      '主要競合3-5社を特定',
      'バックリンクプロファイルを分析',
      '獲得可能なリンクソースを特定',
      'アウトリーチ戦略を実行'
    ],
    timeEstimate: '1-2週間',
    tools: ['Ahrefs', 'Moz', 'Majestic']
  },
  {
    id: '3',
    strategy: 'リンク切れ修正提案',
    priority: 'medium',
    difficulty: 'easy',
    impact: 3,
    description: '他サイトのリンク切れを見つけ、代替コンテンツとして自サイトを提案',
    actionSteps: [
      'ターゲットサイトのリンク切れをチェック',
      '関連する自社コンテンツを準備',
      'サイト管理者に連絡',
      'リンク置換を提案'
    ],
    timeEstimate: '1週間',
    tools: ['Check My Links', 'Broken Link Checker']
  },
  {
    id: '4',
    strategy: 'HARO (専門家として回答)',
    priority: 'high',
    difficulty: 'medium',
    impact: 4,
    description: '記者の質問に専門家として回答し、メディアサイトからバックリンクを獲得',
    actionSteps: [
      'HAROに登録',
      '関連する質問を毎日チェック',
      '価値ある回答を素早く送信',
      '掲載を確認・フォローアップ'
    ],
    timeEstimate: '継続的',
    tools: ['HARO', 'SourceBottle', 'ResponseSource']
  },
  {
    id: '5',
    strategy: 'インフォグラフィック作成',
    priority: 'medium',
    difficulty: 'hard',
    impact: 5,
    description: 'シェアされやすいインフォグラフィックを作成し、自然なバックリンクを獲得',
    actionSteps: [
      'トレンドのトピックをリサーチ',
      'データを収集・分析',
      'デザイナーと協力して作成',
      '関連サイトにプロモーション'
    ],
    timeEstimate: '2-3週間',
    tools: ['Canva', 'Piktochart', 'Adobe Creative Suite']
  },
  {
    id: '6',
    strategy: 'ディレクトリ登録',
    priority: 'low',
    difficulty: 'easy',
    impact: 2,
    description: '業界特化型ディレクトリや地域ディレクトリに登録',
    actionSteps: [
      '信頼できるディレクトリをリストアップ',
      '登録要件を確認',
      '正確な情報で登録申請',
      '承認をフォローアップ'
    ],
    timeEstimate: '2-3日',
    tools: ['Yelp', 'Google My Business', '業界ディレクトリ']
  },
  {
    id: '7',
    strategy: 'パートナーシップ構築',
    priority: 'medium',
    difficulty: 'medium',
    impact: 4,
    description: '相互に価値のあるパートナーシップを構築し、自然なリンク交換',
    actionSteps: [
      '潜在的パートナーを特定',
      '相互利益を明確化',
      'パートナーシップ提案を作成',
      '長期的関係を構築'
    ],
    timeEstimate: '1-2ヶ月',
    tools: ['LinkedIn', 'Email', 'CRM']
  },
  {
    id: '8',
    strategy: '証言・レビュー提供',
    priority: 'low',
    difficulty: 'easy',
    impact: 2,
    description: '使用しているツールやサービスに証言を提供し、リンクを獲得',
    actionSteps: [
      '使用中のツール/サービスをリスト化',
      '証言ページを確認',
      '詳細な証言を作成・送信',
      '掲載を確認'
    ],
    timeEstimate: '1週間',
    tools: ['使用中のSaaSツール', 'サービスプロバイダー']
  }
];

export default function BacklinkStrategy() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedStrategy, setSelectedStrategy] = useState<BacklinkOpportunity | null>(null);

  const filteredOpportunities = opportunities.filter(
    opp => filter === 'all' || opp.priority === filter
  );

  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  };

  const difficultyColors = {
    easy: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    hard: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🚀 外部リンク獲得戦略
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          SEOで最も重要な要素の一つである外部リンク（バックリンク）を獲得するための実践的な戦略です。
          優先度と難易度を考慮して、実行可能なアクションを選択してください。
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          すべて ({opportunities.length})
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'high'
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          高優先度
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'medium'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          中優先度
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'low'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          低優先度
        </button>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedStrategy(opp)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {opp.strategy}
              </h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[opp.priority]}`}>
                {opp.priority === 'high' ? '高' : opp.priority === 'medium' ? '中' : '低'}優先度
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {opp.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`text-sm font-medium ${difficultyColors[opp.difficulty]}`}>
                  難易度: {opp.difficulty === 'easy' ? '簡単' : opp.difficulty === 'medium' ? '普通' : '難しい'}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">効果:</span>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < opp.impact ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {opp.timeEstimate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedStrategy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedStrategy.strategy}
                </h3>
                <button
                  onClick={() => setSelectedStrategy(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedStrategy.description}
              </p>

              <div className="space-y-6">
                {/* Action Steps */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    実行ステップ
                  </h4>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedStrategy.actionSteps.map((step, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tools */}
                {selectedStrategy.tools && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      推奨ツール
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStrategy.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`font-semibold ${priorityColors[selectedStrategy.priority]} rounded px-2 py-1 mb-1`}>
                      {selectedStrategy.priority === 'high' ? '高' : selectedStrategy.priority === 'medium' ? '中' : '低'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">優先度</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`font-semibold ${difficultyColors[selectedStrategy.difficulty]}`}>
                      {selectedStrategy.difficulty === 'easy' ? '簡単' : selectedStrategy.difficulty === 'medium' ? '普通' : '難しい'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">難易度</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {selectedStrategy.timeEstimate}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">期間</div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  この戦略を実行する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}