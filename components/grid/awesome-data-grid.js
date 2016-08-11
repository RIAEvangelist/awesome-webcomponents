'use strict';

awesome.requireCSS(`${awesome.path}components/grid/awesome-data-grid.css`);

(
    function(){

        const component = new AwesomeComponent;
        component.tagName='awesome-data-grid';

        component.create=function createAwesomeDataGrid(){
            return class AwesomeDataGrid extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeDataGrid.elementTagName);
                }

                attachedCallback(){
                    super.attachedCallback();

                    this.addEventListener(
                        'click',
                        this.clicked
                    );
                }

                detachedCallback(){
                    super.detachedCallback();

                    this.removeEventListener(
                        'click',
                        this.clicked
                    );
                }

                /**
                 * generate function creates data grid based off object
                 * @param  {obj} grid data
                 * @return {null}
                 */
                generate(gridData){
                    if(this.querySelector('table')){
                        return;
                    }
                    const myTable = document.createElement('table');

                    if(gridData.info && gridData.info.title){
                        const title = document.createElement('h1');
                        title.innerHTML = gridData.info.title;
                        this.appendChild(title);
                    }

                    let tableHeaders = '<tr>';
                    let tableData = '<tr>'
                    for(const i in gridData.columnHeaders){
                        tableHeaders += `<th>${gridData.columnHeaders[i].label}<span class='arrow ${i}' id='${i}'></span></th>`;
                    }

                    for(const i in gridData.data){
                        for(const j in gridData.columnHeaders){
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

                clicked(e){
                    if(!(e.target.classList.contains('arrow'))){
                        return;
                    }

                    if(e.target.classList.contains('arrow')){
                        e.target.classList.toggle('arrowUp');

                        this.value=e.target.id;
                        const change = new Event(
                            'change',
                            {
                                'bubbles':true,
                                'cancelable':false
                            }
                        );

                        this.dispatchEvent(change);
                    }
                }
            };
        };

        component.init();
    }
)();
