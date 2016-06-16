'use strict';

awesome.requireCSS(`${awesome.path}components/files/awesome-file-loader.css`);
awesome.requireScript(`${awesome.path}components/files/awesome-file-info.js`);
awesome.requireScript(`${awesome.path}actions/file/loader.js`);
awesome.requireScript(`${awesome.path}stores/file/info.js`);

(
    function(){
        const defaults = {
            multiple:false,
            id:'default'
        };

        const component = new AwesomeComponent;
        component.tagName = 'awesome-file-loader';
        component.extends = 'BaseComponent';

        component.create=function createAwesomeFileLoader(){
            return class AwesomeFileLoader extends awesome.component.BaseComponent{
                createdCallback(){
                    console.warn('AwesomeFileLoader IS NOT STABLE!! IT NEEDS FIXING!');
                    //@TODO figure out whats up!
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeFileLoader.elementTagName)
                    this.careAbout(
                        'data-multiple',
                        'data-id'
                    );

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
                        <input
                            type='text'
                            placeholder='${
                                awesome.dynamicLanguageString(
                                    'filesSelectedCount',
                                    {
                                        count:0
                                    }
                                )
                            }'
                        />
                        <awesome-file-info
                            style='width:0px'
                            data-file_id='${this.dataset.id}'
                        ></awesome-file-info>
                    `;

                    const info=this.querySelector('awesome-file-info');
                    info.style.width=`calc(${this.clientWidth}px - 1.3em)`;
                    this.querySelector('button').addEventListener(
                        'click',
                        this.chooseFile.bind(this)
                    );
                    this.querySelector('input[type="text"]').addEventListener(
                        'click',
                        this.chooseFile.bind(this)
                    );

                    this.chooseFileText=awesome.language.current.chooseFile;
                    this.chooseFilesText=awesome.language.current.chooseFiles;
                }

                attachedCallback(){
                    super.attachedCallback();

                    window.on(
                        'awesome-language-set',
                        this.localize.bind(this)
                    );

                    this.addEventListener(
                        'change',
                        this.update.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    window.off(
                        'awesome-language-set',
                        this.localize.bind(this)
                    );
                }

                localize(){
                    if(
                        this.chooseFileText===awesome.language.current.chooseFile
                        &&this.chooseFilesText===awesome.language.current.chooseFiles
                    ){
                        return;
                    }
                    this.createdCallback();
                }

                update(e){
                    const loadedFiles = e.target.files;
                    console.log(loadedFiles)
                    const list = [];
                    const loadedInfo = {
                        id:this.dataset.id
                    };

                    let filesRemaining=loadedFiles.length;

                    for(let i = 0; i < loadedFiles.length; i++){
                        const file = loadedFiles[i];
                        const reader = new FileReader;

                        reader.onload = function(e) {
                            file.content = e.target.result;
                            list.push(file);
                            filesRemaining--;
                            if(!filesRemaining===0){
                                return;
                            }

                            loadedInfo.files = list;

                            this.dispatcher.trigger(
                               this.actions.FILE_LOADED,
                               loadedInfo
                            );

                            this.querySelector('input[type="text"]').placeholder=awesome.dynamicLanguageString(
                                'filesSelectedCount',
                                {
                                    count:loadedFiles.length
                                }
                            );

                            const info=this.querySelector('awesome-file-info');
                            info.style.height=`${info.querySelector('table').offsetHeight}px`;
                        }.bind(this)
                        reader.readAsDataURL(file);

                        if(!e.target.multiple){
                            break;
                        }
                    }
                }

                chooseFile(e){
                    e.target.blur();
                    this.querySelector('input[type="file"]').click();
                }
            }
        }

        component.init();
    }
)();
