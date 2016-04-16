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
                        if(typeof formData.fields[i].type === 'object'){
                            const nested = document.createElement('input');
                            nested.setAttribute('type', formData.fields[i].type.input.type);
                            nested.setAttribute('name', formData.fields[i].name);
                            nested.setAttribute('value', formData.fields[i].value);
                            nested.setAttribute('id', formData.fields[i].id);
                            form.appendChild(nested);
                        }else{
                            const normal = document.createElement(formData.fields[i].type);
                            for(const j in formData.fields[i]){
                                normal.setAttribute(j,formData.fields[i][j])
                            }
                            form.appendChild(normal);
                        }
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
