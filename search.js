var idx = lunr(function () {
  this.field('title');   // 記事のタイトルを検索対象にする
  this.field('content'); // 記事の内容を検索対象にする
  this.ref('id');        // 記事のID（番号）を参照として使用
});

// 記事のデータ
var pages = [
  { id: 1, title: "山形県", content: "山形県は日本の..." },
  { id: 2, title: "山形市", content: "山形市は..." },
  { id: 3, title: "米沢市", content: "米沢市は..." }
];

// Lunrにページの情報を追加
pages.forEach(function (page) {
  idx.add(page);
});

// 検索処理
document.getElementById('search-box').addEventListener('input', function () {
  var query = this.value;   // 検索ボックスの入力値
  var results = idx.search(query);  // Lunrによる検索
  var resultList = document.getElementById('search-results');
  resultList.innerHTML = '';

  results.forEach(function (result) {
    var item = document.createElement('div');
    item.innerHTML = '<a href="' + pages[result.ref - 1].title.toLowerCase() + '.html">' + pages[result.ref - 1].title + '</a>';
    resultList.appendChild(item);
  });
});
