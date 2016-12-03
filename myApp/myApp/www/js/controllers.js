angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope','$http', '$state','$location','$ionicModal', '$timeout','$ionicSlideBoxDelegate', function($scope,$http,$state, $location,$ionicModal, $timeout,$ionicSlideBoxDelegate) {
  // Form data for the login modal
  $scope.loginData = {};
  
  $scope.jump = function(url){
    window.location = url;
    window.location.reload();
  }

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
       $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
     // $scope.modal.show();
     // $location.path('#/app/login'); 
  };
  $scope.statusText = [
       {"status":0 ,"text":"请登录账号"},
       {"status":1 ,"text":"已登录"}
  ];

}])

//登录
.controller('loginCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location','$window' ,'$ionicHistory',function($scope, $ionicPopup, $timeout,$stateParams,$http,$ionicScrollDelegate,$location,$window,$ionicHistory){
    
    //解决web浏览器只跟踪一个历史浏览记录
    $ionicHistory.nextViewOptions({
         disableBack: true
    });  
    //提交表单，验证登录
    $scope.doLogin = function() {
           console.log('Doing login', $scope.loginData);
           var  loginObj = {};
           loginObj = $scope.loginData;
           console.log(JSON.stringify(loginObj));
           if($scope.loginData.username == null && $scope.loginData.password == null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有登录，请登录！"
              });
           } else if($scope.loginData.username != null && $scope.loginData.password == null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有输入密码，请输入密码！"
              });
           } else if($scope.loginData.username == null && $scope.loginData.password != null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有输入用户名，请输入用户名！"
              });
           } else if($scope.loginData  != null){         
                 //发送数据
                  $http({  
                        //url : "http://10.32.33.133:8080/login",  
                        url : "http://10.32.33.4:8080/ivotel-examuser/login", 
                        method : "post",
                        params :  loginObj,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                        withCredentials :true
                       
                  }).success(function(data) {  
                      
                       console.log(data);
                       if (data.code === 0) {

                           console.log('code'+data.code);
                           $location.path('#/app/login');
                       }
                      if(data.code == "100"){
                          $location.path("#/app/playlists");
                          //$ionicHistory.goBack(-2);              
                         // $window.location.reload();
                          var  obj  =  document.getElementById("set-status");
                          var  obj2 =  document.getElementById("set-status2");
                          obj.style.display = "none";
                          obj2.style.display = "block";
                      }else if(data.code == "101"){
                         var alertPopup = $ionicPopup.alert({
                              template: data.message
                         });
                         //alert(data.message);
                      }else if(data.code == "102"){
                         var alertPopup = $ionicPopup.alert({
                             template: data.message
                         });
                        
                      }else{
                          var alertPopup = $ionicPopup.alert({
                             template: data.message
                          });
                      }
                      console.log(data.code);       
                  }).error(function(){  
                        console.log("请求服务器失败");
                       // window.location.reload();
                  }); 
          } 
     
    };
    $scope.jump = function(url){
        window.location = url;
    }
    $scope.backup = function(){
         $ionicHistory.goBack(2); 
    }
  
}])

