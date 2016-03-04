'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-error-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title: '',
        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-modal>
                        <template>
                            <div class = 'flaticon-signs'>

                            </div>
                            <h1>
                                ${this.dataset.title}
                            </h1>
                            <div class = 'contentWrapper'>
                                ${content.content}
                            </div>
                            <br/>
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
                    this.clicked.bind(this)
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            clicked(e){
                if(!e.target.classList.contains('closeButton')){
                    return;
                }
                this.querySelector('awesome-modal').close();
            }

            open(){
                this.querySelector('awesome-modal').open();
            }

        }
        document.registerElement(
            'awesome-error-modal',
            Component
        );
    }
)();
