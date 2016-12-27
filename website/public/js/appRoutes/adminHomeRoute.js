/**
 * Created by Frice on 2016/12/25.
 */
/**
 * Created by Frice on 2016/12/17.
 */
angular.module('adminHomeRoute', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'adminHomeContent.html',
        controller: 'AdminHomeController'
    }).
    when('/menAdmin', {
        templateUrl: 'adminMenContent.html',
        controller: 'AdminMenController'
    }).
    when('/womenAdmin', {
        templateUrl: 'adminWomenContent.html',
        controller: 'AdminWomenController'
    }).
    when('/saleAdmin', {
        templateUrl: 'adminSaleContent.html',
        controller: 'AdminSaleController'
    }).
    when('/productinfo', {
        templateUrl: 'adminProductContent.html',
        controller: 'AdminProductController'
    }).

    otherwise({
        redirectTo: '/'
    });

});