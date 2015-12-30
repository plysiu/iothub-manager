angular
    .module('iothub-manager', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'angular-jwt',
        'ngMaterial'])
    .constant('iothub', {
        host: 'http://localhost:9000',
    })
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            // $locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('#');
            $routeProvider
                .when('/account/register', {
                    templateUrl: 'components/account/register/view.html',
                    controller: 'AccountRegisterController'
                })
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
                    redirectTo: '/account/login'
                });
        }])
    .config(function ($httpProvider, jwtInterceptorProvider) {
        // Please note we're annotating the function so that the $injector works when the file is minified
        jwtInterceptorProvider.tokenGetter = ['$localStorage', function ($localStorage) {
            return $localStorage.Authorization;
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(['$location', function ($location) {
        console.log($location.path());
    }])
    .factory('AuthenticationService', ['$http', 'iothub', function ($http, iothub) {
        return {
            token: function (user) {
                return $http.post(iothub.host + '/authentication', {data: user});
            }
        };
    }])
    .factory('AccountService', ['$resource', 'iothub', function ($resource, iothub) {
        return $resource(iothub.host + '/accounts/:accountId', {accountId: '@_id'});
    }])
    .controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
    }]);
