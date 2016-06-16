'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-notification-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-notification-modal';
        component.extends='AwesomeModal';

        component.create=function createAwesomeNotificationModal() {
            return class AwesomeNotificationModal extends awesome.component.AwesomeModal{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeNotificationModal.elementTagName);
                    this.ok = awesome.language.current.ok;

                    this.innerHTML=`
                        <div>
                            <h1>
                                ${this.dataset.title}
                            </h1>
                            <div class='contentWrapper'>
                                ${this.content.content}
                            </div>
                            <button
                                class = 'closeButton'
                                data-action='close'
                            >
                                ${this.ok}
                            </button>
                        </div>
                        ${this.content.template}
                    `;

                    this.caresAbout.push('data-title');
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
        }

        component.init();
    }
)();
