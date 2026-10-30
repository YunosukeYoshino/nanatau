<h1 align="center">
  <img src="images/readme/logo.svg" alt="ななたう / NANATAU" width="600">
</h1>

<p align="center">
  <strong>涙を魔力に変える、ちょっぴり泣き虫な魔法少女。</strong>
  <br>
  キャラクターデザイン・3Dモデル・動く素材を集めた、ななたうの制作ノート。
</p>

<p align="center">
  <a href="https://nanatau.com/">キャラクターサイト</a> ·
  <a href="#avatar">3Dのななたう</a> ·
  <a href="#materials">モデルと素材</a> ·
  <a href="#development">手元で動かす</a>
</p>

<p align="center">
  <a href="https://nanatau.com/">
    <img src="images/concept/showcase/nanatau-stage-banner-v3.png" alt="淡い黄色の光と星に囲まれた、魔法少女ななたう" width="880">
  </a>
</p>

<p align="center">
  <a href="models/avatar-v1/charakuru/studies/true-front-b/motion.mp4"><img src="images/readme/card-video.svg" alt="動画を見る — 顔と全身の12秒" width="250"></a>
  <a href="#materials"><img src="images/readme/card-model.svg" alt="3Dモデル — VRMとBlender" width="250"></a>
  <a href="images/concept/showcase/"><img src="images/readme/card-gallery.svg" alt="ビジュアル — イラストと表情素材" width="250"></a>
</p>

<br>

<h2 id="about"><img src="images/readme/heading-about.svg" alt="ななたうについて" width="480"></h2>

泣きそうでも、ちょっとだけ前を向く。ななたうは、涙が魔力の源になる魔法少女です。

- **やわらかな黄色の髪と、金色の瞳。** リボンや花飾り、星をあしらった衣装。
- **控えめな表情。** 眠そうな顔、照れた顔、涙目、小さな笑顔。
- **イラストから、動く姿へ。** キャラクター紹介サイト、3Dモデル、MotionPNGTuberの素材を制作しています。

<br>

<h2 id="avatar"><img src="images/readme/heading-model.svg" alt="3Dのななたう" width="480"></h2>

Charakuruで制作した3Dのななたう。2026-10-29に正面顔Bの雰囲気を確認しました。通常顔のモデルと12秒の動作動画を制作し、ここで一区切りにしています。

<p align="center">
  <a href="images/concept/avatar-v1/charakuru/studies/true-front-b/reference.png"><img src="images/concept/avatar-v1/charakuru/studies/true-front-b/reference.png" alt="顔の雰囲気を確認した、真正面の顔資料B" width="360"></a>
  <a href="images/concept/avatar-v1/charakuru/studies/true-front-b/front.png"><img src="images/concept/avatar-v1/charakuru/studies/true-front-b/front.png" alt="正面顔Bをもとに作った3Dモデルの通常顔" width="360"></a>
  <br>
  <sub>確認済みの正面資料B · 3Dモデルの通常顔</sub>
</p>

<p align="center">
  <strong><a href="models/avatar-v1/charakuru/studies/true-front-b/motion.mp4">▶ 最新の顔と全身の動きを見る</a></strong>
  <br>
  <sub>12秒 · 1540×900 · 24fps · 無音 · 左右の首振り、うなずき、首かしげ</sub>
</p>

[モデル・資料・検証結果](models/avatar-v1/charakuru/studies/true-front-b/README.md)をまとめています。この顔のまばたき・笑顔・口パクは調整前で、VRMへの再書き出しはまだ行っていません。

<details>
<summary>表情付きVRM（K6）と、確認済みの仕様</summary>

配信用のVRM正本は2026-10-26に顎先を整えたK6版です。上の正面顔Bより前の顔で、まばたきと笑顔を実装しています。

<p align="center">
  <a href="images/concept/showcase/nanatau-avatar-neutral-1440.webp"><img src="images/concept/showcase/nanatau-avatar-neutral-1440.webp" alt="K6の通常顔" width="250"></a>
  <a href="images/concept/showcase/nanatau-avatar-blink-1440.webp"><img src="images/concept/showcase/nanatau-avatar-blink-1440.webp" alt="K6のまばたき" width="250"></a>
  <a href="images/concept/showcase/nanatau-avatar-happy-1440.webp"><img src="images/concept/showcase/nanatau-avatar-happy-1440.webp" alt="K6の笑顔" width="250"></a>
  <br>
  <sub>K6の通常顔 · まばたき · 笑顔</sub>