//注册
.controller('LoginInCtrl',['$scope','$ionicPopup', '$timeout', '$ionicModal','$stateParams','$http','$ionicScrollDelegate','$location' ,'$ionicHistory',function($scope,$ionicPopup, $timeout,$ionicModal, $stateParams,$http,$ionicScrollDelegate,$location,$ionicHistory){
      //解决web浏览器只跟踪一个历史浏览记录
      $ionicHistory.nextViewOptions({
           disableBack: true
      });
      $scope.registerData = {};
      $scope.startRegister = function(){
          console.log($scope.registerData );
          var registerObj = {};
          registerObj = $scope.registerData;
          if($scope.registerData == null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有登录，请登录！"
              });
           } else if($scope.registerData.email == null && $scope.registerData.username != null && $scope.registerData.password2 != null && $scope.registerData.password != null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有输入邮箱，请输入邮箱！"
              });
           } else if($scope.registerData.password == null && $scope.registerData.email != null && $scope.registerData.username != null){
              var alertPopup = $ionicPopup.alert({
                  template: "您还没有输入密码，请输入密码！"
              });
           }else if($scope.registerData.password2 == null && $scope.registerData.password != null && $scope.registerData.email != null && $scope.registerData.username != null){
                var alertPopup = $ionicPopup.alert({
                  template: "您还没有输入密码，请确认密码！"
              });
           } else if($scope.registerData != null){          
                  $http({  
                        url : "http://10.32.33.4:8080/ivotel-examuser/registe",  
                        method : "post",
                        params :  registerObj,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }

                  }).success(function(data) { 
                      if(data.code == "201"){
                          var alertPopup = $ionicPopup.alert({
                              template: data.message
                          });
                         
                      } else if(data.code == "202" ){
                          var alertPopup = $ionicPopup.alert({
                               template: data.message
                           });
                      } else if(data.code == "203"){
                          var alertPopup = $ionicPopup.alert({
                               template: data.message
                           });
                      }else if(data.code == "204"){
                          var alertPopup = $ionicPopup.alert({
                               template: data.message
                           });
                      }else if(data.code == "205"){
                          var alertPopup = $ionicPopup.alert({
                               template: data.message
                           });
                      }else if(data.code == "200"){              
                          var alertPopup = $ionicPopup.alert({
                               title: '注册成功',
                               template: '您已注册成功,请登录！'
                          });
                          alertPopup.then(function(res) {
                               window.location.reload(); 
                               history.go(-1);
                           });
                         //$location.path('#/app/login');
                        // window.location.reload();  
                         //history.go(-1);
                        
                      }        
                        //注册成功。跳转到登录页面
                        //alert('激活链接已发送到您的邮箱，请注意查收，点击激活即可进行登录');             
                        //$location.path('#/app/personInfo');                
                  }).error(function(){  
                      var alertPopup = $ionicPopup.alert({                 
                           template: '服务器请求失败！'
                      });
                      alertPopup.then(function(res) {
                           // window.location.reload();
                           // history.go(-1);
                      });
                  }); 
          } 
      }
      $scope.jump = function(url){
          window.location = url;
      }
}])

.controller('PlaylistsCtrl',['$scope','$ionicHistory', function($scope , $ionicHistory) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
}])


.controller('browseCtrl', ['$scope','$ionicHistory', '$stateParams','$http','$ionicScrollDelegate','$location','$filter',
  function($scope,$ionicHistory, $stateParams,$http,$ionicScrollDelegate,$location,$filter) {

      // $ionicHistory.nextViewOptions({
      //      disableBack: true
      // });
      var  ionListOne = document.getElementById('ion-list-one')  ;
      var  ionListTwo = document.getElementById('ion-list-two');
      $scope.test = function(){
            alert('222');
      };
      //刚开始页面进行渲染
      $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
      }).success(function(data) { 
            $scope.data = data; 
            console.log('success');
      }).error(function(){  
            console.log('error');
      });  

      $scope.requestDate = function() {
            var  btnValue = document.getElementById('btn1'); 
            if(btnValue){
                    ionListOne.style.display = 'block';
                    ionListTwo.style.display = 'none';
            }
            $http({  
                //url : "http://10.32.33.132:8080/ivotel-examuser/questionnairePapers/queryAll ",  
                url:"http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll",
                method : "get",
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                withCredentials :true
            }).success(function(data) { 
                $scope.data = data; 
                console.log('success');
            }).error(function(){  
                console.log('error code');
            });  
      };
      // $http.get("http://10.32.33.133:8080/questionnaire/query?id=1&statusId=2").success(function (data) { 
      //     console.log(data);
      //     $scope.data = data;
      // });

      //已完成数据点击,前端传给后端数据，statusId ,状态为0.1.2  请求的格式为/api/query={statusId:1},点击按钮进行get方法获取数据
      
      $scope.requestComplete = function(){       
          var  btnValue = document.getElementById('btn2'); 
          if(btnValue){
                ionListOne.style.display = 'none';
                ionListTwo.style.display = 'block';
          }
          //console.log(btnValue);
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=1  ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true


          }).success(function(response) { 
                $scope.result = response; 
                console.log('已完成'+ $scope.result);
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestInComplete = function(){
        var  btnValue = document.getElementById('btn3'); 
        if(btnValue){
              ionListOne.style.display = 'block';
              ionListTwo.style.display = 'none';
        }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=0 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('未完成');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestDoing = function(){
          var  btnValue = document.getElementById('btn4'); 
          if(btnValue){
                ionListOne.style.display = 'block';
                ionListTwo.style.display = 'none';
          }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=2 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('进行中');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
      };

      $scope.goToIndex = function(){

      };
}])

