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
                    <caption>
                        No files Selected.
                    </caption>
                `;

                let count=0;

                console.log(state,fileInfo);

                if(fileInfo && Array.isArray(fileInfo.files)){
                    tableContent=`<tr>
                        <th>${awesome.language.current.name}</th>
                        <th>${awesome.language.current.size}</th>
                        <th>${awesome.language.current.lastModified}</th>
                        <th>${awesome.language.current.content}</th>
                    </tr>`;

                    count=fileInfo.files.length;
                    for(let i=0; i<fileInfo.files.length; i++){
                        const file=fileInfo.files[i];
                        tableContent+=`
                            <tr>
                                <td>${file.name}</td>
                                <td>${file.size}</td>
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