</p>

- VRM 1.0・MToon。髪と衣装の揺れ物設定を含みます。
- まばたきと笑顔は0〜100%で変形し、重ねて使えます。
- 表情の強さ・方向・組み合わせを変えた45通り、Blendの保存・再読み込み、VRMの再書き出しを確認しています。
- [K6の12秒動画](models/avatar-v1/charakuru/releases/k6/motion.mp4)では左右の首振り・うなずき・まばたき・笑顔を全身と顔アップで確認できます。揺れ物の物理計算は含みません。

詳しい検証結果と残っている課題は、[3D成果物一覧](models/avatar-v1/charakuru/README.md)を参照してください。

</details>

<details>
<summary>ほかのダンスと、全身の参考画像</summary>

以下は以前のモデルによる記録です。

- [表情付きテトリス](models/avatar-v1/charakuru/dances/tetris-expressions/motion.mp4)：2026-10-24版。約16秒、公式伴奏付き。
- [Samba Dancing](models/avatar-v1/charakuru/dances/samba/motion.mp4)：18.2秒、無音。全身と揺れ物の動作確認。
- [愛包ダンスホール](models/avatar-v1/charakuru/dances/aipai/motion.mp4)：16秒、音声付きの縦動画。
- [6方向・全身・動作確認画像](images/concept/avatar-v1/charakuru/README.md)：現在の3表情と、身体制作時の外観を掲載。

</details>

<br>

<h2 id="materials"><img src="images/readme/heading-materials.svg" alt="モデルと素材" width="480"></h2>

見たいもの、編集したいものから選んでください。

| 目的 | ファイル・資料 |
| --- | --- |
| 最新の正面顔と動きを編集する | [正面顔BのBlenderファイル](models/avatar-v1/charakuru/studies/true-front-b/motion.blend) |
| 表情付きVRM（K6）を使う | [avatar.vrm](models/avatar-v1/charakuru/releases/k6/avatar.vrm) |
| 表情付きモデル（K6）を編集する | [avatar.blend](models/avatar-v1/charakuru/releases/k6/avatar.blend) |
| イラストや表情素材を見る | [Showcaseのビジュアル](images/concept/showcase/) |
| 配信用の2D素材を見る | [透過PNG](images/png-tuber/transparent/)・[MotionPNGTuber](images/png-tuber/motion/) |
| 制作過程・検証・出典を読む | [Charakuru制作記録](models/avatar-v1/charakuru/PRODUCTION.md) |

3Dモデルは本人のみ使用・再配布不可の設定です。モデル固有の利用条件は[制作記録](models/avatar-v1/charakuru/PRODUCTION.md)とVRMメタデータを確認してください。動画の楽曲・モーションの出典と条件も、同じ制作記録にまとめています。

<br>

<h2 id="development"><img src="images/readme/heading-start.svg" alt="手元で動かす" width="480"></h2>

キャラクター紹介サイトを手元で開くには、Bunを使います。

```bash
cd site
bun install
bun run dev
```

表示されたURL（通常は <http://localhost:5173/>）を開いてください。サイトの構成やデプロイ方法は[サイト開発ガイド](site/README.md)にあります。

<details>
<summary>ディレクトリ構成</summary>

| 保存先 | 内容 |
| --- | --- |
| `models/` | 採用モデル、確認用モデル、動画、検証記録 |
| `images/` | 採用したイラスト、モデルの確認画像、サイト用画像 |
| `output/` | 生成途中のデータと再現用スクリプト。Git管理外 |
| `site/` | React / Viteのキャラクター紹介サイト |
| `blog/` | Lumeのブログ |

Charakuruの成果物は[表情付きモデル](models/avatar-v1/charakuru/releases/k6/README.md)、[通常顔のモデル](models/avatar-v1/charakuru/studies/true-front-b/README.md)、[曲ごとのダンス](models/avatar-v1/charakuru/dances/README.md)、[身体制作時のデータ](models/avatar-v1/charakuru/archive/body/README.md)にまとめています。詳しい保存先は[成果物一覧](models/avatar-v1/charakuru/README.md)を参照してください。

