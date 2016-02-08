'use strict';

util.requireCSS('components/headers/awesome-header.css');

(
    function(){
        const defaults={
            title:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                util.mergeDataset(this,defaults);

                this.innerHTML=`
                    <header>${this.dataset.title}</header>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }
        }

        document.registerElement(
            'awesome-header',
            Component
        );
    }
)();
