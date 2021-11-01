
var ajaxUtils = (function(){
    
    function simulate(callbackFn) {
        $.mobile.loading( "show", {
            text: "Carregando",
            textVisible: true,
            textonly: false
        });
        setTimeout(function(){
            $.mobile.loading( "hide" );
            callbackFn();
        },1000);
    }
    
    return {
        simulate: simulate
    };
})();