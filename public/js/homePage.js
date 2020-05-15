function login(){
    document.getElementById('id01').style.display = 'block';
}

function logout(){
   sessionStorage.clear();
   window.location.href = '/';
}

//get list from server
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope) {
    $.ajax({
        url : "http://127.0.0.1:8080/getVideoList",
        type : "GET",
        dateType : "json",
        async : false,
        success : function (result)
        {
            $scope.videoList = result;
        },
        error : function (err){
            console.log("錯誤:", err);
        }    
    });  
});

   

