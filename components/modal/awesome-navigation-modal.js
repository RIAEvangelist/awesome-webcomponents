'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-navigation-modal.css`);
awesome.requireScript(`${awesome.path}actions/router/route.js`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);
awesome.requireScript(`${awesome.path}components/title/awesome-title.js`);

(
    function(){
        let action = null;
        let dispatcher = null;

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


            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.updateLanguage.bind(this)
                );

                this.addEventListener(
                    'click',
                    this.clicked
                )
            }

            detachedCallback(){
                window.off(
                    'awesome-language-set',
                    this.updateLanguage
                );
            }

            open(){
                this.querySelector('awesome-modal').open();
            }

            close(){
                this.querySelector('awesome-modal').close();
            }

            attributeChangedCallback(key,oldValue,newValue){
                if(key != 'data-title' || key != 'data-screen_name'){
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
                this.close();
            }

            updateLanguage(){

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
