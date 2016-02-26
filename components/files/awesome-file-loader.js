'use strict';

awesome.requireCSS(`${awesome.path}components/files/awesome-file-loader.css`);
awesome.requireScript(`${awesome.path}actions/file/loader.js`);
awesome.requireScript(`${awesome.path}stores/file/info.js`);

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
                    <button>
                        ${
                            (!multiple)
                            ? awesome.language.current.chooseFile
                            : awesome.language.current.chooseFiles
                        }
                    </button>
                    <input type='text' />
                `;
            }

            attachedCallback(){
                window.on(
                    'awesome-language-set',
                    this.createdCallback.bind(this)
                );

                this.addEventListener(
                    'change',
                    this.update.bind(this)
                );

                this.addEventListener(
                    'click',
                    this.chooseFile.bind(this)
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

                this.querySelector('input[type="text"]').value=awesome.dynamicLanguageString(
                    'filesSelectedCount',
                    {
                        count:e.target.files.length
                    }
                );
            }

            chooseFile(e){
                this.querySelector('input[type="file"]').click();
            }
        }

        document.registerElement(
            'awesome-file-loader',
            Component
        );
    }
)();
