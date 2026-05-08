// ============================================================
// 診断の質問リスト
// choices[].value がユーザープロフィールに格納される
// ============================================================
const QUESTIONS = [
  {
    id: 'stage',
    text: '今のあなたの状況に一番近いのは？',
    choices: [
      { label: '副業・フリーでまだ月収がない',     value: 1 },
      { label: '月1〜5万円程度ある',              value: 2 },
      { label: '月5万円以上、本業と並走中',         value: 3 },
      { label: 'すでに独立・専業に近い',            value: 4 }
    ]
  },
  {
    id: 'problem',
    text: '今一番しんどいと感じていることは？',
    choices: [
      { label: '何から始めていいかわからない',  value: 'start'  },
      { label: 'やってみたが全然稼げない',      value: 'earn'   },
      { label: '稼げてきたが時間が足りない',    value: 'time'   },
      { label: '売上はあるが波が激しい',        value: 'stable' }
    ]
  },
  {
    id: 'action',
    text: '今週、お金を生む行動を何回しましたか？',
    choices: [
      { label: '0回（情報収集がメイン）',         value: 'zero' },
      { label: '1〜3回（少し動いた）',            value: 'low'  },
      { label: '4〜7回（ほぼ毎日何かやった）',    value: 'mid'  },
      { label: '毎日フル稼働している',             value: 'high' }
    ]
  },
  {
    id: 'product',
    text: '自分のサービスや商品はありますか？',
    choices: [
      { label: 'まったくない',             value: 'none'    },
      { label: '考えてはいるが未完成',     value: 'idea'    },
      { label: 'あるが売れていない',       value: 'made'    },
      { label: '売れているが改善したい',   value: 'selling' }
    ]
  },
  {
    id: 'interest',
    text: '今一番関心があるテーマは？',
    choices: [
      { label: 'SNS発信・集客',          value: 'SNS発信'  },
      { label: '商品設計・マネタイズ',   value: 'マネタイズ' },
      { label: 'マインド・継続力',       value: 'マインド'  },
      { label: '組織化・外注・スケール', value: '組織化'    }
    ]
  },
  {
    id: 'contentType',
    text: 'どんな記事が今一番刺さりそう？',
    choices: [
      { label: '「ゼロから始めた体験談」',      value: 'story'  },
      { label: '「具体的な手順・テンプレ」',    value: 'howto'  },
      { label: '「失敗から学んだ教訓」',        value: 'lesson' },
      { label: '「数字で見る戦略・分析」',      value: 'data'   }
    ]
  },
  {
    id: 'followers',
    text: '今のSNSフォロワー数は？',
    choices: [
      { label: '100人未満 or SNSなし', value: 1 },
      { label: '100〜500人',           value: 2 },
      { label: '500〜2000人',          value: 3 },
      { label: '2000人以上',           value: 4 }
    ]
  },
  {
    id: 'readTime',
    text: '今読みたい記事の長さは？',
    choices: [
      { label: '3分以内でサクッと',       value: 'short'  },
      { label: '5〜10分でしっかり',       value: 'medium' },
      { label: '長くても深い内容がいい',  value: 'long'   },
      { label: '長さより内容重視',        value: 'any'    }
    ]
  },
  {
    id: 'infoHabit',
    text: '情報収集について正直なところは？',
    choices: [
      { label: '毎日見るが行動できていない',      value: 'collector' },
      { label: '記事を保存しすぎて見返せない',    value: 'hoarder'   },
      { label: '勉強より実践を優先している',      value: 'doer'      },
      { label: '情報よりも仲間・つながりが必要',  value: 'connector' }
    ]
  },
  {
    id: 'goal',
    text: 'この診断を使いに来た理由に近いのは？',
    choices: [
      { label: '何を読めばいいか迷っている',            value: 'lost'   },
      { label: 'モチベが下がっていて刺激がほしい',      value: 'boost'  },
      { label: '次のステップに進む記事を探している',    value: 'next'   },
      { label: '特定テーマの記事をまとめて読みたい',    value: 'browse' }
    ]
  }
];

// ============================================================
// 状態管理
// ============================================================
let currentQ = 0;
const answers = {};

// ============================================================
// 画面切り替え
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ============================================================
// 診断スタート
// ============================================================
function startQuiz() {
  currentQ = 0;
  Object.keys(answers).forEach(k => delete answers[k]);
  showScreen('screen-quiz');
  renderQuestion();
}

// ============================================================
// 質問を描画する
// ============================================================
function renderQuestion() {
  const q     = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  // プログレスバー（前の質問まで塗る）
  document.getElementById('q-num').textContent = currentQ + 1;
  document.getElementById('progress-fill').style.width =
    `${(currentQ / total) * 100}%`;

  // 質問テキスト
  document.getElementById('question-text').textContent = q.text;

  // 選択肢ボタンを生成
  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.label;

    // 戻ってきたとき選択済みを復元
    if (answers[q.id] === choice.value) btn.classList.add('selected');

    btn.onclick = () => selectChoice(q.id, choice.value, btn);
    choicesEl.appendChild(btn);
  });

  // 戻るボタン（最初の問は非表示）
  document.getElementById('btn-back').style.visibility =
    currentQ === 0 ? 'hidden' : 'visible';

  // 次へボタン
  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = currentQ === total - 1 ? '結果を見る →' : '次へ →';
  nextBtn.disabled = (answers[q.id] === undefined);
}

