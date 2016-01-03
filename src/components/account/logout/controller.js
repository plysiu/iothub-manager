angular
    .module('iothub-manager')
    .controller('AccountLogoutController',
        ['AuthenticationService', '$location',
            function (AuthenticationService, $location) {
                AuthenticationService.logout();
                $location.path('/account/login');
            }]);