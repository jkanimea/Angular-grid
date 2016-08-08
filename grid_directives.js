//   <grid-screen resource="/api/data.json">
//     <grid-columns>
//       <grid-column title="Product"     field="product"></grid-column>
//       <grid-column title="Description" field="description"></grid-column>
//       <grid-column title="Cost"        field="cost"></grid-column>
//     </grid-columns>
//     <grid with-inline-editor></grid>
//   </grid-screen>
//41:22
// 3 domain objects: editor, edit, columns, rows

angular.module("app").directive("gridScreen", function($http){
	return {
		restrict:'E',
		controller: function($scope) {
          // columns, editor
          this.setEditor = function(editor) {};
          this.setColumns = function(cols) {
          	$scope.cols = cols;
          };
		},
		link: function(scope, element, attributes) {
			$http.get(attributes.resource).success(function(response) {
				scope.rows = response.data;
				scope.$broadcast('ready-to-render',scope.rows,scope.cols);
			});
			//console.log('linked to gridScreen');
		    }
           }; 
});
angular.module("app").directive("gridColumns", function(){
	return {
		restrict:'E',
		require: ['^gridScreen','gridColumns'],
		controller: function() {
			var columns = [];
			this.addColumn = function(col) {
				columns.push(col);
			}
			this.getColumns = function() {
				return columns;
			}
		},
		link: function(scope, element, attributes,controller) {
			var gridScreenController = controller[0];
			var gridColumnsController = controller[1];
			gridScreenController.setColumns(gridColumnsController.getColumns());

			console.log('linked to gridColumns');
		    }
           };
});
angular.module("app").directive("gridColumn", function(){
	return {
		restrict:'E',
		require:'^gridColumns',
		link: function(scope,element,attributes,gridColumnsController) {
			gridColumnsController.addColumn({
				title:attributes.title,
				field: attributes.field
			});
			console.log('linked to gridColumn',attributes.title);
		    }
			};
});
angular.module("app").directive("grid", function(){
	return {
		restrict:'E',
		replace:true,
		templateUrl:'/templates/as_table.html',
		controller:function($scope) {
         $scope.$on('ready-to-render',function(e,rows,cols) {
         	console.log(rows,cols)
         })   
		},
		link: function() {
			console.log('linked to grid');
		    }
      };
});
angular.module("app").directive("withInlineEditor",function() {
	return {
	     restrict: 'A',
		link: function() {
			console.log('linked to withInlineEditor');
		    }
         };
});