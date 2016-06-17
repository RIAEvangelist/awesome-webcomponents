'use strict';

awesome.requireCSS(`${awesome.path}components/range/awesome-range.css`);

(
    function(){
        const defaults={
            min: 0,
            max: 0,
            step: 0,
            value: 0,
            disabled: false
        }

        const component = new AwesomeComponent;
        component.tagName = 'awesome-range';
        component.extends= 'BaseComponent';

        component.create=function createAwesomeRange() {
            return class AwesomeRange extends awesome.component.BaseComponent {
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeRange.elementTagName)
                    this.careAbout(
                        'data-min',
                        'data-max',
                        'data-step',
                        'data-value',
                        'data-disabled'
                    );

                    this.innerHTML=`
                        <input
                            type = 'range'
                            min = '${this.dataset.min}'
                            max = '${this.dataset.max}'
                            step = '${this.dataset.step}'
                            value = '${this.dataset.value}'
                            ${
                                (this.dataset.disabled==='true')?
                                    'disabled'
                                        :
                                    ''
                            }
                        ></input>
                    `;

                    this.querySelector('input').addEventListener(
                        'change',
                        this.change.bind(this)
                    );
                }

                change(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.value=e.target.value;
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
