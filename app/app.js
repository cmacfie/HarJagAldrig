'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]);

myApp.controller('myAppController', function ($scope) {
    $scope.modes = [true, false, false];
    $scope.realQuestion = "Jag har aldrig ";
    $scope.trickQuestion = "Jag har aldrig ";
    $scope.topQuestion = "";
    $scope.bottomQuestion = "";

    $scope.goToMode = function (number) {
        console.log($scope);
        $scope.modes[0] = false;
        $scope.modes[1] = false;
        $scope.modes[2] = false;
        $scope.modes[number] = true;
        if(number === 2){
            randomizeQuestions();
        }
    }

    $scope.clearText = function() {
        $scope.realQuestion = "Jag har aldrig ";
        $scope.trickQuestion = "Jag har aldrig ";
    }

    function randomizeQuestions(){
        if(Math.random() > 0.5){
            $scope.topQuestion = $scope.realQuestion;
            $scope.bottomQuestion = $scope.trickQuestion;
        } else {
            $scope.topQuestion = $scope.trickQuestion;
            $scope.bottomQuestion = $scope.realQuestion;
        }

    }

});

myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
