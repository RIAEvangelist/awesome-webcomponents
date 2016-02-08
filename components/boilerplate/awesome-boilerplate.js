'use strict';

util.requireCSS('components/boilerplate/awesome-boilerplate.css');

(
    function(){
        const defaults={
            something:'Boilerplate'
        }

        class Component extends HTMLElement{
            createdCallback(){
                util.mergeDataset(this,defaults);

                this.innerHTML=`
                    <p>${this.dataset.something}</p>
                    ${this.innerHTML}
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }
        }

        document.registerElement(
            'awesome-boilerplate',
            Component
        );
    }
)();
