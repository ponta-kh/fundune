# fundune

`fundune`は、[shadcn/ui](https://ui.shadcn.com/)をベースにした再利用可能なReactコンポーネントライブラリです。

## ✨ 主な特徴

- 素晴らしいUIコンポーネント群である[shadcn/ui](https://ui.shadcn.com/)を基盤としています。
- TypeScriptによる完全な型定義を提供します。
- Viteを採用し、高速な開発体験を実現します。

## 🚀 インストール

```bash
npm install fundune
```

## 📦 使い方

ルートのエントリーポイントからコンポーネントをインポートできます。

```tsx
import { Card } from 'fundune';

function MyComponent() {
  return (
    <Card title="ようこそ">
      <p>これはカードコンポーネントです。</p>
    </Card>
  );
}
```

フォーム要素やダイアログなどの特定のコンポーネントは、コード分割を最適化するために専用のエントリーポイントからインポートすることをお勧めします。

```tsx
import { InputField } from 'fundune/form';
import { AlertDialog } from 'fundune/dialog';

// ...
```

## 📄 ライセンス

このプロジェクトはMITライセンスです。