/**
 * Created by Frice on 2016/12/17.
 */
angular.module('homeRoute', ['ngRoute']).config(function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/homeContent.html',
            controller: 'HomeController'
        }).
        when('/sale', {
            templateUrl: 'views/saleContent.html',
            controller: 'SaleController'
        }).
        otherwise({
            redirectTo: '/'
        });

    });