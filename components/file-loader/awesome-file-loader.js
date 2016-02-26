'use strict';

awesome.requireCSS(`${awesome.path}components/file-loader/awesome-file-loader.css`);
awesome.requireScript(`${awesome.path}actions/file-loader/file-loader.js`);
awesome.requireScript(`${awesome.path}stores/files/files.js`);


(
    function(){
        let state=null;
        let dispatcher=awesome.dispatchers.component;
        const constants = awesome.constants.component;
        const action = awesome.constants.action;

        const defaults = {
            multiple:false,
            id:'default'
        };

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                let multiple = '';
                if(this.dataset.multiple === 'true'){
                    multiple = 'multiple';
                }
                this.innerHTML=`
                    <input type='file' ${multiple}/>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.update.bind(this)
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            update(e){
                const loadedFiles = e.target.files;
                const list = [];
                const loadedInfo = {
                    id:this.dataset.id
                };

                for(let i = 0; i < loadedFiles.length; i++){
                    const file = loadedFiles[i];

                    if(!e.target.multiple){
                        list.push(file);
                        break;
                    }

                    list.push(
                        {
                            name: file.name,
                            size: file.size,
                            lastModifiedDate:file.lastModifiedDate
                        }
                    );

                }

                loadedInfo.files = list;

                dispatcher.trigger(
                    action.FILE_LOADED,
                    loadedInfo
                );
            }
        }

        document.registerElement(
            'awesome-file-loader',
            Component
        );
    }
)();