.directive('repeatDone', function () {
    return function (scope, element, attrs) {
           if (scope.$last) { // all are rendered
               scope.$eval(attrs.repeatDone);
           }
    }
})

.controller('personCenterCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
      $http({  
            url : "http://10.32.33.132:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=2",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
      }).success(function(data) { 
            $scope.data = data; 
            console.log('success');
      }).error(function(){  
            console.log('error');
      });  
}])


 
.controller('listItemCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,'$ionicSlideBoxDelegate','$ionicHistory',
  function($scope,$ionicPopup, $timeout,$stateParams,$http,$ionicScrollDelegate,$location,$ionicSlideBoxDelegate,$ionicHistory){  
          // $ionicHistory.nextViewOptions({
          //        disableBack: true
          // });
          $scope.repeatDone = function() {
             $ionicSlideBoxDelegate.update();
          };
          var  objData = [];
          $scope.selectedValue = {};
          $scope.radioData = [];
          var  submitId = {"id" : 70}; 
          $scope.serveData = 0;       
          $scope.objData = null;
          $scope.jsonRadio = [];                
          $scope.newJsonData = []; //根据对应的题目索引，得到正确的题目
          $scope.currentIndex = 0;
          $scope.answerData = null;  
          $scope.jsonItemData = null;
          $scope.selectedIndex = 0;
          $scope.answerArray = [];
          // "answer": {
          //     "1": "1",
          //     "2": "4",
          //     "3": "4",
          //     "4": "4",
          //     "5": "4"
          // }            
          $http({  
                   //url : "../data/api.json", 
                  url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/PaperDetail", 
                  method : "get",
                  params: submitId,
                  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
          }).success(function(data) { 
                    $scope.answerData = data.answer;                    
                    var arr = data.questionnaireTemp.questionnaireQuestionList; //进行解析          
                    var valueObj = [] ;
                    for(var i  in $scope.answerData){
                        $scope.answerArray.push($scope.answerData[i]);
                    }
                    console.log('right  answer' + $scope.answerArray);
                    for(var i=0; i< arr.length;i++){
                          objData[i] = arr[i].responseQuestion; 
                    }                     
                   $scope.data = data; 
                   console.log( $scope.answerData);
                 
                   $scope.objData = objData; 
                  
                  for(var i  in  $scope.objData){
                      $scope.jsonRadio.push( $scope.objData[i]);
                   } 
                              
                  for(var i  in  $scope.answerData){
                        if(i == ($ionicSlideBoxDelegate.currentIndex()+1)){
                            $scope.newJsonData.push( $scope.jsonRadio[i-1].items[($scope.answerData[i])]);
                        }
                        
                         console.log('index:' + $scope.selectedIndex)                    
                  } 
                    $scope.selectedIndex = parseInt($scope.answerData[$ionicSlideBoxDelegate.currentIndex()+1]) ; 
                    console.log('selectedIndex : ' +$scope.selectedIndex)                 
                    console.log('jsonNewData:' + JSON.stringify( $scope.newJsonData)); 
                    console.log($scope.selectedValue.radioData) ; 

            }).error(function(){  
                  console.log('error');
          });         
          $scope.jsonItemData = [];
          $scope.onSlideChanged = function(index){
              $scope.currentIndex = index;
              for(var i  in $scope.answerData){
                    $scope.answerArray.push($scope.answerData[i]);
              }
              console.log('index22:' + index);
              $scope.selectedIndex = parseInt($scope.answerData[$ionicSlideBoxDelegate.currentIndex()+1])-1 ; 

              console.log('selectedIndex : ' +$scope.selectedIndex)

              for(var i  in $scope.answerArray){
                   if(i == $ionicSlideBoxDelegate.currentIndex()){
                         console.log('answerArray'+ i)
                   }
              }
              for(var i  in  $scope.objData){
                      $scope.jsonRadio.push( $scope.objData[i]);
              } 
                              
              for(var i  in  $scope.answerData){
                        if(i == ($ionicSlideBoxDelegate.currentIndex()+1)){
                            $scope.newJsonData.push( $scope.jsonRadio[i-1].items[($scope.answerData[i])]);
                            $scope.selectedIndex = $scope.answerData[i] - '0' ;
                        }
                        console.log('index:' + $scope.selectedIndex)
                      
              }
                  console.log('jsonNewData:' + JSON.stringify( $scope.newJsonData)); 
              
          };

           $scope.nextSlide = function(){  

               $ionicSlideBoxDelegate.next();  

          };

          $scope.startSlide = function(){
              $ionicSlideBoxDelegate.previous();
          };

}])

