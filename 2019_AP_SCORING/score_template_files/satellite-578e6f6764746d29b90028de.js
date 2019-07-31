/**
 * Created by jbeach in 2016
 * Updated by jbeach on 2019-07-23
 */
kiwi = window.kiwi || {};
kiwi.util = kiwi.util || {};
s = window.s || {};
var s_gi = window.s_gi || function() {return s;};
cbTrackData = window.cbTrackData || {};

//var ruleName='KIWI: PLR > 00 Master - Page Top > JS Tags';
//_satellite.notify(ruleName);

/* getLoadTime Plug In - Part 1 */
var s_inHeadTS=(new Date()).getTime(); // older browser support
var s_loadT;
var s_getLoadTime = function() {
    //var funcName = 'KIWI: Function > s_getLoadTime';
    //_satellite.notify(funcName);
    if(!s_loadT){
        var b=new Date().getTime(),
            o=window.performance?performance.timing:0,
            a=o?o.requestStart:s_inHeadTS||0;
        s_loadT=a?Math.round((b-a)/100):'';
    }
    return s_loadT;
};
s_getLoadTime(); //initial call to plugin
/* end getLoadTime Plug In - Part 1 */

// Kiwi
kiwi.analyticsReadyCheckAttempts = 1;
kiwi.functions = {
    track: {
        /**
         * Check for analytics loaded before before triggering page track (default)
         * (optionally pass in a variable check function instead) valToCheck, checkFn
         * Will timeout after a watchdog interval of 5000 (5 sec).
         * adapted from Jan Exner: https://webanalyticsfordevelopers.com/2015/07/07/quick-tip-delayed-tracking-with-dtm/
        */
        pageWhenReady: function(predicateFn, checkObj) {
            var funcName = 'KIWI: Function > track > pageWhenReady'; //test case: IAM+Apricot Page
            _satellite.notify(funcName+'() > Begin');
            // get the constants we need
            var checkInterval = 100; //_satellite.getVar('Check Interval');
            var delayTime = 1000; //_satellite.getVar('Delay Time');
            // watchdog that kills the interval after 5s
            var wId = setTimeout(function() {
                _satellite.notify(funcName+' > Inside Timeout');
                clearInterval(intId);
            }, 5000);
            var intervalIdx = 0;
            //create the wait loops + actual function to execute
            var intId = setInterval(function() {
                _satellite.notify(funcName+' > Inside Interval');
                if (checkFunction(intervalIdx)) {
                    // cancel the outer loop
                    clearInterval(intId);
                    // cancel the watchdog
                    if (wId) clearTimeout(wId);
                    // launch the delayed function
                    setTimeout(function() {
                        _satellite.notify(funcName+' > Ready!');
                        _satellite.track('cbTrack.pageViewTrack');
                    }, delayTime);
                }
                intervalIdx++;
            }, checkInterval);
            var checkFunction = function(idx) {
                var cmet = false;
                if (predicateFn) {
                    if (checkObj &&
                        typeof checkObj.nthInterval !== 'undefined') {
                        cmet = predicateFn(idx,checkObj.nthInterval);
                    } else {
                        cmet = predicateFn(idx);
                    }
                } else { //default check function
                    _satellite.notify('KIWI: Check if sc tool initialized:');
                    var aa = _satellite.getToolsByType('sc')[0];
                    cmet = (typeof aa !== 'undefined' &&
                            typeof aa.initialized !== 'undefined' &&
                            aa.initialized);
                }
                return cmet;
            };
        },
        dynamicDownloadLinkClick: function(e) {
            //replicate KIWI: EBR > Click > Dynamic Download Link
            var funcName = 'KIWI: Function > track > dynamicDownloadLinkClick';
            _satellite.notify(funcName + '> Begin');
            kiwi._elementToTest = e.currentTarget;
            _satellite.track('cbTrack.click.dynamicDownloadLink');
        },
        promoLinkClick: function(e) {
            //replicate KIWI: EBR > Click > Promo Link
            var funcName = 'KIWI: Function > track > promoLinkClick';
            _satellite.notify(funcName + '> Begin');
            kiwi._elementToTest = e.currentTarget;
            _satellite.track('cbTrack.click.promoLink');
        },
        profileWidgetDisplayChange: function(e) {
            //replicate KIWI: EBR > Click > Promo Link
            var funcName = 'KIWI: Function > track > profileWidgetDisplayChange';
            _satellite.notify(funcName + '> Begin');
            kiwi.widgetInstances = kiwi.widgetInstances || {};
            kiwi.widgetInstances.profile = kiwi.widgetInstances.profile || {};
            kiwi.widgetInstances.profile.action = 'Track Link';
        },
        navLinkClick: function(e) {
            //replicate KIWI: EBR > Click > Nav Link
            var funcName = 'KIWI: Function > track > localNavLinkClick';
            _satellite.notify(funcName + '> Begin');
            kiwi._elementToTest = e.currentTarget;
            var ckname = 'cb_kiwi_lnav',
                ckval = this.getAttribute('data-cb-lnav');
            //set cookie on main domain (not subdomain) for next page track to catch
            document.cookie = ckname+'='+ckval+'; path=/; domain=.collegeboard.org';
        },
        addCollegeListMobile: function(e) {
            var funcName = 'KIWI: Function > track > addCollegeListMobile';
            _satellite.notify(funcName+'> Begin');
            _satellite.track('cbTrack.bfm.collegeListAdd');
        }
    }
};

