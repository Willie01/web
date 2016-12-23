/**
 * Created by Frice on 2016/12/17.
 */
"use strict";
var myApp = angular.module('homeCtrl',['ngResource','ngRoute']); // Taking Angular Application in Javascript Variable
myApp.controller('HomeController', ['$scope', '$resource',
    function($scope, $resource){
        console.log("in controller");
        var Products = $resource('/getproducts');
        Products.query(function(data){
            console.log("data："+data);
            $scope.products = data;
        });
    }]);
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