angular
    .module('iothub-manager', [
        'ngRoute',
        'ngResource',
        'ngStorage',
        'angular-jwt',
        'ngMessages',
        'ngMaterial'])
    .constant('iothub', {
        host: 'http://localhost:9000',
        login:'account/login'
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
        jwtInterceptorProvider.tokenGetter = ['$localStorage', function($localStorage) {
            return $localStorage.Authorization;
        }];
        $httpProvider.interceptors.push('jwtInterceptor');
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    })
    .run(['$location', function ($location) {
        console.log($location.path());
    }])
    .factory('AuthenticationInterceptor', ['$q', '$localStorage', 'jwtHelper', 'iothub', function($q, $localStorage, jwtHelper, iothub) {
         return {
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path(iothub.login);
                    delete $localStorage.Authorization;
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        }
    }])
    .factory('AuthenticationService', ['$http', 'iothub', 'jwtHelper', function ($http, iothub, jwtHelper) {
        return {
            token: function (loginData) {
                return $http.post(iothub.host + '/authentication', {data: loginData});
            },
             isAuthenticated: function() {
                 return jwtHelper.isTokenExpired($localStorage.Authorization);
            },
             getUser: function() {
                 return jwtHelper.decodeToken($localStorage.Authorization);
             },
             logout:function() {
             delete $localStorage.Authorization;
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
