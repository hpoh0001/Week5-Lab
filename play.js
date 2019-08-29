var express= require("express");
var bodyParser= require("body-parser");

//instantiate express instance; 
let app = express();

// Express should be able to render ejs templates
app.engine("html",require("ejs").renderFile);
app.set("view engine","html");


app.listen(8080);

//use other files, have to be in the same folder
app.use(express.static("images"));
//app.use(express.static("views"));
app.use(express.static("css"));

//allow Express to understand the urlencoded format
app.use(bodyParser.urlencoded({
    extended:false
}))

var db=[];

db.push({
    taskName:'task one',
    taskDue: '21/8/2019',
    taskDesc:"HW"
});

// viewPath is required for the response.sendFile function
//__dirname is the  directory name of the current module (i.e file/project).
let showView = __dirname+"/views/"

//home page
app.get("/",function(req,res){
    res.sendFile(showView + "index.html");
});

//add new task page
app.get("/newTasks",function(req,res){
    res.sendFile(showView + "newTasks.html");
});

app.post("/addTasks",function(req,res){
    console.log(req.body);
    db.push(req.body);
    //res.sendFile(showView + "index.html");
    res.render(showView + "listTask.html",{data:db});
});

//list all tasks page
app.get("/listTask",function(req,res){
    res.render(showView + "listTask.html",{data:db});
});

