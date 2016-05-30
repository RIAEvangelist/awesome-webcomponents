'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-notification-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title: ''
        };

        const caresAbout = [
            'data-title'
        ];

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
                            <div class = 'contentWrapper'>
                                ${content.content}
                            </div>
                            <button class = 'closeButton'>
                                ${awesome.language.current.ok}
                            </button>
                        </template>
                    </awesome-modal>
                    ${content.template}
                `;

                this.title = this.dataset.title;
                this.ok = awesome.language.current.ok;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.updateLanguage.bind(this)
                );

                this.addEventListener(
                    'click',
                    this.clicked.bind(this)
                );
            }

            detachedCallback(){
                window.off(
                    'awesome-language-set',
                    this.updateLanguage.bind(this)
                );
            }

            attributeChangedCallback(key,oldValue,newValue){
                if(!caresAbout.includes(key)){
                   return;
               }

               if(this.title == newValue.trim()){
                   return;
               }

                this.createdCallback();
            }

            updateLanguage(){
                if(this.ok == awesome.language.current.ok){
                    return;
                }

                this.createdCallback();
            }

            close(){
                this.querySelector('awesome-modal').close();
                this.parentElement.removeChild(this);
            }

            clicked(e){
                if(!e.target.classList.contains('closeButton')){
                    return;
                }
                this.close.bind(this);
            }
        }
        document.registerElement(
            'awesome-notification-modal',
            Component
        );
    }
)();
