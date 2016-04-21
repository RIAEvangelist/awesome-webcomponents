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

            generate(gridData, newObj){
                this.data = gridData;
                if(newObj){
                    const oldTable = this.querySelector('table');
                    const oldTitle = this.querySelector('h1');
                    this.removeChild(oldTable);
                    this.removeChild(oldTitle);
                    this.data = gridData;
                }

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
                    tableData += `<td></td>`;
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
                const sortedData = this.data.data.slice(0);
                sortedData.sort(function(a,b){
                    const x = a[key].toLowerCase();
                    const y = b[key].toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                })

                this.data.data = sortedData;

                const newObj = this.data;

                this.generate(this.data, newObj);
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
