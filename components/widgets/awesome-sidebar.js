'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-sidebar.css`);

(
    function(){
        const defaults={};

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);
                this.innerHTML=`
                    <div class='sidebar-stub'>
                        <span class = 'flaticon-three'>
                        </span>
                    </div>
                    <div class='sidebar-content'>${content.content}</div>
                    ${content.template}
                `;

                this.querySelector('.sidebar-stub').addEventListener(
                    'click',
                    this.clicked.bind(this)
                )
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            clicked(){
                this.classList.toggle('showSidebar');
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
