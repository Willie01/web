/**
 * Created by Frice on 2016/12/17.
 */
"use strict";
var myApp = angular.module('homeCtrl',['ngResource','ngRoute']); // Taking Angular Application in Javascript Variable
myApp.controller('HomeController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in HomeController");
        var Products = $resource('/getproducts');
        Products.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
myApp.controller('MenController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in MenController");
        var ProductsMen = $resource('/getproducts_men');
        ProductsMen.query(function(data){
            $scope.productsMen = data;
        });
    }]);
myApp.controller('WomenController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in WomenController");
        var ProductsWomen = $resource('/getproducts_women');
        ProductsWomen.query(function(data){
            $scope.productsWomen = data;
        });
    }]);
myApp.controller('SaleController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in SaleController");
        var Products = $resource('/getproducts_sale');
        Products.query(function(data){
            $scope.productsSale = data;
        });
    }]);
myApp.controller('DetailsController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in DetailsController");
        var Prodductinfo = $resource('/getproductinfo');
        Prodductinfo.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
myApp.controller('CartController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in CartController");
        var Prodductinfo = $resource('/getproductinfo');
        Prodductinfo.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
myApp.controller('WishlistController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in WishlistController");
        var Prodductinfo = $resource('/getproductinfo');
        Prodductinfo.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
myApp.controller('ContactController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in ContactController");

    }]);
myApp.directive('toolbarTip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log(element);
            $(element).attr("href",attrs.href);
            $(element).Chocolat();
        }
    };
});
// myApp.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.defaults.useXDomain = true;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
// }
// ]);
// myApp.controller('HomeController', function($scope, $http, $templateCache) {
//     var url = 'http://localhost:3000/getproducts';
//     console.log("in controller");
//     $http.get(url).success(function (data) {
//         console.log("get data");
//         $scope.products=data;
//     })
// });
//
// myApp.controller('HomeController', function($scope) {
//         $scope.products = [
//             {
//                 path : "uploadImages\\pc.jpg",
//                 originalname : "IMG_2188.JPG",
//                 __v : 0,
//                 ptype : "men",
//                 pname : "New Clothes",
//                 initprice : 100,
//                 currentprice : 70,
//                 pid : "men_1"}
//             , {
//                 path : "uploadImages\\pc.jpg",
//                 originalname : "IMG_2188.JPG",
//                 __v : 0,
//                 ptype : "men",
//                 pname : "New Clothes",
//                 initprice : 100,
//                 currentprice : 70,
//                 pid : "men_1"}
//             , {
//                 path : "uploadImages\\pc.jpg",
//                 originalname : "IMG_2188.JPG",
//                 __v : 0,
//                 ptype : "men",
//                 pname : "New Clothes",
//                 initprice : 100,
//                 currentprice : 70,
//                 pid : "men_1"}
//             , {
//                 path : "uploadImages\\pc.jpg",
//                 originalname : "IMG_2188.JPG",
//                 __v : 0,
//                 ptype : "men",
//                 pname : "New Clothes",
//                 initprice : 100,
//                 currentprice : 70,
//                 pid : "men_1"}
//         ];
// })
//     .controller('SaleController',function ($scope) {
//
//     });