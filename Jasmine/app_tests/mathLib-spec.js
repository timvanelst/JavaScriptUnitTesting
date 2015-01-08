/// <reference path="../app/code.js" />

describe('Jasmine', function () {
    it('will add 5 to number', function () {
        var res = mathLib.add5(10);
        expect(res).toEqual(15);
    });
});
