/**
 * Created by John on 24/03/2017.
 */

describe('E2E: WineController End 2 End Test', function () {

    beforeEach(function () {
        browser.get("http://localhost:8080/#/wines");
    });

    it('should show table data on wine page', function () {
        var trName = 'Naam';
        var trPercentage = 'Percentage';
        var trCountry = 'Land';
        var trDescription = 'Omschrijving';

        var n = element(by.id('name'));
        var p = element(by.id('percentage'));
        var l = element(by.id('land'));
        var d = element(by.id('description'));

        expect(n.getText()).toBe(trName);
        expect(p.getText()).toBe(trPercentage);
        expect(l.getText()).toBe(trCountry);
        expect(d.getText()).toBe(trDescription);
    });

    it('should add a wine', function () {

        browser.get("http://localhost:8080/#/wines/add");

        element(by.model('name')).sendKeys('Bordeaux');
        element(by.model('percentage')).sendKeys('15');
        element(by.model('country')).sendKeys('Frankrijk');
        element(by.model('description')).sendKeys('Lekker bij vis.');

        element(by.id('sbmt')).click();

        var rows = element.all(by.repeater('wine in winesFromStorage')).count();
        expect(rows).toBe(1);
    });

});