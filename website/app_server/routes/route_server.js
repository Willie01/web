var express = require('express');
var router = express.Router();
var multer = require('multer');
global.dbHandel = require('../../database/dbHandel.js');
var Product= global.dbHandel.getModel('product');
router.getImages = function(callback, limit) {

    Product.find(callback).limit(limit);
}


router.getImageById = function(id, callback) {

    Product.findById(id, callback);

}

router.addImage = function(image, callback) {
    Product.create(image, callback);
}

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
router.get('/post_product', function(req, res, next) {})
.post('/post_product', upload.any(), function(req, res, next) {
    res.send(req.files);

    /*req.files has the information regarding the file you are uploading...
     from the total information, i am just using the path and the imageName to store in the mongo collection(table)
     */
    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    var imagepath = {};
    imagepath['path'] = path.replace("public\\","");
    imagepath['originalname'] = imageName;

    //imagepath contains two objects, path and the imageName

    //we are passing two objects in the addImage method.. which is defined above..
    router.addImage(imagepath, function(err) {

    });

});

router.get('/getproductinfo', function(req, res, next) {
     console.log("productinfo");
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
