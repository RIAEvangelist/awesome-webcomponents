'use strict';

awesome.requireCSS(`${awesome.path}components/form/awesome-dynamic-form.css`);

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
                'awesome-dynamic-form',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <p>Dynamic Form Component</p>
                `;
            }

            attachedCallback(){
                // this.store.on(
                //     'change',
                //     update.bind(this)
                // )
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                //just re-render for this simple example
                this.createdCallback();
            }

            generate(formData){
                const form = document.querySelector('awesome-dynamic-form');
                if(formData.hasOwnProperty('fields')){
                    for(const i in formData.fields){
                        const newEl = document.createElement(formData.fields[i].type);
                        for(const j in formData.fields[i]){
                            if(j == 'type'){
                                continue;
                            }
                            newEl.setAttribute(j,formData.fields[i][j]);
                        }
                        form.appendChild(newEl);
                    }
                }
            }

            // update(){
            //     //just re render this simple example
            //     this.createdCallback();
            // }
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
