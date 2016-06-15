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

                    this.innerHTML=`
                        <h1>
                            ${
                                (awesome.language.current[this.dataset.title])
                                ? awesome.language.current[this.dataset.title]
                                : this.dataset.title
                            }
                        </h1>
                    `;
                }

                attachedCallback(){
                    super.attachedCallback();

                    window.on(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    window.off(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );
                }
            }
        }

        component.init();
    }
)();
