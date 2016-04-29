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
                const content = awesome.loadTemplate(this);
                this.innerHTML= `
                    <form>
                        ${content.content}
                    </form>
                    ${content.template}
                `
            }

            attachedCallback(){
                this.formContents = '';
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(formData){
                const form = this.querySelector('form');
                for(const i in formData.elements){
                    const element = formData.element;

                    //lets handle the config first
                    if(!element.config){

                    }
                    if(element.config.path){
                        awesome.requireScript(element.config.path);
                    }
                    const newElement = document.createElement(element.config.element);

                    this.assignAttributes(newElement,element.attributes);
                    this.assignProperties(newElement,element.properties);
                    this.assignDataset(newElement,element.dataset);
                    this.assignEventHandler(newElement,element.eventHandlers);
                    form.appendChild(newElement);
                }
            }
        }

        assignAttributes(el, attributes){
            for(const i in attributes){
                el.setAttribute(i, attributes[i]);
            }
        }

        assignProperties(el, properties){
            for(const prop in properties){
                el[prop] = properties[prop];
            }
        }

        assignDataset(el, dataset){
            for(const key in dataset){
                el.dataset[key]=dataset[i];
            }
        }

        assignEventHandler(el, event){
            if(!event){
                return false;
            }

            if(Array.isArray(event)){
                return this.assignEventHandlers(el,events);
            }

            if(!eventData.event || !eventData.callback){
                return false;
            }
            el.addEventListener(
                eventData.event,
                eventData.callback
            );
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