.controller('recommandCtrl',['$scope' ,'$ionicPopup', '$timeout','$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
      
      $scope.writeViews = function(){
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                   template: '<input type="text" ng-model="data.mes">',
                   title: '请输入您的留言',      
                   scope: $scope,
                   buttons: [
                     { text: 'Cancel',
                       type: 'button-positive',
                      },
                     {
                       text: '<b>Save</b>',
                       type: 'button-positive',
                       onTap: function(e) {
                         if (!$scope.data.mes) {
                           //不允许用户关闭，除非他键入wifi密码
                             e.preventDefault();
                         } else {
                             return $scope.data.mes;
                         }
                       }
                     },
                   ]
            });
           myPopup.then(function(res) {
                console.log('您的留言是:', res);
           });
      }
}])

.controller('setCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
     
     $scope.refesh = function(){
          window.location.reload();
     }
}])

.controller('paihangbangCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
       
      $scope.data =  null;

      $http({  
            //url : "../data/doing.json", 
            url:"http://10.32.33.128:8080/rankQuestionnaire " ,
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
      }).success(function(data) { 
            $scope.data = data; 
            console.log($scope.data );
           // console.log('success');
      }).error(function(){  
            console.log('error');
      });

      $scope.viewDetail = function($index){
            //console.log( $scope.data);
            var alertPopup = $ionicPopup.alert({
                       title: $scope.data[$index].title,
                       template: '投票数：' + $scope.data[$index].toupiao + '<br>'+ '排名：'+ ($index +1)
            });
      } 

      $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
      };    
}])



.controller('moreQuestionCtrl',['$scope','$ionicHistory', '$stateParams','$http','$ionicScrollDelegate','$location','$filter' ,function($scope,$ionicHistory, $stateParams,$http,$ionicScrollDelegate,$location,$filter){
       $scope.jump = function(url){
          window.location = url;
      }

      var  ionListOne = document.getElementById('ion-list-one')  ;
      var  ionListTwo = document.getElementById('ion-list-two');
      $scope.test = function(){
            alert('222');
      };
      //刚开始页面进行渲染
      $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
      }).success(function(data) { 
            $scope.data = data; 
            console.log('success');
      }).error(function(){  
            console.log('error');
      });  

      $scope.requestDate = function() {
            var  btnValue = document.getElementById('btn1'); 
            if(btnValue){
                    ionListOne.style.display = 'block';
                    ionListTwo.style.display = 'none';
            }
            $http({  
                //url : "http://10.32.33.132:8080/ivotel-examuser/questionnairePapers/queryAll ",  
                url:"http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll",
                method : "get",
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                withCredentials :true
            }).success(function(data) { 
                $scope.data = data; 
                console.log('success');
            }).error(function(){  
                console.log('error code');
            });  
      };
      // $http.get("http://10.32.33.133:8080/questionnaire/query?id=1&statusId=2").success(function (data) { 
      //     console.log(data);
      //     $scope.data = data;
      // });

      //已完成数据点击,前端传给后端数据，statusId ,状态为0.1.2  请求的格式为/api/query={statusId:1},点击按钮进行get方法获取数据
      
      $scope.requestComplete = function(){       
          var  btnValue = document.getElementById('btn2'); 
          if(btnValue){
                ionListOne.style.display = 'none';
                ionListTwo.style.display = 'block';
          }
          //console.log(btnValue);
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=1  ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true


          }).success(function(response) { 
                $scope.result = response; 
                console.log('已完成'+ $scope.result);
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestInComplete = function(){
        var  btnValue = document.getElementById('btn3'); 
        if(btnValue){
              ionListOne.style.display = 'block';
              ionListTwo.style.display = 'none';
        }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=0 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('未完成');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestDoing = function(){
          var  btnValue = document.getElementById('btn4'); 
          if(btnValue){
                ionListOne.style.display = 'block';
                ionListTwo.style.display = 'none';
          }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=2 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('进行中');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
      };

}])

