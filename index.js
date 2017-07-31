const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const validator = require('express-validator');
const session = require('express-session');
const app = express();

app.engine('handlebars', expressHandlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'stoney boy',
    resave: false,
    saveUninitialized: true
  })
);
//
app.use(morgan('dev'));

app.use((req, res, next) => {
  //if we don't already have a request session of bookList
  if(!req.session.todoList) {
    req.session.todoList = [];
    req.session.completed = [];
  }

  console.log(req.session);
  next();
});


app.get("/", function (req, res) {
      res.render('home', {
        myTodos: req.session.todoList,
        completedItems: req.session.completed,
        // errors: []
    });
  });

app.post("/addTodo", function (req, res) {
//y

    let item = req.body.item;

    req.session.todoList.push(item)
    console.log(req.session.todoList);
    res.redirect('/')
});



app.get('/delete/:item', function(req, res){
  req.session.completed.push(req.session.todoList[req.params.item])
  req.session.todoList.splice(req.params.item, 1);
  
  res.redirect('/');
});


app.listen(3000, function(){
  console.log("TODO: get shit done....")


})

//problem...my a tag is not correctly telling my item
//to be pushed into the todoList array. The myTodos key that
//holds the array held in req.session.todoList is being called/
//utilized in the home.handlebars unordered list.  this is where
//added items should go via the .post

//i'm trying to have all this information appear on the home page
//so thereby i don't feel like i am required to use the todoList.handlebars
//**question-will i need to use the second handlebars file to make this work

//i'm using handlbars so i can access an items index in order to delete it.
//i want the selected/deleted item to be pushed into an array in a variable
//completed.  i have this set up in html but need to configure it in my JS

//i also want to validate the input field to require that it can't be empty.
