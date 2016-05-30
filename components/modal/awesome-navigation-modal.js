'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-navigation-modal.css`);
awesome.requireScript(`${awesome.path}actions/router/route.js`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);
awesome.requireScript(`${awesome.path}components/title/awesome-title.js`);

(
    function(){
        let action = null;
        let dispatcher = null;

        const caresAbout =[
            'data-title',
            'data-screen_name'
        ];

        const defaults={
            title:'',
            screen_name:''
        }

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            action=awesome.constants.action;
            dispatcher=awesome.dispatchers.component;

            document.registerElement(
                'awesome-navigation-modal',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <awesome-modal>
                        <template>
                            <awesome-title
                                data-title = '${this.dataset.title}'
                            >
                            </awesome-title>

                            <content>
                                ${content.content}
                            </content>

                            <div class = 'modalButtonControls'>
                                <button id = 'ok'>
                                    ${awesome.language.current.ok}
                                </button>
                                <button id = 'next'>
                                    ${awesome.language.current.next}
                                </button>
                            </div>

                        </template>
                        ${content.template}
                    </awesome-modal>
                `;

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
                    this.clicked
                );
            }

            detachedCallback(){
                window.off(
                    'awesome-language-set',
                    this.updateLanguage.bind(this)
                );
            }

            close(){
                this.querySelector('awesome-modal').close();
                this.parentElement.removeChild(this);
            }

            attributeChangedCallback(key,oldValue,newValue){
                if(!caresAbout.includes(key)){
                   return;
               }

               if(this.title == newValue.trim()){
                   return;
               }

               this.createdCallback();
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
                this.close.bind(this);
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
