'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-navigation-modal.css`);
awesome.requireScript(`${awesome.path}actions/router/route.js`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);
awesome.requireScript(`${awesome.path}components/title/awesome-title.js`);

(
    function(){

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            const action=awesome.constants.action;
            const dispatcher=awesome.dispatchers.component;

            class AwesomeNavigationModal extends awesome.component.AwesomeModal{
                createdCallback(){

                    this.defauts={
                        title:'',
                        screen_name:''
                    }

                    this.content=this.querySelector('template');

                    console.log(this.content);

                    if(!this.content){
                        return;
                    }

                    this.content.innerHTML = `
                        <awesome-title
                            data-title = '${this.dataset.title}'
                        >
                        </awesome-title>

                        <content>
                            ${this.content.innerHTML}
                        </content>

                        <div class = 'modalButtonControls'>
                            <button id = 'ok'>
                                ${awesome.language.current.ok}
                            </button>
                            <button id = 'next'>
                                ${awesome.language.current.next}
                            </button>
                        </div>
                    `;

                    this.classList.add(AwesomeNavigationModal.elementTagName);

                    super.createdCallback();
                    this.caresAbout.push('data-title');
                    this.caresAbout.push('data-screen_name');

                    this.ok = awesome.language.current.ok.trim();
                    this.next = awesome.language.current.next.trim();
                    this.title = this.dataset.title.trim();
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
                    if(e.target.localName != 'button'){
                        return;
                    }

                    if(e.target.id == 'next'){
                        dispatcher.trigger(
                            action.ROUTE_REQUEST,
                            this.dataset.screen_name
                        );
                    }
                    this.parentElement.removeChild(this);
                }

                updateLanguage(){
                    if(this.next == awesome.language.current.next.trim()
                        && this.ok == awesome.language.current.ok.trim()
                    ){
                        return;
                    }
                    this.createdCallback();
                }
            }

            AwesomeNavigationModal.elementTagName='awesome-navigation-modal';

            awesome.register(
                AwesomeNavigationModal
            );
        }
        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
