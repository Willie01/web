var express = require('express');
var router = express.Router();
var multer = require('multer');
global.dbHandel = require('../../database/dbHandel.js');
var Product= global.dbHandel.getModel('product');

// router.get('/index', function(req, res, next) {
//     // console.log("sss:"+req.session.uname);
//     res.render('../index',{user:"frice"});
// });
router.route("/").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("../index",{user:'Login here!'});
});
router.route("/index").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("../index",{user:'frice'});
});
router.get('/indexAdmin', function(req, res, next) {
    console.log("enter indexAdmin");
    res.render('../indexAdmin',{user:"admin"});
});
router.get('/getproducts', function(req, res) {

    console.log("get products");
        Product.find({},function(err,men){
        if(err) throw err;
        res.json(men);
    });
});
router.get('/getproducts_men', function(req, res) {

    console.log("get menproducts");
    Product.find({"ptype":"men"},function(err,mproduct){
        if(err) throw err;
        res.json(mproduct);
    });
});
router.get('/getproducts_women', function(req, res) {

    console.log("get womenproducts");
    Product.find({"ptype":"women"},function(err,wproduct){
        if(err) throw err;
        res.json(wproduct);
    });
});
router.get('/getproducts_sale', function(req, res) {

    console.log("get products");
    Product.find({"ptype":"sale"},function(err,mProjects){
        if(err) throw err;
        res.json(mProjects);
    });
});
router.get('/getproductinfo', function(req, res, next) {
     console.log("productinfo");
    });

 router.get('/contact', function(req, res, next) {
        console.log("contact");
    });

    // Product.find('', function(err, products) { // Query in MongoDB via Mongo JS Module
    //     console.log("get in");
    //     if( err || !products) console.log("No users found");
    //     else
    //     {
    //         res.writeHead(200, {'Content-Type': 'application/json'}); // Sending data via json
    //         str='[';
    //         products.forEach( function(product) {
    //             str = str + '{ "path" : "' + product.path + '",'
    //                 +'"ptype":"' + product.ptype + '",'
    //                 +'"pname":"' + product.pname + '",'
    //                 +'"initprice":"' + product.initprice + '",'
    //                 +'"currentprice":"' + product.currentprice+'"'+
    //                 '},' +'\n';
    //         });
    //         str = str.trim();
    //         str = str.substring(0,str.length-1);
    //         str = str + ']';
    //         res.end(str);
    //         // Prepared the jSon Array here
    //     }
    // });


/* GET register page. */
router.route("/register").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("register",{title:'User register'});
}).post(function(req,res){
    //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
});
/* GET home page. */
router.get("/loginHome",function(req,res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("loginHome",{title:'Home'});         //已登录则渲染home页面
});
/* GET index page. */
router.get("/index",function(req,res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("index",{title:'Home'});         //已登录则渲染home页面
});
/* GET logout page. */
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});
module.exports = router;
