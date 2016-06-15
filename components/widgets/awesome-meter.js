'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-meter.css`);

(
    function(){
        const defaults={
            value:'50',
            //@TODO LOCALIZE THIS
            text: 'Awesome Meter!',
            divisions: '2'
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-meter';
        component.extends='BaseComponent';

        component.create=function createAwesomeMeter(){
            return class AwesomeMeter extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.careAbout('data-text');
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeMeter.elementTagName);

                    let divisions = ''
                    for (let i = 0; i < Math.floor(this.dataset.divisions); i++) {
                        divisions = `${divisions}<li></li>`
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

                    this.percentage = this.querySelector('.percent');
                    this.dropDown = this.querySelector('.colorBlocker');
                    this.LIs= this.querySelectorAll('li');
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.changePercentage();
                    this.sizeListElements();
                }

                attributeChangedCallback(key,oldValue,newValue){
                    super.attributeChangedCallback();
                    this.changePercentage();
                    this.sizeListElements();
                }

                changePercentage(){
                    if(this.dataset.value < 0){
                        this.dataset.value=0;
                    }
                    if(this.dataset.value > 100){
                        this.dataset.value=100;
                    }

                    this.percentage.innerHTML=`${this.dataset.value}%`
                    this.dropDown.style.height = `calc(100% - ${this.dataset.value}%)`;

                    if(this.dataset.value < 10){
                        this.percentage.classList.add('belowTenPercent');
                    }
                }

                sizeListElements(){
                    const divisions = Math.floor(this.dataset.divisions);
                    for (let i = 0; i < this.LIs.length; i++) {
                        this.LIs[i].style.height = `${100/divisions}%`;
                    }
                }
            }
        }

        component.init();
    }
)();
