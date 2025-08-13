import AppLayout from '@/components/layout/AppLayout'
import SimpleMemoList from '@/components/memo/SimpleMemoList'

export default function PersonalMemoPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              個人メモ
            </h1>
            <p className="mt-2 text-gray-600">
              あなただけのメモ空間
            </p>
          </div>

          <SimpleMemoList />
        </div>
      </div>
    </AppLayout>
  )
}