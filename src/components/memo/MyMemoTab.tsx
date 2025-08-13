'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'

interface PersonalMemo {
  id: string
  title: string
  content: string
  tags: string[]
  folder?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  likes: number
  views: number
}

interface MyMemoTabProps {
  isEditing: boolean
}

export default function MyMemoTab({ isEditing }: MyMemoTabProps) {
  const [memos, setMemos] = useState<PersonalMemo[]>([])
  const [viewMode, setViewMode] = useState<'folders' | 'list'>('folders')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showMemoEditor, setShowMemoEditor] = useState(false)
  const [editingMemo, setEditingMemo] = useState<PersonalMemo | null>(null)

  useEffect(() => {
    // ローカルストレージからメモを読み込み
    const savedMemos = localStorage.getItem('personalMemos')
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos))
    } else {
      // サンプルデータを設定
      const sampleMemos: PersonalMemo[] = [
        {
          id: '1',
          title: 'React の状態管理について',
          content: 'Reactの状態管理にはuseStateやuseReducerなどがあります。複雑なアプリケーションではContext APIやZustandを使用することも考えられます。',
          tags: ['React', 'JavaScript', '状態管理'],
          folder: '技術メモ',
          isPublic: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          likes: 12,
          views: 45
        },
        {
          id: '2',
          title: 'TypeScript の型定義',
          content: 'TypeScriptでより安全なコードを書くための型定義のベストプラクティスをまとめました。',
          tags: ['TypeScript', '型安全'],
          folder: '技術メモ',
          isPublic: false,
          createdAt: '2024-01-20T14:30:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          likes: 8,
          views: 32
        },
        {
          id: '3',
          title: 'プロジェクトアイデア',
          content: 'Next.jsとSupabaseを使ったタスク管理アプリのアイデア。リアルタイム同期機能を実装したい。',
          tags: ['アイデア', 'Next.js', 'Supabase'],
          folder: 'アイデア',
          isPublic: false,
          createdAt: '2024-01-25T09:15:00Z',
          updatedAt: '2024-01-25T09:15:00Z',
          likes: 0,
          views: 12
        }
      ]
      setMemos(sampleMemos)
      localStorage.setItem('personalMemos', JSON.stringify(sampleMemos))
    }
  }, [])

  const saveMemos = (updatedMemos: PersonalMemo[]) => {
    setMemos(updatedMemos)
    localStorage.setItem('personalMemos', JSON.stringify(updatedMemos))
  }

  const toggleMemoVisibility = (memoId: string) => {
    const updatedMemos = memos.map(memo =>
      memo.id === memoId ? { ...memo, isPublic: !memo.isPublic } : memo
    )
    saveMemos(updatedMemos)
  }

  const deleteMemo = (memoId: string) => {
    if (confirm('このメモを削除しますか？')) {
      const updatedMemos = memos.filter(memo => memo.id !== memoId)
      saveMemos(updatedMemos)
    }
  }

  const folders = Array.from(new Set(memos.map(memo => memo.folder).filter(Boolean)))
  const folderCounts = folders.map(folder => ({
    name: folder!,
    count: memos.filter(memo => memo.folder === folder).length
  }))

  const filteredMemos = selectedFolder 
    ? memos.filter(memo => memo.folder === selectedFolder)
    : memos

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* コントロールヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
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
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              📋 一覧
            </button>
          </div>

          {/* 編集モード表示 */}
          {isEditing && (
            <div className="flex items-center px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-lg text-sm">
              <Icons.Edit />
              <span className="ml-2">編集モード</span>
            </div>
          )}
        </div>

        {/* 新規作成ボタン */}
        <button
          onClick={() => setShowMemoEditor(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <Icons.Plus />
          <span className="ml-2">新規メモ</span>
        </button>
      </div>

      {/* フォルダービューまたはリストビュー */}
      {viewMode === 'folders' ? (
        <div className="space-y-4">
          {/* 全てのメモ */}
          <button
            onClick={() => setSelectedFolder(null)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedFolder === null
                ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600'
            }`}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                📁
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">全てのメモ</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{memos.length} 個のメモ</p>
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
                    ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl mr-4">
                    📁
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{folder.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{folder.count} 個のメモ</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* メモ一覧 - リストビューまたはフォルダー選択時に表示 */}
      {(viewMode === 'list' || selectedFolder !== null) && (
        <div className="space-y-4">
          {filteredMemos.length > 0 ? (
            filteredMemos.map(memo => (
              <div
                key={memo.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
              >
                {/* メモヘッダー */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 truncate">
                      {memo.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(memo.updatedAt)}</span>
                      {memo.folder && (
                        <span className="flex items-center">
                          📁 {memo.folder}
                        </span>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          👁️ {memo.views}
                        </span>
                        <span className="flex items-center">
                          ❤️ {memo.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 公開・非公開ステータスとアクション */}
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      memo.isPublic 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {memo.isPublic ? '🌍 公開' : '🔒 非公開'}
                    </span>

                    {/* 編集モード時のアクション */}
                    {isEditing && (
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleMemoVisibility(memo.id)}
                          className={`p-1 rounded-lg transition-colors ${
                            memo.isPublic 
                              ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400' 
                              : 'hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400'
                          }`}
                          title={memo.isPublic ? '非公開にする' : '公開する'}
                        >
                          {memo.isPublic ? <Icons.Eye /> : <Icons.Eye />}
                        </button>
                        <button
                          onClick={() => setEditingMemo(memo)}
                          className="p-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          title="編集"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => deleteMemo(memo.id)}
                          className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                          title="削除"
                        >
                          <Icons.X />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* メモ内容 */}
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                  {memo.content}
                </p>

                {/* タグ */}
                {memo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {memo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 text-gray-300 dark:text-gray-600">
                📝
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {selectedFolder ? `${selectedFolder}にメモがありません` : 'まだメモがありません'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                最初のメモを作成して始めましょう
              </p>
              <button
                onClick={() => setShowMemoEditor(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
              >
                新規メモを作成
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}