'use client'

import { useState, useRef, useEffect } from 'react'
import { Icons } from '@/components/ui/icons'

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

interface NotionSettings {
  enabled: boolean
  accessToken: string
  databaseId: string
}

interface ObsidianSettings {
  enabled: boolean
  vaultName: string
  folderPath: string
}

interface PersonalMemoEditorProps {
  memo?: PersonalMemo
  onSave: (memo: PersonalMemo) => void
  onClose: () => void
}

export default function PersonalMemoEditor({ memo, onSave, onClose }: PersonalMemoEditorProps) {
  const [title, setTitle] = useState(memo?.title || '')
  const [content, setContent] = useState(memo?.content || '')
  const [tags, setTags] = useState<string[]>(memo?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)
  
  // 外部連携設定
  const [notionSettings, setNotionSettings] = useState<NotionSettings>({
    enabled: false,
    accessToken: '',
    databaseId: ''
  })
  
  const [obsidianSettings, setObsidianSettings] = useState<ObsidianSettings>({
    enabled: false,
    vaultName: '',
    folderPath: 'PersonalMemos'
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // 保存された連携設定を読み込み
    const savedNotionSettings = localStorage.getItem('notionSettings')
    const savedObsidianSettings = localStorage.getItem('obsidianSettings')
    
    if (savedNotionSettings) {
      setNotionSettings(JSON.parse(savedNotionSettings))
    }
    if (savedObsidianSettings) {
      setObsidianSettings(JSON.parse(savedObsidianSettings))
    }
  }, [])

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addTag()
    }
  }

  // Notion連携
  const syncToNotion = async (memoData: PersonalMemo) => {
    if (!notionSettings.enabled || !notionSettings.accessToken || !notionSettings.databaseId) {
      return false
    }

    try {
      const response = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionSettings.accessToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
          parent: {
            database_id: notionSettings.databaseId
          },
          properties: {
            'Title': {
              title: [
                {
                  text: {
                    content: memoData.title
                  }
                }
              ]
            },
            'Tags': {
              multi_select: memoData.tags.map(tag => ({ name: tag }))
            },
            'Created': {
              date: {
                start: memoData.createdAt
              }
            }
          },
          children: [
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: memoData.content
                    }
                  }
                ]
              }
            }
          ]
        })
      })

      if (response.ok) {
        console.log('Notion sync successful')
        return true
      } else {
        const errorData = await response.json()
        console.error('Notion sync failed:', errorData)
        throw new Error(`Notion API Error: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Notion sync error:', error)
      // 詳細なエラーメッセージをユーザーに表示したい場合はここで処理
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          alert('Notion認証エラー: アクセストークンを確認してください')
        } else if (error.message.includes('404')) {
          alert('NotionデータベースIDが見つかりません')
        } else {
          alert('Notion同期に失敗しました: ' + error.message)
        }
      }
      return false
    }
  }

  // Obsidian連携
  const syncToObsidian = async (memoData: PersonalMemo) => {
    if (!obsidianSettings.enabled) {
      return false
    }

    if (!obsidianSettings.vaultName.trim()) {
      alert('Obsidian同期エラー: Vault名を設定してください')
      return false
    }

    try {
      // Obsidian URIスキームを使用してファイルを作成
      const fileName = `${memoData.title.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '_')}.md`
      const filePath = obsidianSettings.folderPath ? `${obsidianSettings.folderPath}/${fileName}` : fileName
      
      const markdownContent = `# ${memoData.title}

${memoData.tags.map(tag => `#${tag}`).join(' ')}

${memoData.content}

---
Created: ${new Date(memoData.createdAt).toLocaleString('ja-JP')}
Updated: ${new Date(memoData.updatedAt).toLocaleString('ja-JP')}
`

      const obsidianUri = `obsidian://new?vault=${encodeURIComponent(obsidianSettings.vaultName)}&file=${encodeURIComponent(filePath)}&content=${encodeURIComponent(markdownContent)}`
      
      // 新しいタブでObsidianを開く
      window.open(obsidianUri, '_blank')
      console.log('Obsidian sync initiated successfully')
      return true
    } catch (error) {
      console.error('Obsidian sync error:', error)
      alert('Obsidian同期に失敗しました: ' + (error instanceof Error ? error.message : 'Unknown error'))
      return false
    }
  }

  const handleSave = async () => {
    if (!title.trim()) return

    setIsLoading(true)

    const memoData: PersonalMemo = {
      id: memo?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      tags,
      createdAt: memo?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      synced: {
        notion: false,
        obsidian: false
      }
    }

    try {
      // 外部サービスへの同期
      if (notionSettings.enabled) {
        memoData.synced.notion = await syncToNotion(memoData)
      }
      
      if (obsidianSettings.enabled) {
        memoData.synced.obsidian = await syncToObsidian(memoData)
      }

      onSave(memoData)
    } catch (error) {
      console.error('Save error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* メインエディター */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold">
                📝
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                個人メモ
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
                title="外部連携設定"
              >
                <Icons.Settings />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Icons.X />
              </button>
            </div>
          </div>

          {/* 外部連携設定 */}
          {showExportOptions && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">外部連携設定</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Notion設定 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="notion-enabled"
                      checked={notionSettings.enabled}
                      onChange={(e) => setNotionSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="notion-enabled" className="text-sm font-medium text-gray-900 dark:text-white">
                      Notion連携
                    </label>
                  </div>
                  
                  {notionSettings.enabled && (
                    <div className="space-y-2 ml-6">
                      <input
                        type="text"
                        placeholder="Notion Access Token"
                        value={notionSettings.accessToken}
                        onChange={(e) => setNotionSettings(prev => ({ ...prev, accessToken: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Database ID"
                        value={notionSettings.databaseId}
                        onChange={(e) => setNotionSettings(prev => ({ ...prev, databaseId: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Obsidian設定 */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="obsidian-enabled"
                      checked={obsidianSettings.enabled}
                      onChange={(e) => setObsidianSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="obsidian-enabled" className="text-sm font-medium text-gray-900 dark:text-white">
                      Obsidian連携
                    </label>
                  </div>
                  
                  {obsidianSettings.enabled && (
                    <div className="space-y-2 ml-6">
                      <input
                        type="text"
                        placeholder="Vault名"
                        value={obsidianSettings.vaultName}
                        onChange={(e) => setObsidianSettings(prev => ({ ...prev, vaultName: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="フォルダーパス (省略可)"
                        value={obsidianSettings.folderPath}
                        onChange={(e) => setObsidianSettings(prev => ({ ...prev, folderPath: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => {
                  localStorage.setItem('notionSettings', JSON.stringify(notionSettings))
                  localStorage.setItem('obsidianSettings', JSON.stringify(obsidianSettings))
                  setShowExportOptions(false)
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                設定を保存
              </button>
            </div>
          )}

          {/* メインコンテンツ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* タイトル */}
            <div>
              <input
                type="text"
                placeholder="メモのタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* タグ */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-purple-900 dark:hover:text-purple-300"
                    >
                      <Icons.X />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="タグを追加"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  追加
                </button>
              </div>
            </div>

            {/* コンテンツエディター */}
            <div>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                  adjustTextareaHeight()
                }}
                placeholder="メモの内容を入力してください..."
                className="w-full min-h-[400px] p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                onInput={adjustTextareaHeight}
              />
            </div>

            {/* 同期状態表示 */}
            {memo?.synced && (
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${memo.synced.notion ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Notion</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${memo.synced.obsidian ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>Obsidian</span>
                </div>
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {memo?.updatedAt && `最終更新: ${new Date(memo.updatedAt).toLocaleString('ja-JP')}`}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || !title.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    保存中...
                  </>
                ) : (
                  '保存'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}