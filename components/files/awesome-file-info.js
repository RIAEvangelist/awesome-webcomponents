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
                    this.localize(
                        'fileName',
                        'fileSize',
                        'fileLastModified',
                        'fileContent',
                        'noFilesSelected'
                    );

                    let tableContent=`
                        <tr>
                            <th>${this.local.noFilesSelected}</th>
                        </tr>
                    `;

                    let count=0;
                    const fileInfo=state[this.dataset.file_id];

                    if(fileInfo && Array.isArray(fileInfo.files)){
                        tableContent=`<tr>
                        <th>${this.local.fileName}</th>
                        <th>${this.local.fileSize}</th>
                        <th>${this.local.fileLastModified}</th>
                        <th>${this.local.fileContent}</th>
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

                }

                attachedCallback(){
                    super.attachedCallback();

                    state.on(
                        'change',
                        this.createdCallback.bind(this)
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

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
