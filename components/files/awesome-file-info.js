'use strict';

awesome.requireCSS(`${awesome.path}components/files/awesome-file-info.css`);
awesome.requireScript(`${awesome.path}stores/file/info.js`);

(
    function(){
        const defaults={
            file_id:'default'
        }

        const component = new AwesomeComponent;
        component.tagName = 'awesome-file-info';
        component.extends= 'BaseComponent';

        component.create=function createAwesomeFileInfo(){
            const state=awesome.stores.fileInfo.state;

            return class AwesomeFileInfo extends awesome.component.BaseComponent{
                createdCallback(){
                    console.warn('AwesomeFileInfo IS NOT STABLE!! IT NEEDS FIXING!');
                    //@TODO figure this out!
                    super.createdCallback();
                    this.mergeDataset(defaults);
                    this.classList.add(AwesomeFileInfo.elementTagName);
                    this.careAbout(
                        'data-file_id'
                    );

                    let tableContent=`
                        <tr>
                            <th>${awesome.language.current.noFilesSelected}</th>
                        </tr>
                    `;

                    let count=0;
                    const fileInfo=state[this.dataset.file_id];

                    if(fileInfo && Array.isArray(fileInfo.files)){
                        tableContent=`<tr>
                            <th>${awesome.language.current.fileName}</th>
                            <th>${awesome.language.current.fileSize}</th>
                            <th>${awesome.language.current.fileLastModified}</th>
                            <th>${awesome.language.current.fileContent}</th>
                        </tr>`;

                        count=fileInfo.files.length;
                        for(let i=0; i<fileInfo.files.length; i++){
                            const file=fileInfo.files[i];
                            tableContent+=`
                                <tr class='${
                                    (i%2)
                                    ? ''
                                    : 'oddRow'
                                }'>
                                    <td>${file.name}</td>
                                    <td>${file.size}kb</td>
                                    <td>${file.lastModifiedDate}</td>
                                    <td>${file.content}</td>
                                </tr>
                            `;
                        }
                    }

                    this.innerHTML=`
                        <table data-count='${count}'>
                            <tbody>
                                ${tableContent}
                            </tbody>
                        </table>
                    `;

                    this.noFilesText=awesome.language.current.noFilesSelected;

                }

                localize(){
                    if(this.noFilesText===awesome.language.current.noFilesSelected){
                        return;
                    }
                    this.createdCallback();
                }

                attachedCallback(){
                    super.attachedCallback();

                    window.on(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );

                    state.on(
                        'change',
                        this.createdCallback.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    window.off(
                        'awesome-language-set',
                        this.createdCallback.bind(this)
                    );

                    state.off(
                        'change',
                        this.createdCallback.bind(this)
                    );
                }
            }
        }

        component.init();
    }
)();
