# デザイン・検証方針

Apple Human Interface Guidelines の Accessibility / Layout / Color を2026年10月26日に確認し、Web標準へ適用しています。Appleの認定・監修を示すものではありません。

- システムフォント、明確な見出し階層、余白と内容を優先。
- 操作領域は原則44 CSS px以上。ポイントとCSS pxはプラットフォーム上の概念が異なるため、Web上の実装基準として採用。
- ライト／ダーク、OS設定追従、prefers-contrast、prefers-reduced-motion。
- キーボードで操作可能なネイティブbutton/input/select。ドラッグだけの操作は使わない。
- 正誤は色に加えて文字で表示。グラフには数値表を付ける。
- 自由記述は自動採点せず、自己点検と考察例を分離。
- 教材の数は個別URLを持つ活動数。1テーマの5活動はそれぞれ別の目的を持つ。300個の独立したシミュレーションと称しない。

参考：
- https://developer.apple.com/design/human-interface-guidelines/accessibility
- https://developer.apple.com/design/human-interface-guidelines/layout
- https://developer.apple.com/design/human-interface-guidelines/color
