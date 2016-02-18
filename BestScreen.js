/***
依赖:jquery, jquery.mousewheel, jquery.easing.js, BestScreen.css
html结构以及css样式: 参考demo
author: https://github.com/yishuangxi
***/
(function($){
    function BestScreen(selector, options){
        var defaultOptions = {
            speed:500,
            completeCb:function(bs){
                console.log('complete callback');
            },
            nextOverCb:function(bs){
                console.log('no next slide');
            },
            prevOverCb:function(bs){
                console.log('no prev slide');
            }
        }
        this.options = $.extend({}, defaultOptions, options || {});
        this.selector = selector;
        this.currIdx = 0;
        this.screen = $(this.selector);
        this.box = this.screen.children('.screen-box');
        this.item = this.box.children('.screen-item');
        
        this.init();
        this.bindEvents();
    }
    
    BestScreen.prototype.init = function(){
        this.item.height(getWinHeight());
    }
    BestScreen.prototype.slideTo = function (idx) {
        var self = this;
        if(self.box.is(':animated')) return;
        if(idx >= self.item.length){
            self.options.nextOverCb(self);
            return;
        }else if(idx < 0){
            self.options.prevOverCb(self);
            return ;
        }else{
            self.box.animate({
                marginTop: -idx * getWinHeight()            
            },{
                duration:self.options.speed,
                easing:'easeInQuint',
                complete:function(){
                    self.currIdx = idx;
                    self.options.completeCb(self);
                }
            }); 
        }
    }
    
    BestScreen.prototype.next = function () {
        this.slideTo(this.currIdx + 1); 
    }
    BestScreen.prototype.prev = function () {
        this.slideTo(this.currIdx - 1);   
    }
    
    BestScreen.prototype.bindEvents = function(){
        var self = this;
        this.box.on('mousewheel', function(event) {
            if(event.deltaY > 0){
                self.prev();    
            }else{
                self.next();
            }
            event.stopPropagation();
        });
        
        $(document).keyup(function(e){
            var which = e.which;
            if(which == 37 || which == 38){//left
                self.prev();
            }else if(which == 39 || which == 40){//right
                self.next();
            }
        });
    } 
    
    function getWinHeight(){
        return $(window).height();
    }
    
    function getWinWidth(){
        return $(window).width();
    }
    
    window.BestScreen = BestScreen;
})(jQuery);