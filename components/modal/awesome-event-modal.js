'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-event-modal.css`);
awesome.requireScript(`${awesome.path}components/modal/awesome-modal.js`);

(
    function(){
        const defaults={
            event:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-event-modal';
        component.extends='AwesomeModal';

        component.create=function createAwesomeEventModal() {
            return class AwesomeEventModal extends awesome.component.AwesomeModal{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeEventModal.elementTagName);
                    this.careAbout(
                        'data-title'
                    );

                    this.innerHTML=`
                        <div>
                            ${this.content.content}
                        </div>
                        ${this.content.template}
                    `;
                }

                open(){
                    super.open();
                    if(!this.actions.hasOwnProperty(this.dataset.event)){
                        console.warn('This event doesnt exist in action constants!');
                        return;
                    }
                    awesome.dispatchers.action.on(
                        this.actions[this.dataset.event],
                        this.close.bind(this)
                    );
                }
            }
        }

        component.init();
    }
)();
