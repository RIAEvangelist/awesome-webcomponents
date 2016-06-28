'use strict';

awesome.requireCSS(`${awesome.path}components/header/awesome-header.css`);

(
    function(){
        const defaults={
            icon:'',
            title:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-header';

        component.create=function createAwesomeHeader(e){
            return class AwesomeHeader extends awesome.component.BaseComponent{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.careAbout(
                        'data-icon',
                        'data-title'
                    );
                    this.localize(
                        this.dataset.title
                    );
                    this.classList.add(AwesomeHeader.elementTagName);
                    let icon='';
                    if(this.dataset.icon){
                        icon=`
                            <img
                                class='icon'
                                src=${this.dataset.icon}
                            />
                        `;
                    }

                    this.innerHTML=`
                        <header>
                            ${icon}
                            ${this.local[this.dataset.title]}
                            ${this.content.content}
                        </header>
                        ${this.content.template}
                    `;
                }
            }
        }


        component.init();
    }
)();
