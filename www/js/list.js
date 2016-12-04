$("#list").prop("disabled", true);

var db = window.openDatabase("bingo", "1.0", "Bingo DB", 200000);
db.transaction(function(tx) {
  tx.executeSql("SELECT * FROM bingo WHERE appear = ?;", [1], function(tx, res) {
    for (var i = 0; i < res.rows.length; i++) {
      $("#n" + res.rows.item(i).id).addClass("appeared");
      console.log(res.rows.item(i).id)
    }
  });
});
