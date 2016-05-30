'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-modal.css`);

(
    function(){
        const defaults={
        };

        const caresAbout = [

        ];

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
                this.classList.add('modalOn');
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            close(){
                this.classList.remove('modalOn');
                this.parentElement.removeChild(this);
            }
        }

        document.registerElement(
            'awesome-modal',
            Component
        );
    }
)();
