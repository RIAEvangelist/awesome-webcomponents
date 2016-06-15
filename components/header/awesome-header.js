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
                            ${this.dataset.title}
                            ${content.content}
                        </header>
                        ${content.template}
                    `;
                }

                attachedCallback(){

                }

                detachedCallback(){

                }

                attributeChangedCallback(key,oldValue,newValue){
                    this.createdCallback();
                }
            }
        }


        component.init();
    }
)();
