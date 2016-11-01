angular.module('predict', [])
.controller('predictController', ['$scope', '$location', 'Search', 'formatDate','SharedVariables',
function($scope, $location, Search, formatDate, SharedVariables ){

//This will list the prediction value returned from the trained model
 $scope.prediction = '';

//This will display list of available trained currency models
 $scope.items = [];

//Function to make call to Google Prediction API
$scope.predict = function() {
  //Take values entered through the HTML form and pass them to Google Prediction
    Search.getPrediction($scope.predict.code, $scope.predict.date)
    .then(function(res){
      //Set $scope.prediction to the value Google Prediction returns
        $scope.prediction = res.data.outputValue;
    });
};

//To be fully implemented later; this returns a list of trained currency models
//in an array
    Search.getPredictionList()
    .then(function(res){
        $scope.items = res.data.items;
    });


}]);
