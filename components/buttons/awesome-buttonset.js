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

        const component=new AwesomeComponent;
        component.tagName='awesome-buttonset';

        component.create=function createAwesomeButtonSet() {
            return class AwesomeButtonSet extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeButtonSet.elementTagName);
                    this.careAbout(
                        'data-index',
                        'data-count',
                        'data-disabled',
                        'data-multi_select'
                    );

                    this.mergeDataset(defaults);

                    const count=Number(this.dataset.count);
                    const buttons=[];
                    const indexs=this.dataset.index.split(',');

                    for(let i=0; i<count; i++){
                        this.careAbout(
                            `data-b${i}`
                        );
                        this.localize(
                            this.dataset[`b${i}`]
                        );

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
                                this.local[
                                    this.dataset[`b${i}`]
                                ]
                            }</button>`
                        )
                    }

                    this.innerHTML=`
                        ${buttons.join('')}
                    `;
                }

                attachedCallback(){
                    super.attachedCallback();

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
        }

        component.init();
    }
)();
