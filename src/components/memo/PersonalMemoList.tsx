'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'
import PersonalMemoEditor from './PersonalMemoEditor'
import FolderManager from './FolderManager'

interface PersonalMemo {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  synced: {
    notion?: boolean
    obsidian?: boolean
  }
}

interface PersonalMemoListProps {
  isEditMode?: boolean
}

export default function PersonalMemoList({ isEditMode = false }: PersonalMemoListProps) {
  const [memos, setMemos] = useState<PersonalMemo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editingMemo, setEditingMemo] = useState<PersonalMemo | undefined>()
  const [viewMode, setViewMode] = useState<'folders' | 'memos'>('folders')

  useEffect(() => {
    // ローカルストレージからメモを読み込み
    const savedMemos = localStorage.getItem('personalMemos')
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos))
    }
  }, [])

  const saveMemo = (memo: PersonalMemo) => {
    const updatedMemos = editingMemo 
      ? memos.map(m => m.id === memo.id ? memo : m)
      : [...memos, memo]
    
    setMemos(updatedMemos)
    localStorage.setItem('personalMemos', JSON.stringify(updatedMemos))
    setShowEditor(false)
    setEditingMemo(undefined)
  }

  const deleteMemo = (id: string) => {
    if (confirm('このメモを削除しますか？')) {
      const updatedMemos = memos.filter(m => m.id !== id)
      setMemos(updatedMemos)
      localStorage.setItem('personalMemos', JSON.stringify(updatedMemos))
    }
  }

  const openEditor = (memo?: PersonalMemo) => {
    setEditingMemo(memo)
    setShowEditor(true)
  }

  // フォルダー情報を取得
  const getFolderName = (folderId: string | null) => {
    if (!folderId) return null
    const savedFolders = localStorage.getItem('memoFolders')
    if (savedFolders) {
      const folders = JSON.parse(savedFolders)
      const folder = folders.find((f: any) => f.id === folderId)
      return folder?.name || null
    }
    return null
  }

  // フィルタリング
  const filteredMemos = memos.filter(memo => {
    const matchesSearch = memo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         memo.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || memo.tags.includes(selectedTag)
    
    // フォルダーフィルタリング
    const folderName = getFolderName(selectedFolderId)
    const matchesFolder = selectedFolderId === null || memo.folder === folderName
    
    return matchesSearch && matchesTag && matchesFolder
  })

  // すべてのタグを取得
  const allTags = Array.from(new Set(memos.flatMap(memo => memo.tags))).sort()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '今日'
    if (diffDays === 2) return '昨日'
    if (diffDays <= 7) return `${diffDays - 1}日前`
    return date.toLocaleDateString('ja-JP')
  }

  return (
    <>
      <div className="space-y-6">
        {/* コントロール */}
        <div className="flex items-center justify-between">
          {/* ビューモード切り替え */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('folders')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'folders'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📁 フォルダー
            </button>
            <button
              onClick={() => setViewMode('memos')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'memos'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📝 メモ一覧
            </button>
          </div>
          
          <button
            onClick={() => openEditor()}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
          >
            <Icons.Plus />
            <span className="ml-2">新規メモ</span>
          </button>
        </div>

        {/* フォルダービューまたはメモ一覧ビュー */}
        {viewMode === 'folders' ? (
          <FolderManager 
            onFolderSelect={setSelectedFolderId}
            selectedFolderId={selectedFolderId}
            isEditMode={isEditMode}
            onFolderUpdate={() => {
              // フォルダー更新時にメモを再読み込み
              const savedMemos = localStorage.getItem('personalMemos')
              if (savedMemos) {
                setMemos(JSON.parse(savedMemos))
              }
            }}
          />
        ) : (
          <>
            {/* 検索とフィルター */}
            <div className="space-y-4">
              {/* 検索バー */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="メモを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* タグフィルター */}
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      !selectedTag
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    全て ({memos.length})
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTag === tag
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      #{tag} ({memos.filter(m => m.tags.includes(tag)).length})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* メモ一覧 - メモビューまたはフォルダー選択時のみ表示 */}
        {(viewMode === 'memos' || selectedFolderId !== null) && filteredMemos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemos.map(memo => (
              <div
                key={memo.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 group cursor-pointer"
                onClick={() => openEditor(memo)}
              >
                {/* メモヘッダー */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {memo.title}
                  </h3>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditor(memo)
                      }}
                      className="p-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    >
                      <Icons.Edit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteMemo(memo.id)
                      }}
                      className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                    >
                      <Icons.X />
                    </button>
                  </div>
                </div>

                {/* メモ内容プレビュー */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {memo.content || 'コンテンツなし'}
                </p>

                {/* タグ */}
                {memo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {memo.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {memo.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                        +{memo.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* フッター */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(memo.updatedAt)}</span>
                  <div className="flex items-center space-x-2">
                    {/* 同期状態 */}
                    {memo.synced?.notion && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" title="Notionに同期済み"></div>
                    )}
                    {memo.synced?.obsidian && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full" title="Obsidianに同期済み"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (viewMode === 'memos' || selectedFolderId !== null) ? (
          /* 空状態 */
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 text-gray-300 dark:text-gray-600">
              📝
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery || selectedTag || selectedFolderId ? 'メモが見つかりません' : 'まだメモがありません'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || selectedTag || selectedFolderId
                ? '検索条件を変更してお試しください' 
                : '最初のメモを作成して始めましょう'
              }
            </p>
            <button
              onClick={() => openEditor()}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
            >
              新規メモを作成
            </button>
          </div>
        ) : null}

        {/* 統計 */}
        {memos.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {memos.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">総メモ数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {allTags.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">タグ数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {memos.filter(m => m.synced?.notion).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Notion同期</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {memos.filter(m => m.synced?.obsidian).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Obsidian同期</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* エディターモーダル */}
      {showEditor && (
        <PersonalMemoEditor
          memo={editingMemo}
          onSave={saveMemo}
          onClose={() => {
            setShowEditor(false)
            setEditingMemo(undefined)
          }}
        />
      )}
    </>
  )
}