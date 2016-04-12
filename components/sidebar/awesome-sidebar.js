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
                    <div class='sidebar-content'>${content.content}</div>
                    ${content.template}
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.clicked
                )

                this.addEventListener(
                    'touchstart',
                    this.touched
                )
            }

            detachedCallback(){

            }

            clicked(e){
                if(e.target.localName == 'awesome-sidebar'){
                    e.target.classList.toggle('showSidebar');
                }
            }

            touched(e){
                e.stopPropagation();
                e.preventDefault();
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
