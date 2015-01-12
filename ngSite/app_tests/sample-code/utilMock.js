/// <reference path="../../Scripts/angular.js"/>
/// <reference path="../../Scripts/angular-mocks.js"/>

/// <reference path="../../app/sample-code/utilService.js"/>

module(function ($provide) {
    $provide.service('util', function () {
        this.isNumber = jasmine.createSpy('isNumber').andCallFake(function (num) {
            //a fake implementation
        });
        this.isDate = jasmine.createSpy('isDate').andCallFake(function (num) {
            //a fake implementation
        });
    });
});

//Getting reference of the mocked service
var mockUtilSvc;

inject(function (util) {
    mockUtilSvc = util;
});