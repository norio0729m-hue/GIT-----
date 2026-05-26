# 引き継ぎドキュメント
> 作成日: 2026-05-26 | リポジトリ: norio0729m-hue/GIT-----

---

## リポジトリ情報

| 項目 | 内容 |
|---|---|
| リポジトリ名 | `norio0729m-hue/GIT-----` |
| 現在のブランチ | `claude/youtube-music-analysis-Pn7rc` |
| メインブランチ | `main` |
| GitHub Pages | `main` ブランチで稼働中 |

---

## これまでの作業履歴

### 1. つけそば専門店サイト（完了・main反映済み）
- **ファイル**: `index.html`, `styles.css`
- **内容**: 「阿らた屋」つけそば専門店のシングルページサイト
- **状態**: GitHub Pages でデプロイ済み
- **ブランチ**: `claude/tsukesoba-restaurant-site-GwhxF` → PR#1でmainにマージ済み

### 2. YouTube AI音楽チャンネル 市場分析（完了）
- **ファイル**: `youtube_music_analysis.md`
- **ブランチ**: `claude/youtube-music-analysis-Pn7rc`（未マージ）
- **内容**:
  - 睡眠BGM / 作業用BGM / 環境音 / Japanese Zen / Rain / Deep Focus の市場分析
  - 今狙うべきテーマ TOP10
  - CTRが高いタイトル案 30個
  - Suno用プロンプト 50個
  - Midjourney用画像プロンプト 30個
  - 90日間投稿ロードマップ

### 3. 環境設定
- `.env` ファイルを作成済み（中身はユーザーが管理、Gitに含まれない）
- `.gitignore` に `.env` を追加済み

---

## ファイル構成

```
GIT-----/
├── index.html              # つけそば専門店サイト（GitHub Pages）
├── styles.css              # 同上スタイル
├── youtube_music_analysis.md  # YouTube市場分析レポート
├── .gitignore              # .envを除外
├── .env                    # 環境変数（Git管理外・中身は別途管理）
└── 今日の晩御飯は蕎麦です。  # メモファイル
```

---

## 次の作業候補

### YouTube AI音楽チャンネル自動化（推奨）
市場分析は完了しているため、次は実装フェーズ。

#### すぐできるタスク
1. **Suno で音楽生成**: `youtube_music_analysis.md` 内のプロンプト50個を使用
2. **Midjourney でサムネ生成**: 同ファイル内の30プロンプトを使用
3. **自動投稿スクリプト作成**: YouTube Data API + Python/Node.js
4. **動画生成パイプライン**: FFmpeg で静止画+音楽を動画化
5. **チャンネル開設**: Japanese Zen（英語）から着手が最推奨

#### 優先ジャンル（再掲）
| 順位 | ジャンル | 理由 |
|---|---|---|
| 1 | Japanese Zen（英語） | 競合少・AI生成しやすい |
| 2 | Brown Noise / ADHD Focus | 隙間ジャンル |
| 3 | 432Hz / 528Hz 睡眠 | 需要安定 |

---

## 新しいフォルダで作業を始める際の注意

1. **`.env` の中身を新フォルダにコピー**（Gitには含めないこと）
2. **`.gitignore` に `.env` を必ず追加**
3. **`youtube_music_analysis.md` を参照して作業継続**
4. `claude/youtube-music-analysis-Pn7rc` ブランチは未マージ → 必要に応じてmainにマージを検討

---

## 重要メモ

- `.env` の内容は絶対にコミット・プッシュしない
- GitHub Pages は `main` ブランチを参照している
- つけそば店サイトと音楽チャンネル自動化は独立したプロジェクト

---

*このドキュメントは引き継ぎ用。新しいセッションの冒頭でこのファイルを読み込むことで作業を継続できる。*
