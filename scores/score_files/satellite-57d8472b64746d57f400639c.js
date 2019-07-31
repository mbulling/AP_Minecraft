_satellite.pushAsyncScript(function(event, target, $variables){
  /* global _gscq, _satellite */
/**
 * Configured by jbeach in 2017
 * Updated by jbeach on 2019-05-07
 */
var ruleName='KIWI: PLR > Survey - GetSiteControl - Usability';

(function (w,i,d,g,e,t,s) {w[d] = w[d]||[];t= i.createElement(g);
    t.async=1;t.src=e;s=i.getElementsByTagName(g)[0];s.parentNode.insertBefore(t, s);
})(window, document, '_gscq','script','//widgets.getsitecontrol.com/45324/script.js');

var pageNamePrefix = 'getsitecontrol-usability-';

_gscq.push(['callback','show', function (widgetId) {
    _satellite.notify(ruleName+' > _gscq callback: show > ' + widgetId);
    //TODO: set DDL vals
    _satellite.setVar('Page Name Override', pageNamePrefix+widgetId);
    //TODO: track GSC "page" view
    _satellite.track('cbTrack.pageView.getsitecontrol');
}]);

_gscq.push(['callback','action', function (widgetId) {
    _satellite.notify(ruleName+' > _gscq callback: action > ' + widgetId);
    //TODO: set DDL vals
    _satellite.setVar('Page Name Override', pageNamePrefix+widgetId);
    //TODO: track GSC "action" click
    _satellite.track('cbTrack.click.promoLink.getsitecontrol');
}]);

_gscq.push(['callback','close', function (widgetId) {
    _satellite.notify(ruleName+' > _gscq callback: close > ' + widgetId);
    //TODO: track GSC "close" click
}]);

});
