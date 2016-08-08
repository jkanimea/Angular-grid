var myApp = angular.module('myApp', ['ui.grid','ngAnimate','ui.bootstrap']);

myApp.controller('MainCtrl', ['ProductsService', '$scope', '$uibModal', function (ProductsService, $scope, $uibModal, $log) {
//   debugger;
    $scope.gridOptions = {
        excludeProperties: '__metadata',
    };


//purpose columndefs is so u can put a custom template to into images
    $scope.gridOptions =  {
    	columnDefs: [
    	 { field: 'FirstName'},
    	 { field: 'Surname'},
    	 { field: 'Sex' , cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
    	 { field: 'Tier', cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
    	 { field: 'Email'}
    	]
    };


    $scope.load = function () {
        ProductsService.readAll().then(function (response) {
            $scope.gridOptions.data = response.Person;
           
        });
    }

    $scope.load();


      $scope.create = function () {
      // debugger;
   //   console.log("create user");
      //debugger;
      var modalInstance = $uibModal.open({
  
      templateUrl: '/templates/createuser.html',
      controller: 'ModalInstanceCtrl',
       
   		 });
   debugger;
    modalInstance.result.then(function (response) {
      console.log("result of modal");
      console.log(response);
      debugger;
     $scope.gridOptions.data.push(response);
               });
    



    }

  

}]);


angular.module('myApp').controller('ModalInstanceCtrl', ['ProductsService','$scope', '$uibModalInstance', function (ProductsService, $scope, $uibModalInstance) {
    $scope.gridOptions = {
        excludeProperties: '__metadata',
    };


//purpose columndefs is so u can put a custom template to into images
    $scope.gridOptions =  {
    	columnDefs: [
    	 { field: 'FirstName'},
    	 { field: 'Surname'},
    	 { field: 'Sex' , cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
    	 { field: 'Tier', cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"},
    	 { field: 'Email'}
    	]
    };

    
  $scope.ok = function (response) {
    // $uibModalInstance.close($scope.selected.item);
//  console.log(response);
 // debugger;

$uibModalInstance.close(response);
 
    
     // ProductsService.create(response).then(function (response) {
     //        $scope.gridOptions.data = response.Person;
           
     //    });


  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


(function () {

    angular.module('myApp')
        .service('ProductsService', ['$http', ProductsService]);

    function ProductsService($http) {

        var self = this;
        
        var URL = 'data.json';

        self.readAll = function () {
            return $http({
                method: 'GET',
                url: URL,
               }).then(function (response) {
                return response.data;
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: URL + '/' + id,
               }).then(function (response) {
                return response.data;
            });
        };

        self.create = function (data) {
             console.log("inside create");
            console.log(data);
            return $http({
                method: 'POST',
                url: URL,
                data: data,
                params: {
                    returnObject: true
                },
                }).then(function (response) {
                return response.data;
            });
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: URL + '/' + id,
                data: data,
                }).then(function (response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: URL + '/' + id,
             });
        };

    }
}());