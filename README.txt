ぼっちな彼女 ADV v1.02 — ボイス・花子さん実装版

【今回の更新】
・FILE 01「消える弁当」の最終推理を復元
  - 情報カード10枚
  - 必要カード4枚を事前提示
  - 4枚ぴったりの一発判定
  - 正解：登校直後の確認／母親の証言／朝の台所の空白／悠真の好物
  - 正解時：小宮山悠真のつまみ食い判明 → CLOSED
  - 不正解時：未解決

・FILE 02「100点になる課題」を本実装
  - 依頼人：藤崎里奈（高校1年生）
  - 黒川美琴／三浦拓海への順不同聞き込み
  - 九条が担任から鍵を借りて回収箱を確認
  - 回収箱は長期倉庫保管後、最近再使用
  - 放課後に提出するのは藤崎里奈だけ
  - 真相：後端に消しゴムの付いた古い鉛筆の付喪神
  - 夜間、回収箱内の里奈の誤答を消し正答へ修正
  - 再現実験後、情報カード9枚から4枚を一発選択
  - 正解：放課後に提出する藤崎里奈／施錠された回収箱／一晩置いた再現答案／箱の底の消しゴム付き古鉛筆
  - 正解後に鉛筆を別箱へ移す確認実験 → CLOSED
  - 不正解時：未解決

・FILE 02用の既存立ち絵を追加
  - 藤崎里奈：通常／不安
  - 黒川美琴：通常／困惑
  - 三浦拓海：通常／困惑／不安／焦り
・画像生成・画像修正は今回行っていない。既存素材のみ使用。

【維持】
・v0.20の会話中立ち位置固定
・話者交代による立ち絵の移動／拡大なし
・話者名プレート固定
・SAVE / LOAD / LOG / AUTO / EVIDENCE
・FILE 01の教室調査3項目と容疑者2名の順不同調査


v0.28 修正
・全キャラクター立ち絵をv0.27比で20%縮小
・話者/表情切替時の立ち絵フェード消失を除去し、表情画像を事前読込
・会話ウィンドウ下部の金色の丸装飾を削除

[PATCH v0.53]
- FILE02 ending explanation to Rina changed to official cover story (other student prank, identity withheld, recurrence prevented).
- official_rina_normal / official_rina_anxious replaced with anime-style assets matching the rest of the cast.
- Takumi first-year uniform (maroon tie) rechecked.

[PATCH v0.54]
- Rina strong-anxiety sprite updated.
- Takumi: all four expressions normalized to first-year school uniform palette and piping removed.
- FILE03 resolution epilogue expanded.


v0.55
- FILE 03「戻ってくる本」の解決後〜CLOSEDを拡充。
- 橘悠斗が勝手に戻した後の処理を明確化し、図書室の規定確認後に本を正式譲渡する結末へ変更。
- こはると直人の締め会話を追加。

[v0.56]
- 3件すべてCLOSED時のみ初回専用エンディングへ進む。
- エンディング再生後はタイトルへ戻る。
- 一度見た後の再プレイでは通常どおり相談一覧へ戻る。


v0.57: 3件CLOSED後の相談一覧にALL CASES CLOSEDと各FILEのBEST評価一覧を表示。再調査可能であることも明示。

v0.59
- SAVE/LOAD画面を追加。
- 手動セーブとオートセーブを別枠で表示。
- 各枠にFILE名・現在の場面・保存日時を表示。
- 旧セーブ形式もそのままロード可能。


v0.60: LOG readability update — numbered speaker/text history, log count, auto-scroll to newest entry, and 「最新へ」 button.
v0.63: 白石直人の新規VOICE 007〜050を実装。FILE01〜03・聞き込み・失敗ルート・全件クリア後まで、台詞本文と1対1で紐付け。


v0.66: CONFIGにボイスミュートを追加。HUDにVOICE再生ボタンを追加し、現在表示中の台詞ボイスを再生し直せるようにした。既存のボイス音量設定と連動。

v0.67: VOICE再生中はHUDのVOICEボタンを「VOICE ●」表示にし、再生終了・台詞送り・ミュート時に通常表示へ戻るよう改善。

v0.68: 3件すべてCLOSED後、タイトル画面にALL CASES CLOSEDと各FILEのBEST評価を表示。

v0.69: FILE01真相場面に小宮山悠真の通常立ち絵を追加。悠真の台詞時のみ中央表示し、小学5年生として低めに調整。


v0.70: 水城すずの新規音声003～021（19本）を本編・聞き込み・推理・失敗ルート・全クリア後へ実装。
v0.71: 橘悠斗の6表情を追加。FILE03の告白・決意・エンディングで表情切替。

v0.72: FILE03の橘悠斗の真相告白場面を演出強化。驚き→困惑→悲しみ→真剣→微笑みの表情遷移を追加。


