'use strict';

awesome.requireCSS(`${awesome.path}components/list/awesome-list.css`);

(
    function(){
        const defaults={}
        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);
                console.log(content);

                this.innerHTML=`
                    <ul>
                        ${content}
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
