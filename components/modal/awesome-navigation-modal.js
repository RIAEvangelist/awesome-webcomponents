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
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeNavigationModal.elementTagName);
                    this.ok = awesome.language.current.ok;
                    this.next = awesome.language.current.next;

                    this.innerHTML=`
                        <div>
                            <awesome-title
                                data-title = '${this.dataset.title}'
                            >
                            </awesome-title>

                            <content>
                                ${this.content.content}
                            </content>

                            <div class = 'modalButtonControls'>
                                <button
                                    id = 'ok'
                                    data-action = 'closeButton'
                                >
                                    ${this.ok}
                                </button>
                                <button
                                    id = 'next'
                                    data-action = 'closeButton'
                                >
                                    ${this.next}
                                </button>
                            </div>
                        </div>
                        ${this.content.template}
                    `;

                    this.caresAbout.push('data-title');
                    this.caresAbout.push('data-screen_name');
                }

                attachedCallback(){
                    window.on(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );

                    this.addEventListener(
                        'click',
                        this.clicked.bind(this)
                    );
                }

                detachedCallback(){
                    window.off(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );

                    this.removeEventListener(
                        'click',
                        this.clicked.bind(this)
                    );
                }

                clicked(e){
                    super.clicked();
                    if(e.target.id == 'next'){
                        dispatcher.trigger(
                            action.ROUTE_REQUEST,
                            this.dataset.screen_name
                        );
                    }
                    this.parentElement.removeChild(this);
                }

                updateLanguage(){
                    if(this.next == awesome.language.current.next
                        && this.ok == awesome.language.current.ok
                    ){
                        return;
                    }
                    this.createdCallback();
                }
            }
        }

        component.init();
    }
)();
