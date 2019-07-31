_satellite.pushAsyncScript(function(event, target, $variables){
  /**
 * Originally modified from iframe embed to JS iife insert by jbeach on 2018-02-28
 * <iframe class="survey-widget" id="iFrameResizer0" scrolling="no" src="https://www.surveygizmo.com/s3/3485729/ARU-Helpfulness-Survey" width="100%" height="425px" frameborder="0"></iframe>
 * Markup Adjustments adapted from https://stackoverflow.com/questions/31206917/iframe-not-pushing-the-div-below-it-down-when-content-expands#31224136 by jbeach
 * APS Dom insertion by aleal on 2018-03-05
 * Adapted for Kiwi by jbeach on 2018-03-06
 * Last updated by jbeach on 2018-12-11
 */
kiwi = window.kiwi || {};
/*---- CREATE OBJECT ---*/
kiwi.surveygizmo = kiwi.surveygizmo || {
    isReady: 0,
    deploySurvey: function(instanceId, surveyName, surveyUrl) {
        var elLander = document.getElementById('lander'),
            elSiteFooter = document.getElementById('siteFooter'),
            surveyDiv = document.createElement('div'),
            surveyIframe = document.createElement('iframe'),
            elSurveyParent,
            elSurveyParent2;
        surveyDiv.id = 'kiwi_surveygizmo_' + instanceId;
        surveyDiv.setAttribute('class','survey-widget kiwi-surveygizmo-container');
        surveyDiv.style = 'position: relative;'+
                          'padding-bottom: 42.25%;'+
                          'height: 0;'+
                          'overflow: hidden;';
        if(elLander) {//lander page template(s) are different than article
            elSurveyParent = document.createElement('div');
            elSurveyParent.setAttribute('class', 'bottom-rail');
            elSurveyParent.style = 'position: relative;';
            elSurveyParent2 = document.createElement('div');
            elSurveyParent2.setAttribute('class', 'container');
            elSurveyParent2.setAttribute('role', 'complimentary');
            elSurveyParent2.style = 'position: relative;background-color:#fff;';
            surveyDiv.style.marginRight ='20px';
        } else {//article page template(s)
            elSurveyParent = document.createElement('div');
            elSurveyParent.setAttribute('class', 'container');
            elSurveyParent.style = 'position: relative;';
            elSurveyParent2 = document.createElement('div');
            elSurveyParent2.setAttribute('class', 'container-fluid');
            elSurveyParent2.style = 'position: relative;';
        }
        elSurveyParent2.appendChild(surveyDiv);
        elSurveyParent.appendChild(elSurveyParent2);
        elSiteFooter.parentNode.insertBefore(elSurveyParent,elSiteFooter);
        surveyIframe.id = 'kiwi_surveygizmo_iframe' + instanceId;
        surveyIframe.setAttribute('class', 'kiwi-surveygizmo-iframe');
        surveyIframe.scrolling = 'no';
        surveyIframe.style = 'position: absolute;'+
                             'top:0;'+
                             'left: 0;'+
                             'width: 100%;'+
                             'height: 100%;'+
                             'border: 0;';
        surveyIframe.name = surveyName;     //'Global Helpfulness Survey';
        surveyIframe.title = surveyName;    //'Global Helpfulness Survey';
        surveyIframe.src = surveyUrl; //'//www.surveygizmo.com/s3/3485729/ARU-Helpfulness-Survey';
        surveyDiv.appendChild(surveyIframe);
        elSurveyParent.style.display='none';
        surveyIframe.onload = kiwi.surveygizmo.show(elSurveyParent);
    },
    show: function(hiddenEl) {
        setTimeout(function(){
            //$chat.addClass('appear');
            hiddenEl.style.display='block';
        }, 500);
    },
    deploy: function(instanceId, surveyName, surveyUrl) {
        if (instanceId && surveyName && surveyUrl) {
            kiwi.surveygizmo.deploySurvey(instanceId, surveyName, surveyUrl);
        } else {
            _satellite.notify('ERROR: Missing surveygizmo instance id or survey name/url values. //e.g. kiwi.surveygizmo.deploy("aps1", "Global Helpfulness Survey", "//www.surveygizmo.com/s3/3485729/ARU-Helpfulness-Survey");');
            return false;
        }
    }
};
kiwi.surveygizmo.isReady = 1;
/*---- DEPLOY OBJECT ---*/
var tries = 0;
if (kiwi.surveygizmo.isReady) {
    kiwi.surveygizmo.deploy(
        'aps1',                                                     //Survey Instance ID
        'Global Helpfulness Survey',                                //Survey iFrame Name/Title
        '//www.surveygizmo.com/s3/3485729/ARU-Helpfulness-Survey'   //Survey iFrame Source URL
    );
} else {
    if (tries < 5) {
        setTimeout(function () {
            tries++;
        }, 300);
    } else {
        _satellite.notify('ERROR: Survey Gizmo deploy timed out after 5 attempts.');
    }
}

/* contents of: //www.surveygizmo.com/s3/3485729/ARU-Helpfulness-Survey
 if(self.SG_evaluate(5) && (self.SG_evaluate(9) "courses/")) {
 self.showQuestion(11)
 } else {
 self.hideQuestion(11);
 self.clearQuestionData('[name |= sgE-3485729-5-11]')
 }
 */

});
