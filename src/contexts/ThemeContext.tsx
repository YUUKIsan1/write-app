'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme)
        applyTheme(savedTheme)
      } else {
        // システムの設定を確認
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialTheme = systemPrefersDark ? 'dark' : 'light'
        setTheme(initialTheme)
        applyTheme(initialTheme)
        localStorage.setItem('theme', initialTheme)
      }
    } catch (error) {
      console.warn('Theme initialization error:', error)
      // フォールバックとしてライトテーマを設定
      setTheme('light')
      applyTheme('light')
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    handleThemeChange(newTheme)
  }

  // 初期マウントまで何も表示しない
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme: handleThemeChange, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}