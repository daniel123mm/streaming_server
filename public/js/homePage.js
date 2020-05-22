'use strict';
function login(){
    document.getElementById('id01').style.display = 'block';
}

function logout(){
   sessionStorage.clear();
   window.location.href = '/';
}

//get list from server
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http({
        url : "/getVideoList",
        type : "GET",
        dateType : "json",
        async : false,
    }).then(function success(result) {
        console.log(result);
        $scope.videoList = result.data;
    }, function error(error) {
        console.log("錯誤: " + error);
    });
});

   

