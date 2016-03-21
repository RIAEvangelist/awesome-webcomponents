'use strict';

awesome.requireCSS(`${awesome.path}screens/screenList/awesome-screen-list.css`);


(
    function(){
        let state=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        let defaults={
            screen:'screenList'
        };

        function init(e){
            dispatcher=awesome.dispatchers.component;
            constants = awesome.constants.component;
            action = awesome.constants.action;

            window.off(
                'awesome-ready',
                init
            );

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
                        ${content.content}
                    </div>
                    ${content.template}
                `;

                const appCount=this.querySelector('awesome-screen-icon').length;
                //do something
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.clicked
                );

                window.addEventListener(
                    'resize',
                    this.resize.bind(this)
                );

                setTimeout(
                    function(){
                        const container=this.querySelector('.screensList-container');
                        container.style.top=`calc(50% - ${container.offsetHeight/2}px)`;
                    }.bind(this),
                    1
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                if(key==='style'){
                    return;
                }
                this.createdCallback();
            }


            clicked(e){
                dispatcher.trigger(
                    action.ROUTE_REQUEST,
                    e.target.dataset.screen_name
                );
            }

            resize(e){
                const container=this.querySelector('.screensList-container');
                container.style.top=`calc(50% - ${container.offsetHeight/2}px)`;
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
