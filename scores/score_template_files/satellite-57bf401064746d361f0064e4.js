/* global _satellite */
/**
 * Created by jbeach in 2016
 * Updated by jbeach on 2019-03-11
 */
kiwi = window.kiwi || {};
var s_getLoadTime = window.s_getLoadTime || function() {_satellite.notify('Missing function: s_getLoadTime!');return false;};

//var ruleName='KIWI: PLR > 00 Master - Page Bottom > JS Tags';
//_satellite.notify(ruleName);

/* getLoadTime Plug In - Part 2 */
kiwi._pageLoadTime = s_getLoadTime();
/* end getLoadTime Plug In - Part 2 */

