'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'

interface PersonalMemo {
  id: string
  title: string
  content: string
  tags: string[]
  folder?: string
  createdAt: string
  updatedAt: string
}

export default function SimpleMemoList() {
  const [memos, setMemos] = useState<PersonalMemo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'folders' | 'memos'>('folders')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  useEffect(() => {
    // ローカルストレージからメモを読み込み
    const savedMemos = localStorage.getItem('personalMemos')
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos))
    }
  }, [])

  const filteredMemos = memos.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memo.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === null || memo.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  // フォルダー一覧を取得
  const folders = Array.from(new Set(memos.map(memo => memo.folder).filter(Boolean)))
  const folderCounts = folders.map(folder => ({
    name: folder!,
    count: memos.filter(memo => memo.folder === folder).length
  }))

  return (
    <div className="space-y-6">
      {/* ビューモード切り替え */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('folders')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'folders'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📁 フォルダー
          </button>
          <button
            onClick={() => setViewMode('memos')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'memos'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📝 メモ一覧
          </button>
        </div>
      </div>

      {/* フォルダービューまたは検索バー */}
      {viewMode === 'folders' ? (
        <div className="space-y-4">
          {/* 全てのメモ */}
          <button
            onClick={() => setSelectedFolder(null)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedFolder === null
                ? 'border-gray-400 bg-gray-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                📁
              </div>
              <div>
                <h4 className="font-medium text-gray-900">全てのメモ</h4>
                <p className="text-sm text-gray-500">{memos.length} 個のメモ</p>
              </div>
            </div>
          </button>

          {/* フォルダー一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folderCounts.map(folder => (
              <button
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedFolder === folder.name
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    📁
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{folder.name}</h4>
                    <p className="text-sm text-gray-500">{folder.count} 個のメモ</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* 検索バー */
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder="メモを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
      )}

      {/* メモ一覧 - メモビューまたはフォルダー選択時のみ表示 */}
      {(viewMode === 'memos' || selectedFolder !== null) && filteredMemos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemos.map(memo => (
            <div
              key={memo.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {memo.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {memo.content || 'コンテンツなし'}
              </p>
              
              {memo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {memo.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                {new Date(memo.updatedAt).toLocaleDateString('ja-JP')}
              </div>
            </div>
          ))}
        </div>
      ) : (viewMode === 'memos' || selectedFolder !== null) ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
            📝
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery || selectedFolder ? 'メモが見つかりません' : 'まだメモがありません'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || selectedFolder ? '検索条件を変更してお試しください' : '最初のメモを作成して始めましょう'}
          </p>
        </div>
      ) : null}
    </div>
  )
}