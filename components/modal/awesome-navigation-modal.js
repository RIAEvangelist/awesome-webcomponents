'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-navigation-modal.css`);
awesome.requireScript(`${awesome.path}actions/router/route.js`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);
awesome.requireScript(`${awesome.path}components/title/awesome-title.js`);

(
    function(){
        const defaults={
            title:'',
            screen_name:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-navigation-modal';
        component.extends='AwesomeModal';

        component.create=function createAwesomeNavigationModal() {
            return class AwesomeNavigationModal extends awesome.component.AwesomeModal{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeNavigationModal.elementTagName);
                    this.careAbout(
                        'data-title',
                        'data-screen_name'
                    );

                    this.localize(
                        'ok',
                        'next',
                        this.dataset.title
                    );

                    this.innerHTML=`
                        <div>
                            <awesome-title
                                data-title = '${this.local[this.dataset.title]}'
                            >
                            </awesome-title>

                            <content>
                                ${this.content.content}
                            </content>

                            <div class = 'modalButtonControls'>
                                <button
                                    id = 'ok'
                                    data-action = 'close'
                                >
                                    ${this.local.ok}
                                </button>
                                <button
                                    id = 'next'
                                    data-action = 'close'
                                >
                                    ${this.local.next}
                                </button>
                            </div>
                        </div>
                        ${this.content.template}
                    `;
                }

                clicked(e){
                    super.clicked(e);
                    if(e.target.id == 'next'){
                        this.dispatcher.trigger(
                            this.actions.ROUTE_REQUEST,
                            this.dataset.screen_name
                        );
                    }
                }
            }
        }

        component.init();
    }
)();
