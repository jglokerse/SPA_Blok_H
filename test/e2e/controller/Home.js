/**
 * Created by John on 24/03/2017.
 */

describe('E2E: HomeController End 2 End test', function () {

    beforeEach(function () {
        browser.get("http://localhost:8080/#/");
    });
    
    it('should fill in a name', function () {
        var name = 'John';
        var ele = element(by.id('input_name_user'));
        ele.sendKeys(name);
        //var binded = document.getElementById('name_user').innerHTML;
        var binded = element(by.tagName("span"));
        expect(binded.getText()).toBe(name);
    });

});