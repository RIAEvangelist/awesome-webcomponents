'use strict';

awesome.requireCSS(`${awesome.path}components/form/awesome-dynamic-form.css`);

(
    function(){
        let dispatcher=null;
        let constants = null;
        let action = null;

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
                awesome.mergeDataset(this);
                this.innerHTML= `
                    <form>
                    </form>
                `;
            }

            attachedCallback(){
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(formData){
                const form = this.querySelector('form');
                form.innerHTML = null;

                if(formData.formAttributes){
                    assignAttributes(form, formData.formAttributes);
                }

                for(let i = 0; i < formData.formElements.length; i++){
                    const element = formData.formElements[i];
                    if(element.children){
                        generateNested(element, form);
                        continue;
                    }

                    //lets handle the config first
                    if(!element.config){

                    }


                    if(element.config.path){
                        awesome.requireScript(element.config.path);
                    }
                    const newElement = document.createElement(element.config.element);

                    assignAttributes(newElement,element.attributes);
                    assignProperties(newElement,element.properties);
                    assignDataset(newElement,element.dataset);
                    assignEventHandler(newElement,element.eventHandlers);
                    form.appendChild(newElement);
                }
            }
        }

        function generateNested(el, parent){
            //default to fieldset
            let newElementSet = document.createElement('fieldset');
            if(el.config){
                newElementSet = document.createElement(el.config.element);
            }
            assignAttributes(newElementSet, el.attributes);

            for(var i = 0; i < el.children.length; i++) {
                const childElementData = el.children[i];
                //defualt to input
                let newChildElement = document.createElement('input');
                if(childElementData.config){
                    if(childElementData.config.path){
                        awesome.requireScript(childElementData.path);
                    }
                    if(childElementData.config.element){
                        newChildElement = document.createElement(childElementData.config.element);
                    }
                }
                assignAttributes(newChildElement,childElementData.attributes);
                assignProperties(newChildElement,childElementData.properties);
                assignDataset(newChildElement,childElementData.dataset);
                assignEventHandler(newChildElement,childElementData.eventHandlers);
                newElementSet.appendChild(newChildElement);
            }
            parent.appendChild(newElementSet);
            return;
        }

        function assignAttributes(el, attributes){
            for(const i in attributes){
                el.setAttribute(i, attributes[i]);
            }
            return;
        }

        function assignProperties(el, properties){
            for(const prop in properties){
                el[prop] = properties[prop];
            }
            return;
        }

        function assignDataset(el, dataset){
            for(const key in dataset){
                el.dataset[key]=dataset[i];
            }
            return;
        }

        function assignEventHandler(el, event){
            if(!event){
                return false;
            }

            if(Array.isArray(event)){
                return this.assignEventHandlers(el,events);
            }

            if(!event.event || !event.callback){
                return false;
            }
            el.addEventListener(
                event.event,
                event.callback
            );
            return;
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
