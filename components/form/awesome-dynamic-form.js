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
            }

            attachedCallback(){
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            generate(formData){
                for(const i in formData.elements){
                    const element = formData.element;

                    //lets handle the config first
                    if(!element.config){
                        //should default in here
                    }
                    if(element.config.path){
                        awesome.requireScript(element.config.path);
                    }
                    const newElement = document.createElement(element.config.element);

                    this.assignAttributes(newElement,element.attributes);
                    this.assignProperties(newElement,element.properties);
                    this.assignDataset(newElement,element.dataset);
                    this.assignEventHandler(newElement,element.eventHandlers);

                    // for(const j in element){
                    //     const elementData = element[j];
                    //     switch(j) {
                    //         case 'attributes':
                    //             this.assignAttributes(newElement,elementData);
                    //             break;
                    //         case 'dataset':
                    //             this.assignDataset(newElement,elementData);
                    //             break;
                    //         case 'properties':
                    //             this.assignProperties(newElement,elementData);
                    //             break;
                    //         case 'eventHandlers':
                    //             this.assignCallbacks(newElement,elementData);
                    //             break;
                    //         default:
                    //             break;
                    //     }
                    // }
                    this.appendChild(newElement);
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

        assignEventHandlers(){

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
