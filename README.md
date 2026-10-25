# りかラボ — 理科の学習ライブラリ

公開サイト： https://kazuki911.github.io/rika-lab/

中学校理科の学習指導要領を対応表に整理し、モデル操作・対応付け・資料読解・考察・探究ワークシートを掲載します。50活動ずつ追加して公開します。現在の公開対象数は `data/catalog.json` の `release`、単元別の状況は [対応表](docs/CURRICULUM.md) を参照してください。

## 使い方

学年・単元・形式・標準／発展で絞り込み、教材を選びます。各テーマの5活動は別々の学習目的です。モデル操作の一部は数式による定量計算、その他は段階を選んで構造や過程を読むものです。既存の10シミュレーションも同じホームから利用できます。

お気に入り・学習済み・探究ノート・モデルの実験記録を端末に保存します。新ライブラリの記録は「使い方」からJSONで、モデルの記録はCSVで、個別ノートはテキストで書き出せます。既存10教材の記録は従来のCSV機能から保存します。保存先はブラウザごとです。自由記述の自動採点はしません。

## 構成

- `index.html` / `assets/library.*`：共通ホーム、教材UI、学習記録
- `assets/models.js`：純粋な数値モデル
- `data/catalog.json`：教材目録
- `data/{physics,chemistry,biology,earth,skills}.json`：分野別の教材データ（利用時に読み込み）
- `simulation.html` / `assets/app.js`：既存10シミュレーション
- `scripts/build_content.py`：独自制作した教材内容と段階公開用ビルダー
- `docs/CURRICULUM.md`：学習指導要領との対応
- `docs/DESIGN.md`：HIGの適用方針

## ローカル実行と検証

```sh
python3 -m http.server 8000 --bind 127.0.0.1
node tests/verify.cjs
node tests/library.mjs
```

JSONをfetchするため、ファイルを直接開くのではなくHTTPで確認してください。公開版はビルド不要でGitHub Pagesのmainルートから配信します。

## 教材内容と限界

文部科学省の公式「中学校学習指導要領解説 理科編」の第2章・付録3を参照。学年配当・標準内容と発展内容を区別しています。資料は仮想データまたは明記した式の計算値で、観測値を装ったものではありません。モデルの省略条件は個々に明示します。実際の観察や実験の技能は画面だけでは代替できません。

Apple HIGの明確さ、一貫性、操作領域、キーボード操作、読みやすさ、ダークモード、動きの抑制をWeb向けに実装しました。外部フォント・画像・実行ライブラリは不要です。

## 容量と公開

動画や巨大画像を用いず、共通エンジンと分野別データを共有します。GitHub Pagesの公開サイト上限1 GBを十分下回る間は同じリポジトリで運用します。将来外部配信が必要になった場合も、目録を共通入口として維持します。

公式資料：
- https://www.mext.go.jp/a_menu/shotou/new-cs/1387016.htm
- https://www.mext.go.jp/content/20260730-mxt_kyoiku01-100002608_05.pdf
- https://developer.apple.com/design/human-interface-guidelines/accessibility
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
