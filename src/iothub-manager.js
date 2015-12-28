angular
    .module('iothub-manager', [
        'ngRoute',
        'ngMaterial',
        'controllers'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        // $locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('#');
        $routeProvider
            .when('/account/login', {
                templateUrl: 'components/account/login/view.html',
                controller: 'AccountLoginController'
            })
            .when('/account/logout', {
                templateUrl: 'components/account/logout/view.html',
                controller: 'AccountLogoutController'
            })
            .when('/homepage', {
                templateUrl: 'components/homepage/view.html',
                controller: 'HomepageController'
            })
            .otherwise({
                redirectTo: '/homepage'
            });
    }])
    .run(['$location', function ($location) {
        console.log($location.path());

    }]);