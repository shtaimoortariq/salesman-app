/**
 * Created by Taimoor tariq on 12/22/2015.
 */

angular.module('app')

    .controller('login_controller', function ($scope, $http, $state) {

        var vm = this;

        vm.disableBtn = true;
        vm.loader = true;


        vm.login = function () {

            console.log($scope.user.pass);
            console.log($scope.user.email);

            $http.post('/login', $scope.user).then(
                function (data) {

                    if (data.data === "") {
                        alert("SIGN-UP THEN LOGIN");
                        $state.go('sign-up');


                    }
                    else
                        alert("WELCOME TO DASHBOARD");

                }
            ), function (error) {
                console.log("Error :", error);
            };


        }


    });