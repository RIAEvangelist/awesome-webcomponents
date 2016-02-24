'use strict';

awesome.requireCSS(`${awesome.path}components/range/awesome-range.css`);

(
    function(){
        const defaults={
            min: 0,
            max: 0,
            step: 0,
            value: 0,
            disabled: false
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <input
                        type = 'range'
                        min = '${this.dataset.min}'
                        max = '${this.dataset.max}'
                        step = '${this.dataset.step}'
                        value = '${this.dataset.value}'
                        ${
                            (this.dataset.disabled==='true')?
                                'disabled'
                                    :
                                ''
                        }
                    ></input>
                `;

                this.querySelector('input').addEventListener(
                    'change',
                    this.change.bind(this)
                );
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();


            }

            change(e){
                e.preventDefault();
                e.stopPropagation();
                this.value=e.target.value;
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
            'awesome-range',
            Component
        );
    }
)();
