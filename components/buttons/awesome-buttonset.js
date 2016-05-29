'use strict';

awesome.requireCSS(`${awesome.path}components/buttons/awesome-buttonset.css`);

(
    function(){
        const defaults={
            index:'',
            count:3,
            disabled:false,
            multi_select:false,
            'b0':0,
            'b1':1,
            'b2':2
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                const count=Number(this.dataset.count);
                const buttons=[];
                const indexs=this.dataset.index.split(',');

                for(let i=0; i<count; i++){
                    buttons.push(
                        `<button
                            data-index='${i}'
                            class='${
                                (indexs.includes(`${i}`))?
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
                            (awesome.language.current[this.dataset[`b${i}`]])
                            ? awesome.language.current[this.dataset[`b${i}`]]
                            : this.dataset[`b${i}`]
                        }</button>`
                    )
                }

                this.innerHTML=`
                    ${buttons.join('')}
                `;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
                );

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
                const active=this.querySelectorAll('.active');
                active.includes=Array.prototype.includes;
                this.oldValue=this.value;

                updateActiveButtons :
                if(active.length>0){
                    this.value='';

                    e.target.classList.remove('active');

                    if(this.dataset.multi_select!=='true'){
                        active[0].classList.remove('active');
                        break updateActiveButtons;
                    }

                    const newActive=this.querySelectorAll('.active');
                    for(let i=0; i<newActive.length; i++){
                        this.value+=`${active[i].dataset.index},`;
                    }
                    if(this.value.length>1){
                        this.value=this.value.slice(0,-1);
                    }
                }

                selectActiveButtons :
                if(
                    !active.includes(e.target)
                    || active.length<1
                ){
                    e.target.classList.add('active');

                    if(this.dataset.multi_select!=='true'){
                        this.value=e.target.dataset.index;
                        break selectActiveButtons;
                    }

                    this.value+=`,${e.target.dataset.index}`;
                    if(this.value.indexOf(',')==0){
                        this.value=this.value.slice(1);
                    }
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
