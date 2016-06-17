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
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeScreenIcon.elementTagName);
                    this.careAbout(
                        'data-icon',
                        'data-text',
                        'data-class',
                        'data-screen_name'
                    );

                    this.localize(
                        this.dataset.text
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
                                ${this.local[this.dataset.text]}
                            </div>
                        <div>
                    `;
                }

                attachedCallback(){
                    super.attachedCallback();

                    this.addEventListener(
                        'click',
                        this.clicked
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    this.removeEventListener(
                        'click',
                        this.clicked
                    );
                }

                clicked(e){
                    const change = new CustomEvent(
                        'screen-selected',
                        {
                            'bubbles':true,
                            'cancelable':false,
                            'detail':{
                                screen:this.dataset.screen_name
                            }
                        }
                    );
                    console.log(change);
                    this.dispatchEvent(change);
                }
            }
        }

        component.init();
    }
)();
