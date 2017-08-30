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

    var questionCounter = 0;
    var questions = [];


    var animations = ["flyup", "flydown", "flyout", "shake", "spin"];

    readTextFile('questions.txt');
    // readTextFile('../exampleFile.txt');
    shuffleArray(questions);
    console.log(questions);
    $scope.getRandomWord = function (questionPosition){
        var q = questions[questionCounter];
        console.log(q);
        questionCounter++;
        if(questionCounter === questions.length){
            console.log("Shuffle");
            shuffleArray(questions);
            questionCounter = 0;
        }
        if(questionPosition === 'top'){
            $scope.realQuestion = q;
        } else {
            $scope.trickQuestion = q;
        }
    }

    $scope.eraseText = function (position){
        if(position === 'top'){
            $scope.realQuestion = 'Jag har aldrig ';
        } else {
            $scope.trickQuestion = 'Jag har aldrig ';
        }
    }

    $scope.switchQuestions = function(){
        var temp = $scope.realQuestion;
        $scope.realQuestion = $scope.trickQuestion;
        $scope.trickQuestion = temp;
    }

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    $scope.animate = function(event,animationTime, className){
        var elem = $(event.target).children('i');
        if(elem.length === 0) { elem = $(event.target); }
        elem.addClass("icon-animate-" + className);

        sleep(animationTime).then(function(){
            elem.removeClass("icon-animate-" + className);
        });
        // var fullName = '.icon-animate-' + className;
        // var elem = $('.icon-animate-' + className);
        // console.log(elem);
        // elem.addClass('.icon-animate-' + className);
        // console.log(elem);
        // elem.removeClass(fullName);
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
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

    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    var splitted = allText.split(';');
                    for(var i = 0; i < splitted.length; i++){
                        if(splitted[i].length > 0) {
                            questions.push(splitted[i].trim());
                        }
                    }
                }
            }
        }
        rawFile.send(null);
    }

});

myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