// ============================================================
// 選択肢をタップ
// ============================================================
function selectChoice(questionId, value, el) {
  answers[questionId] = value;
  document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('btn-next').disabled = false;
}

// ============================================================
// 次へ
// ============================================================
function goNext() {
  if (currentQ < QUESTIONS.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResults();
  }
}

// ============================================================
// 戻る
// ============================================================
function goBack() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}

// ============================================================
// ユーザープロフィールを構築
// ============================================================
function buildUserProfile() {
  return {
    level:         answers.stage       || 1,
    problem:       answers.problem     || 'start',
    actionLevel:   answers.action      || 'zero',
    productStage:  answers.product     || 'none',
    category:      answers.interest    || 'SNS発信',
    preferredType: answers.contentType || 'story',
    snsLevel:      answers.followers   || 1,
    readTime:      answers.readTime    || 'any',
    infoStyle:     answers.infoHabit   || 'collector',
    motivation:    answers.goal        || 'lost'
  };
}

// ============================================================
// スコア計算（記事1件 × プロフィール）
//
// 合計最大: 30 + 25 + 20 + 15 + 5 + 5 = 100点
// ============================================================
function calcScore(article, profile) {
  let score = 0;

  // ① レベルマッチ（最大30点）
  const levelDiff = Math.abs(article.level - profile.level);
  if      (levelDiff === 0) score += 30;
  else if (levelDiff === 1) score += 15;
  // levelDiff >= 2 → 0点

  // ② 今の悩みマッチ（最大25点）
  if (article.target_problems.includes(profile.problem)) score += 25;

  // ③ カテゴリマッチ（最大20点）
  if (article.category === profile.category) score += 20;

  // ④ 記事タイプマッチ（最大15点）
  if (article.content_type === profile.preferredType) score += 15;

  // ⑤ 読了時間マッチ（最大5点）
  if      (profile.readTime === 'short'  && article.read_minutes <= 3)  score += 5;
  else if (profile.readTime === 'medium' && article.read_minutes <= 10) score += 5;
  else if (profile.readTime === 'long'   && article.read_minutes > 10)  score += 5;
  else if (profile.readTime === 'any')                                   score += 3;

  // ⑥ 人気度ボーナス（最大5点）
  score += Math.min(article.bookmarks / 50, 1) * 5;

  return Math.round(score);
}

// ============================================================
// 結果を表示する
// ============================================================
function showResults() {
  const profile = buildUserProfile();

  // 全記事にスコアをつけてソート → 上位5件
  const ranked = ARTICLES_DATA
    .map(a => ({ ...a, score: calcScore(a, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // レベルラベル
  const levelLabels = {
    1: '初心者',
    2: '実践中',
    3: '成長期',
    4: '拡大期'
  };

  // プロフィール説明文
  const profileTexts = {
    start:  'まず最初の一歩を踏み出したい段階です。「何から始めるか」に答えてくれる記事を選びました。',
    earn:   '行動はしているがまだ成果が出ていない段階です。突破口になりそうな記事を選びました。',
    time:   '成果が出てきて時間が不足している段階です。効率化・仕組み化のヒントになる記事を選びました。',
    stable: '収入はあるが安定・スケールを目指している段階です。次のステージの記事を選びました。'
  };

  // バッジとプロフィール文をセット
  document.getElementById('result-badge').textContent =
    `Lv.${profile.level}  ${levelLabels[profile.level] || ''}`;
  document.getElementById('result-profile').textContent =
    profileTexts[profile.problem] || '';

  // 記事カードを生成
  const container = document.getElementById('result-cards');
  container.innerHTML = '';

  ranked.forEach((article, index) => {
    // マッチ度を % 表示（最大100点基準）
    const matchPct = Math.min(Math.round((article.score / 100) * 100), 99);

    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="card-rank">${index + 1}</div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${article.category}</span>
          <span class="card-time">📖 ${article.read_minutes}分</span>
          <span class="card-match">マッチ度 ${matchPct}%</span>
        </div>
        <h3 class="card-title">${article.title}</h3>
        <p class="card-summary">${article.summary}</p>
        <div class="card-footer">
          <span class="card-likes">♡ ${article.likes.toLocaleString()}</span>
          <span class="card-bookmarks">🔖 ${article.bookmarks.toLocaleString()}</span>
          <a href="${article.url}" class="card-link" target="_blank" rel="noopener">読む →</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // プログレスを100%に
  document.getElementById('progress-fill').style.width = '100%';

  showScreen('screen-result');
}

// ============================================================
// もう一度診断する
// ============================================================
function restartQuiz() {
  startQuiz();
}
