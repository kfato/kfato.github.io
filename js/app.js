'use strict';
(function(){
	// $("input,textarea").jqBootstrapValidation({
 //        preventSubmit: true});
 var app = angular.module('kfato', []);
 app.controller('bloodDonors',['$scope', '$http', registration]);
 app.controller('bloodDonorsSearch',['$scope', '$http', search]);
 function registration($scope, $http){
 	$scope.register = function() {
 		$scope.errors = {};
 		console.log($scope.donor)
 		var name = $scope.donor.name;
 		var bloodgroup = $scope.donor.bloodGroup;
 		var mobile = $scope.donor.mobile;
 		var emaile = $scope.donor.email;
 		var city = $scope.donor.city;
 		var pincode = $scope.donor.pin;
 		function initalizeUpdateGenderValues() {
 			$('select').material_select();
 		}
 		$scope.updateGenderValues = initalizeUpdateGenderValues;
 		$scope.mobilePattern = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/g;
 		$scope.pincodePattern = /[0-9][0-9][0-9][0-9][0-9][0-9]/g;
 		console.log($scope.donor)

 		$http.post('http://localhost:8003/api/',$scope.donor)
 		.then(function(res){
 			if(res.data.isSuccess === false) {
 				$scope.errors.hasError = true;
 				$scope.errors.message = res.data.message;
 			} else if(res.data.isSuccess === true) {
 				$scope.errors.hasNoError = true;
 				$scope.errors.message = res.data.message;
 				$scope.donor = {};
 			}
 		})
 		
 	}
 }


 function search($scope, $http) {
 	$scope.search = function(){
		// console.log($scope.donorSearch.bloodgroup.toString())
		const dataToSent = {};
		$scope.isSuccess = false;
		if(($scope.donorSearch.bloodgroup != null) && ($scope.donorSearch.pincode != null)&&($scope.donorSearch.bloodgroup != "") && ($scope.donorSearch.pincode != "")) {
			$scope.donorSearch.bloodgroup = $scope.donorSearch.bloodgroup.toString();
			dataToSent.bloodgroup = $scope.donorSearch.bloodgroup;
			dataToSent.pincode = $scope.donorSearch.pincode;
		} else if(($scope.donorSearch.bloodgroup != null)&&($scope.donorSearch.bloodgroup != "")){
			$scope.donorSearch.bloodgroup = $scope.donorSearch.bloodgroup.toString();
			dataToSent.bloodgroup = $scope.donorSearch.bloodgroup;
		} else if(($scope.donorSearch.pincode != null)&&($scope.donorSearch.pincode != "")) {
			dataToSent.pincode = $scope.donorSearch.pincode;
		}
		if(!(angular.equals(dataToSent, {}))){
			console.log(dataToSent)
			$http.get('http://localhost:8003/api/',{params:$scope.donorSearch})
			.then(function(res){
				console.log(res.data)
				if(res.data.isSuccess){
					$scope.isSuccess = res.data.isSuccess;
					$scope.list = res.data.list;
					console.log($scope.list)
								$scope.message=null;
				}else {
					$scope.message = res.data.message;
				}
			})
		} else {
			console.log("enter atleast one details");
			$scope.message = 'enter atleast one details';
		}
		
		
	}
}

})();
