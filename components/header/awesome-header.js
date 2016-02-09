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
                        ${this.innerHTML}
                    </header>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                
            }
        }

        document.registerElement(
            'awesome-header',
            Component
        );
    }
)();
