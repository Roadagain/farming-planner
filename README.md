# farming-planner
周回計画計算機

https://farm.roadagain.dev

# 開発
## セットアップ
```console
$ yarn
```

## 開発環境立ち上げ
```console
$ yarn dev
```

Next.jsの開発サーバーが立ちます

## テスト
```console
$ yarn test
```

TSの型チェックとlib用のテストが走ります

## lint
```console
$ yarn lint
```

ESLintとPrettierのフォーマットチェックが走ります

### 自動修正
```console
$ yarn fix
```

ESLintの自動修正とPrettierのフォーマットが走ります

## ディレクトリ構造
- `.github/workflows`: GitHub Actionsの設定
- `components`: 汎用のReactコンポーネント
- `context`: React Contextの設定
- `lib`: 内部ロジック
  - `types`: 全体で使う型定義
- `pages`: Next.jsのページコンポーネント
- `preset-data`: 予め用意したステージやアイテムのデータ
- `sample`: (主にテストで使う用の)サンプルデータ
