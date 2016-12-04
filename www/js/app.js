var app = {
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    var db = window.openDatabase("bingo", "1.0", "Bingo DB", 200000);
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS bingo (id integer primary key, appear integer not null)');
      for (var i = 1; i < 76; i++) {
        tx.executeSql("INSERT INTO bingo (id, appear) VALUES (?, ?)", [i, 0]);
      }
    });
  }
};

app.initialize();

$(function() {
  $("#reset").click(function() {
    if (window.confirm('本当にいいんですね？')) {
      var db = window.openDatabase("bingo", "1.0", "Bingo DB", 200000);
      db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS bingo;');
        tx.executeSql('CREATE TABLE IF NOT EXISTS bingo (id integer primary key, appear integer not null)');
        for (var i = 1; i < 76; i++) {
          tx.executeSql("INSERT INTO bingo (id, appear) VALUES (?, ?)", [i, 0]);
        }
      });
      alert("ビンゴデータがリセットされました");
    }
  });

  $("#list").click(function() {
    location.href = "list.html";
  });

  $("#top").click(function() {
    location.href = "index.html";
  });
});
