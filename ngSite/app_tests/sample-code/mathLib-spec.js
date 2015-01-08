/// <reference path="../../app/sample-code/code.js" />

describe('Jasmine', function () {
    it('will add 5 to number', function () {
        var res = mathLib.add5(10);
        expect(res).toEqual(15);
    });
});
