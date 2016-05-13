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
            }

            generate(formData){
                this.createdCallback();
                const form = this.querySelector('form');

                if(formData.formAttributes){
                    assignAttributes(form, formData.formAttributes);
                }
                for(let i = 0; i < formData.formElements.length; i++){
                    const element = formData.formElements[i];
                    if(element.children){
                        generateNested(form, element);
                        continue;
                    }
                    appendElement(form, element);
                }
                return;
            }
        }

        function generateNested(parent ,el){
            //default to fieldset
            let newElementSet = document.createElement('fieldset');
            if(el.config){
                if(el.config.element){
                    newElementSet = document.createElement(el.config.element);
                }
            }
            assignAttributes(newElementSet, el.attributes);

            for(let i = 0; i < el.children.length; i++) {
                const childElement = el.children[i];

                if(childElement.children){
                    generateNested(newElementSet, childElement);
                    continue;
                }
                appendElement(newElementSet, childElement);
            }
            parent.appendChild(newElementSet);
            return;
        }

        function appendElement(parentElement, childData){
            //default to input
            let newChildElement = document.createElement('input');
            if(childData.config){
                if(childData.config.path){
                    awesome.requireScript(childData.path);
                }
                if(childData.config.element){
                    newChildElement = document.createElement(childData.config.element);
                }
                if(childData.config.label){
                    const label = document.createElement('label');
                    label.innerText = childData.config.label;

                    if(childData.attributes.id){
                        label.setAttribute('for', childData.attributes.id);
                    }
                    parentElement.appendChild(label);
                }
            }
            assignAttributes(newChildElement,childData.attributes);
            assignProperties(newChildElement,childData.properties);
            assignDataset(newChildElement,childData.dataset);
            assignEventHandler(newChildElement,childData.eventHandlers);
            parentElement.appendChild(newChildElement);
            return;
        }

        function assignAttributes(el, attributes){
            for(let i in attributes){
                el.setAttribute(i, attributes[i]);
            }
            return;
        }

        function assignProperties(el, properties){
            for(let prop in properties){
                el[prop] = properties[prop];
            }
            return;
        }

        function assignDataset(el, dataset){
            for(let key in dataset){
                el.dataset[key]=dataset[i];
            }
            return;
        }

        function assignEventHandler(el, events){
            if(!Array.isArray(events)){
                return false;
            }
            for (let i = 0; i < events.length; i++) {
                if(!events[i].event || !events[i].callback){
                    return false;
                }
                el.addEventListener(
                    events[i].event,
                    events[i].callback
                );
            }
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
