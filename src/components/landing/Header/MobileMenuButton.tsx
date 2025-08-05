'use client'

import { Icons } from '@/components/ui/icons'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
      aria-label="メニューを開く"
    >
      {isOpen ? <Icons.X /> : <Icons.Menu />}
    </button>
  )
}