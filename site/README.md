# nanatau site

nanatau のキャラクター紹介・MotionPNGTuber・ビジュアルアーカイブをまとめた静的ランディングページです。

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

画像の正本は `../images/concept/showcase/` に置いています。アプリケーションコードからは `@showcase-assets/*` エイリアス経由で参照します。表情パネルはReactのstateとeffectで自動再生・手動切り替えを行います。

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
