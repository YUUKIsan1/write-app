interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LearnHub</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              エンジニアとマーケターのための
              次世代学習プラットフォーム。
              学習・アウトプット・コミュニティで
              確実なスキルアップを実現。
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-lg">📺</span>
              </a>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-lg font-semibold mb-4">学習コース</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">プログラミング</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">デジタルマーケティング</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">データ分析</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">AI・機械学習</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">プロダクトマネジメント</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">コミュニティ</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">コミュニティ参加</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">イベント情報</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">メンタリング</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">転職支援</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">ブログ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サポート</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">ヘルプセンター</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">お問い合わせ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">よくある質問</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">利用規約</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">最新情報をお届け</h3>
            <p className="text-gray-300 mb-4">
              新しいコースやイベント情報を
              いち早くお届けします
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="メールアドレスを入力"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white placeholder-gray-400"
              />
              <button className="btn-primary px-6 py-3 rounded-lg font-semibold">
                登録
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold mb-2 flex items-center justify-center md:justify-start">
                <span className="text-blue-400 mr-2">📧</span>
                メール
              </h4>
              <p className="text-gray-300">info@learnhub.jp</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center justify-center md:justify-start">
                <span className="text-blue-400 mr-2">📞</span>
                電話
              </h4>
              <p className="text-gray-300">03-1234-5678</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center justify-center md:justify-start">
                <span className="text-blue-400 mr-2">📍</span>
                住所
              </h4>
              <p className="text-gray-300">東京都渋谷区道玄坂1-1-1</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 LearnHub Inc. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">利用規約</a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">プライバシーポリシー</a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">特定商取引法</a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Cookie ポリシー</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}