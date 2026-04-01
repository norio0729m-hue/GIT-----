"""
つけ蕎麦トレンド記事 → SNS投稿文ジェネレーター

入力: トレンド記事テキスト
出力:
  パターンA: シンプルな Instagram 投稿文
  パターンB: 詳しい説明付き投稿
  パターンC: ハッシュタグ・最適化版
"""

import anthropic


ARTICLE = """
【2026年春・つけ蕎麦トレンド最前線】

今年のつけ蕎麦シーンは「出汁の多様化」がキーワード。
従来の鰹・昆布ベースに加え、鴨出汁・貝出汁・トマト出汁など
個性的なつけ汁が続々と登場している。

また、蕎麦の産地へのこだわりも高まっており、
北海道・幌加内産や長野・戸隠産など銘柄蕎麦を前面に押し出した
専門店が人気を集めている。

さらに「冷たい蕎麦 × 温かいつけ汁」という定番スタイルに加え、
「温蕎麦 × 冷たいつけ汁」という逆転スタイルも注目されており、
季節を問わず楽しめる新しい食べ方として広がっている。
"""

SYSTEM_PROMPT = """あなたはSNSマーケティングの専門家です。
飲食店・グルメ系のInstagram投稿文を得意とし、
読者の食欲と好奇心を刺激するコピーライティングができます。"""

def generate_posts(article: str) -> dict[str, str]:
    client = anthropic.Anthropic()

    prompts = {
        "A": f"""以下のつけ蕎麦トレンド記事をもとに、
「シンプルな Instagram 投稿文」を1つ作成してください。

条件:
- 3〜5文程度のコンパクトな文章
- 読者がすぐに食べに行きたくなるような言葉選び
- 絵文字を2〜3個使用
- ハッシュタグは不要

記事:
{article}""",

        "B": f"""以下のつけ蕎麦トレンド記事をもとに、
「詳しい説明付きの Instagram 投稿文」を1つ作成してください。

条件:
- 150〜200文字程度
- トレンドの背景や特徴を丁寧に説明
- 読者が「知らなかった！」と感じる情報を含める
- 絵文字を4〜6個使用
- ハッシュタグは不要

記事:
{article}""",

        "C": f"""以下のつけ蕎麦トレンド記事をもとに、
「ハッシュタグ最適化版の Instagram 投稿文」を1つ作成してください。

条件:
- 本文は2〜3文のシンプルな内容
- 最後に関連ハッシュタグを10〜15個追加（日本語・英語混在）
- リーチを最大化するハッシュタグ選定（ビッグワード＋ニッチワード）
- 絵文字を3〜5個使用

記事:
{article}""",
    }

    results = {}
    for pattern, prompt in prompts.items():
        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        results[pattern] = message.content[0].text

    return results


def main():
    print("=" * 60)
    print("つけ蕎麦トレンド記事 → SNS投稿文ジェネレーター")
    print("=" * 60)
    print("\n【入力記事】")
    print(ARTICLE)
    print("=" * 60)

    posts = generate_posts(ARTICLE)

    labels = {
        "A": "パターンA：シンプルな Instagram 投稿文",
        "B": "パターンB：詳しい説明付き投稿",
        "C": "パターンC：ハッシュタグ・最適化版",
    }

    for pattern, label in labels.items():
        print(f"\n【{label}】")
        print("-" * 40)
        print(posts[pattern])
        print()

    print("=" * 60)


if __name__ == "__main__":
    main()
