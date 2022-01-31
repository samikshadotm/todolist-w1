//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();



let items = ["Drink Water", "Do Exercise", "Learn Something New"];
let workItems = [];
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

let day = date();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
      res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");
  }

});
app.get("/Work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about",function(req, res){
  res.render("about");
});
app.listen(3000, function() {
  console.log("server started on port 3000");
});
