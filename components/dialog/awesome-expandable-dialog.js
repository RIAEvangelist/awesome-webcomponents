'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-expandable-dialog.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

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

                this.innerHTML=`
                    <awesome-dialog
                        data-header=${this.dataset.header}
                        ${
                            (this.dataset.icon)
                            ? `data-icon=${this.dataset.icon}`
                            : ''
                        }
                        data-title=${this.dataset.title}
                    >
                        ${content}
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
                if(key==='class'){
                    return;
                }
                this.createdCallback();
            }

            change(e){
                this.classList.toggle('fullScreenView');
            }
        }

        document.registerElement(
            'awesome-expandable-dialog',
            Component
        );
    }
)();
