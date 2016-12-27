/**
 * Created by Frice on 2016/12/17.
 */
angular.module('homeRoute', ['ngRoute']).config(function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'homeContent.html',
            controller: 'HomeController'
        }).
        when('/index', {
            templateUrl: 'homeContent.html',
            controller: 'HomeController'
        }).
        when('/productinfo', {
            templateUrl: 'details.html',
            controller: 'DetailsController'
        }).
        when('/men', {
            templateUrl: 'menContent.html',
            controller: 'MenController'
        }).
        when('/women', {
            templateUrl: 'womenContent.html',
            controller: 'WomenController'
        }).
        when('/sale', {
            templateUrl: 'saleContent.html',
            controller: 'SaleController'
        }).
        when('/wishlist', {
            templateUrl: 'wishlistContent.html',
            controller: 'WishlistController'
        }).
        when('/cart', {
            templateUrl: 'cartContent.html',
            controller: 'CartController'
        }).
        otherwise({
            redirectTo: '/'
        });

    });