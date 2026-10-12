# 業界研究（ウェブデザイン技能検定3級 対策）教材リポジトリ

本ディレクトリは、Webデザイン学科1年生向け授業「業界研究」における**ウェブデザイン技能検定3級（国家検定）**の合格対策教材一式を管理しています。

---

## 📁 ディレクトリ構成

```text
industry-research/
├── README.md                      # 本ドキュメント（全体目次・管理ガイド）
│
├── 00_syllabus/                   # 授業計画・シラバス
│   └── 20261004_summary.md        # 授業概要・スケジュール・小テスト計画
│
├── 01_theory/                     # 【学科対策】講義資料・小テスト・過去問題
│   ├── lessons/                   # 各回の学習資料・小テスト（01〜08）
│   │   ├── 01/                    # 第1回「Web標準とHTML:CSS拡張」
│   │   ├── 02/ (予定)             # 第2回「Webアクセシビリティとユニバーサルデザイン」
│   │   └── ...                    # （第8回まで順次追加）
│   └── past-questions/            # 学科の過去問題集・オリジナル問題
│       ├── R08-2-3_gakka_open.pdf
│       ├── 令和7年度 第3回学科試験問題.md
│       ├── 令和7年度 第4回学科試験問題.md
│       ├── 令和8年度 第1回学科試験問題.md
│       ├── 令和8年度 第2回学科試験問題.md
│       ├── 学科練習問（2022年3月18日改訂）.md
│       └── 対策サイト オリジナル問題集.md
│
├── 02_practical/                  # 【実技対策】実技模擬演習セット（素材＋解答＋解説）
│   ├── exam-01/                   # 実技過去問 演習セット①
│   │   ├── README.md              # 実施ガイド
│   │   ├── 問題用紙.md            # 本番形式の問題用紙（Markdown）
│   │   ├── question.html          # Web画面表示用問題用紙（HTML）
│   │   ├── 解答・解説・採点マニュアル.md # 模範解答（Diff）・採点基準
│   │   ├── answer.html            # Web画面表示用模範解答・解説（HTML）
│   │   ├── data3/                 # 【受検者配布用】素材フォルダ（q1〜q6）
│   │   └── answers/               # 【模範解答】完成フォルダ（a1〜a6）
│   ├── exam-02/                   # 実技過去問 演習セット②（令和7年度 第4回）
│   │   ├── README.md              # 実施ガイド
│   │   ├── R07-4-3_jitsugi_open.pdf # 公式問題PDF
│   │   ├── 問題用紙.md            # 本番形式の問題用紙（Markdown）
│   │   ├── question.html          # Web画面表示用問題用紙（HTML）
│   │   ├── 解答・解説・採点マニュアル.md # 模範解答（Diff）・採点基準
│   │   ├── answer.html            # Web画面表示用模範解答・解説（HTML）
│   │   ├── data3/                 # 【受検者配布用】素材フォルダ（q1〜q6）
│   │   └── answers/               # 【模範解答】完成フォルダ（a1〜a6）
│   ├── exam-03/                   # 実技過去問 演習セット③（令和8年度 第1回）
│   │   ├── README.md              # 実施ガイド
│   │   ├── R08-1-3_jitsugi_open.pdf # 公式問題PDF
│   │   ├── 問題用紙.md            # 本番形式の問題用紙（Markdown）
│   │   ├── question.html          # Web画面表示用問題用紙（HTML）
│   │   ├── 解答・解説・採点マニュアル.md # 模範解答（Diff）・採点基準
│   │   ├── answer.html            # Web画面表示用模範解答・解説（HTML）
│   │   ├── data3/                 # 【受検者配布用】素材フォルダ（q1〜q6）
│   │   └── answers/               # 【模範解答】完成フォルダ（a1〜a6）
│   └── exam-04/                   # 実技過去問 演習セット④（令和8年度 第2回）
│       ├── README.md              # 実施ガイド
│       ├── R08-2-3_jitsugi_open.pdf # 公式問題PDF
│       ├── 問題用紙.md            # 本番形式の問題用紙（Markdown）
│       ├── question.html          # Web画面表示用問題用紙（HTML）
│       ├── 解答・解説・採点マニュアル.md # 模範解答（Diff）・採点基準
│       ├── answer.html            # Web画面表示用模範解答・解説（HTML）
│       ├── data3/                 # 【受検者配布用】素材フォルダ（q1〜q6）
│       └── answers/               # 【模範解答】完成フォルダ（a1〜a6）
│
└── 03_references/                 # 【参考資料】過去の自作勉強資料
    ├── Webクリエイターズ能力認定試験「タイポグラフィ、画像」/
    ├── Webクリエイターズ能力認定試験「デザインの基礎、配色」/
    └── Webクリエイターズ能力認定試験「ユーザビリティ・アクセシビリティ」/
```

---

## 📌 今後の追加・拡張ガイド

* **学科対策（講義・小テスト）を追加する場合**：
  * [`01_theory/lessons/`](file:///Users/takagino/_Dev/01_Trident/tri-education/wf1/2nd/industry-research/01_theory/lessons) 配下に `02/`, `03/`, ... と授業回ごとにフォルダを作成してください。
* **実技対策（過去問セット）を追加する場合**：
  * [`02_practical/exam-02/`](file:///Users/takagino/_Dev/01_Trident/tri-education/wf1/2nd/industry-research/02_practical/exam-02) および [`02_practical/exam-03/`](file:///Users/takagino/_Dev/01_Trident/tri-education/wf1/2nd/industry-research/02_practical/exam-03) に、問題文・配布素材（`data3`）・模範解答（`answers`）を格納してください。