v0.75: FILE01解決後、紗季が風見・朝倉へ直接謝罪して誤解を解く後日談を追加。


v0.76: タイトルのALL CASES CLOSED表示処理にあった自己再帰呼び出しを修正。クリア状況表示時の停止リスクを解消。


v0.77: タイトル画面にHOW TO PLAYを追加。会話、調査・聞き込み、EVIDENCE、SAVE/LOAD、AUTO/VOICE、評価の基本操作をゲーム内で確認可能。

v0.79: FILE選択後にFILE番号・タイトル・依頼人を表示する開始カードを追加。


v0.80: RESULT画面でBEST更新時にNEW BEST表示。同じ★数なら誤答が少ない記録をBESTとして保存。

v0.81: LOAD後にFILE名・再開地点・直前の会話を表示するRECAPを追加。


v0.82: 既読台詞のみ高速で進むSKIP機能を追加。未読台詞・選択/調査等の操作箇所では自動停止。クリアデータ初期化で既読情報も初期化。


v0.83: CONFIGにSKIP未読停止ON/OFFとSKIP速度（高速/標準/ゆっくり）を追加。操作が必要な場面では設定に関係なく停止。


v0.84: CONFIGのテキスト速度を実動化。瞬時/速い/普通/遅いの4段階、文字送り中のクリックで全文表示、次クリックで進行。


v0.89: FILE02用に日本アニメ調の教室背景3種（教室全景・正面・教卓付近）を独立背景として追加し、場面ごとに切替。

v0.90: START後に会話ウィンドウが非表示のまま残るケースへ復旧ガードを追加。開始直後・台詞描画・画面クリック時に会話欄を復帰。


v0.94 light: FILE02正解ルートに「付喪神の鉛筆の正体判明」イベントCGを追加。CGクリックで会話へ復帰。

v0.95: FILE03「橘悠斗が母親との思い出を語る場面」に16:9イベントCGを追加。クリックで会話へ復帰。


v0.97: FILE01開始後に1年教室へ移動する場面を追加。以後FILE01は教室背景を維持。悠真を学校内に表示しない構成へ修正。長文台詞のクリッピングを解除。イベントCGを会話ウィンドウを残した額装表示へ変更。

v0.98: 三浦拓海の面談立ち絵を切れない幅広素材へ統一。FILE02回収箱CGを正式採用16:9版へ差し替え。イベントCGのCSS改行不具合を修正し、会話ウィンドウ/HUDを残した額装表示に復旧。


v0.99: ALL CASES CLOSED後のエンディングに16:9イベントCGを追加。CGを閉じると最終メッセージへ戻り、その後タイトルへ復帰。


v1.00:
- v0.99の通しQAで、engine.js内のrouteLabel関数二重定義を修正。
- RESULT画面でFILE番号と事件タイトルが重複表示される可能性を解消。
- FILE番号専用のrouteFileLabelと、SAVE/LOAD・RECAP用のrouteLabelを分離。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv100へ更新。
- JS構文、主要DOM参照、アセット参照171件を再検査し、欠損0件を確認。

v1.01:
- 推理失敗時の最終SYSTEM表示が「未解決 / CLOSED」と矛盾していた問題を修正。
- FILE01〜03すべて、失敗時は「未解決」に統一。
- RESULT画面のCASE UNRESOLVED・進捗「未解決」・RETRY FILEとの表示整合性を統一。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv101へ更新。


v1.02:
- 風見蓮司 01〜05、朝倉夏帆 01〜05、黒川美琴 01〜03、三浦拓海 01〜03、橘悠斗 01〜06、花子さん 01〜03の正式ボイスを追加。
- 藤崎里奈 01〜08を今回採用した新ボイスへ全面差し替え。画面台詞も新音声と一致するよう調整。
- FILE 03「夜の図書室」に花子さん本人との会話シーンを追加。
- 花子さん正式立ち絵と、夜の図書室イベントCGを追加。
- 「花子さんの目撃」証拠は、本人の証言後に取得する流れへ変更。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv102へ更新。

v1.03:
- 小宮山紗季の追加ボイス1本を実装。
- FILE 03で橘悠斗（3年生）に対する白石直人・大山こはるの呼称と口調を後輩として自然な敬語へ修正。
- 白石直人の修正版ボイス3本、大山こはるの修正版ボイス4本を実装。
- 「悠斗くん」「悠斗」等の不自然な呼称を「橘先輩」に統一（対象会話）。

v1.04:
- FILE 01に、小宮山紗季が昼休みに弁当のおかずが一〜二個だけ減っていることに気づくイベントCGを追加。
- FILE 02に、閉じた課題回収箱の内部で古い鉛筆が一枚の答案へ勝手に書き込むイベントCGを追加。
- FILE 03に、夜の図書室で橘先輩が『月の森の物語』を本棚へ戻そうとし、遠くから花子さんが目撃するイベントCGを追加。
- 既存イベントCGは残し、今回の3枚は各事件の導入・真相演出として追加。
- index.html / smoke.htmlのJSキャッシュ番号をv104へ更新。

