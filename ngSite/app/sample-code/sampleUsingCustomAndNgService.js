(function () {
    'use strict';

    var controllerId = 'sampleControllerWithNgService';
    angular.module('sampleServices', []).controller(controllerId,
        ['$rootScope', 'utilSvc', sample]);

    function sample($rootScope, utilSvc) {
        var useOfUtil = utilSvc;
        $rootScope.title = 'Test Titel';


        return { getValue: getValue };

        function getValue(value) {
            if (useOfUtil.isNumber(value)) {
                console.log(value + ' is a number');
            }
            return value;
        }
    }
})();