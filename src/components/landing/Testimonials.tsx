interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  achievement: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: '田中 優子',
    role: 'フロントエンドエンジニア',
    company: '株式会社テックイノベーション',
    content: '営業職からエンジニアへの転職は不安でしたが、TechKnotの実践的なカリキュラムのおかげで確実にスキルを身につけることができました。メンタリング制度も素晴らしく、現在は憧れのスタートアップで活躍しています。',
    achievement: '営業職 → フロントエンドエンジニア（6ヶ月）',
    avatar: '👩‍💻',
    rating: 5
  },
  {
    name: '佐藤 健太',
    role: 'デジタルマーケター',
    company: '株式会社マーケティングソリューションズ',
    content: 'マーケティング未経験からのスタートでしたが、実際のプロジェクトを通じて現場で使えるスキルを習得できました。データ分析から戦略立案まで、総合的な力が身につき、年収も大幅にアップしました。',
    achievement: '事務職 → デジタルマーケター（4ヶ月）',
    avatar: '👨‍💼',
    rating: 5
  },
  {
    name: '山田 美咲',
    role: 'データアナリスト',
    company: '大手IT企業',
    content: '独学では限界を感じていましたが、業界のプロから直接学べる環境が最高でした。PythonとSQL、機械学習の実践的なスキルが身につき、憧れの大手IT企業でデータアナリストとして働けています。',
    achievement: '小売業 → データアナリスト（8ヶ月）',
    avatar: '👩‍🔬',
    rating: 5
  }
];

interface TestimonialsProps {
  className?: string;
}

export default function Testimonials({ className }: TestimonialsProps) {
  return (
    <section id="testimonials" className={`pt-20 pb-32 bg-gray-50 ${className}`}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            夢を実現した卒業生の声
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            様々な業界から転職を成功させた先輩たちのリアルな体験談
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600 font-medium">受講生数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600 font-medium">転職成功率</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">3.2倍</div>
            <div className="text-gray-600 font-medium">平均年収アップ</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">満足度</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="card-hover animate-fade-in-up bg-white p-8 rounded-2xl shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <div className="absolute -top-2 -left-2 text-4xl text-blue-200">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="border-t border-gray-200 pt-4">
                <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                  ✨ {testimonial.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Logos */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            卒業生が活躍している企業
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Uber'].map((company, index) => (
              <div key={index} className="px-6 py-3 bg-gray-100 rounded-lg">
                <span className="text-lg font-semibold text-gray-700">{company}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            その他、多数のIT企業・スタートアップで卒業生が活躍中
          </p>
        </div>

        {/* Video Testimonials CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              もっと詳しい体験談を見る
            </h3>
            <p className="mb-6 opacity-90">
              動画インタビューで転職成功の秘訣を詳しく聞いてみませんか？
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              📹 動画インタビューを見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}