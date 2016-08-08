angular.module('attachmentViewModule', ['toaster'])
.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    var a = $('<a>', { href: application_js })[0];
    var url = a.protocol + '//' + a.hostname + '/**';
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from outer templates domain.
        url
    ]);
}])
.directive('attachmentView', function () {
    return {
        restrict: 'AE',
        templateUrl: application_js + 'templates/attachments-viewlink.htm',
        scope: {},
        controller: ['$scope', '$location', '$q', 'toaster', function ($scope, $location, $q, toaster) {
            var params = $location.search();
            $scope.invalidUrl = false;
            var queryParam = {
                To: params.to,
                AttachmentId: params.Id,
                Version: params.version,
                ExpiresOn: params.expOn,
                Sign: params.sign,
                UserAgent: navigator.userAgent
            };
            $scope.isValidLink = true;
            if (new Date(params.expOn) < new Date())
                $scope.isValidLink = false;
            if ($scope.isValidLink) {
                $scope.inprogress = true;
                ATT_EXP.ViewLinkController.ValidateUrl(queryParam, function (result) {
                    $scope.inprogress = false;
                    if (result != null && result != undefined) {
                        if (result == false)
                            toaster.pop('error', '', 'Invalid Url!');
                    }
                    $scope.$apply();
                });
            }
            $scope.sendPassword = function () {
                var params = $location.search();
                var queryParam = {
                    To: params.to,
                    AttachmentId: params.Id,
                    Version: params.version,
                    ExpiresOn: params.expOn,
                    Sign: params.sign,
                    UserAgent: navigator.userAgent

                };
                $scope.inprogress = true;
                ATT_EXP.ViewLinkController.ValidateUrl(queryParam, function (result) {
                    if (result != null && result != undefined) {
                        $scope.inprogress = false;
                        if (result == false)
                            toaster.pop('error', '', 'Invalid Url!')
                        else {
                            $scope.inprogress = true;
                            ATT_EXP.ViewLinkController.GeneratePasswordAndSendEmail(queryParam, function (result) {
                                if (!!result) {
                                    if (result == 'Success')
                                        toaster.pop('success', '', 'An email has been sent to you!');
                                    else
                                        toaster.pop('error', '', result)
                                }
                                $scope.inprogress = false;
                                $scope.$apply();
                            });
                        }
                        $scope.$apply();
                    }
                });
            };
            $scope.viewLink = function () {
                var params = $location.search();
                var queryParam = {
                    To: params.to,
                    AttachmentId: params.Id,
                    Version: params.version,
                    ExpiresOn: params.expOn,
                    Sign: params.sign,
                    UserAgent: navigator.userAgent

                };
                $scope.inprogress = true;
                ATT_EXP.ViewLinkController.ValidateUrl(queryParam, function (result) {
                    if (result != null && result != undefined) {
                        $scope.inprogress = false;
                      
                        if (result == false)
                            toaster.pop('error','', 'Invalid Url!')
                        else {
                            $scope.inprogress = true;
                            ATT_EXP.ViewLinkController.ValidatePassword($scope.password.trim(), queryParam, function (result) {
                                if (!!result) {
                                    if (result != 'Invalid password' && result != 'error')
                                        window.open(result.replace(/amp;/g, ''), '_blank');
                                    else if (result == 'Invalid password')
                                        toaster.pop('error', '', result);
                                    else
                                        toaster.pop('error', '', 'Some error has occured!');
                                    $scope.password = '';
                                }
                                $scope.inprogress = false;
                                $scope.$apply();
                            });
                        }
                        $scope.$apply();
                    }
                });
            };
        }]
    }
})
