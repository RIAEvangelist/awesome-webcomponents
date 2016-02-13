'use strict';

awesome.requireCSS(`${awesome.path}components/range/awesome-range.css`);

(
    function(){
        const defaults={
            min: 0,
            max: 0,
            step: 0,
            value: 0,
            diabled: false
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
                            (this.dataset.disabled=='true')?
                                'disabled'
                                    :
                                ''
                        }
                    ></input>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                awesome.updateAttributesFromData(
                    this.querySelector('input'),
                    key,
                    newValue
                );
            }
        }

        document.registerElement(
            'awesome-range',
            Component
        );
    }
)();
