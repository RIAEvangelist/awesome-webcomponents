'use strict';

awesome.requireCSS(`${awesome.path}components/form/awesome-dynamic-form.css`);

(
    function(){
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

            document.registerElement(
                'awesome-dynamic-form',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
            }

            attachedCallback(){
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(formData){
                const form = document.querySelector('awesome-dynamic-form');

                const title = document.createElement('h1');
                title.innerHTML = formData.formDefinition.name;
                form.appendChild(title);

                for(const i in formData.fields){

                    if(formData.fields[i].hasOwnProperty('path')){
                        awesome.requireScript(formData.fields[i].path);
                    }

                    const element = document.createElement(formData.fields[i].element);
                    const label = document.createElement('label');
                    label.innerHTML = formData.fields[i].label;
                    for(const j in formData.fields[i]){
                        if(j == 'element'){
                            continue;
                        }
                        element.setAttribute(j,formData.fields[i][j])
                    }
                    form.appendChild(label);
                    form.appendChild(element);
                }

                const separator = document.createElement('div');
                form.appendChild(separator);

                for(const i in formData.actions){
                    const label = formData.actions[i].label;
                    const id = formData.actions[i].id;
                    const actionTrigger = formData.actions[i].actionTrigger;
                    const button = document.createElement('button');

                    button.setAttribute('id', id);
                    button.innerHTML = label;

                    this[id]=function(){
                        const data = this.getElementData(this);
                        console.log(data);
                        dispatcher.trigger(
                            actionTrigger,
                            data
                        );
                    }
                    button.addEventListener(
                        'click',
                        this[id].bind(this)
                    )
                    form.appendChild(button);
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

                    //this is a special case, if more should are added should be a switch case
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
