'use strict';

awesome.requireCSS(`${awesome.path}components/file-loader/awesome-file-loader.css`);
awesome.requireScript(`${awesome.path}actions/file-loader/file-loader.js`);
// awesome.requireScript(`${awesome.path}stores/user/auth.js`);


(
    function(){
        let state=null;
        let dispatcher=awesome.dispatchers.component;
        const constants = awesome.constants.component;
        const action = awesome.constants.action;

        const defaults = {};

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);

                this.innerHTML=`
                    <input type='file' id='input-files' multiple>

                    <p class='upload-text'>
                        Select one or more files.
                    </p>
                `;
            }

            attachedCallback(){
                this.addEventListener(
                    'change',
                    this.update
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            update(e){
                const loadedFiles = document.getElementById('input-files').files;
                document.querySelector('.upload-text').classList.add('hidden');
                const message = new Message();
                const list = [];

                for(let i = 0; i < loadedFiles.length; i++){
                    const file = loadedFiles[i];

                    list.push(
                        message.data = {
                            filename:file.name,
                            filesize:file.size,
                            lastModifiedDate:file.lastModifiedDate.toUTCString()
                        }
                    );
                }

                dispatcher.trigger(
                    action.USER_INPUT_FILE_LOADED,
                    list
                );
            }
        }

        document.registerElement(
            'awesome-file-loader',
            Component
        );
    }
)();
