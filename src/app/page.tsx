'use client';

import { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze and optimize your website's SEO performance
          </p>
        </header>

        {/* URL Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to analyze (e.g., https://example.com)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={analyzeSEO}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Page Score" value="85" unit="/100" color="green" />
          <MetricCard title="Load Time" value="2.3" unit="s" color="yellow" />
          <MetricCard title="Mobile Score" value="92" unit="/100" color="green" />
          <MetricCard title="Issues Found" value="5" unit="" color="red" />
        </div>

        {/* SEO Analysis Results */}
        {metrics && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              SEO Analysis Results
            </h2>

            <div className="space-y-4">
              <AnalysisItem
                label="Title Tag"
                value={metrics.title}
                status={metrics.titleLength >= 30 && metrics.titleLength <= 60 ? 'good' : 'warning'}
                hint={`${metrics.titleLength} characters (optimal: 30-60)`}
              />

              <AnalysisItem
                label="Meta Description"
                value={metrics.description}
                status={metrics.descriptionLength >= 120 && metrics.descriptionLength <= 160 ? 'good' : 'warning'}
                hint={`${metrics.descriptionLength} characters (optimal: 120-160)`}
              />

              <AnalysisItem
                label="H1 Tags"
                value={`${metrics.h1Count} found`}
                status={metrics.h1Count === 1 ? 'good' : 'error'}
                hint={metrics.h1Count === 1 ? 'Perfect!' : 'Should have exactly 1 H1 tag'}
              />

              <AnalysisItem
                label="Images with Alt Text"
                value={`${metrics.imageAltCount} images`}
                status="good"
                hint="All images have alt text"
              />

              <AnalysisItem
                label="Internal Links"
                value={`${metrics.internalLinks} links`}
                status="good"
                hint="Good internal linking structure"
              />

              <AnalysisItem
                label="External Links"
                value={`${metrics.externalLinks} links`}
                status="good"
                hint="External links found"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit, color }: {
  title: string;
  value: string;
  unit: string;
  color: 'green' | 'yellow' | 'red';
}) {
  const colorClasses = {
    green: 'text-green-600 dark:text-green-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    red: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}<span className="text-xl">{unit}</span>
      </p>
    </div>
  );
}

function AnalysisItem({ label, value, status, hint }: {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'error';
  hint: string;
}) {
  const statusColors = {
    good: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const statusIcons = {
    good: '✓',
    warning: '⚠',
    error: '✗'
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
          {statusIcons[status]} {status}
        </span>
      </div>
    </div>
  );
}