'use strict';

awesome.requireCSS(`${awesome.path}components/file/awesome-file.css`);

(
    function(){
        const defaults={
            filename:'',
            filesize:'',
            filemodifieddate:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <p>${this.dataset.filename}</p>
                        ${content}
                    <p>${this.dataset.filesize}</p>
                    <p>${this.dataset.filemodifieddate}</p>
                `;
            }

            attachedCallback(){

            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){

            }
        }

        document.registerElement(
            'awesome-file',
            Component
        );
    }
)();
