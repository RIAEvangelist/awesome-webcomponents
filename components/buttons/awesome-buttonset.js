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
                        `<button
                            data-index='${i}'
                        >${
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
                this.value=this.dataset.index;
                if(this.value===''){
                    return;
                }

                this.querySelector(`[data-index='${this.value}']`).classList.add('active');

                this.addEventListener(
                    'click',
                    this.update
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }

            update(e){
                this.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                this.value=e.target.dataset.index;

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
            'awesome-buttonset',
            Component
        );
    }
)();
