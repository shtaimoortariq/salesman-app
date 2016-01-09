

var app = angular.module("app", ['ngMaterial', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url:'/login',
        templateUrl:'components/login/login.html',
        controller:'login_controller',
        controllerAs: 'ctrl'

    })

    .state('sign-up', {
        url:'/sign-up',
        templateUrl:'components/sign-up/sign-up.html',
        controller:'sign_up_controller',
        controllerAs: 'ctrl'

    })

    .state('404', {
        url:'/404',
        templateUrl:'components/404/404.html'

    });

    $urlRouterProvider.otherwise('login')

});