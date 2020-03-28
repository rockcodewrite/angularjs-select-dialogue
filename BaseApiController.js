//--------------------------------------------------------------------------------
// 
//  Version 
//   2018-10-17
//      0.1.5.0 - modified delete routine, removed alert message 
//   2018-09-17
//      0.1.4.1 - Minor syntax error fixed
//   2018-09-11 
//      0.1.4 - Modified error function
//   2018-07-24
//      0.1.3 - Added indexCreate 
//   2018-02-12: 
//      0.1.2 - Modified errorCallback to check for different complete message errors
//             
//      0.1.1 - Modified the Error handler message to work when Only Message is 
//              present and not just MessageDetail. 
//         
//--------------------------------------------------------------------------------
function BaseApiController($scope, $http, urlbase) {

    /// Alert attributes    
    $scope._Error = "";
    $scope._errorFlag = false;
    $scope._operationFlag = false;
    $scope._Operation = ""
    $scope._debugMessage = "";

    $scope._lockEdit = true;
    $scope._seeEdit = false; // if starting with blank edit cannot be enabled as there is nothing to edit. 
    $scope._loading = 0;
    //$scope._status = 0; // 1 = edit // 2 = create // 3 = delete // 4 - list
    $scope._currMode = 0;


    $scope._url = urlbase;


    $scope.index = function (ID) {
        var url = $scope._url + "/" + ID;
        $http.get(url).then(function (data) {
            $scope.Item = data.data;
        }, errorCallback
        )
    }


    $scope.indexedit = function (ID) {
        var url = $scope._url + "/" + ID;
        $http.get(url).then(function (data) {
            $scope.Item = data.data;
            $scope.edit();
        }, errorCallback
        )
    }

    $scope.indexCreate = function (ID) {
        var url = $scope._url + "/" + ID;
        $http.get(url).then(function (data) {
            //$scope.Item = data.data;
            $scope.create(data.data);
        }, errorCallback
        )
    }

    // ----------------------------  BASIC CRUD functionality
    // --------------------------------------------------------  

    $scope.save = function () {
        switch ($scope._status) {
            case 1: // EDIT
                return $scope.update();
            //break;
            case 2: // CREATE
                return $scope.post();
            //break;
            default:
                //break;
                return null;
        }
    }

    // ----------------------------  CREATE  
    // Must be newed
    $scope.create = function (Item) {
        $scope._status = 2;
        $scope.Item = Item;//new Client();
        $scope._lockEdit = false;
    }

    // ----------------------------  INSERT
    $scope.post = function () {
        var url = $scope._url;
        //var out = Out($scope.Client);
        debugger;
        return $http.post(url, $scope.Item).then(function (data) {
            $scope._Operation = "Created:"
            $scope._operationFlag = true;
            $scope._lockEdit = true;
            $scope.Item = data.data;
            $scope._seeEdit = true;
            $scope._status = 0;
        }, errorCallback)
    };

    // ----------------------------  EDIT 
    /// So at this point we would want to edit what we have
    $scope.edit = function () {
        $scope._status = 1;
        $scope._lockEdit = false;
    }

    // ----------------------------  UPDATE
    $scope.update = function () {
        var url = $scope._url;
        //var out = Out($scope.Client);
        return $http.put(url, $scope.Item).then(function (data) {
            var usr = data.data;
            $scope._Operation = "Updated:";
            $scope._operationFlag = true;
            $scope._lockEdit = true;
            $scope._status = 0;
        }, errorCallback)
    }

    // ----------------------------  DELETE
    $scope.deleteItem = function (PrimaryKey) {
        var url = $scope._url + "/" + PrimaryKey;// $scope.Client.ID;// + "/" + $scope.Client.;
        $scope._status = 0;

        return $http.delete(url).then(function (data) {
            $scope.Item = null;
            $scope._Operation = "Deleted:";
            $scope._operationFlag = true;
            $scope._lockEdit = true;
            $scope._status = 0;

        }, errorCallback)
        
    };

    $scope.cancel = function () {
        $scope._status = 0;
        $scope._lockEdit = true;
    };

    this.errorCallback = function (data, status, headers, config) {
        errorCallback(data, status, headers, config);
    }

    var errorCallback = function (data, status, headers, config) {
        try {
            $scope._errorFlag = true;
            var Err = data.data;

            $scope._Error = "";
            if (typeof (Err.Message) !== 'undefined') {
                DebugErr += Err.Message.replace(/(\r\n|\n|\r)/gm, " ");
            }

            var DebugErr = ""
            if (typeof (Err.MessageDetail) !== 'undefined') {
                DebugErr += Err.MessageDetail.replace(/(\r\n|\n|\r)/gm, " ");
            }

            if (typeof (Err.ExceptionMessage) !== 'undefined') {
                $scope._Error += Err.ExceptionMessage.replace(/(\r\n|\n|\r)/gm, " ");
                DebugErr += Err.ExceptionMessage.replace(/(\r\n|\n|\r)/gm, " ");
            }

            if (typeof (Err.StackTrace) !== 'undefined') {
                DebugErr += Err.StackTrace.replace(/(\r\n|\n|\r)/gm, " ");
            }

            $scope._debugMessage = DebugErr;
            console.log(data);
            return false;
        }
        catch (e) {
            $scope._debugMessage += " " + status;
            console.log(e);
        }
    };

    $scope.closeError = function () {
        $scope._errorFlag = false;
    };


    $scope.closeAlert = function () {
        $scope._operationFlag = false;
    };


    $scope.testAlerts = function () {
        $scope._operationFlag = true;
        $scope._errorFlag = true;
    };

}

