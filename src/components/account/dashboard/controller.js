angular
    .module('iothub-manager')
    .controller('AccountDashboardController',
        ['$scope', '$localStorage', 'AuthenticationService', '$location',
            function ($scope, $localStorage, AuthenticationService, $location) {

                if (!AuthenticationService.hasAuthorization()) {
                    $location.path('/account/login');
                }
                console.log(AuthenticationService.getUser());
            }]);