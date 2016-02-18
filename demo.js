(function($){
    $(function(){
        bindEvents();
    });
    
    function bindEvents(){
        window.onload = function(){
            bs = new BestScreen(".screen", {speed:700});
        }   
    }
})(jQuery);