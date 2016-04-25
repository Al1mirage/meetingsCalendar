/**
 * Created by al1mirage on 4/24/16.
 */
angular.module("meetingsCalendar").factory("gapiLoader", [
    "$document", "$q", "$rootScope", "$window", function($document, $q, $rootScope, $window) {
        "use strict";

        var def = $q.defer();

        $window.gapiInit = function() {
            $rootScope.$apply(function() {
                def.resolve($window.gapi);
            });
        };

        var scriptTag = $document[0].createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.async = true;
        scriptTag.src = "https://apis.google.com/js/client.js?onload=gapiInit";

        var s = $document[0].getElementsByTagName("body")[0];
        s.appendChild(scriptTag);

        return def.promise;
    }
]);