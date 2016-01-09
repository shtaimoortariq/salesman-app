/**
 * Created by Taimoor tariq on 12/22/2015.
 */

angular.module('app')

    .controller('sign_up_controller',function($http, $scope) {

        this.signUp = function () {
            console.log($scope.user.pass);
            console.log($scope.user);


            $http.post("/signup", $scope.user).then(
                function (data) {
                    console.log(data);
                }
                
                
            ), function (error) {
                console.log("Error :",error);
            };
        };

    });