#!/usr/bin/env python3
"""
sync_lecture_to_notion.py

講義用MarkdownファイルをNotionの講義ページ用フォーマット（Enhanced Markdown）に自動変換するスクリプト。

【自動適用フォーマットルール】
1. H1見出し:
   - 先頭に半角スペースを付与（Notionパーサー対策として '# \\ N. ...' エスケープを使用）
   - 背景色を黄色（{color="yellow_bg"}）に設定
   - 見出し直下に1ブロックの余白 (<empty-block/>)
2. H2見出し:
   - 直下に1ブロックの余白 (<empty-block/>)
3. 区切り線 (---):
   - 上に2ブロック、下に1ブロックの余白 (<empty-block/>)
4. リストの入れ子（ネスト）と連番維持:
   - リスト項目内のコードブロックは各行先頭にタブ(\\t)を付与し、親アイテムの子要素としてネスト
   - リスト直下のサブ箇条書きは '\\t- '、孫箇条書きは '\\t\\t- ' に階層化
   - 親リスト項目同士の間には余白ブロックを挟まず、連番 (1, 2, 3...) を確実に維持
5. 余白相殺（Margin Collapsing）:
   - 区切り線の上は最大2ブロック、その他要素間は最大1ブロックを自動相殺採用
   - 準備ファイルなどの連続トグル (<details>) は余白0ブロックで密着
6. トグル化 & コールアウト化:
   - 準備ファイル (index.html, style.css, main.js) と正解コードを <details> トグル化
   - <aside> を Notionコールアウト (<callout icon="..." color="gray_bg">) に変換
"""

import sys
import os
import re
import json
import textwrap

# デフォルトの同期ヘッダー（JavaScript基礎 月1-2 ナビゲーション）
DEFAULT_SYNCED_HEADER = '''<synced_block_reference url="https://app.notion.com/p/2fbbdf471aca80258d01f00629e1201a#3c8bdf471aca8032a449f64481f0e57b">
\t### JavaScript基礎（月1-2） {toggle="true"}
\t\t<page url="https://app.notion.com/p/3c8bdf471aca80718977dd0a6c418f1c">00_導入</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80b885faee84d1ee0e34">01_**基礎知識・変数・データ型**</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80b2bdf0ccdf290d4f22">02_DOMの取得と要素の書き換え</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca803c8652dbbe59e55e84">03_イベント処理とクラス操作</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca806498c3dae7d9c63f5a">04_条件分岐と属性操作</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca801f957ece032296e560">05_配列と繰り返し処理</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca8096bb72c68c3a10467e">06_ループの応用とMathオブジェクト</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca803d968af95d2abfda32">07_関数の定義と活用</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca803bb273f949cc61b1a1">08_DOMトラバーサルとイベント委譲</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80a5b59ec9ed34701cf5">09_タイマー処理と非同期アニメーション</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80038d96fe564ca71dca">10_オブジェクトとHTML動的生成</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80f3a0b5d3388b680a82">11_組み込みオブジェクトとスクロール演出</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca80f593e9f58639f51660">12_フォーム操作とバリデーション</page>
\t\t<page url="https://app.notion.com/p/3eebdf471aca806da737c9535074543a">13_最終課題</page>
\t\t<empty-block/>
</synced_block_reference>'''


