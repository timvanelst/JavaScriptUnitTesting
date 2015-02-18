/// <reference path="../../Scripts/angular.js"/>
/// <reference path="../../Scripts/angular-mocks.js"/>

/// <reference path="../../app/sample-code/sampleUsingCustomAndNgService.js"/>

describe('Mocking a service', function () {
    var mockUtilSvc;
    var $scopeMock;

    function createController() {
        return $controller('sampleControllerWithNgService',
                {
                    $rootScope: $scopeMock,
                    utilSvc: mockUtilSvc
                });
    }

    describe('without mocking the behaviour of the custom service', function () {
        beforeEach(function() {
            module('sampleServices');
            module(function($provide) {
                var utilSvcMock = jasmine.createSpyObj('utilSvc', ['isNumber', 'isDate']);
                $provide.value('utilSvc', utilSvcMock);

                $provide.value('_$rootScope_', jasmine.createSpyObj('_$rootScope_', ['title']));
            });
            

            inject(function (_$controller_, _$rootScope_, utilSvc) {
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $controller = _$controller_;
                $scopeMock = _$rootScope_;
                mockUtilSvc = utilSvc;
            });

        });


        it('should be able to verify whether a mocked method is called', function () {
            var controller = createController();
            //var controller = $controller('sampleControllerWithNgService',
            //    {
            //        $rootScope: $rootScope,
            //        utilSvc: mockUtilSvc
            //    });
            controller.getValue(39);
            expect(mockUtilSvc.isNumber).toHaveBeenCalled();
        });

        it('cannot verify the value of Title, because it is not defined', function ()
        {
            expect($scopeMock.title).toBeUndefined();
        });
    });

    describe('with behaviour of mock of the custom service defined', function () {

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

                $provide.service('_$rootScope_', function () {
                    this.title = jasmine.createSpy("_$rootScope_").and.callFake(function () {
                        return 'mocked Title';
                    });
                });

            });

            inject(function (_$controller_, _$rootScope_, utilSvc) {
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $controller = _$controller_;
                $scopeMock = {title: 'undefined string'};
                mockUtilSvc = utilSvc;
            });
        });

        it('should run an actual test', function () {
            expect(true).toBe(true);
        });

        it('should be able to set the controller to test', function () {

            var controller = createController();
            //var controller = $controller('sampleControllerWithNgService', { utilSvc: mockUtilSvc });
            expect(controller).not.toBeUndefined();
        });

        it('should be able to get the correct value from the controller we are testing', function () {
            //Getting reference of the mocked service
            var controller = createController();
            //var controller = $controller('sampleController', { utilSvc: mockUtilSvc });

            expect(controller.getValue(5)).toBe(5);
        });

        it('should be able to verify with what parameter a mocked method is called', function () {
            var controller = createController();
            //var controller = $controller('sampleControllerWithNgService', { utilSvc: mockUtilSvc });
            controller.getValue(39);
            expect(mockUtilSvc.isNumber).toHaveBeenCalledWith(39);
        });

        it('should be able to verify the value of Title', function () {
            expect($scopeMock.title).toBe('Test Titel');
        });

    });
})