'use strict';

awesome.requireCSS(`${awesome.path}components/title/awesome-title.css`);

(
    function(){
        const defaults={
            title:'Awesome Title'
        }

        const component = new AwesomeComponent;
        component.tagName = 'awesome-title';
        component.extends = 'BaseComponent';

        component.create=function createAwesomeTitle(){
            return class AwesomeTitle extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeTitle.elementTagName)
                    this.careAbout(
                        'data-title'
                    );
                    this.localize(
                        this.dataset.title
                    );
                    this.innerHTML=`
                        <h1>
                            ${this.local[this.dataset.title]}
                        </h1>
                    `;
                }
            }
        }

        component.init();
    }
)();