def format_lecture_markdown(raw_markdown_text, custom_synced_header=None):
    """
    ローカル講義MarkdownをNotion Enhanced Markdownに変換する。
    """
    text = raw_markdown_text

    # 1. 冒頭のタイトル・ファイル名等を除去し、最初の '# 1. はじめに' から開始
    m_start = re.search(r'^#\s+1\.\s+.*$', text, flags=re.MULTILINE)
    if m_start:
        text = text[m_start.start():]

    # 2. H1 見出し変換:
    # '# N. ...' -> '# \\ N. ... {color="yellow_bg"}'
    # ★重要: Notionパーサーは '#  ' のスペースをtrimしてしまうが、'# \\ ' とエスケープすることで
    # ブロックテキスト先頭に半角スペース ' N. ...' を直接1発で保持させることができる！
    def replace_h1(match):
        title = match.group(1).strip()
        return f'# \\ {title} {{color="yellow_bg"}}'

    text = re.sub(r'^#\s+([0-9]+\..*)$', replace_h1, text, flags=re.MULTILINE)

    # 3. <aside> を <callout> に変換
    def replace_aside(match):
        inner = match.group(1).strip()
        lines = inner.split('\n')
        icon = '💡'
        first_line = lines[0].strip()
        if first_line in ['⚠️', '💡', '📌', '⭐️', '🚨', 'ℹ️', '📝']:
            icon = first_line
            body_lines = lines[1:]
        else:
            body_lines = lines

        while body_lines and not body_lines[0].strip():
            body_lines.pop(0)
        while body_lines and not body_lines[-1].strip():
            body_lines.pop()

        tabbed_lines = ['\t' + l if l.strip() else '' for l in body_lines]
        callout_content = '\n'.join(tabbed_lines)
        return f'<callout icon="{icon}" color="gray_bg">\n{callout_content}\n</callout>'

    text = re.sub(r'<aside>(.*?)</aside>', replace_aside, text, flags=re.DOTALL)

    # 4. 準備ファイルのコードブロックを <details> に変換
    def replace_file_details(match):
        filename = match.group(1)
        lang = match.group(2)
        code = textwrap.dedent(match.group(3).strip('\n'))
        if lang == 'jsx':
            lang = 'javascript'
        code_tabbed = '\n'.join(['\t' + l if l.strip() else '' for l in code.split('\n')])
        return f'<details>\n<summary>`{filename}`</summary>\n\t```{lang}\n{code_tabbed}\n\t```\n</details>'

    text = re.sub(
        r'(?:###\s+[①②③]\s+|###\s+|\*\*)?`([a-zA-Z0-9_\./\-]+)`(?:\*\*)?\s*\n\n```([a-zA-Z0-9_-]*)\n(.*?)```',
        replace_file_details,
        text,
        flags=re.DOTALL
    )

    # 5. 正解コードを <details> に変換
    def replace_answer_details(match):
        title = match.group(1).strip()
        lang = match.group(2)
        code = textwrap.dedent(match.group(3).strip('\n'))
        if lang == 'jsx':
            lang = 'javascript'
        code_tabbed = '\n'.join(['\t' + l if l.strip() else '' for l in code.split('\n')])
        return f'<details>\n<summary>{title}</summary>\n\t```{lang}\n{code_tabbed}\n\t```\n</details>'

    text = re.sub(
        r'-\s+(正解のソースコード.*?)\s*\n\n\s*```([a-zA-Z0-9_-]*)\n(.*?)```',
        replace_answer_details,
        text,
        flags=re.DOTALL
    )

    # 6. トークン分割とリスト入れ子整形
    lines = text.split('\n')
    tokens = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if stripped == '---':
            tokens.append(('hr', '---'))
            i += 1
            continue

        if stripped.startswith('<callout'):
            block_lines = [line]
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('</callout>'):
                block_lines.append(lines[i])
                i += 1
            if i < len(lines):
                block_lines.append(lines[i])
                i += 1
            tokens.append(('callout', '\n'.join(block_lines)))
            continue

        if stripped.startswith('<details>'):
            block_lines = [line]
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('</details>'):
                block_lines.append(lines[i])
                i += 1
            if i < len(lines):
                block_lines.append(lines[i])
                i += 1
            tokens.append(('details', '\n'.join(block_lines)))
            continue

        if stripped.startswith('# \\ ') and '{color="yellow_bg"}' in stripped:
            tokens.append(('h1', stripped))
            i += 1
            continue

        if stripped.startswith('## '):
            tokens.append(('h2', stripped))
            i += 1
            continue

        if stripped.startswith('### ') or stripped.startswith('#### '):
            tokens.append(('h3_h4', stripped))
            i += 1
            continue

        # 番号付きリスト（リスト全体を1つの構造トークンとして保持）
        if re.match(r'^\d+\.\s+', stripped):
            list_lines = []
            while i < len(lines):
                cur_l = lines[i]
                cur_s = cur_l.strip()
                
                if not cur_s:
                    k = i + 1
                    while k < len(lines) and not lines[k].strip():
                        k += 1
                    if k < len(lines):
                        next_s = lines[k].strip()
                        next_l = lines[k]
                        if re.match(r'^\d+\.\s+', next_s) or next_l.startswith('   ') or next_l.startswith('  ') or next_l.startswith('\t') or next_s.startswith('- '):
                            i += 1
                            continue
                    break

                if cur_s.startswith('#') or cur_s == '---' or cur_s.startswith('<callout') or cur_s.startswith('<details>'):
                    break

                # 1. 番号付きアイテム
                m_num = re.match(r'^(\d+)\.\s+(.*)', cur_s)
                if m_num and (not cur_l.startswith('   ') and not cur_l.startswith('\t')):
                    num_val, num_txt = m_num.groups()
                    list_lines.append(f'{num_val}. {num_txt}')
                    i += 1
                    continue

                # 2. リスト内コードブロック（親アイテムの子要素としてインデント）
                if cur_s.startswith('```'):
                    lang = cur_s[3:].strip()
                    if lang == 'jsx':
                        lang = 'javascript'
                    raw_code_lines = []
                    i += 1
                    while i < len(lines) and not lines[i].strip().startswith('```'):
                        raw_code_lines.append(lines[i])
                        i += 1
                    dedented_code = textwrap.dedent('\n'.join(raw_code_lines))
                    code_lines = [f'\t```{lang}']
                    for c_line in dedented_code.split('\n'):
                        code_lines.append(f'\t{c_line}' if c_line.strip() else '')
                    code_lines.append('\t```')
                    if i < len(lines):
                        i += 1
                    list_lines.append('\n'.join(code_lines))
                    continue

                # 3. 孫箇条書き（スペース5個以上 -> \t\t- ）
                if re.match(r'^\s{5,}\-\s+(.*)', cur_l):
                    sub_txt = re.match(r'^\s{5,}\-\s+(.*)', cur_l).group(1)
                    list_lines.append(f'\t\t- {sub_txt}')
                    i += 1
                    continue

                # 3. 子箇条書き（スペース2〜4個またはタブ -> \t- ）
                if re.match(r'^\s{2,4}\-\s+(.*)', cur_l) or re.match(r'^\t\-\s+(.*)', cur_l) or (cur_s.startswith('- ') and (cur_l.startswith(' ') or cur_l.startswith('\t'))):
                    sub_txt = re.sub(r'^\s*\-\s+', '', cur_l).strip()
                    list_lines.append(f'\t- {sub_txt}')
                    i += 1
                    continue

                # インデントされた追加行
                if cur_l.startswith('   ') or cur_l.startswith('  ') or cur_l.startswith('\t'):
                    list_lines.append(f'\t{cur_s}')
                    i += 1
                    continue

                break

            tokens.append(('numbered_list', '\n'.join(list_lines)))
            continue

        # リスト外の独立コードブロック
        if stripped.startswith('```'):
            lang = stripped[3:].strip()
            if lang == 'jsx':
                lang = 'javascript'
            raw_code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                raw_code_lines.append(lines[i])
                i += 1
            dedented_code = textwrap.dedent('\n'.join(raw_code_lines))
            code_lines = [f'```{lang}']
            for c_line in dedented_code.split('\n'):
                code_lines.append(c_line)
            if i < len(lines):
                code_lines.append('```')
                i += 1
            tokens.append(('codeblock', '\n'.join(code_lines)))
            continue

        # 通常の箇条書き（トップレベル）
        if stripped.startswith('- ') or stripped.startswith('* '):
            bullet_lines = [stripped]
            i += 1
            while i < len(lines):
                cur_l = lines[i]
                cur_s = cur_l.strip()
                if not cur_s:
                    k = i + 1
                    while k < len(lines) and not lines[k].strip():
                        k += 1
                    if k < len(lines) and (lines[k].strip().startswith('- ') or lines[k].startswith('  ') or lines[k].startswith('\t')):
                        i += 1
                        continue
                    break
                if cur_s.startswith('#') or cur_s == '---' or cur_s.startswith('<callout') or cur_s.startswith('<details>') or cur_s.startswith('```'):
                    break
                if cur_s.startswith('- ') or cur_s.startswith('* '):
                    bullet_lines.append(cur_s)
                    i += 1
                elif cur_l.startswith('  ') or cur_l.startswith('\t'):
                    bullet_lines.append(cur_l)
                    i += 1
                else:
                    break
            tokens.append(('bullet_list', '\n'.join(bullet_lines)))
            continue

        # 通常段落
        tokens.append(('text', stripped))
        i += 1

    # 7. 余白相殺（Margin Collapsing）ルール定義
    def get_margins(tok_type):
        if tok_type == 'h1':
            return (0, 1) # 区切り線直下なら上0、下は1
        elif tok_type == 'h2':
            return (1, 1)
        elif tok_type == 'h3_h4':
            return (1, 1)
        elif tok_type == 'hr':
            return (2, 1) # 上に2ブロック、下に1ブロック
        elif tok_type == 'callout':
            return (1, 1)
        elif tok_type == 'details':
            return (1, 1)
        elif tok_type == 'codeblock':
            return (1, 1)
        elif tok_type == 'numbered_list':
            return (1, 1)
        elif tok_type == 'bullet_list':
            return (1, 1)
        elif tok_type == 'text':
            return (0, 0)
        return (0, 0)

    output_parts = []
    
    # 上部ナビゲーション（同期ブロック）の追加
    synced_header = custom_synced_header if custom_synced_header else DEFAULT_SYNCED_HEADER
    output_parts.append(synced_header)

    prev_type = 'synced_block'
    for idx, (t_type, content) in enumerate(tokens):
        # 特例ルール
        if prev_type == 'details' and t_type == 'details':
            gap = 0
        elif prev_type == 'callout' and t_type == 'callout':
            gap = 0
        elif prev_type == 'text' and t_type == 'text':
            gap = 0
        else:
            if prev_type == 'synced_block':
                prev_mb = 0
            else:
                _, prev_mb = get_margins(prev_type)
            curr_mt, _ = get_margins(t_type)
            gap = max(prev_mb, curr_mt)

        for _ in range(gap):
            output_parts.append('<empty-block/>')

        output_parts.append(content)
        prev_type = t_type

    return '\n'.join(output_parts)


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 sync_lecture_to_notion.py <markdown_file_path> [notion_page_id] [output_json_path]")
        sys.exit(1)

    md_path = sys.argv[1]
    page_id = sys.argv[2] if len(sys.argv) > 2 else "3eebdf47-1aca-801f-957e-ce032296e560"
    out_json = sys.argv[3] if len(sys.argv) > 3 else None

    if not os.path.exists(md_path):
        print(f"Error: File not found: {md_path}")
        sys.exit(1)

    with open(md_path, 'r', encoding='utf-8') as f:
        raw_text = f.read()

    print(f"Formatting {md_path}...")
    formatted_md = format_lecture_markdown(raw_text)
    print(f"Success! Output markdown length: {len(formatted_md)} characters")

    payload = {
        "page_id": page_id,
        "type": "replace_content",
        "replace_content": {
            "allow_deleting_content": True,
            "new_str": formatted_md
        }
    }

    if out_json:
        with open(out_json, 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        print(f"Saved payload to {out_json}")
    else:
        # Default save to scratch
        default_out = f"/tmp/notion_payload_{os.path.basename(md_path)}.json"
        with open(default_out, 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False)
        print(f"Payload ready at: {default_out}")


if __name__ == '__main__':
    main()

