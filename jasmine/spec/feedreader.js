/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        // made two tests as to be more modular about things.

        it('URLs are defined', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });

        it('URLs are not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Names are defined', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });

        it('Names are not empty', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    describe('The menu', function() {
        /* ensure the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function () {
            // the following will make sure that the menu has the
            // class to make it hidden
            expect($("body").hasClass('menu-hidden')).toBe(true);
            // however, we still need to make sure that whatever
            // is in the class will indeed hide the menu (ie what
            // if the class was empty or altered in some way?)
            // have tried using jasmine-jquery but can't get anything to work
            // TODO: (optional) test CSS
        });

        /* ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('appears when clicking the menu icon for fist time', function () {
            // first click the menu icon
            $('.menu-icon-link').click();
            // now test its behaviour
            // the first click should show the menu, so the menu-hidden class should not be there
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
        it('disappears when clicking the menu icon for the second time', function () {
            // click the menu icon again
            $('.menu-icon-link').click();
            // the class should be added
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            // loadFeed() takes an id and callback as parameters
            // init() passed '0' to loadFeed (the first entry)
            // so pass an id of '0' and callback of done()
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one entry', function () {
            // since app.js is emptying the .feed container and then appending to same container,
            // then check .feed
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });


    });

    describe('New Feed Selection', function() {
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // just compare the text to see if it's the same

        let contentInitial;
        let contentNew;

        // first load the first entry and set contentInitial to text of the element
        // then load the second entry
        // wait for both to be done before the test
        beforeEach(function (done) {
            loadFeed(0, function() {
                contentInitial = $(".feed .entry-link").text();
                console.log(contentInitial);
                done();
            });
            loadFeed(1, function() {
                contentNew = $(".feed .entry-link").text();
                console.log(contentNew);
                done();
            });
        });

        // now see if the text is not the same
        it('changes feed content', function () {
            expect(contentInitial).not.toEqual(contentNew);
        });

    });
}());
