'use strict';

awesome.requireCSS(`${awesome.path}components/inputs/awesome-input-button-combo.css`);

(
    function(){
        const defaults = {
            placeholder:'',
            button_text:'',
            position:'left'
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

                    this.innerHTML=`
                        <button>
                            ${this.local[this.dataset.button_text]}
                        </button>
                        <input
                            type='text'
                            placeholder='${this.local[this.dataset.placeholder]}'
                        />
                    `;
                }
            }
        }

        component.init();
    }
)();
