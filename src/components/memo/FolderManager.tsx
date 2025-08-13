'use client'

import { useState, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'

interface Folder {
  id: string
  name: string
  description?: string
  color: string
  createdAt: string
  memoCount: number
}

interface FolderManagerProps {
  onFolderSelect: (folderId: string | null) => void
  selectedFolderId: string | null
  isEditMode?: boolean
  onFolderUpdate?: () => void
}

const defaultFolders: Folder[] = [
  { id: 'work', name: '作業メモ', description: '仕事関連のメモ', color: 'blue', createdAt: new Date().toISOString(), memoCount: 0 },
  { id: 'ideas', name: 'アイデア', description: '思いついたアイデア', color: 'yellow', createdAt: new Date().toISOString(), memoCount: 0 },
  { id: 'learning', name: '学習ノート', description: '学習記録', color: 'green', createdAt: new Date().toISOString(), memoCount: 0 },
  { id: 'projects', name: 'プロジェクト', description: 'プロジェクト関連', color: 'purple', createdAt: new Date().toISOString(), memoCount: 0 }
]

const colorClasses = {
  blue: 'from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
  yellow: 'from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600',
  green: 'from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700',
  purple: 'from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700',
  red: 'from-red-400 to-red-600 hover:from-red-500 hover:to-red-700',
  indigo: 'from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700',
  teal: 'from-teal-400 to-cyan-600 hover:from-teal-500 hover:to-cyan-700',
  gray: 'from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700'
}

const colorOptions = Object.keys(colorClasses) as Array<keyof typeof colorClasses>

export default function FolderManager({ onFolderSelect, selectedFolderId, isEditMode = false, onFolderUpdate }: FolderManagerProps) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [newFolder, setNewFolder] = useState({
    name: '',
    description: '',
    color: 'blue' as keyof typeof colorClasses
  })

  useEffect(() => {
    loadFolders()
  }, [])

  const loadFolders = () => {
    const savedFolders = localStorage.getItem('memoFolders')
    if (savedFolders) {
      const parsedFolders = JSON.parse(savedFolders)
      setFolders(parsedFolders)
    } else {
      // 初回はデフォルトフォルダーを設定
      setFolders(defaultFolders)
      localStorage.setItem('memoFolders', JSON.stringify(defaultFolders))
    }
    updateFolderMemoCounts()
  }

  const updateFolderMemoCounts = () => {
    const savedMemos = localStorage.getItem('personalMemos')
    if (savedMemos) {
      const memos = JSON.parse(savedMemos)
      setFolders(prev => prev.map(folder => ({
        ...folder,
        memoCount: memos.filter((memo: any) => memo.folder === folder.name).length
      })))
    }
  }

  const createFolder = () => {
    if (!newFolder.name.trim()) return

    const folder: Folder = {
      id: Date.now().toString(),
      name: newFolder.name.trim(),
      description: newFolder.description.trim(),
      color: newFolder.color,
      createdAt: new Date().toISOString(),
      memoCount: 0
    }

    const updatedFolders = [...folders, folder]
    setFolders(updatedFolders)
    localStorage.setItem('memoFolders', JSON.stringify(updatedFolders))
    
    setNewFolder({ name: '', description: '', color: 'blue' })
    setShowCreateForm(false)
    onFolderUpdate?.()
  }

  const updateFolder = (updatedFolder: Folder) => {
    const updatedFolders = folders.map(f => f.id === updatedFolder.id ? updatedFolder : f)
    setFolders(updatedFolders)
    localStorage.setItem('memoFolders', JSON.stringify(updatedFolders))
    setEditingFolder(null)
    onFolderUpdate?.()
  }

  const deleteFolder = (folderId: string) => {
    if (confirm('このフォルダーを削除しますか？中のメモも削除されます。')) {
      const folderToDelete = folders.find(f => f.id === folderId)
      if (folderToDelete) {
        // メモからもフォルダーを削除
        const savedMemos = localStorage.getItem('personalMemos')
        if (savedMemos) {
          const memos = JSON.parse(savedMemos)
          const updatedMemos = memos.filter((memo: any) => memo.folder !== folderToDelete.name)
          localStorage.setItem('personalMemos', JSON.stringify(updatedMemos))
        }
      }

      const updatedFolders = folders.filter(f => f.id !== folderId)
      setFolders(updatedFolders)
      localStorage.setItem('memoFolders', JSON.stringify(updatedFolders))
      
      if (selectedFolderId === folderId) {
        onFolderSelect(null)
      }
      onFolderUpdate?.()
    }
  }

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          フォルダー
        </h3>
        {isEditMode && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icons.Plus />
            <span className="ml-1">新規作成</span>
          </button>
        )}
      </div>

      {/* 全てのメモ */}
      <button
        onClick={() => onFolderSelect(null)}
        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
          selectedFolderId === null
            ? 'border-gray-400 bg-gray-50 dark:bg-gray-700'
            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'
        }`}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center text-white text-xl mr-4">
            📁
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">全てのメモ</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {folders.reduce((total, folder) => total + folder.memoCount, 0)} 個のメモ
            </p>
          </div>
        </div>
      </button>

      {/* フォルダー一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <div key={folder.id} className="relative group">
            <button
              onClick={() => onFolderSelect(folder.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedFolderId === folder.id
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[folder.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center text-white text-xl mr-4 transition-all duration-200`}>
                  📁
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">
                    {folder.name}
                  </h4>
                  {folder.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {folder.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {folder.memoCount} 個のメモ
                  </p>
                </div>
              </div>
            </button>

            {/* 編集ボタン（編集モード時のみ表示） */}
            {isEditMode && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingFolder(folder)
                    }}
                    className="p-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Icons.Edit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteFolder(folder.id)
                    }}
                    className="p-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <Icons.X />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* フォルダー作成フォーム */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              新しいフォルダーを作成
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  フォルダー名 *
                </label>
                <input
                  type="text"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="フォルダー名を入力"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  説明
                </label>
                <input
                  type="text"
                  value={newFolder.description}
                  onChange={(e) => setNewFolder(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="フォルダーの説明（任意）"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  カラー
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewFolder(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colorClasses[color]} border-2 ${
                        newFolder.color === color ? 'border-gray-400' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setNewFolder({ name: '', description: '', color: 'blue' })
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={createFolder}
                disabled={!newFolder.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                作成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* フォルダー編集フォーム */}
      {editingFolder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              フォルダーを編集
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  フォルダー名 *
                </label>
                <input
                  type="text"
                  value={editingFolder.name}
                  onChange={(e) => setEditingFolder(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  説明
                </label>
                <input
                  type="text"
                  value={editingFolder.description || ''}
                  onChange={(e) => setEditingFolder(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  カラー
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setEditingFolder(prev => prev ? { ...prev, color } : null)}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colorClasses[color]} border-2 ${
                        editingFolder.color === color ? 'border-gray-400' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingFolder(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={() => editingFolder && updateFolder(editingFolder)}
                disabled={!editingFolder?.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                更新
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}