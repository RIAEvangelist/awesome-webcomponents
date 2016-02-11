'use strict';

awesome.requireCSS(`${awesome.path}components/list/awesome-list.css`);

(
    function(){
        const defaults={}
        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <ul>
                        ${this.innerHTML}
                    </ul>
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
            'awesome-list',
            Component
        );
    }
)();
