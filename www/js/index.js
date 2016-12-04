$(function() {
  $("#slot").click(function() {
    var db = window.openDatabase("bingo", "1.0", "Bingo DB", 200000);
    var number = 0;
    var appearedNumbers = [];
    db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM bingo WHERE appear = ?;", [1], function(tx, res) {
        if (res.rows.length != 75) {
          for (var i = 0; i < res.rows.length; i++) {
            appearedNumbers.splice(0, 0, res.rows.item(i).id);
          }
          while (true) {
            number = Math.floor(Math.random() * 75 + 1);
            if (appearedNumbers.indexOf(number) == -1) {
              break;
            }
          }
          $("#number").text(number);
          db.transaction(function(tx) {
            tx.executeSql("UPDATE bingo SET appear = ? WHERE id = ?", [1, number]);
          });
        } else {
          alert("数字が全てそろいました");
        }
      });
    });
  });
});
