'use strict';

awesome.requireCSS(`${awesome.path}components/icons/awesome-screen-icon.css`);

(
    function(){
        const defaults={
            icon:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            text: '',
            class:'',
            screen_name: ''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-screen-icon';

        component.create=function createAwesomeScreenIcon(){
            return class AwesomeScreenIcon extends awesome.component.BaseComponent{

                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeScreenIcon.elementTagName);
                    this.careAbout(
                        'data-icon',
                        'data-text',
                        'data-class',
                        'data-screen_name'
                    );

                    this.innerHTML=`
                        <div
                            class = 'contentWrapper'
                        >
                            <div
                                class = 'iconImageWrapper'
                            >
                                <div class='screen-flaticon-class ${this.dataset.class}'></div>
                                <img
                                    class='icon'
                                    src=${this.dataset.icon}
                                />
                            </div>
                            <div
                                class = 'iconTextWrapper'
                            >
                                ${
                                    (awesome.language.current[this.dataset.text])
                                    ? awesome.language.current[this.dataset.text]
                                    : this.dataset.text
                                }
                            </div>
                        <div>
                    `;
                }

                attachedCallback(){
                    super.attachedCallback();

                    this.addEventListener(
                        'click',
                        this.iconClicked
                    );

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

                iconClicked(e){
                    e.stopPropagation();
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
