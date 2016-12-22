var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
 // var multer = require('multer');
var mongoose = require('mongoose');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var imagetest = require('./app_server/routes/imagefile');

var app = express();

// app.use('/', routes);
app.use('/', imagetest);  // 即为为路径 / 设置路由
global.dbHandel = require('./database/dbHandel');
mongoose.connect('mongodb://localhost/accounts');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose opened!');
});
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
//calling the function from index.js class using routes object..
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

//calling the function from index.js class using routes object..
    imagetest.getImageById(req.params.id, function(err, genres) {
        if (err) {
            throw err;
        }
//res.download(genres.path);
        res.send(genres.path)
    });
});
//////////   !Test   //////////
module.exports = app;

