'use strict';

awesome.requireCSS(`${awesome.path}components/inputs/awesome-input-button-combo.css`);

(
    function(){
        const defaults = {
            placeholder:'',
            button_text:'',
            position:'left',
            type:'text',
            event:''
        };

        const component = new AwesomeComponent;
        component.tagName = 'awesome-input-button-combo';
        component.extends = 'BaseComponent';

        component.create=function createAwesomeInputButtonCombo(){
            return class AwesomeInputButtonCombo extends awesome.component.BaseComponent{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.remove('left','right');
                    this.classList.add(AwesomeInputButtonCombo.elementTagName,this.dataset.position)
                    this.careAbout(
                        'data-placeholder',
                        'data-button_text',
                        'data-position'
                    );
                    this.localize(
                        this.dataset.button_text,
                        this.dataset.placeholder
                    );

                    this.input=document.createElement('input');
                    for(let key in this.dataset){
                        this.input.setAttribute(key,this.dataset[key]);
                    }

                    this.innerHTML=`
                        <button>
                            ${this.local[this.dataset.button_text]}
                        </button>
                    `;
                    this.appendChild(this.input);
                }

                attachedCallback(){
                    super.attachedCallback();
                    this.addEventListener(
                        'click',
                        this.onClick
                    );
                }

                detachedCallback(){
                    super.detachedCallback();
                    this.removeEventListener(
                        'click',
                        this.onClick
                    );
                }

                onClick(e){
                    if(!this.dataset.event||e.target.localName!=='button'){
                        return;
                    }
                    this.dispatcher.trigger(
                        awesome.constants.action[this.dataset.event]
                        ||this.dataset.event,
                        this.input.value
                    )
                }
            }
        }

        component.init();
    }
)();
