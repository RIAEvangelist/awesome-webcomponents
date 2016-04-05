'use strict';

awesome.requireCSS(`${awesome.path}components/options/awesome-options-dropdown.css`);

(
    function(){
        const defaults={
            label:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <label>${this.dataset.label}</label>
                    <select name='${this.dataset.label}'>
                        ${content.content}
                    </select>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                //basic re-render
                this.createdCallback();
            }
        }

        document.registerElement(
            'awesome-options-dropdown',
            Component
        );
    }
)();
