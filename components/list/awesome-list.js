'use strict';

awesome.requireCSS(`${awesome.path}components/list/awesome-list.css`);

(
    function(){
        const defaults={
            something:'Boilerplate'
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

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