v1.05:
- ALL CASES CLOSED後のエンディングに、夕方の生徒会室で直人・こはる・九条・すずの4人が一息つく集合CGを追加。
- エンディング順を「4人集合CG → 既存の全件クリア後CG → 最終メッセージ → タイトル復帰」に変更。
- ミニ九条は九条の頭上、すずは人間姿のみの正式採用CGを使用。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv105へ更新。

v1.06:
- タイトル画面→ゲーム画面の切替を約2秒（1秒暗転＋1秒復帰）のフェードへ変更。
- BGMの実再生ゲインを下げ、初期BGM設定も45へ調整。
- FILE 01：翌朝の確認前に約2秒の時間経過フェードを追加。
- FILE 01：小宮山紗季「分からないわけないでしょ。何日も犯人探ししてたんだから。」を削除。
- FILE 02：再現実験の翌朝確認前に約2秒の時間経過フェードを追加。
- FILE 02：藤崎里奈の「古い鉛筆……ですか？」および「そうだったんですね……」の2台詞を削除。
- FILE 03：花子さん初登場前に「トイレの花子さん」の紹介を追加。
- FILE 03：花子さんとの会話背景を夜の図書室へ変更。
- FILE 03：最終推理を正解5枚→3枚へ簡略化し、誤答ダミーカード5枚を追加して混在表示。
- smoke.htmlの古いtitle_main.png参照をtitle_main.webpへ修正。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv106へ更新。


v1.07:
- FILE 02：回収箱を調べて古い鉛筆を発見した直後に、鉛筆発見CGを表示するよう移動。真相説明後の重複表示は削除。
- FILE 02：九条玲の表示台詞を既存の正しい kujo_015.mp3 の音声内容へ戻し、テキストと音声を一致。
- FILE 02：藤崎里奈の追加台詞「分かりました。誰がやったのかは少し気になりますけど……これからは、返ってきた答案も自分でちゃんと確認するようにします。」と正式音声を追加。
- FILE 03：最終推理の正解を「一回目＝職員」「二回目＝橘先輩」「動機＝母との思い出」の3枚へ再構成。
- FILE 03：正解3枚＋誤答6枚のみを表示し、「一回目の理由・二回目に戻した人物・その動機を1枚ずつ選ぶ」と明示して難易度を調整。
- 最終推理ボタンは必要枚数に応じて「この3枚で推理する／この4枚で推理する」と自動表示。
- SE全体ゲインを0.50へ下げ、初期SE設定を60へ変更。
- index.html / smoke.htmlのCSS・JSキャッシュ番号をv107へ更新。


[v1.08]
- Dialogue UI redesigned for a softer Bocchi no Kanojo look: rounded navy/lavender glass panel, pastel pink/mint accents, rounded Japanese typography, and a cute character nameplate.
- FILE 03: added an approximately two-second fade after “その夜――俺とこはるは…” before the night-library event CG.
- FILE 02: Rina's added ending line/audio remains in the scenario; legacy v1.07-or-older saves in the narrow FILE 02 ending window are rewound to that line once so it cannot be skipped by index drift.
- Cache-bust updated to v108.

[v1.09]
- 解決済みFILEの表示を「CLOSED」から「解決済」へ変更。
- 3件解決後のエンディングを再構成。4人集合CGに「END」を3秒表示。
- END後は2秒でフェードアウトし、既存の3人妖怪CGを固定背景にした10秒のエンドロールへ移行。
- エンドロール背景に黒20%オーバーレイを追加。
- クレジット: 企画 / シナリオ / キャラクターデザイン / イラスト / 音声制作 / 使用ツール / 制作。
- BGMはENDからエンドロールまで継続し、エンドロール終盤2秒でフェードアウト。


v1.11: speaker decorations removed; dialogue expanded to full bottom width; event CG returns by click only; FILE status labels localized; FILE02 Rina ending line save compatibility fixed; ending credits replay button added after all three cases are solved.


v1.13: speaker-area ornaments removed from HTML; light-novel-style Japanese font stack applied; FILE02 Rina added line/audio enforced by epilogue guard and save compatibility.

[v1.15]
- Rebuilt the final deduction card pools for FILE 01-03 so correct and incorrect cards are clearly distinguishable by content.
- Removed ambiguous "true but not required" evidence from final deduction choices.
- FILE 01: 10 cards total (4 correct / 6 false), preserving the voiced "10 cards" line.
- FILE 02: 8 cards total (4 correct / 4 false).
- FILE 03: 9 cards total (3 correct / 6 false), grouped conceptually around first return / second return / motive.
- Final deduction cards are shuffled whenever the screen opens; correct answers are no longer positionally clustered.
