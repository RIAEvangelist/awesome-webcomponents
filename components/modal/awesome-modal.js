'use strict';

awesome.requireCSS(`${awesome.path}components/modal/awesome-modal.css`);

(
    function(){
        class AwesomeModal extends awesome.component.BaseComponent{
            createdCallback(){
                super.createdCallback();
                this.classList.add(AwesomeModal.elementTagName);
                this.innerHTML=`
                    <div>
                        ${this.content.content}
                    </div>
                    ${this.content.template}
                `;
            }

            attachedCallback(){
                super.attachedCallback();
                this.addEventListener(
                    'click',
                    this.clicked.bind(this)
                );
            }

            dettachedCallback(){
                super.dettachedCallback();
                this.removeEventListener(
                    'click',
                    this.clicked.bind(this)
                );
            }

            open(){
                document.body.appendChild(this);
            }

            close(){
                this.parentElement.removeChild(this);
            }

            //If modal contains an element with the data-action of close, it will close
            clicked(e){
                if(e.target.dataset.action!=='close'){
                    return;
                }
                this.close();
            }
        }

        AwesomeModal.elementTagName='awesome-modal';

        awesome.register(AwesomeModal);
    }
)();
