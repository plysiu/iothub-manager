angular.module('iothub-manager')
    .controller('AccountRegisterController', ['$log', '$location', '$scope', 'AccountService',
        function ($log, $location, $scope, AccountService) {
            $scope.register = function () {
                new AccountService($scope.register).$save(
                    function (user) {
                        $location.path('account/login');
                    }, function (err) {
                        $log.log('Add email validation, etc');
                    });
            }
        }]);
