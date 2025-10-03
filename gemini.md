# プロジェクト開発ガイドライン

このドキュメントは、このコンポーネントライブラリの開発中に従うべきルールと規約を概説します。

## 1. 構成

このセクションでは、プロジェクトの主要なツール、ライブラリ、およびディレクトリ構造について説明します。

### 1.1. 主要技術とツール

- **パッケージマネージャー**: npm
- **言語**: TypeScript
- **UIフレームワーク**: React
- **ビルドツール**: Vite
- **コンポーネント駆動開発**: Storybook
- **ユニットテスト**: Vitest (導入予定)
- **リンター**: ESLint
- **コードフォーマッター**: Prettier
- **ベースコンポーネントライブラリ**: shadcn/ui

### 1.2. ディレクトリ構成

- `src/components/common`: 最終的なコンポーネントライブラリとして公開されるラッパーコンポーネントを格納します。
- `src/components/shadcn`: shadcn/uiから提供されるベースUIコンポーネントを格納します。これらのコンポーネントは`common`コンポーネント以外から直接使用してはいけません。
- `src/stories`: `src/components/common`内のコンポーネントに対応するStorybookのストーリーを格納します。ここのディレクトリ構造は`common`ディレクトリをミラーリングします。
- `src/lib`: `cn`関数のような共有ユーティリティを格納します。

## 2. 実装

### 2.1. コンポーネントアーキテクチャ

コンポーネントのアーキテクチャは、`shadcn/ui`コンポーネントをラップして、カスタムで再利用可能なライブラリを作成することを基本とします。

- **ベースコンポーネント**: `shadcn/ui`によって提供される素のコンポーネントは`src/components/shadcn/`に配置されます。これらのコンポーネントは、ライブラリから直接エクスポートしたり、アプリケーションコードで直接使用したりしては**いけません**。
- **ラッパーコンポーネント**: このライブラリの公開コンポーネントは`src/components/common/`に配置されます。
- **実装手順**:
    1. `src/components/common/`の各コンポーネントは、`src/components/shadcn/`の対応するコンポーネントのラッパーとして機能します。
    2. ラッパーの責務は、一貫したスタイリングの適用、アプリケーション固有のロジックの追加、そして利用者にとって明確でシンプルなAPIを定義することです。
    3. カスタマイズとスタイリングは`className`と`src/lib/utils.ts`の`cn`ユーティリティを介して適用する必要があります。

#### 参考例: `src/components/common/card.tsx`

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

// ラッパーコンポーネントのPropsを定義
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  footerContent?: React.ReactNode;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  title,
  description,
  footerContent,
  children,
  className,
  ...props
}) => {
  return (
    <ShadcnCard className={cn('w-[380px]', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </ShadcnCard>
  );
};

export { Card };
```

### 2.2. Reactコンポーネント実装

最新のReact実装標準に準拠し、主に関数コンポーネントとHooksを使用します。

- **コンポーネント定義**: すべてのコンポーネントは関数コンポーネントとして定義する必要があります。クラスコンポーネントは使用しません。
- **Propsの型付け**: コンポーネントのPropsを定義するには、TypeScriptのインターフェースを使用します。
- **状態管理**:
    - シンプルなローカルステートには`useState`フックを使用します。
    - より複雑な状態ロジックには`useReducer`フックを使用します。
    - Prop Drillingを避けるためには`Context API`を使用します。
- **副作用**: データ取得や購読などの副作用には`useEffect`フックを使用します。
- **メモ化**: パフォーマンスを最適化するために、関数には`useCallback`を、値には`useMemo`を使用します。

## 3. テスト

### 3.1. Storybook

ストーリーは、モダンなStorybookのプラクティスに合わせて[Component Story Format 3 (CSF 3)](https://storybook.js.org/docs/react/writing-stories/introduction)で記述する必要があります。

- **ディレクトリ構造**: `src/stories/`内のストーリーのディレクトリ構造は、`src/components/common/`のコンポーネント構造をミラーリングする必要があります。例えば、`src/components/common/form-item/input-field.tsx`のストーリーは`src/stories/form-item/input-field.stories.tsx`に配置する必要があります。
- **`meta`オブジェクト (デフォルトエクスポート)**: 各ストーリーファイルには、コンポーネントのメタデータを含むデフォルトエクスポートが必要です。
    - `title`: ディレクトリ構造を反映したパスベースの命名規則（例: `Common/Form/InputField`）。
    - `component`: コンポーネント自体。
    - `tags: ['autodocs']`: 自動ドキュメント生成を有効にします。
    - `argTypes`: Storybook UIでコンポーネントを操作するためのコントロールを定義します。
- **ストーリーオブジェクト (名前付きエクスポート)**: 個々のストーリーは名前付きエクスポートでなければなりません。
    - 型安全のために`StoryObj<typeof meta>`型を使用します。
    - `args`プロパティを使用して、特定のストーリーのコンポーネントの状態を定義します。

### 3.2. ユニットテスト (Vitest)

*（Vitestによるユニットテストのルールはここに定義されます。）*

## 4. Gitワークフロー

プロジェクトのバージョン管理はGitHub Flowに準拠します。

- **作業開始前の確認**:
    - 新しい指示を受けて作業を開始する前には、まず`git status`などを実行し、リポジトリの最新の状態との差分がないか確認します。
    - 差分が存在する場合、これらの変更をコミットすべきか、あるいはコミットせずに作業を続けるべきか、ユーザー（あなた）に確認を取ります。

- **`main`ブランチ**:
    - `main`ブランチは常にデプロイ可能な状態を維持します。
    - このブランチで直接作業を行うことは禁止です。

- **作業ブランチ**:
    - 作業を開始する際は、`main`ブランチにいる場合、必ず新しいブランチを作成してください。
    - ブランチ名は `feature/` や `fix/` などのプレフィックスをつけ、作業内容がわかるように命名します。（例: `feature/add-login-button`）

- **コミットとプッシュ**:
    - 一連の指示が完了し、ユーザー（あなた）から完了の指示があった場合にのみ、コミットとプッシュを行います。
    - 作業途中のコミットは、指示がない限り行いません。
