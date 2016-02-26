'use strict';

awesome.requireCSS(`${awesome.path}components/file/awesome-file-info.css`);

(
    function(){
        const defaults={
            filename:'',
            filesize:'',
            file_last_modified:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);

                this.innerHTML=`
                    <p>${this.dataset.filename}</p>
                        ${content}
                    <p>${this.dataset.filesize}</p>
                    <p>${this.dataset.file_last_modified}</p>
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
            'awesome-file-info',
            Component
        );
    }
)();
