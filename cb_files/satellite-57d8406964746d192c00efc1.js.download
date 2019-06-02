_satellite.pushAsyncScript(function(event, target, $variables){
  try {
    cb.apricot.setup.behavior({
                                  radio: {
                                      mode: 'manual',
                                      selector:[]
                                  }
                              });
    var $arr = $('input[type=radio]').not('w-div input[type=radio]'); $.each($arr, function(index, value) {  $(value).cbCustomElement({
                                                                                                                                          type: 'radio'
                                                                                                                                      });
    });
} catch(e) {}

});
