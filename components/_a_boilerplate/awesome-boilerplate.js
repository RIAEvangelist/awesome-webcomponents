'use strict';

awesome.requireCSS(`${awesome.path}components/_a_boilerplate/awesome-boilerplate.css`);

(
    function(){
        const defaults={
            something:'Boilerplate'
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <p>${this.dataset.something}</p>
                    <div>${content.content}</div>

                    <!-- preserve content template so it isn't lost on re-render -->
                    ${content.template}
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
            'awesome-boilerplate',
            Component
        );
    }
)();
