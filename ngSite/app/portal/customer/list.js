(function () {
    'use strict';

    var controllerId = 'customer.list';
    angular.module('app', []).controller(controllerId,
        ['$rootScope', 'common', 'authService', 'datacontext.customer', '$location', list]);

    function list($rootScope, common, authService, datacontext, $location) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        $rootScope.title = 'klanten';

        vm.customers = [];
        vm.edit = editCustomer;

        activate();

        function activate() {
            var promises = [loadData()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Customer.List View'); });
        }

        function loadData() {
            return datacontext.getCustomers().then(function (httpResult) {
                return vm.customers = httpResult.data;
            });
        }

        function editCustomer(customer) {
            $location.path('customers/' + customer.id);
        };
    }
})();