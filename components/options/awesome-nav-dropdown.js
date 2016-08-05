'use strict';

awesome.requireCSS(`${awesome.path}components/options/awesome-nav-dropdown.css`);

(
    function(){
        let store=null;
        let dispatcher=null;
        let constants = null;
        let action = null;

        const defaults={
            label:''
        }

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            document.registerElement(
                'awesome-nav-dropdown',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content = awesome.loadTemplate(this);

                this.innerHTML=`
                    <button class='navButton'>
                        ${this.dataset.label}

                        <span class='flaticon-icons-arrows'>
                        </span>
                    </button>

                    <div class='content'>
                        ${content.content}
                    </div>
                `;
            }

            attachedCallback(){
            }

            detachedCallback(){
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
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
