'use strict';

awesome.requireCSS(`${awesome.path}components/grid/awesome-data-grid.css`);
awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

(
    function(){
        let dispatcher=null;
        let constants = null;
        let action = null;
        const defaults={};

        function init(e){
            window.off(
                'awesome-ready',
                init
            );

            dispatcher=awesome.dispatchers.component;
            constants=awesome.constants.component;
            action=awesome.constants.action;

            document.registerElement(
                'awesome-data-grid',
                Component
            );
        }

        class Component extends HTMLElement{
            createdCallback(){
            }

            attachedCallback(){
                this.addEventListener(
                    'click',
                    this.clicked
                );
            }

            detachedCallback(){
            }

            attributeChangedCallback(key,oldValue,newValue){
                this.createdCallback();
            }

            clicked(e){
                if(e.target.localName !== 'td'){
                    return;
                }

                this.dialog = document.createElement('awesome-dialog');
                document.body.appendChild(this.dialog);
                this.dialog.innerHTML=`
                    <button class='closeButton'>
                        Close
                    </button>
                    <button class='editButton'>
                        Edit
                    </button>
                    <button class='saveButton'>
                        Save
                    </button>
                `;
                this.dialog.addEventListener(
                   'click',
                   this.generalRemoveDialog
                );
            }

            generate(gridData){
                const myTable = document.createElement('table');
                const title = document.createElement('h1');
                title.innerHTML = gridData.gridDefinition.title;
                this.appendChild(title);
                let tableHeaders = `<tr><th> </th>`;
                let tableData = `<tr>`
                for(const i in gridData.keys){
                    tableHeaders += `<th> ${i} </th>`;

                }

                for(const i in gridData.data){
                    tableData += `<td>${i}</td>`
                    for(const j in gridData.keys){
                        if(gridData.data[i][j]){
                            tableData += `<td>${gridData.data[i][j]}</td>`;
                            continue;
                        }
                        tableData +=`<td></td>`;
                    }
                    tableData += `</tr><tr>`;
                }

                tableHeaders += `</tr>`;
                tableData += `</tr>`;
                myTable.innerHTML = tableHeaders + tableData;

                this.appendChild(myTable);

                // for(const i in gridData.data){
                //     if(typeof gridData.data[i]=='object'){
                //         for(const j in gridData.data[i]){
                //             myTable.insertRow(i).innerHTML = `<td>${gridData.data[i][j].firstName}</td>`;
                //             this.appendChild(myTable);
                //         }
                //     }
                // }
            }

            generalRemoveDialog(e){
                if(!e.target.classList.contains('closeButton')){
                    return;
                }
                document.body.removeChild(this);
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
