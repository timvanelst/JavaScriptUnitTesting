/// <reference path="../../Scripts/angular.js"/>
/// <reference path="../../Scripts/angular-mocks.js"/>
/// <reference path="../../Scripts/angular-animate.js"/>
/// <reference path="../../Scripts/angular-route.js"/>
/// <reference path="../../Scripts/angular-sanitize.js"/>

/// <reference path="../../Scripts/ui-bootstrap-tpls-0.10.0.js"/>

/// <reference path="../../app/app.js"/>
/// <reference path="../../app/common/common.js"/>
/// <reference path="../../app/common/bootstrap/bootstrap.dialog.js"/>

/// <reference path="../../app/services/datacontext.js"/>


describe('HotTowel.Angular services: ', function () {
    // Before each test is run, load the 'app' module and use
    // the angular.mock.inject() function to inject the service
    beforeEach(function () {
        module('app');
    });

    describe('datacontext', function () {
        var datacontext;

        beforeEach(function () {
            inject(_logger_);

            inject(function ($q, $rootScope, $timeout) {
            });

            module(function($provide) {
                $provide.service('common', function() {
                    // mocking common
                    this.logger = jasmine.createSpy('isDate').andCallFake(function ($log) {
                        //a fake implementation
                    });
                });
            })
            inject(function (_datacontext_) {
                datacontext = _datacontext_;
            });
        });

        it('should have a getMessageCount() function', function () {
            expect(angular.isFunction(datacontext.getMessageCount)).toBe(true);
        });
    });
});

//describe('HotTowel.Angular services: ', function () {
//    // Before each test is run, load the 'app' module and use
//    // the angular.mock.inject() function to inject the service
//    beforeEach(function () {
//        module('app');

//    });

//    describe('datacontext', function () {
//        beforeEach(function () {
//            module('app');
//            inject(function ($q, $rootScope, $timeout) {
//            });
//        });

//        it('should have a getMessageCount() function', function () {
//            var $injector = angular.injector(['common']);
//            $injector.invoke('datacontext');
//            //$injector.invoke(function(common) {

//            //});
//            //expect(true).toBe(true);
//            //expect(angular.isFunction(datacontext.getPeople)).toBe(true);
//            //expect(angular.isFunction(datacontext.getMessageCount)).toBe(true);
//        });
//    });
//});