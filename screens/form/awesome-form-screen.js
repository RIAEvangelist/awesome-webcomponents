'use strict';

awesome.requireCSS(`${awesome.path}screens/form/awesome-form-screen.css`);
awesome.requireScript(`${awesome.path}components/form/awesome-dynamic-form.js`)

(
    function(){
        let store=null;
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={

        }


        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            // store=awesome.store.boilerplate;

            document.registerElement(
                'awesome-form-screen',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-dynamic-form>
                    </awesome-dynamic-form>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                //just re-render for this simple example
                this.createdCallback();
            }

            update(){
                //just re render this simple example
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
