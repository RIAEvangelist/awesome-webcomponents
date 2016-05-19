'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-modal.css`);

(
    function(){
        const defaults={

        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <div>
                        ${content.content}
                    </div>
                    ${content.template}
                `;
            }

            attachedCallback(){
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            close(){
                this.classList.remove('modalOn');
            }

            open(){
                this.classList.add('modalOn');
            }
        }

        document.registerElement(
            'awesome-modal',
            Component
        );
    }
)();
