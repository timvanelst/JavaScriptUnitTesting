/// <reference path="../../../Scripts/angular.js"/>
/// <reference path="../../../Scripts/angular-mocks.js"/>

/// <reference path="../../../app/portal/customer/list.js" />

describe('customer.list', function () {
    beforeEach(module('app'));
    beforeEach(module('common'));

    describe('...', function () {
        var common = {};
        var authService = {};
        var datacontext = {};

        it('...', inject(function ($controller) {
            var controller = $controller('customer.list', inject(function ($rootScope, $location){
                $rootScope: $rootScope, 
                common, 
                authService, 
                datacontext, 
                $location
            }));

        }));
        
    });
});