#!/bin/bash

# 開発サーバー起動スクリプト（リモートアクセス対応）
echo "🚀 ランディングページ開発サーバーを起動中..."
echo "📡 リモートアクセス対応（0.0.0.0:3001）"
echo ""

# 依存関係をインストール（必要に応じて）
if [ ! -d "node_modules" ]; then
  echo "📦 依存関係をインストール中..."
  npm install
fi

# 開発サーバーを起動
echo "🌟 サーバー起動中..."
echo "   - ローカル: http://localhost:3001"
echo "   - リモート: http://[あなたのIPアドレス]:3001"
echo ""

npm run dev