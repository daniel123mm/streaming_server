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
        var name = document.getElementById("name").value;
        var account = document.getElementById("account").value;
        var email = document.getElementById("email").value;
        var psw = document.getElementById("psw").value;
        var repsw = document.getElementById("psw-repeat").value;
        var label = document.getElementById("compare");
        if(psw != repsw){
            label.innerHTML = "再次輸入的密碼與密碼不同";
        }else{
            label.innerHTML = "";
            var obj = {
                "name"      : name,
                "account"   : account,
                "password"  : psw,
                "email"     : email
            };
            //console.log(obj);
            $http({
                url : "/newAccount",
                method : "POST",
                data: obj,
                dateType : "json",
                async : false,
            }).then(function success(result) {
                console.log(result);
                window.location.href = '/';
            }, function error(error) {
                console.log("錯誤: " + error);
            });
        }
       
    }
});

   