.controller('answerQuestionCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
       $scope.jump = function(url){
          window.location = url;
      }
      var  ionListOne = document.getElementById('ion-list-one')  ;
      var  ionListTwo = document.getElementById('ion-list-two');
      $scope.test = function(){
            alert('222');
      };
      //刚开始页面进行渲染
      $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
      }).success(function(data) { 
            $scope.data = data; 
            console.log('success');
      }).error(function(){  
            console.log('error');
      });  

      $scope.requestDate = function() {
            var  btnValue = document.getElementById('btn1'); 
            if(btnValue){
                    ionListOne.style.display = 'block';
                    ionListTwo.style.display = 'none';
            }
            $http({  
                //url : "http://10.32.33.132:8080/ivotel-examuser/questionnairePapers/queryAll ",  
                url:"http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryAll",
                method : "get",
                headers: { 'Content-Type': 'application/json;charset=UTF-8' },
                withCredentials :true
            }).success(function(data) { 
                $scope.data = data; 
                console.log('success');
            }).error(function(){  
                console.log('error code');
            });  
      };
      // $http.get("http://10.32.33.133:8080/questionnaire/query?id=1&statusId=2").success(function (data) { 
      //     console.log(data);
      //     $scope.data = data;
      // });

      //已完成数据点击,前端传给后端数据，statusId ,状态为0.1.2  请求的格式为/api/query={statusId:1},点击按钮进行get方法获取数据
      
      $scope.requestComplete = function(){       
          var  btnValue = document.getElementById('btn2'); 
          if(btnValue){
                ionListOne.style.display = 'none';
                ionListTwo.style.display = 'block';
          }
          //console.log(btnValue);
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=1  ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true


          }).success(function(response) { 
                $scope.result = response; 
                console.log('已完成'+ $scope.result);
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestInComplete = function(){
        var  btnValue = document.getElementById('btn3'); 
        if(btnValue){
              ionListOne.style.display = 'block';
              ionListTwo.style.display = 'none';
        }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=0 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('未完成');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.requestDoing = function(){
          var  btnValue = document.getElementById('btn4'); 
          if(btnValue){
                ionListOne.style.display = 'block';
                ionListTwo.style.display = 'none';
          }
          $http({  
            url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/queryByStatusId?StatusId=2 ",  
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            withCredentials :true
          }).success(function(data) { 
                $scope.data = data; 
                console.log('进行中');
          }).error(function(){  
                console.log('error');
          });       
      };

      $scope.scrollTop = function() {
          $ionicScrollDelegate.scrollTop();
      };
}])


//多选题和问答题的control

