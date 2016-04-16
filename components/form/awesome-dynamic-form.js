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

                for(const i in formData.fields){
                    const element = document.createElement(formData.fields[i].element);
                    for(const j in formData.fields[i]){
                        element.setAttribute(j,formData.fields[i][j])
                    }
                    form.appendChild(element);
                }

                for(const i in formData.actions){
                    const key = formData.actions[i].label;
                    const actionTrigger = formData.actions[i].actionTrigger;

                    this[key]=function(){
                        const data = this.getElementData(this);
                        console.log(data);
                        // @TODO trigger data from here
                        // dispatcher.trigger(
                        //     actionTrigger,
                        //     data
                        //);
                    }
                }
            }

            getElementData(scope){
                let data = {};
                for(const j in scope.children){
                    if(!scope.children[j].id){
                        continue;
                    };
                    let id = scope.children[j].id;
                    data[id] = {};
                    if(scope.children[j].type == 'radio'){
                        data[id].checked = scope.children[j].checked;
                    }
                    data[id].value = scope.children[j].value;
                    data[id].dataset = {};
                    for(const k in scope.children[j].dataset){
                        data[id].dataset[k] = scope.children[j].dataset[k];
                    }
                }
                return(data);
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
