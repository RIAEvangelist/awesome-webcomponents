'use strict';

awesome.requireCSS(`${awesome.path}screens/screenList/awesome-screen-list.css`);


(
    function(){
        let state=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        let defaults=null;

        function init(e){
            dispatcher=awesome.dispatchers.component;
            constants = awesome.constants.component;
            action = awesome.constants.action;

            defaults={
                screen:'screenList'
            };

            window.off(
                'awesome-ready',
                init
            );

            // state=awesome.stores.auth.state;

            document.registerElement(
                'awesome-screen-list',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <div class='screensList-container'>
                        ${content}
                    </div>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.clicked
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }


            clicked(e){
                dispatcher.trigger(
                    action.ROUTE_REQUEST,
                    e.target.dataset.screen_name
                );
            }
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
)();
