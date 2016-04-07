'use strict';

awesome.requireCSS(`${awesome.path}components/sidebar/awesome-sidebar.css`);

(
    function(){
        const defaults={};

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);
                this.innerHTML=`
                    <div class = '${
                        (this.classList.contains('showSidebar'))
                            ?'showContent'
                            :''
                        }
                    '>
                        ${content.content}
                    </div>
                    ${content.template}
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.clicked
                )
            }

            detachedCallback(){

            }

            clicked(e){
                if(e.target.localName == 'awesome-sidebar'){
                    e.target.classList.toggle('showSidebar');
                }
            }

            attributeChangedCallback(key,oldValue,newValue){
                //basic re-render
                this.createdCallback();
            }
        }

        document.registerElement(
            'awesome-sidebar',
            Component
        );
    }
)();
