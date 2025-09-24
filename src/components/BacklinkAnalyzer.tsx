'use client';

import { useState } from 'react';

interface BacklinkData {
  url: string;
  domain: string;
  authority: number;
  anchorText: string;
  doFollow: boolean;
  firstSeen: string;
  lastChecked: string;
}

interface BacklinkAnalysis {
  totalBacklinks: number;
  uniqueDomains: number;
  domainAuthority: number;
  topBacklinks: BacklinkData[];
  anchorTextDistribution: Record<string, number>;
  followVsNofollow: {
    follow: number;
    nofollow: number;
  };
  recentlyAcquired: BacklinkData[];
  recommendations: string[];
}

export default function BacklinkAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<BacklinkAnalysis | null>(null);

  const analyzeBacklinks = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch('/api/backlinks/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing backlinks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">バックリンク分析</h3>
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="分析するURLを入力 (例: https://example.com)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={analyzeBacklinks}
            disabled={loading || !url}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? '分析中...' : '分析開始'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">総バックリンク数</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.totalBacklinks.toLocaleString()}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">参照ドメイン数</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.uniqueDomains}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">ドメイン権威</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.domainAuthority}/100
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Follow率</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((analysis.followVsNofollow.follow / analysis.totalBacklinks) * 100)}%
              </div>
            </div>
          </div>

          {/* Top Backlinks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold mb-4">トップバックリンク</h4>
            <div className="space-y-3">
              {analysis.topBacklinks.map((backlink, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={backlink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-md"
                      >
                        {backlink.domain}
                      </a>
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        backlink.doFollow
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {backlink.doFollow ? 'DoFollow' : 'NoFollow'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      アンカー: {backlink.anchorText}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">DA {backlink.authority}</div>
                    <div className="text-xs text-gray-500">取得: {backlink.firstSeen}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anchor Text Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold mb-4">アンカーテキスト分布</h4>
            <div className="space-y-2">
              {Object.entries(analysis.anchorTextDistribution).map(([text, percentage]) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-gray-600 dark:text-gray-400">{text}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                      <div
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs text-white font-medium">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
              💡 改善提案
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}