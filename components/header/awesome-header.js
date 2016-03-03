'use strict';

awesome.requireCSS(`${awesome.path}components/header/awesome-header.css`);

(
    function(){
        const defaults={
            icon:'',
            title:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                let icon='';
                if(this.dataset.icon){
                    icon=`
                        <img
                            class='icon'
                            src=${this.dataset.icon}
                        />
                    `;
                }

                this.innerHTML=`
                    <header>
                        ${icon}
                        ${this.dataset.title}
                        ${content.content}
                    </header>
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
            'awesome-header',
            Component
        );
    }
)();