.controller('timuListCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,'$ionicSlideBoxDelegate','$ionicHistory',
  function($scope,$ionicPopup, $timeout,$stateParams,$http,$ionicScrollDelegate,$location,$ionicSlideBoxDelegate,$ionicHistory){
   
    // $ionicHistory.nextViewOptions({
    //        disableBack: true
    // });

    $scope.repeatDone = function() {
      $ionicSlideBoxDelegate.update();
      //$ionicSlideBoxDelegate.slide($scope.week.length - 1, 1);
    };
   
    var objData = [];
    $scope.serveData = 0;
    var submitData = {
           "id" :$stateParams.timuId
    }
    $http({  
            //url : "../data/api.json", 
            url : "http://10.32.33.4:8080/ivotel-management/questionnaire/selectQuestionnaireDetail", 
            method : "get",
            params: submitData,
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }).success(function(data) { 
            var arr =data.questionnaireQuestionList; //进行解析          
            var valueObj = [] ;
            for(var i=0;i<arr.length;i++){
                  objData[i] = arr[i].responseQuestion; 
             }                     
             $scope.data = data; 
             $scope.serveData = data.questionnaireQuestionList[0].qqid;
             $scope.serveLength = data.questionnaireQuestionList.length;
             $scope.objData = objData;           
           //  console.log($scope.serveData);   
      }).error(function(){  
            console.log('error');
    });
    $scope.radioData = [];
    $scope.selectedValue = {}; 
    $scope.index = $ionicSlideBoxDelegate.currentIndex()+1;
    $scope.currentIndex = 0;

    $scope.onSlideChanged = function(index){
       $scope.currentIndex = index;
    };

    $scope.nextSlide = function(){
        var  radioJsonData = $scope.selectedValue.radioData;      
        var  objData = document.getElementsByClassName('radio');
        var  slideIndex = $ionicSlideBoxDelegate.currentIndex(); 
        if(radioJsonData == null){
             var alertPopup = $ionicPopup.alert({
                 template: '您还没有选择，请选择答案！'
            }); 
        }else if(radioJsonData[slideIndex] == null && slideIndex != $scope.serveLength ){
            var alertPopup = $ionicPopup.alert({
                 template: '您还没有选择，请选择答案！'
            });  
            return true;           
        }else {
            $ionicSlideBoxDelegate.next(); 
        }
          return ;         
    };

    $scope.startSlide = function(){
        $ionicSlideBoxDelegate.previous();
    };

    $scope.submitData = {};

    //用户提交完毕,当前的问卷被提交，修改其状态为已完成。可在已完成的栏目进行查看
    $scope.submitSuccess = function(){
       
        var radioJsonData = $scope.selectedValue.radioData;
        var radioObject  = [];
        for(var k  in radioJsonData){
             radioObject.push(radioJsonData[k]);
        }
        console.log('3333')
        console.log(radioObject);
        console.log(radioJsonData)
        //获取radioData的长度,判断用户选择的数据是否完整
        var radioLength = 0;
        var getRadioLength = function(radioJsonData){
            for(var item  in radioJsonData){
                radioLength++;
            }
            return  radioLength;
        }
        if(getRadioLength(radioJsonData) == $scope.serveLength){
              var submitData = {
                  "id" :$stateParams.timuId,
                  "signle":radioObject            
              }; 
               console.log(JSON.stringify(submitData));
              // $http({  
              //     url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/Submit",  
              //     method : "post",
              //     data : submitData,
              //     headers: { 'Content-Type': 'application/json;charset=UTF-8' },
              //      withCredentials :true
              //   //  withCredentials :true
              // }).success(function(data) { 
              //     console.log('success');
              // }).error(function(){  
              //     console.log('error');
              // });  
              //  var alertPopup = $ionicPopup.alert({
              //      title: '提交成功',
              //      template: '您的问卷已完成,请返回查看详情！'
              //  });
              //  alertPopup.then(function(res) {
              //      history.go(-1);
              //  });
        } else{
            var alertPopup = $ionicPopup.alert({
                title: '提交失败',
                template: '您的问卷未完成,请返回重新填写！'
            });
            alertPopup.then(function(res) {
               console.log('提交失败');
            });
        }      
    };
}])



