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
                if(e.target.localName !== 'td' && !(e.target.classList.contains('arrow'))){
                    return;
                }

                if(e.target.localName == 'td'){
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
                if(e.target.classList.contains('arrow')){
                    e.target.classList.toggle('arrowUp');
                    this.sort(e.target.id);
                }
            }

            generate(gridData){
                this.data = gridData;
                const myTable = document.createElement('table');
                const title = document.createElement('h1');
                title.innerHTML = gridData.gridDefinition.title;
                this.appendChild(title);
                let tableHeaders = `<tr><th> </th>`;
                let tableData = `<tr>`
                for(const i in gridData.keys){
                    tableHeaders += `<th>${gridData.keys[i]}<span class='arrow ${i}' id='${i}'></span></th>`;
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
            }

            sort(key){
                // firstname, lastname, age, ID, DOB are keys etc
                const sortedList = [];
                for(const i in this.data.data){
                    if(typeof this.data.data[i][key] == 'string'){
                        console.log(this.data.data[i][key],'string!');

                    }
                    if(typeof this.data.data[i][key] == 'number'){
                        console.log(this.data.data[i][key],'number!');
                    }
                }
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
