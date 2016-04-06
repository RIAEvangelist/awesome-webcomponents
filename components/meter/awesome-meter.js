'use strict';

awesome.requireCSS(`${awesome.path}components/meter/awesome-meter.css`);

(
    function(){
        const defaults={
            value:'50',
            text: 'Awesome Meter!',
            divisions: '2'
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                let divisions = ''
                for (let i = 0; i < this.dataset.divisions; i++) {
                    divisions += '<li></li>'
                }

                this.innerHTML=`
                    <div>
                        <p>
                            ${this.dataset.text}
                        </p>
                        <div
                            class = 'bottomWrapper'
                        >
                            <ul>
                                ${divisions}
                            </ul>
                            <div class  = 'signalColor'>
                                <div class = 'colorBlocker'>
                                </div>
                                <div class = 'percent'>
                                    ${this.dataset.value}%
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            attachedCallback(){
                this.sizeListElements();
                this.createdCallback();
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
                this.changePercentage();
                this.sizeListElements();
            }

            changePercentage(){
                if(this.dataset.value < 0 || this.dataset.value > 100){
                    return false;
                }
                const dropDown = this.querySelector('.colorBlocker');
                const percentage = this.querySelector('.percent');
                dropDown.style.height = `calc(100% - ${this.dataset.value}%)`;
                if(this.dataset.value < 10){
                    percentage.classList.add('belowTenPercent');
                }
            }

            sizeListElements(){
                const listElements = this.querySelectorAll('li');
                const divisions = this.dataset.divisions;
                for (let i = 0; i < listElements.length; i++) {
                    listElements[i].style.height = `${100/divisions}%`;
                }
            }
        }

        document.registerElement(
            'awesome-meter',
            Component
        );
    }
)();
