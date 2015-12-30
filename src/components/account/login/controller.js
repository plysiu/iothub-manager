angular
    .module('iothub-manager')
    .controller('AccountLoginController', ['$log', '$scope', '$localStorage', 'AuthenticationService',
        function ($log, $scope, $localStorage, AuthenticationService) {
            $scope.login;

            $scope.login = function () {
                AuthenticationService.token($scope.login)
                    .success(function (res) {
                        $localStorage.Authorization = res.token;
                        console.log('Authorization ', $localStorage.Authorization);
                    }).error(function (err) {
                    console.log('ERR', err);
                });
            };
        }]);