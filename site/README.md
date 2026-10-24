# nanatau site

nanatau のキャラクター紹介・3Dモデルの表情と動画・ビジュアルアーカイブをまとめた静的ランディングページです。

`site/` で次のコマンドを実行すると開発サーバーを起動できます。

```bash
bun install
bun run dev
```

表示されたURL（通常は <http://localhost:5173/>）を開いてください。

本番ビルドは `bun run build`、成果物の確認は `bun run preview` です。
型チェックは `bun run typecheck` です。

Cloudflare Workers Static Assetsへデプロイする場合は、Wranglerの認証後に次を実行します。

```bash
bun run deploy:dry-run
bun run deploy
```

`wrangler.jsonc` はViteの`dist/`を静的アセットとして配信し、React SPAの未一致URLを`index.html`へフォールバックします。
正規URLは`https://nanatau.com/`で、`https://www.nanatau.com/`へのアクセスはWorkerが301リダイレクトします。

サイト用画像は `../images/concept/showcase/` に置き、`@showcase-assets/*` エイリアス経由で参照します。表情パネルはReactのstateとeffectで通常・まばたき・笑顔の静止画を自動／手動で切り替えます。

現在の3D表情は2026-10-24採用の修正版に対応します。`nanatau-avatar-{neutral,blink,happy}.png` は [Charakuruの画像正本](../images/concept/avatar-v1/charakuru/README.md) にある `face-{neutral,blink,happy}.png` の同一内容のコピーです。モデル更新時はこの3枚も同期してください。

動画は `@avatar-videos/dance-tetris-expressions.mp4` から [正本](../models/avatar-v1/charakuru/videos/dance-tetris-expressions.mp4) を直接参照し、Viteがハッシュ付きアセットとして配信します。ポスター `nanatau-avatar-tetris-poster.jpg` はこの動画の先頭フレームを640×800へ縮小したものです。動画は操作して再生する方式で、`preload="none"` と `loading="lazy"` を使います。遅延読み込み非対応ブラウザーでは `preload` が読み込みを抑えます。

`main` へのpushでは `site/`、サイト用画像、Charakuru動画、デプロイworkflowの変更を検知して既存のCloudflare Workerへ自動デプロイします。動画を差し替えるときはポスターも更新してください。

## 構成

`src/features/` は画面の縦スライスです。各スライスが自分の表示・データ・状態を持ち、`src/app/` は合成だけを担当します。複数スライスで共有するリンク定数と星アイコンは `src/shared/` に置いています。アプリケーションコードはTypeScript（`.ts` / `.tsx`）で実装しています。

```text
src/
├── app/                    # Reactのcomposition root
├── features/
│   ├── hero/
│   ├── announcement/
│   ├── topics/
│   ├── profile/
│   ├── motion/             # 表情state・自動再生を所有
│   ├── visuals/
│   ├── cta/
│   └── footer/
├── shared/                 # 複数sliceで使う最小限の共有部品
└── styles/                 # グローバルデザインシステム
```
