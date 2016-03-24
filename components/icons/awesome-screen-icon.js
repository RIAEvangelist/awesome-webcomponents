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

                this.innerHTML=`
                <div
                    class = 'contentWrapper'
                >
                    <div
                        class = 'iconImageWrapper'
                    >
                        <img
                            class='icon'
                            src=${this.dataset.icon}
                        />
                    </div>
                    <div
                        class = 'iconTextWrapper'
                    >
                        ${this.dataset.text}
                    </div>
                <div>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.iconClicked
                );

                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
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