/**
 * Check for kiwi.util.extend loaded before before triggering provided function
 * Will timeout after a watchdog interval of 5000 (5 sec).
 * adapted from Jan Exner: https://webanalyticsfordevelopers.com/2015/07/07/quick-tip-delayed-tracking-with-dtm/
*/
kiwi.pageIsNew = true;
kiwi.pageTrackReady = true;
kiwi.functions.track.fireFnWhenReady = function (fnToFireWhenReady, predicateFn) {
    var fnName = 'KIWI: Function > track > fireFnWhenReady'; //test case: IAM+React Page
    _satellite.notify(fnName+'() > Begin');
    // get the constants we need
    var checkInterval = 100,
        delayTime = 300,
        watchDogTime = 5000, 
        intervalIdx = 0,
        defaultCheckFn = function(idx) {
            var cmet = false;
            //default check function
            cmet = (typeof kiwi !== 'undefined' &&
                    typeof kiwi.util !== 'undefined' &&
                    typeof kiwi.util.extend !== 'undefined');
            _satellite.notify('KIWI: Default Check function (kiwi.util.extend exists) is met:'+cmet);
            return cmet;
        },
        checkFn = predicateFn || defaultCheckFn;

    // watchdog that kills the interval after 5s
    var wId = setTimeout(function() {
        _satellite.notify(fnName+' > Inside Timeout');
        clearInterval(intId);
    }, watchDogTime);
    //create the wait loops + actual function to execute
    var intId = setInterval(function() {
        _satellite.notify(fnName+' > Inside Interval');
        if (checkFn(intervalIdx)) {
            // cancel the outer loop
            clearInterval(intId);
            // cancel the watchdog
            if (wId) clearTimeout(wId);
            // launch the delayed function
            setTimeout(function() {
                _satellite.notify(fnName+' > Ready!');
                //fire event!
                fnToFireWhenReady();
            }, delayTime);
        }
        intervalIdx++;
    }, checkInterval);
};

/** 
 * Merge Application DL into the Kiwi DDL
 * If Kiwi DDL hasn't yet initialized, hold the ADL and merge when ready
 * @param   {Object}   applicationDataLayer  The application Data Layer object
*/
kiwi.mergeDdlTries = 1;
kiwi.mergeDdl = function(applicationDataLayer) {
    _satellite.notify('kiwi.mergeDDL(): Function Start, applicationDataLayer = '+ JSON.stringify(applicationDataLayer));
    if (typeof kiwi.ddl === 'undefined') {
        kiwi.ddl = applicationDataLayer;
        _satellite.notify('kiwi.mergeDDL(): No merge needed, kiwi.ddl = '+ JSON.stringify(kiwi.ddl));
        return true;
    } else {
        if (kiwi.mergeDdlTries <= 10) {
            if (kiwi.util.extend) {
                _satellite.notify('kiwi.mergeDDL(): Function kiwi.util.extend found after ' + kiwi.mergeDdlTries + ' attempt(s).');
                _satellite.notify('kiwi.mergeDDL(): Before merge, kiwi.ddl = '+ JSON.stringify(kiwi.ddl));
                kiwi.ddl = kiwi.util.extend(true, kiwi.ddl, applicationDataLayer);
                _satellite.notify('kiwi.mergeDDL(): After merge, kiwi.ddl = '+ JSON.stringify(kiwi.ddl));
            } else {
                _satellite.notify('kiwi.mergeDDL(): Function kiwi.util.extend not found after ' + kiwi.mergeDdlTries + ' attempt(s).  Will try again in 2 seconds.');
                setTimeout(function () {
                    kiwi.mergeDdl(applicationDataLayer);
                    kiwi.mergeDdlTries++;
                }, 200);
            }
        } else {
            _satellite.notify('kiwi.mergeDDL(): Function kiwi.util.extend not found after 10 attempts.');
            return false;
        }
    }
};

