'use strict';

awesome.requireCSS(`${awesome.path}components/icons/awesome-screen-icon.css`);

(
    function(){
        const defaults={
            icon:'',
            text: ''
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
                    <div>
                        ${icon}
                        ${this.dataset.text}
                    </div>
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
            'awesome-screen-icon',
            Component
        );
    }
)();
