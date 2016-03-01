'use strict';

awesome.requireCSS(`${awesome.path}components/document/awesome-document-viewer.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        const defaults={};

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-dialog
                        data-header='false'
                    >
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
            'awesome-document-viewer',
            Component
        );
    }
)();
