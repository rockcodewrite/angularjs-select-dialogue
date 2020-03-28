//--------------------------------------------------------------------------------------------------------------
// HISTORY:
//    Date:  2019-10-02
//        V 0.0.1
//--------------------------------------------------------------------------------------------------------------
/**

var _mock = true;
var _debug = true;
var _baseUrl = "";

if (typeof _debug === "undefined") {
  console.log("module modalDlg.controller called before _debug initialised");
}

if (typeof _mock === "undefined") {
  console.log(
    "_mock is undefined. module modalDlg.controller called initialisation"
  );
}
s
 */

if (typeof appMain === "undefined") {
  console.log("undefind: app.controller(modalDlg_controller)");
  if (_debug) {
    alert("app: for modalDlg_controller not defnied.");
  }
}

appMain.controller("modalDlg.controller", function(
  $scope,
  $uibModalInstance,
  $http,
  selectedItem
) {
  // Api Url detailsRazor url deff
  // So thios would be the
  // so this is for all the list of vehicles to be shown, how does tha twork
  $scope.apiUrl = _baseUrl + "/api/DBBrowser_";

  $scope.itemList = null;
  $scope.selectedItem = null;
  $scope.rowSelected = false;

  $scope.btnOk_click = function() {
    $uibModalInstance.close($scope.selectedItem);
  };

  $scope.btnCancel_click = function() {
    $uibModalInstance.dismiss("cancel");
  };

  $scope.rowClick = function(item) {
    $scope.itemList.forEach(function(item, index) {
      item.Selected = null;
    });
    item.Selected = true;
    $scope.rowSelected = true;
    $scope.selectedItem = item;

    if (_debug) {
      console.log(item);
    }
  };

  $scope.init = function() {
    var url = $scope.apiUrl;
    if (_mock) {
      url = "../api/Vehicles_.json";
    }

    $http.get(url).then(function(data) {
      $scope.itemList = data.data;
      if (_debug) {
        console.log($scope.itemList);
      }
    });
  };

  $scope.init();
});
