'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-error-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            title:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-error-modal';
        component.extends='AwesomeModal';

        component.create=function createAwesomeErrorModal() {
            return class AwesomeErrorModal extends awesome.component.AwesomeModal{
                createdCallback(){
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.caresAbout.push('data-title');
                    this.classList.add(AwesomeErrorModal.elementTagName);
                    this.ok = awesome.language.current.ok;

                    this.innerHTML =`
                        <div>
                            <h1>
                                <span class = 'flaticon-signs'>

                                </span>
                                ${this.dataset.title}
                            </h1>
                            <div class = 'contentWrapper'>
                                ${this.content.content}
                            </div>
                            <br/>
                            <button
                                class = 'closeButton'
                                data-action='close'
                            >
                                ${this.ok}
                            </button>
                        </div>
                        ${this.content.template}
                    `;
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
