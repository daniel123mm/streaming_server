'use strict';
function login(){
    document.getElementById('id01').style.display = 'block';
}

function register(){
    window.location.href = '/register';
}

//get list from server
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $scope.submitInfo = function(){
        var email = document.getElementById("email").value;
        var psw = document.getElementById("psw").value;
        var repsw = document.getElementById("psw-repeat").value;
        var label = document.getElementById("compare");
        if(psw != repsw){
            label.innerHTML = "再次輸入的密碼與密碼不同";
        }else{
            label.innerHTML = "";
            var obj = {"email":email, "psw":psw};
            console.log(obj);
        }
       
    }
});

   

