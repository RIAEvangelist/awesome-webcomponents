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
                    const elements = formData.elements;

                    //lets handle the config first
                    if(!elements[i].config){
                        return false;
                    }
                    if(elements[i].config.path){
                        awesome.requireScript(elements[i].config.path);
                    }
                    const newElement = document.createElement(elements[i].config.element);

                    for(const j in elements[i]){
                        const elementData = elements[i][j];
                        switch(j) {
                            case 'attributes':
                                this.assignAttributes(newElement,elementData);
                                break;
                            case 'dataset':
                                this.assignDataset(newElement,elementData);
                                break;
                            case 'properties':
                                this.assignProperties(newElement,elementData);
                                break;
                            case 'eventHandlers':
                                this.assignCallbacks(newElement,elementData);
                                break;
                            default:
                                break;
                        }
                    }
                    this.appendChild(newElement);
                }
            }

            assignAttributes(el, attributes){
                for(const i in attributes){
                    el.setAttribute(i, attributes[i]);
                }
            }

            assignProperties(el, attributes){
                for(const i in attributes){
                    el[i] = attributes[i];
                }
            }

            assignDataset(el, dataset){
                for(const i in dataset){
                    el.setAttribute(`data-${i}`, dataset[i]);
                }
            }

            assignCallbacks(el, eventData){
                if(!eventData.event || !eventData.callback){
                    return false;
                }
                el.addEventListener(
                    eventData.event,
                    eventData.callback
                );
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
