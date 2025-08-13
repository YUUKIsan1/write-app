'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import AppLayout from '@/components/layout/AppLayout'
import { PostManager } from '@/utils/postManager'

type ContentType = 'memo' | 'article' | 'book' | 'question' | 'showcase'

interface ContentOption {
  type: ContentType
  title: string
  description: string
  icon: keyof typeof Icons
  color: string
}

const contentOptions: ContentOption[] = [
  {
    type: 'memo',
    title: 'メモ',
    description: '学習メモや気づきを記録',
    icon: 'Edit',
    color: 'from-blue-500 to-blue-600'
  },
  {
    type: 'article',
    title: '記事',
    description: '技術記事やチュートリアル',
    icon: 'BookOpen', 
    color: 'from-green-500 to-green-600'
  },
  {
    type: 'book',
    title: 'ブック',
    description: '体系的な学習コンテンツ',
    icon: 'Briefcase',
    color: 'from-purple-500 to-purple-600'
  },
  {
    type: 'question',
    title: '質問',
    description: '疑問点をコミュニティに投稿',
    icon: 'HelpCircle',
    color: 'from-orange-500 to-orange-600'
  },
  {
    type: 'showcase',
    title: 'ショーケース',
    description: 'プロジェクトや作品を共有',
    icon: 'Star',
    color: 'from-pink-500 to-pink-600'
  }
]

export default function CreatePage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handlePublish = async () => {
    if (!selectedType || !content.trim()) {
      alert('内容を入力してください')
      return
    }

    setIsSubmitting(true)

    try {
      // PostManagerを使って投稿を作成
      const postType = selectedType === 'memo' ? 'memo' : selectedType === 'article' ? 'article' : 'book'
      
      const newPost = PostManager.createPost({
        type: postType,
        title: title.trim() || undefined,
        content: content.trim(),
        excerpt: PostManager.generateExcerpt(content),
        readingTime: PostManager.calculateReadingTime(content),
        tags: tags,
        publishedAt: new Date().toISOString()
      })

      console.log('投稿が作成されました:', newPost)
      
      // 投稿成功後、プロフィールページにリダイレクト
      router.push('/profile?tab=story')
      
    } catch (error) {
      console.error('投稿の作成に失敗しました:', error)
      alert('投稿の作成に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDraft = () => {
    if (!selectedType || !content.trim()) {
      alert('内容を入力してください')
      return
    }

    // 下書きとしてLocalStorageに保存
    const draftKey = `draft_${selectedType}_${Date.now()}`
    const draftData = {
      type: selectedType,
      title: title,
      content: content,
      tags: tags,
      savedAt: new Date().toISOString()
    }
    
    try {
      localStorage.setItem(draftKey, JSON.stringify(draftData))
      alert('下書きが保存されました')
    } catch (error) {
      console.error('下書きの保存に失敗しました:', error)
      alert('下書きの保存に失敗しました')
    }
  }

  if (!selectedType) {
    return (
      <AppLayout>
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
          {/* ページタイトル */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              新しいコンテンツを作成
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              作成したいコンテンツの種類を選択してください
            </p>
          </div>

          {/* コンテンツタイプ選択 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentOptions.map((option) => {
              const IconComponent = Icons[option.icon]
              return (
                <button
                  key={option.type}
                  onClick={() => setSelectedType(option.type)}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-6 h-6">
                      <IconComponent />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* 最近の投稿 */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              最近の投稿
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                      <div className="w-4 h-4 text-blue-600 dark:text-blue-400">
                        <Icons.Edit />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        学習メモ #{i}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {i}時間前
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    今日はReactのuseEffectフックについて学習しました...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  const selectedOption = contentOptions.find(option => option.type === selectedType)!

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedType(null)}
            className="p-2 mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-6 h-6">
              <Icons.ArrowLeft />
            </div>
          </button>
          
          <div className="flex items-center">
            <div className={`w-8 h-8 mr-3 bg-gradient-to-r ${selectedOption.color} rounded-full flex items-center justify-center text-white`}>
              <div className="w-4 h-4">
                {(() => {
                  const IconComponent = Icons[selectedOption.icon]
                  return <IconComponent />
                })()}
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedOption.title}を作成
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedOption.description}
              </p>
            </div>
          </div>
        </div>

        {/* フォーム */}
        <div className="space-y-6">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`${selectedOption.title}のタイトルを入力してください`}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* 本文 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              本文
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="内容を入力してください..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
            />
          </div>

          {/* タグ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タグ
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-sm rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    <div className="w-4 h-4">
                      <Icons.X />
                    </div>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="タグを入力してEnter"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl transition-colors"
              >
                追加
              </button>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button 
              onClick={handlePublish}
              disabled={isSubmitting || !content.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <div className="w-5 h-5 mr-2">
                {isSubmitting ? (
                  <div className="animate-spin">
                    <Icons.Clock />
                  </div>
                ) : (
                  <Icons.Check />
                )}
              </div>
              {isSubmitting ? '投稿中...' : '公開する'}
            </button>
            
            <button 
              onClick={handleDraft}
              disabled={isSubmitting || !content.trim()}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              下書き保存
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}