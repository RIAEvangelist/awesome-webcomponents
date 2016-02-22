'use strict';

awesome.requireCSS(`${awesome.path}components/file/awesome-file.css`);

(
    function(){
        const defaults={
            filename:'',
            filedata:'',
            filesize:'',
            filemodifieddate:''
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <p>${this.dataset.filename}</p>
                    <p><pre>${this.dataset.filedata}</pre></p>
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
