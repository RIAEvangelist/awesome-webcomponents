'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-expandable-dialog.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);
awesome.requireScript(`${awesome.path}components/header/awesome-header.js`);

(
    function(){
        const defaults={
            icon:'',
            title:'',
            header:true
        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                let header='';

                if(this.dataset.header==='true'){
                    header=`
                        <awesome-header
                            data-icon='${this.dataset.icon}'
                            data-title='${this.dataset.title}'
                        ></awesome-header>
                    `;
                }

                this.innerHTML=`
                    <awesome-dialog>
                        ${header}
                        <div class='content'>
                            ${content}
                        </div>
                    </awesome-dialog>
                `;
            }



            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.change
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }

            change(e){
                const doc = document.querySelector('awesome-dialog');
                const bg = document.querySelector('body');
                doc.classList.toggle('fullScreenView');
                bg.classList.toggle('fullScreenViewBG');
            }
        }

        document.registerElement(
            'awesome-expandable-dialog',
            Component
        );
    }
)();
