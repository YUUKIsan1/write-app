import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TechKnot Dashboard - 学習管理',
  description: '技術への情熱が人をつなぐ学習ダッシュボード',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}