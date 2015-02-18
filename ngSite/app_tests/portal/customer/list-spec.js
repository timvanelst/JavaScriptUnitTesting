/// <reference path="../../../Scripts/angular.js"/>
/// <reference path="../../../Scripts/angular-mocks.js"/>

/// <reference path="../../../app/portal/customer/list.js" />

describe('customer.list', function () {
    var $rootScopeMock;
    var commonMock;
    var authServiceMock;
    var datacontextMock;
    var $locationMock;

    var customersDataMock = [
        { id: 15, name: 'Customer 1'},
        { id: 18, name: 'Customer 2' },
        { id: 27, name: 'Customer 3' },
    ];

    function createController() {
        return $controller('customer.list', 
        {
            $rootScope: $rootScopeMock,
            common: commonMock, 
            authService: authServiceMock, 
            datacontext: datacontextMock, 
            $location: $locationMock
        });
    };

    beforeEach(function() {
        module('app');

        module(function ($provide) {
            // authServiceMock
            $provide.value('authService', jasmine.createSpyObj('authService', ['']));

            // datacontextMock
            var httpResultMock = function () {
                return {
                    data: customersDataMock
                };
            };
            var getCustomersMock = function () {
                return {
                    then: httpResultMock
                };
            };
            $provide.service('datacontext', function () {
                this.getCustomers = getCustomersMock;
            });

            var loggerMock = jasmine.createSpyObj('logger', ['getLogFn', 'log', 'logError', 'logSuccess', 'logWarning']);
            var activateControllerMock = function (promises, controllerId) {
                return {
                    then: function () { }
                };
            };
            $provide.service('common', function () {
                this.logger = loggerMock;
                this.activateController = activateControllerMock
            });
        });

        inject(function (_$controller_, _$rootScope_, _$location_, common, authService, datacontext) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
            $rootScopeMock = _$rootScope_;
            commonMock = common;
            authServiceMock = authService;
            datacontextMock = datacontext;
            $locationMock = _$location_;
        });
    });

    describe('Customer List', function () {

        it('should be able to set the controller', function(){
            var controller = createController();
            expect(controller).not.toBeUndefined();
        });

        it('should set vm.customers', function () {
            var controller = createController();
            var actualCustomers = controller.customers;
            $rootScopeMock.$digest();
            expect(actualCustomers).not.toBeUndefined();
            expect(actualCustomers).toBe(customersDataMock)
        });
    });
})