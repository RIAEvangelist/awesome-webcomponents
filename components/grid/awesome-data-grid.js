'use strict';

awesome.requireCSS(`${awesome.path}components/grid/awesome-data-grid.css`);

(
    function(){
        let dispatcher=null;
        let constants = null;
        let action = null;
        let ascending = false;
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
                if(!(e.target.classList.contains('arrow'))){
                    return;
                }

                if(e.target.classList.contains('arrow')){
                    this.sort(e.target);
                    const a = this.querySelectorAll('.arrow');
                    for(let i=0; i<a.length; i++){
                        if(a[i].classList.contains(e.target.id)){
                            a[i].classList.toggle('arrowUp');
                        }
                    }
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
                let tableHeaders = `<tr>`;
                let tableData = `<tr>`
                for(const i in gridData.keys){
                    tableHeaders += `<th>${gridData.keys[i].label}<span class='arrow ${i}' id='${i}'></span></th>`;
                }

                for(const i in gridData.data){
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
                // For loop adds empty string to any missing property
                for(const i in this.data.data){
                    for(const j in this.data.keys){
                        if(!(this.data.keys[j] in this.data.data[i])){
                            if(this.data.data[i][j] == undefined){
                                this.data.data[i][j] = '';
                            }
                        }
                    }
                }

                const ascendingData = this.data.data.slice(0);
                const descendingData = this.data.data.slice(0);
                const typeSort = this.data.keys[key.id].type;
                switch(typeSort){
                case 'string':
                    if(key.classList.contains('arrowUp')){
                        descendingData.sort(
                            function(a,b){
                                const x = b[key.id].toLowerCase();
                                const y = a[key.id].toLowerCase();

                                return x < y ? -1 : x > y ? 1 : 0;
                            }
                        );

                        this.data.data = descendingData;
                        const numSortObj = this.data;
                        this.generate(this.data, numSortObj);
                        console.log('descendingData',descendingData);
                        return;
                    }
                    ascendingData.sort(
                        function(a,b){
                            const x = a[key.id].toLowerCase();
                            const y = b[key.id].toLowerCase();

                            return x < y ? -1 : x > y ? 1 : 0;
                        }
                    );

                    this.data.data = ascendingData;

                    const stringSortObj = this.data;
                    this.generate(this.data, stringSortObj);
                    break;
                case 'number':
                    if(key.classList.contains('arrowUp')){

                        descendingData.sort(
                            function(a,b){
                                return b[key.id]-a[key.id];
                            }
                        );

                        this.data.data = descendingData;
                        const numSortObj = this.data;
                        this.generate(this.data, numSortObj);
                        console.log('descendingData',descendingData);
                        return;
                    }

                    ascendingData.sort(
                        function(a,b){
                            return a[key.id]-b[key.id];
                        }
                    );

                    this.data.data = ascendingData;
                    const numSortObj = this.data;
                    this.generate(this.data, numSortObj);
                    console.log('ascendingData',ascendingData);
                    break;
                case 'date':
                    console.log('date');
                    break;
                }
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
