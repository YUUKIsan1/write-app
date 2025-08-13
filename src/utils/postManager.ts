// 投稿管理システム - LocalStorage版
// この実装により、投稿内容がプロフィールに反映されます

export interface Post {
  id: string
  type: 'memo' | 'article' | 'book'
  title?: string
  content: string
  excerpt: string
  readingTime: string
  tags: string[]
  createdAt: string
  publishedAt?: string
  likes: number
  comments: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
  coverImage?: string
  author: {
    name: string
    username: string
    avatar: string
    bio: string
  }
}

export class PostManager {
  private static STORAGE_KEY = 'userPosts'
  
  // 新規投稿を作成
  static createPost(postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'views' | 'isLiked' | 'isBookmarked' | 'author'>): Post {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      author: {
        name: '山田花子', // 現在のユーザー情報
        username: 'hanako_dev',
        avatar: '👩‍💻',
        bio: 'フロントエンドエンジニア兼UIデザイナー'
      }
    }
    
    // 既存の投稿を取得
    const existingPosts = this.getAllPosts()
    
    // 新しい投稿を先頭に追加
    const updatedPosts = [newPost, ...existingPosts]
    
    // LocalStorageに保存
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedPosts))
      return newPost
    } catch (error) {
      console.error('投稿の保存に失敗しました:', error)
      throw new Error('投稿の保存に失敗しました')
    }
  }
  
  // すべての投稿を取得
  static getAllPosts(): Post[] {
    try {
      const postsJson = localStorage.getItem(this.STORAGE_KEY)
      return postsJson ? JSON.parse(postsJson) : []
    } catch (error) {
      console.error('投稿の取得に失敗しました:', error)
      return []
    }
  }
  
  // ユーザーの投稿を取得（プロフィールページ用）
  static getUserPosts(username = 'hanako_dev'): Post[] {
    const allPosts = this.getAllPosts()
    return allPosts.filter(post => post.author.username === username)
  }
  
  // 投稿をタイプ別にフィルタリング
  static getPostsByType(type: Post['type'], username = 'hanako_dev'): Post[] {
    const userPosts = this.getUserPosts(username)
    return userPosts.filter(post => post.type === type)
  }
  
  // 投稿を更新
  static updatePost(postId: string, updates: Partial<Post>): Post | null {
    try {
      const posts = this.getAllPosts()
      const postIndex = posts.findIndex(post => post.id === postId)
      
      if (postIndex === -1) {
        throw new Error('投稿が見つかりません')
      }
      
      posts[postIndex] = { ...posts[postIndex], ...updates }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts))
      
      return posts[postIndex]
    } catch (error) {
      console.error('投稿の更新に失敗しました:', error)
      return null
    }
  }
  
  // 投稿を削除
  static deletePost(postId: string): boolean {
    try {
      const posts = this.getAllPosts()
      const filteredPosts = posts.filter(post => post.id !== postId)
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPosts))
      return true
    } catch (error) {
      console.error('投稿の削除に失敗しました:', error)
      return false
    }
  }
  
  // いいね機能
  static toggleLike(postId: string): boolean {
    try {
      const posts = this.getAllPosts()
      const post = posts.find(p => p.id === postId)
      
      if (!post) return false
      
      post.isLiked = !post.isLiked
      post.likes += post.isLiked ? 1 : -1
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts))
      return post.isLiked
    } catch (error) {
      console.error('いいね処理に失敗しました:', error)
      return false
    }
  }
  
  // ブックマーク機能
  static toggleBookmark(postId: string): boolean {
    try {
      const posts = this.getAllPosts()
      const post = posts.find(p => p.id === postId)
      
      if (!post) return false
      
      post.isBookmarked = !post.isBookmarked
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posts))
      return post.isBookmarked
    } catch (error) {
      console.error('ブックマーク処理に失敗しました:', error)
      return false
    }
  }
  
  // 読書時間を計算
  static calculateReadingTime(content: string): string {
    const wordsPerMinute = 200 // 日本語の場合は文字数ベース
    const wordCount = content.length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes}分`
  }
  
  // 抜粋を生成
  static generateExcerpt(content: string, maxLength = 150): string {
    // マークダウンの記号を除去
    const plainText = content
      .replace(/^#{1,6}\s+/gm, '') // ヘッダー
      .replace(/\*\*(.*?)\*\*/g, '$1') // bold
      .replace(/\*(.*?)\*/g, '$1') // italic
      .replace(/```[\s\S]*?```/g, '') // コードブロック
      .replace(/`(.*?)`/g, '$1') // インラインコード
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンク
      .replace(/^\s*[-*+]\s+/gm, '') // リスト
      .replace(/\n\s*\n/g, '\n') // 空行を削除
      .trim()
    
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText
  }
}

// 投稿の統計情報
export class PostStats {
  static getUserStats(username = 'hanako_dev') {
    const userPosts = PostManager.getUserPosts(username)
    
    return {
      totalPosts: userPosts.length,
      totalLikes: userPosts.reduce((sum, post) => sum + post.likes, 0),
      totalViews: userPosts.reduce((sum, post) => sum + post.views, 0),
      totalComments: userPosts.reduce((sum, post) => sum + post.comments, 0),
      postsByType: {
        memo: userPosts.filter(p => p.type === 'memo').length,
        article: userPosts.filter(p => p.type === 'article').length,
        book: userPosts.filter(p => p.type === 'book').length
      }
    }
  }
}