angular.module("FinalApp")
	.controller("MainController",function($scope, $resource, PostResource){
		Users = $resource("https://jsonplaceholder.typicode.com/users/:id", {id: "@id"});
		$scope.posts = PostResource.query();
		//$scope.post = PostResource.query();
		$scope.users = Users.query(); 
		// query() -> GET /posts -> Un arreglo de posts -> isArray = true
		$scope.removePost = function(post){
			PostResource.delete({id: post.id}, function(data){
				console.log(data);
			});
			/*$scope.posts = $scope.posts.filter(function(element){
				return element.id !== post.id;
			});*/
		};
	})
	.controller("postController", function($scope, PostResource, $routeParams, $location){
		$scope.title = "Editar post";
 		$scope.posts = PostResource.get({id: $routeParams.id});
 		$scope.post = PostResource.get({id: $routeParams.id});
 		$scope.savePost = function(){
			PostResource.update({id: $scope.post.id}, {data: $scope.post}, function(data){
				console.log(data);
				$location.path("/post/"+$scope.post.id);
			});
		};
	}) 
	.controller("newPostController", function($scope, PostResource, $location){
   		$scope.post = {};
		$scope.title = "Crear post";
		$scope.savePost = function(){
			PostResource.save({data: $scope.post}, function(data){
				console.log(data);
				$location.path("/");
			});
		}; 
	});
