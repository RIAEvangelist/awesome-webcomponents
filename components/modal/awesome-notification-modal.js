'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-notification-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title: '',
            content: '',
        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-modal>
                        <template>
                            <h1>
                                ${this.dataset.title}
                            </h1>

                            <div>
                                ${content.content}
                            </div>
                            <button class = 'closeButton'>
                                OK
                            </button>
                        </template>
                    </awesome-modal>
                    ${content.template}
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.click.bind(this)
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            click(e){
                if(e.target.classList.contains('closeButton')){
                    this.querySelector('awesome-modal').close();
                }
            }

            open(){
                this.querySelector('awesome-modal').open();
            }

        }
        document.registerElement(
            'awesome-notification-modal',
            Component
        );
    }
)();
