'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-dialog.css`);
awesome.requireScript(`${awesome.path}components/header/awesome-header.js`);

(
    function(){
        const defaults={
            icon:'',
            title:'',
            header:true
        }

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
                    ${header}
                    <div class='content'>
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
        }

        document.registerElement(
            'awesome-dialog',
            Component
        );
    }
)();