/* These custom event listeners allow us to have more control over page tracking from SPAs and along with Widgets */
kiwi.trackTriggersCleanSlate = function() {
    _satellite.notify('KIWI LISTENER: kiwi.trackTriggersCleanSlate() was called');
    kiwi.aaTrackCalls = {totalSinceLastTrack: 0, currentIncrement: 0};
    kiwi.spaTrackCalls = {totalSinceLastTrack: 0, currentIncrement: 0};
    kiwi.widgetTrackCalls = {totalSinceLastTrack: 0, currentIncrement: 0};
    kiwi.pageTrackTriggers = {aa: false, spa: false};
    kiwi.widgetTrackTriggers = {page: false, widget: false};
};
kiwi.widgetTrack = false;
kiwi.pageTrack = false;
// actual page load = clean slate
kiwi.trackTriggersCleanSlate();
document.addEventListener('kiwi.ready.aa', function() { //adobe analytics is ready to track page
    _satellite.notify('KIWI LISTENER: kiwi.ready.aa fired');
    kiwi.pageTrackTriggers.aa = true;
    if (kiwi._thisPage.siteSettings.appType.match(/^spa-/i)) {
        if (kiwi.pageTrackTriggers.spa) {
            _satellite.notify('KIWI LISTENER: aa and spa are both ready to track page');
            document.dispatchEvent(new CustomEvent('kiwi.ready.page', {'bubbles': true}));
        } else {
            _satellite.notify('KIWI LISTENER: aa is waiting for spa to track page');
        }
    } else {
        _satellite.notify('KIWI LISTENER: aa is ready to track (not waiting for spa)');
        document.dispatchEvent(new CustomEvent('kiwi.ready.page', {'bubbles': true}));
    }
});
document.addEventListener('kiwi.ready.spa', function() { //spa is ready to track page
    _satellite.notify('KIWI LISTENER: kiwi.ready.spa fired');
    kiwi.pageTrackTriggers.spa = true;
    if (kiwi.pageTrackTriggers.aa) {
        _satellite.notify('KIWI LISTENER: spa and aa are both ready to track page');
        document.dispatchEvent(new CustomEvent('kiwi.ready.page', {'bubbles': true}));
    } else {        
        _satellite.notify('KIWI LISTENER: spa is waiting for aa to track page');
    }
});
document.addEventListener('kiwi.ready.page', function() { //page is ready to track
    _satellite.notify('KIWI LISTENER: kiwi.ready.page fired');
    kiwi.widgetTrackTriggers.page = true;
    kiwi.pageTrack = true;
    if (kiwi._thisPage.hasAtlas) {
        if (kiwi.widgetTrackTriggers.widget) {
            _satellite.notify('KIWI LISTENER: page and widgets are both ready to track');
            document.dispatchEvent(new CustomEvent('kiwi.ready.pageTrack', {'bubbles': true}));
        } else {
            _satellite.notify('KIWI LISTENER: page is waiting for widgets to track');
        }
     } else {
        _satellite.notify('KIWI LISTENER: page is ready to track (not waiting for widgets)');
        document.dispatchEvent(new CustomEvent('kiwi.ready.pageTrack', {'bubbles': true}));
    }
});
document.addEventListener('kiwi.ready.widget', function() { //widget tracker object is ready
    _satellite.notify('KIWI LISTENER: kiwi.ready.widget fired');
    kiwi.widgetTrackTriggers.widget = true;
    kiwi.widgetTrack = true;
    if (kiwi.widgetTrackTriggers.page && kiwi.pageTrack) {
        _satellite.notify('KIWI LISTENER: widgets and page are both ready to track');
        document.dispatchEvent(new CustomEvent('kiwi.ready.pageTrack', {'bubbles': true}));
    } else if (!kiwi.pageTrack) {
        _satellite.notify('KIWI LISTENER: widgets are waiting for page to track');
    } else {
        _satellite.notify('KIWI LISTENER: widgets are set to link track');
        document.dispatchEvent(new CustomEvent('kiwi.ready.widgetTrack', {'bubbles': true}));
    }
});
document.addEventListener('kiwi.ready.pageTrack', function() { //fire the page track!
    _satellite.notify('KIWI LISTENER: kiwi.ready.pageTrack fired; kiwi.pageTrack = '+kiwi.pageTrack);
    document.querySelector('html').dispatchEvent(new CustomEvent('kiwi.trackTrigger.page', {'bubbles': true}));
});
document.addEventListener('kiwi.ready.widgetTrack', function() { //fire the widgets link track
    _satellite.notify('KIWI LISTENER: kiwi.ready.widgetTrack fired; kiwi.pageTrack = '+kiwi.pageTrack);
    document.querySelector('html').dispatchEvent(new CustomEvent('kiwi.trackTrigger.widget', {'bubbles': true}));
});

/* Legacy S Object */
s.getValOnce = function() {return true;};
s.t = function() {_satellite.track('handleLegacy.sCode.t');}; //needed by NSAT, BFM and lookup widgets, ...
/* end Legacy S Object */

/* Legacy common analytics functions override */
window.ajaxPage = function(pageName) {
/* original
    ajaxPageCall=true;
    var s=s_gi(s_account);
    s.pageName=pageName;
    s.channel=channel;
    s.t();
 */
    _satellite.setVar('Page Name Override', pageName);
    _satellite.track('cbTrack.pageView');
};
window.ajaxPageError= function(errorType, errorCode) {
    /* original
    var s=s_gi(s_account);
    s.linkTrackVars='prop11,prop12,prop13';
    s.prop11=errorType;
    s.prop12=errorCode;
    s.prop13=s.pageName;
    s.tl(this,'o','ajax error tracking');
    */
    _satellite.setVar('Ajax Error Data', {type: errorType, code: errorCode});
    _satellite.track('cbTrack.legacy.ajaxError');
};
/* end Legacy common analytics functions override */

/* Polyfills */
/* IE support for element.closest
 * Taken from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest 
 * Configured by jbeach on 2019-01-15
 */
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

