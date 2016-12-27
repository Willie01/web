var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var mongoose = require('mongoose');
global.dbHandel = require('./database/dbHandel');
var User = global.dbHandel.getModel('user');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploadImages/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
});

var routes = require('./app_server/routes/route_server');
// var users = require('./app_server/routes/users');
var imagetest = require('./app_server/routes/route_imagefile_server');
var app = express();

app.use('/', routes);
app.use('/indexAdmin', routes);
// app.use('/', imagetest);  // 即为为路径 / 设置路由

// mongoose.connect('mongodb://localhost/accounts');
// var db = mongoose.connection;
// db.on('connected', function () {
//     console.log('Mongoose connection open to ');
// });
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('mongoose opened!');
// });
// db.on('disconnected', function () {
//     console.log('Mongoose connection disconnected');
// });
// app.use(multer({
//     dest: 'public/uploadImages/'
// }));
app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
    }}));
app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
    }
}));

app.use(function(req,res,next){
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});
//- - end - -//

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/adminHome",function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("../indexAdmin.html",{title:'User Login'});
});
/* GET login page. */
app.get("/login",function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("../login.html",{title:'User Login'});
}).post("/login",function(req,res){
    console.log("login");
    // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)

    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    var password = req.body.password;
    var data;
    console.log("uname: " + uname);
    console.log("password: " + password);
    User.findOne({uname:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.send(404);                            //    状态码返回404
            console.log("doc:"+doc.uname);
            res.redirect("/login");
        }else{
            if(req.body.password != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                res.send(404);
                console.log("doc:"+doc.password);
                res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                data ={
                    utype:doc.utype
                };
                res.send(200,data);
                console.log("utype:"+ data.utype);
                // res.redirect("index");
            }
        }
    });
});
// app.use('/users', users); // 即为为路径 /users 设置路由
// app.use('/login',routes); // 即为为路径 /login 设置路由
// app.use('/register',routes); // 即为为路径 /register 设置路由
// app.use('/LoginHome',routes); // 即为为路径 /loginHome 设置路由
// app.use("/logout",routes); // 即为为路径 /logout 设置路由

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});





//- - begin - - //new attributes
//URL : http://localhost:3000/images/
// To get all the images/files stored in MongoDB
app.get('/images', function(req, res) {
//calling the function from route_server.js class using routes object..
    imagetest.getImages(function(err, genres) {
        if (err) {
            throw err;

        }
        res.json(genres);

    });
});
//////////   Test   //////////
// URL : http://localhost:3000/images/(give you collectionID)
// To get the single image/File using id from the MongoDB
app.get('/images/:id', function(req, res) {

//calling the function from route_server.js class using routes object..
    imagetest.getImageById(req.params.id, function(err, genres) {
        if (err) {
            throw err;
        }
 //       res.download(genres.path);
        res.send(genres.path)
    });
});

// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//         io.emit('chat message', msg);
//     });
// });
// http.listen(3001, function(){
//     console.log('listening on *:3001');
// });
// app.directive('onFinishRenderFilters', function ($timeout) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attr) {
//             if (scope.$last === true) {
//                 $timeout(function() {
//                     scope.$emit('ngRepeatFinished');
//                 });
//             }
//         }
//     };
// });
//////////   !Test   //////////
module.exports = app;

