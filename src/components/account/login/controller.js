angular
    .module('iothub-manager')
    .controller('AccountLoginController',
        ['$scope', '$localStorage', 'AuthenticationService', '$location',
            function ($scope, $localStorage, AuthenticationService, $location) {

                if (AuthenticationService.hasAuthorization()) {
                    $location.path('/account/dashboard');
                }
                $scope.loginData = {
                    email: null,
                    password: null
                };
                $scope.login = function () {
                    AuthenticationService.token($scope.loginData).then(
                        function (res) {
                            AuthenticationService.setToken(res.data.token);
                            $location.path('/account/dashboard');
                        }, function (err) {
                            console.log('ERR', err);
                        });
                };
            }]);