</details>

<details>
<summary>型チェック・ビルド・秘密情報チェック</summary>

サイトの型チェックと本番ビルドは `site/` で実行します。

```bash
bun run typecheck
bun run build
bun run preview
```

秘密情報チェックはリポジトリ直下で実行します。

```bash
bun install
bun run secretlint
```

</details>

<details>
<summary>ブログを手元で開く</summary>

ブログはLumeとDenoで管理しています。リポジトリ直下から実行してください。

```bash
cd blog
deno task serve
```

本番ビルドは`blog/`で`deno task build`を実行します。

</details>

<details>
<summary>フォルダーと制作のルール</summary>

| 場所 | 内容 |
| --- | --- |
| `images/` | 採用した画像と素材 |
| [models/](models/README.md) | 採用した3Dモデル・動画・検証記録 |
| `output/` | 生成途中のファイルや作業用素材。Git管理外 |
| [site/](site/README.md) | React・TypeScript・Viteのキャラクター紹介サイト |
| [blog/](blog/) | Lumeのブログ |

制作は`output/`で行い、採用した画像だけを`images/`に保存します。MotionPNGTuberの実装と検証手順は[専用スキル](.claude/skills/motion-pngtuber-nanatau/SKILL.md)にまとめています。

配色はPale Butter Yellow（`#FFFDE7`）・Soft Navy（`#2C3E6B`）・Warm White（`#FFF8E1`）。詳しくは[スタイルガイド](.claude/skills/nanatau/STYLE_GUIDE.md)を参照してください。

キャラクター制作では次の基本プロンプトを使います。

```text
Soft pale yellow hair, warm golden amber eyes with layered highlights,
pastel yellow and white magical girl outfit, delicate frame.
Expression is introverted, fragile, and trying-her-best:
teary, sleepy, embarrassed, but gentle.
Clean thin-to-medium lineart, flat cel shading, minimal warm background.
Palette is strictly Pale Butter Yellow (#FFFDE7),
Soft Navy (#2C3E6B), Warm White (#FFF8E1).
```

</details>

<br>

<h2 id="faq"><img src="images/readme/heading-faq.svg" alt="よくある質問" width="480"></h2>

<details>
<summary>このモデルをそのまま配信に使えますか？</summary>

現時点では、口パクと視線追従（LookAt）は未実装です。現在の修正版はBlenderと書き出した動画で検証していますが、配信アプリや本人トラッキングでの動作は未検証です。確認範囲は[3D成果物一覧](models/avatar-v1/charakuru/README.md)に記載しています。

</details>

<details>
<summary>どのファイルが最新のモデルですか？</summary>

最新の顔は[正面顔BのBlend](models/avatar-v1/charakuru/studies/true-front-b/motion.blend)に保存しています。まばたきと笑顔を含むVRM正本は[K6のVRMとBlend](models/avatar-v1/charakuru/releases/k6/README.md)です。`.charakit`とFBXは表情追加前の身体制作の記録です。

</details>

<details>
<summary>動画のモーションや音源も入っていますか？</summary>

リポジトリには撮影済み動画と検証記録を保存しています。元モーション・音源・作業用データはGit管理外の`output/`にあり、cloneには含まれません。出典は[制作記録](models/avatar-v1/charakuru/PRODUCTION.md)を参照してください。

</details>

<details>
<summary>Charakuruの制作プロジェクトが開けません</summary>

[project.charakit](models/avatar-v1/charakuru/archive/body/project.charakit)はGit LFSで管理しています。実体を取得していない場合は、リポジトリ直下で`git lfs pull`を実行してください。現在の表情を編集する場合は、[K6のBlend](models/avatar-v1/charakuru/releases/k6/avatar.blend)を使ってください。

</details>

<br>

<p align="center">
  <sub>Quiet bravery in vulnerability.</sub>
  <br>
  <a href="https://nanatau.com/">ななたうのサイトへ</a> ·
  <a href="models/avatar-v1/charakuru/README.md">3Dの制作記録へ</a>
</p>
