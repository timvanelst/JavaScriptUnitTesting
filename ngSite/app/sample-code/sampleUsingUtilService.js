(function () {
    'use strict';

    var controllerId = 'sampleController';
    angular.module('sampleServices', []).controller(controllerId,
        ['utilSvc', sample]);

    function sample(utilSvc) {
        var useOfUtil = utilSvc;

        return { getValue: getValue };

        function getValue(value) {
            if (useOfUtil.isNumber(value)) {
                console.log(value + ' is a number');
            }
            return value;
        }
    }
})();