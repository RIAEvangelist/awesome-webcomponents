'use strict';

awesome.requireCSS(`${awesome.path}components/title/awesome-title.css`);

(
    function(){
        const defaults={
            title:'Awesome Title'
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`<h1>${this.dataset.title}</h1>`;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }
        }

        document.registerElement(
            'awesome-title',
            Component
        );
    }
)();
