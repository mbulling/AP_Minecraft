_satellite.pushAsyncScript(function(event, target, $variables){
  /**
 * Created by jbeach on 2017-05-15
 * Updated by jbeach on 2018-06-06
 */
kiwi = window.kiwi || {};
kiwi.domReady = kiwi.domReady || {};
kiwi.domReady.navs = kiwi.domReady.navs || false;

var ruleName='KIWI: PLR > 00 Master - DOM Ready > JS Tags - DOM Ready Actions';
//_satellite.notify(ruleName);

//Local Nav Views/Clicks wiring
kiwi.domReady.navs = true;
_satellite.notify(ruleName+': kiwi.domReady.navs = ' + kiwi.domReady.navs);

});