.controller('timuListMoreCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,'$ionicSlideBoxDelegate','$ionicHistory',function($scope,$ionicPopup, $timeout,$stateParams,$http,$ionicScrollDelegate,$location,$ionicSlideBoxDelegate,$ionicHistory){
    $scope.jump = function(url){
          window.location = url;
    }

    $scope.repeatDone = function() {
      $ionicSlideBoxDelegate.update();
    };
   
    var objData = [];
    $scope.serveLength = 0;
    $scope.serveData = 0;
    $http({  
            url : "../data/api.json", 
           // url : "http://10.32.33.132:8080/ivotel-management/questionnaire/selectQuestionnaireDetail?id=70", 
            method : "get",
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }).success(function(data) { 
            var arr =data.questionnaireTemp.questionnaireQuestionList; //进行解析          
            var valueObj = [] ;
            for(var i=0;i<arr.length;i++){
                  objData[i] = arr[i].responseQuestion; 
             }                     
             $scope.data = data; 
             $scope.serveData = data.questionnaireTemp.questionnaireQuestionList[0].qqid;
             $scope.serveLength = data.questionnaireTemp.questionnaireQuestionList.length;
             $scope.objData = objData;          

      }).error(function(){  
            console.log('error');
    });
    $scope.connectCheckboxData = [];
    $scope.selectedValue = {}; 
    $scope.index = $ionicSlideBoxDelegate.currentIndex()+1;
    $scope.currentIndex = 0;
    $scope.selected = [] ;
    $scope.connectedData = []; 
    // console.log(connectSelected);    
    // $scope.isChecked = function(key,$parentIndex){
    //     return $scope.selected.indexOf(key) >= 0 ;
    // }
    // console.log( $scope.selected); 
    // $scope.updateSelection = function($event,key,$parentIndex){  
    //     var checkbox = $event.target ;  
    //     var checked  = checkbox.checked ;
    //     var tempSelect = [];   
    //     if($scope.selected[$parentIndex] == null){ 
    //         $scope.selected.push(key);         
    //     } else if($scope.selected[$parentIndex] != null){
    //          $scope.selected = [] ;
    //          $scope.selected.push(key); 
    //     } 
    //     var  newSelected =  new Array();
    //     newSelected =   $scope.selected;
    //     console.log('temp:'+  $scope.selected) ;
    //     $scope.connectSelected[$parentIndex] = newSelected.join('/');
    //     console.log('connectSelected:'+  JSON.stringify($scope.connectSelected)) ;
    // } ;  
    $scope.onSlideChanged = function(index){
         $scope.currentIndex = index;
    };
   
    $scope.nextSlide = function(){       
        $scope.connectedData = $scope.selected.map(function(item){
            var connectSelected = [];
            for(var i in item){
              if(item[i]){
                connectSelected.push(parseInt(i)+1);
              }
            }
            return connectSelected.join('/');
        })
        console.log('test:'+JSON.stringify( $scope.connectedData));
        $ionicSlideBoxDelegate.next();                     
    };

    $scope.startSlide = function(){
        $ionicSlideBoxDelegate.previous();
    };

    // $rootscope.submitMutile = null;

    //用户提交完毕,当前的问卷被提交，修改其状态为已完成。可在已完成的栏目进行查看
    $scope.submitSuccess = function(){      
        var radioJsonData = $scope.connectedData;
        var radioObject  = [];
        for(var k  in radioJsonData){
             radioObject.push(radioJsonData[k]);
        }
        console.log('3333')
        console.log(radioObject);
        console.log(radioJsonData)
        //获取radioData的长度,判断用户选择的数据是否完整
        var radioLength = 0;
        var getRadioLength = function(radioJsonData){
            for(var item  in radioJsonData){
                radioLength++;
            }
            return  radioLength;
        }
        if(getRadioLength(radioJsonData) == $scope.serveLength){
              var submitData = {
                  "multi":radioObject            
              }; 

              //$rootscope.submitMutile = submitData;
              console.log(JSON.stringify(submitData));
             // console.log( '$rootscope'+ $rootscope.submitMutile);
              // $http({  
              //     url : "http://10.32.33.4:8080/ivotel-examuser/questionnairePapers/Submit",  
              //     method : "post",
              //     data : submitData,
              //     headers: { 'Content-Type': 'application/json;charset=UTF-8' },
              //      withCredentials :true
              //   //  withCredentials :true
              // }).success(function(data) { 
              //     console.log('success');
              // }).error(function(){  
              //     console.log('error');
              // });  
              //  var alertPopup = $ionicPopup.alert({
              //      title: '提交成功',
              //      template: '您的问卷已完成,请返回查看详情！'
              //  });
              //  alertPopup.then(function(res) {
              //      history.go(-1);
              //  });
        } else{
            var alertPopup = $ionicPopup.alert({
                title: '提交失败',
                template: '您的问卷未完成,请返回重新填写！'
            });
            alertPopup.then(function(res) {
               console.log('提交失败');
            });
        }      
    };
}])

.controller('chooseCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
       $scope.jump = function(url){
          window.location = url;
      }

      $scope.chooseId = $stateParams.timuId;

      console.log($stateParams.timuId);

      $scope.submit = function(){
           var alertPopup = $ionicPopup.alert({
                template:"亲，暂时还木有东西哦！"
            });
      }

}])

.controller('timuListAnswerQuestionCtrl',['$scope','$ionicPopup', '$timeout', '$stateParams','$http','$ionicScrollDelegate','$location' ,function($scope,$ionicPopup, $timeout, $stateParams,$http,$ionicScrollDelegate,$location){
       $scope.jump = function(url){
          window.location = url;
      }
}])

