'use strict';

awesome.requireCSS(`${awesome.path}components/footer/awesome-footer.css`);

(
    function(){
        const defaults={

        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content = awesome.loadTemplate(this);

                this.innerHTML=`
                    <footer>
                        ${content.content}
                    </footer>
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

        document.registerElement(
            'awesome-footer',
            Component
        );
    }
)();
