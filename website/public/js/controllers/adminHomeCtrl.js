/**
 * Created by Frice on 2016/12/25.
 */
"use strict";
var adminApp = angular.module('adminHomeCtrl',['ngResource','ngRoute']); // Taking Angular Application in Javascript Variable
adminApp.controller('AdminHomeController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in adminHomeController");
        var Products = $resource('/getproducts');
        Products.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
adminApp.controller('AdminMenController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in AdminMenController");
        var Products = $resource('/getproducts_men');
        Products.query(function(data){
            $scope.productsMen = data;
        });
    }]);
adminApp.controller('AdminWomenController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in AdminWomenController");
        var Products = $resource('/getproducts_women');
        Products.query(function(data){
            $scope.productsWomen = data;
        });
    }]);
adminApp.controller('AdminSaleController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in SaleController");

    }]);
adminApp.controller('AdminDetailsController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in DetailsController");
        var Prodductinfo = $resource('/getproductinfo');
        Prodductinfo.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);

adminApp.directive('toolbarTip', function() {
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