/// <reference path="../../Scripts/angular.js"/>
/// <reference path="../../Scripts/angular-mocks.js"/>

/// <reference path="../../app/sample-code/sampleUsingUtilService.js"/>

describe('Mocking a service', function () {
    var mockUtilSvc;

    describe('without mocking the behaviour', function () {
        beforeEach(function() {
            module('sampleServices', function($provide) {
                var utilSvcMock = jasmine.createSpyObj('utilSvc', ['isNumber', 'isDate']);
                $provide.value('utilSvc', utilSvcMock);
            });

            inject(function (utilSvc) {
                mockUtilSvc = utilSvc;
            });

        });

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        it('should be able to verify whether a mocked method is called', function () {
            var controller = $controller('sampleController', { utilSvc: mockUtilSvc });
            controller.getValue(39);
            expect(mockUtilSvc.isNumber).toHaveBeenCalled();
        });
    });

    describe('with behaviour of mock defined', function () {

        beforeEach(function () {
            module('sampleServices', function ($provide) {
                $provide.service('utilSvc', function () {
                    this.isNumber = jasmine.createSpy("isNumber Spy").and.callFake(function (num) {
                        return true
                    });

                    this.isDate = jasmine.createSpy('isDate').and.callFake(function (date) {
                        return true;
                    });
                });
            });

            inject(function (utilSvc) {
                mockUtilSvc = utilSvc;
            });
        });

        beforeEach(inject(function (_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        it('should run an actual test', function () {
            expect(true).toBe(true);
        });

        it('should be able to set the controller to test', function () {

            var controller = $controller('sampleController', { utilSvc: mockUtilSvc });
            expect(controller).not.toBeUndefined();
        });

        it('should be able to get the correct value from the controller we are testing', function () {
            //Getting reference of the mocked service
            var controller = $controller('sampleController', { utilSvc: mockUtilSvc });

            expect(controller.getValue(5)).toBe(5);
        });

        it('should be able to verify with what parameter a mocked method is called', function () {
            var controller = $controller('sampleController', { utilSvc: mockUtilSvc });
            controller.getValue(39);
            expect(mockUtilSvc.isNumber).toHaveBeenCalledWith(39);
        });


    });
})