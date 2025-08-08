import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TechKnot - セットアップ',
  description: '技術への情熱が人をつなぐ - 初期設定',
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}