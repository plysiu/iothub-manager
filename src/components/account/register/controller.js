angular.module('iothub-manager')
    .controller('AccountRegisterController', ['$log', '$scope', 'AccountService', function ($log, $scope, AccountService) {
        $log.log('Login');


        $scope.register;

        $scope.registered;
        $scope.register = function () {
            console.log('REGISTER');
            new AccountService($scope.register).$save(
                function(user){
                    console.log(user);
                }
            );
              //  .$promise.then(function (user) {
                //console.log(user);
            //})//;
        }
    }]);
