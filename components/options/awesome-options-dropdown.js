'use strict';

awesome.requireCSS(`${awesome.path}components/options/awesome-options-dropdown.css`);

(
    function(){
        const defaults={
            label:''
        }

        const component = new AwesomeComponent;
        component.tagName = 'awesome-options-dropdown';
        component.extends = 'BaseComponent';

        component.create=function createAwesomeOptionsDropdown(){
            return class AwesomeOptionsDropdown extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeOptionsDropdown.elementTagName)
                    this.careAbout(
                        'data-label'
                    );

                    this.innerHTML=`
                        <label>${this.dataset.label} :</label>
                        <select name='${this.dataset.label}'>
                            ${this.content.content}
                        </select>
                        ${this.content.template}
                    `;

                    this.querySelector('select').addEventListener(
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
            };
        };

        component.init();
    }
)();
