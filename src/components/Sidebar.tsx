'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'ダッシュボード',
    icon: '📊',
  },
  {
    id: 'analysis',
    label: 'SEO分析',
    icon: '🔍',
    subItems: [
      { id: 'page-analysis', label: 'ページ分析', icon: '📄' },
      { id: 'keywords', label: 'キーワード分析', icon: '🔤' },
      { id: 'competitors', label: '競合分析', icon: '⚔️' },
    ]
  },
  {
    id: 'backlinks',
    label: '外部リンク',
    icon: '🔗',
    badge: 'New',
    subItems: [
      { id: 'backlink-strategy', label: '獲得戦略', icon: '🎯' },
      { id: 'backlink-analysis', label: 'リンク分析', icon: '📈' },
      { id: 'account-list', label: 'アカウント管理', icon: '👥' },
      { id: 'outreach', label: 'アウトリーチ', icon: '📧' },
    ]
  },
  {
    id: 'content',
    label: 'コンテンツ',
    icon: '📝',
    subItems: [
      { id: 'content-optimizer', label: 'コンテンツ最適化', icon: '✨' },
      { id: 'content-ideas', label: 'コンテンツアイデア', icon: '💡' },
      { id: 'content-calendar', label: 'カレンダー', icon: '📅' },
    ]
  },
  {
    id: 'technical',
    label: '技術的SEO',
    icon: '⚙️',
    subItems: [
      { id: 'site-audit', label: 'サイト監査', icon: '🔧' },
      { id: 'performance', label: 'パフォーマンス', icon: '⚡' },
      { id: 'crawlability', label: 'クローラビリティ', icon: '🕷️' },
    ]
  },
  {
    id: 'reports',
    label: 'レポート',
    icon: '📊',
    subItems: [
      { id: 'weekly-report', label: '週次レポート', icon: '📈' },
      { id: 'monthly-report', label: '月次レポート', icon: '📉' },
      { id: 'custom-report', label: 'カスタムレポート', icon: '📑' },
    ]
  },
  {
    id: 'tools',
    label: 'ツール',
    icon: '🛠️',
    subItems: [
      { id: 'schema-generator', label: 'スキーマ生成', icon: '🏗️' },
      { id: 'meta-generator', label: 'メタタグ生成', icon: '🏷️' },
      { id: 'sitemap-generator', label: 'サイトマップ生成', icon: '🗺️' },
    ]
  },
  {
    id: 'settings',
    label: '設定',
    icon: '⚙️',
  },
];

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, isOpen, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['analysis', 'backlinks']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: MenuItem, parentId?: string) => {
    if (item.subItems) {
      toggleExpanded(item.id);
    } else {
      onSectionChange(parentId ? `${parentId}/${item.id}` : item.id);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0 w-52`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-xl">🚀</span>
              SEO Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              v1.0.0
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-0.5">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id || activeSection.startsWith(`${item.id}/`)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {item.subItems && (
                        <span className={`text-xs transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Sub Items */}
                  {item.subItems && expandedItems.includes(item.id) && (
                    <ul className="mt-0.5 ml-4 space-y-0.5">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => handleItemClick(subItem, item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                              activeSection === `${item.id}/${subItem.id}`
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            <span className="text-sm">{subItem.icon}</span>
                            <span className="text-xs">{subItem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900 dark:text-white">User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Free</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}