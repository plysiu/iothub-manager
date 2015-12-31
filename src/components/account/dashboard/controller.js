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
                            $localStorage.Authorization = res.data.token;
                            //console.log(res.data, $localStorage.Authorization);

                            $location.path('/account/dashboard');
                        }, function (err) {
                            console.log('ERR', err);
                        });
                };
            }]);