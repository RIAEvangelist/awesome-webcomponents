'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-error-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title: '',
            icon: '',
            content: '',
        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-modal>
                        <template>
                            <img
                                class = 'icon'
                                src = '${this.dataset.icon}'
                            ></img>
                            <h1>
                                ${this.dataset.title}
                            </h1>
                            <p>
                                ${this.dataset.content}
                            </p>
                            <button class = 'closeButton'>
                                OK
                            </button>
                        </template>
                    </awesome-modal>
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
            'awesome-error-modal',
            Component
        );
    }
)();
