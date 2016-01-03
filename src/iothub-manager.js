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
        login: 'account/login'
    })
    .config(['$httpProvider', 'jwtInterceptorProvider', function Config($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.tokenGetter = ['config', '$localStorage', function (config, $localStorage) {
            //if (config.url.indexOf('ocalhost:9112') >= 0) {
            //    return null;
            //}

            return $localStorage.Authorization;
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
        //$httpProvider.interceptors.push('AuthenticationInterceptor');
    }])
    .factory('AuthenticationInterceptor', ['$q', '$localStorage', 'jwtHelper', 'iothub',
        function ($q, $localStorage, jwtHelper, iothub) {
            return {
                responseError: function (response) {
                    if (response.status === 401) {
                        //     $location.path(iothub.login);
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            }
        }])


    .factory('AuthenticationService', ['$http', 'iothub', '$localStorage', 'jwtHelper',
        function ($http, iothub, $localStorage, jwtHelper) {
            return {
                token: function (loginData) {
                    return $http.post(iothub.host + '/authentication', loginData);
                },
                hasAuthorization: function () {
                    if ($localStorage.Authorization) {
                        return jwtHelper.isTokenExpired(this.getToken()) === false;
                    }
                    else {
                        return false;
                    }
                },
                getUser: function () {
                    if (this.hasAuthorization()) {
                        return jwtHelper.decodeToken(this.getToken());
                    }
                    return false;
                },
                setToken: function (token) {
                    $localStorage.Authorization = token;
                },
                getToken: function () {
                    return $localStorage.Authorization;
                },
                logout: function(){
                    delete $localStorage.Authorization;     
                }
            };
        }])
    .factory('AccountService', ['$resource', 'iothub',
        function ($resource, iothub) {
            return $resource(iothub.host + '/accounts/:accountId', {accountId: '@_id'});
        }])

    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
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
                    template: '',
                    controller: 'AccountLogoutController'
                })
                .when('/account/dashboard', {
                    templateUrl: 'components/account/dashboard/view.html',
                    controller: 'AccountDashboardController'
                })
                .when('/homepage', {
                    templateUrl: 'components/homepage/view.html',
                    controller: 'HomepageController'
                })
                .otherwise({
                    redirectTo: '/account/login'
                });
        }])
    .run(['$location',
        function ($location) {
            console.log($location.path());
        }]);