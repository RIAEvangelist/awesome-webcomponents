'use strict';

awesome.requireCSS(`${awesome.path}screens/_baseScreen/base.css`);

(
    function(){

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            class BaseScreen extends awesome.component.BaseComponent{
                createdCallback(){
                    this.defaults = this.defaults || {
                        screen: ''
                    }
                    super.createdCallback();

                    this.classList.add(BaseScreen.elementTagName);
                }
            }

            BaseScreen.elementTagName = 'awesome-base-screen';
            awesome.register(BaseScreen);
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)()
