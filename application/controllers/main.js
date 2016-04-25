/**
 * Created by al1mirage on 4/24/16.
 */
angular.module("meetingsCalendar").controller("main", ["$scope", "config", "gapiLoader", function($scope, config, gapiLoader) {
    "use strict";

    $scope.isAuthorized = false;
    $scope.calendar = {
        summary: "Loading, please wait..."
    };

    $scope.checkAuth = function() {
        gapiLoader.then(function(gapi) {
            $scope.gapi = gapi;

            $scope.gapi.auth.authorize({
                "client_id": config.googleAuth.id,
                "scope": config.googleAuth.scope,
                "immediate": true
            }, $scope.handleAuth);
        });
    };

    $scope.launchAuth = function() {
        $scope.gapi.auth.authorize({
            "client_id": config.googleAuth.id,
            "scope": config.googleAuth.scope,
            immediate: false
        }, $scope.handleAuth);
    };

    $scope.handleAuth = function(authResult) {
        if (authResult && !authResult.error) {
            $scope.isAuthorized = true;
            $scope.loadUpcomingEvents();
        }
        //F*king disaster :(
        $scope.$apply();
    };

    $scope.loadUpcomingEvents = function() {
        $scope.gapi.client.load("calendar", "v3", function() {
            //TODO: display intersections between different user's calendars
            var request = $scope.gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: (new Date()).toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime"
            });

            request.execute(function(response) {
                $scope.calendar = response;
                console.log(response);
                $scope.Math = Math;
                //Why should I always re-call $scope.$apply, what the heck is it?
                $scope.$apply();
            });
        });
    };

    $scope.checkAuth();

}]);