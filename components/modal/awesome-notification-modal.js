'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-notification-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            class AwesomeNotificationModal extends awesome.component.AwesomeModal{
                createdCallback(){
                    this.defaults={
                        title:''
                    };

                    this.content=this.querySelector('template');

                    if(!this.content){
                        return;
                    }

                    this.content.innerHTML=`
                        <h1>
                            ${this.dataset.title}
                        </h1>
                        <div class='contentWrapper'>
                            ${this.content.innerHTML}
                        </div>
                        <button
                            class = 'closeButton'
                            data-action='close'
                        >
                            ${awesome.language.current.ok}
                        </button>
                    `;

                    this.classList.add(AwesomeNotificationModal.elementTagName);

                    super.createdCallback();
                    this.caresAbout.push('data-title');

                    this.title = this.dataset.title;
                    this.ok = awesome.language.current.ok;
                }

                attachedCallback(){
                    super.attachedCallback();

                    window.on(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    window.off(
                        'awesome-language-set',
                        this.updateLanguage.bind(this)
                    );
                }

                updateLanguage(){
                    if(this.ok == awesome.language.current.ok){
                        return;
                    }

                    this.createdCallback();
                }
            }

            AwesomeNotificationModal.elementTagName='awesome-notification-modal';

            awesome.register(
                AwesomeNotificationModal
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
