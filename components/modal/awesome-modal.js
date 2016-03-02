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
                let modal = '';

                this.innerHTML=`
                    <div>
                        ${content}
                    </div>
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

            change(e){
                e.preventDefault();
                e.stopPropagation();
                const change = new Event(
                    'click',
                    {
                        'bubbles':true,
                        'cancelable':false
                    }
                );

                this.dispatchEvent(change);
            }
        }

        document.registerElement(
            'awesome-modal',
            Component
        );
    }
)();
