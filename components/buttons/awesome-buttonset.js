'use strict';

awesome.requireCSS(`${awesome.path}components/buttons/awesome-buttonset.css`);

(
    function(){
        const defaults={
            index:'',
            count:3,
            disabled:false,
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
                            class='${
                                (`${i}`===this.dataset.index)?
                                    'active'
                                        :
                                    ''
                            }'
                            ${
                                (this.dataset.disabled=='true')?
                                    'disabled'
                                        :
                                    ''
                            }
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

                this.addEventListener(
                    'click',
                    this.update

                );

                if(this.value===''){
                    return;
                }

                this.querySelector(`[data-index='${this.value}']`).classList.add('active');
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback()
            }

            update(e){
                const active=this.querySelector('.active');

                if(active){
                    active.classList.remove('active');
                    this.value='';
                }

                if(
                    active!==e.target
                    || !active
                ){
                    this.value=e.target.dataset.index;
                    e.target.classList.add('active');
                }

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
