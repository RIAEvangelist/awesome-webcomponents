'use strict';

awesome.requireCSS(`${awesome.path}components/buttons/awesome-buttonset.css`);

(
    function(){
        const defaults={
            index:'',
            count:3,
            'b0':0,
            'b1':1,
            'b2':2
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                const count=Number(this.dataset.count);
                const buttons=[];

                for(let i=0; i<count; i++){
                    buttons.push(
                        `<button>${
                            this.dataset[
                                `b${i}`
                            ]
                        }</button>`
                    )
                }

                this.innerHTML=`
                    ${buttons.join('')}
                `;
            }

            attachedCallback(){
                if(this.dataset.index===''){
                    return;
                }
                this.querySelectorAll('button')[this.dataset.index].classList.add('active');
                this.addEventListener(
                    'click',
                    this.selectButton
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }

            selectButton(e){
                this.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
            }
        }

        document.registerElement(
            'awesome-buttonset',
            Component
        );
    }
)();
