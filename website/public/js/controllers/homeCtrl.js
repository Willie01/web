/**
 * Created by Frice on 2016/12/17.
 */
"use strict";
angular.module('homeCtrl', [])
    .controller('HomeController', function($scope) {
        $scope.products = [
            {
                path : "uploadImages\\pc.jpg",
                originalname : "IMG_2188.JPG",
                __v : 0,
                ptype : "men",
                pname : "New Clothes",
                initprice : 100,
                currentprice : 70,
                pid : "men_1"}
            , {
                path : "uploadImages\\pc.jpg",
                originalname : "IMG_2188.JPG",
                __v : 0,
                ptype : "men",
                pname : "New Clothes",
                initprice : 100,
                currentprice : 70,
                pid : "men_1"}
            , {
                path : "uploadImages\\pc.jpg",
                originalname : "IMG_2188.JPG",
                __v : 0,
                ptype : "men",
                pname : "New Clothes",
                initprice : 100,
                currentprice : 70,
                pid : "men_1"}
            , {
                path : "uploadImages\\pc.jpg",
                originalname : "IMG_2188.JPG",
                __v : 0,
                ptype : "men",
                pname : "New Clothes",
                initprice : 100,
                currentprice : 70,
                pid : "men_1"}
        ];
})
    .controller('SaleController',function ($scope) {

    });