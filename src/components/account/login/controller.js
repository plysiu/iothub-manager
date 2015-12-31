angular
    .module('iothub-manager')
    .controller('AccountLoginController', ['$scope', '$localStorage', 'AuthenticationService','$location', function ($scope, $localStorage,  AuthenticationService, $location) {
            $scope.login;
            $scope.login = function () {
                AuthenticationService.token($scope.login)
                    .success(function (res) {
                        $localStorage.Authorization = res.token;
                        $location.path('/homepage');
                    }).error(function (err) {
                    console.log('ERR', err);
                });
            };
        }]);