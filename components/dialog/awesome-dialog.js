'use strict';

awesome.requireCSS(`${awesome.path}components/dialog/awesome-dialog.css`);
awesome.requireScript(`${awesome.path}components/header/awesome-header.js`);

(
    function(){
        const defaults={
            icon:'',
            title:'',
            header:true
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-dialog';

        component.create=function createAwesomeDialog() {
            return class AwesomeDialog extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeDialog.elementTagName);
                    let header='';

                    if(this.dataset.header==='true'){
                        header=`
                            <awesome-header
                                data-icon='${this.dataset.icon}'
                                data-title='${this.dataset.title}'
                            ></awesome-header>
                        `;
                    }

                    this.innerHTML=`
                        ${header}
                        <div class='content'>
                            ${this.content.content}
                        </div>
                        ${this.content.template}
                    `;
                }
            }
        }

        component.init();
    }
)();
