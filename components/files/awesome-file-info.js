'use strict';

awesome.requireCSS(`${awesome.path}components/files/awesome-file-info.css`);
awesome.requireScript(`${awesome.path}stores/file/info.js`);

(
    function(){
        let state=null;
        const defaults={
            file_id:'default'
        }

        function init(e){
            state=awesome.stores.fileInfo.state;

            window.off(
                'awesome-ready',
                init
            );

            document.registerElement(
                'awesome-file-info',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
                awesome.mergeDataset(this,defaults);
                const content=awesome.loadTemplate(this);
                const fileInfo=state[this.dataset.file_id];

                let tableContent=`
                    <caption colspan=2>
                        No files Selected.
                    </caption>
                `;

                let count=0;

                console.log(state,fileInfo);

                if(fileInfo && Array.isArray(fileInfo.files)){
                    tableContent='';
                    count=fileInfo.files.length;
                    for(let i=0; i<fileInfo.files.length; i++){
                        const file=fileInfo.files[i];
                        tableContent+=`<th>
                            <td></td>
                            <td></td>
                        </th>
                        <tr>
                            <td>File Name</td>
                            <td>${file.name}</td>
                        </tr>
                        <caption colspan=2>
                            ${content}
                        </caption>
                        <tr>
                            <td>File Size</td>
                            <td>${file.size}</td>
                        </tr>
                        <tr>
                            <td>File Last Modified</td>
                            <td>${file.lastModifiedDate}</td>
                        </tr>`;
                    }
                }

                this.innerHTML=`
                    <table data-count='${count}'>
                        ${tableContent}
                    </table>
                `;
            }

            attachedCallback(){
                state.on(
                    'change',
                    this.createdCallback.bind(this)
                );
            }

            detachedCallback(){

            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }
        }

        if(!awesome.ready){
            window.on(
                'awesome-ready',
                init
            );

            return;
        }

        init();
    }
)();
