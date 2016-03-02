'use strict';

awesome.requireCSS(`${awesome.path}components/icons/awesome-screen-icon.css`);

(
    function(){
        const defaults={
            icon:'',
            text: '',
            screen_name: ''
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
                    <div
                        data-screen_name=${this.dataset.screen_name}>
                        ${icon}
                        ${this.dataset.text}
                    </div>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.iconClicked
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            iconClicked(e){
                e.stopPropagation();
                const change = new Event(
                    'change',
                    {
                        'bubbles':true,
                        'cancelable':false
                    }
                );

                this.dispatchEvent(change);
            }
        }

        document.registerElement(
            'awesome-screen-icon',
            Component
        );
    }
)();
