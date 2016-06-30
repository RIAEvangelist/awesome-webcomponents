'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-print.css`);


(
    function(){

        const component=new AwesomeComponent;
        component.tagName='awesome-print';
        component.extends='BaseComponent';

        component.create=function createAwesomePrint() {
            return class AwesomePrint extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomePrint.elementTagName);
                }

                print(element){
                    if(!(element instanceof HTMLElement)){
                        console.warn('Must pass an HTML Element to print.');
                        return;
                    }
                    this.printBody = document.querySelectorAll('body > *');
                    this.elementToPrint = element.cloneNode(true);
                    for (let i = 0; i < this.printBody.length; i++) {
                        this.printBody[i].classList.add('hidden');
                    }
                    document.querySelector('html').add('print');
                    document.body.classList.add('print');
                    document.body.appendChild(this.elementToPrint);
                    window.print();

                    //this is necessary for electron since it does not provide a 'printDone' event of any kind, unlike chrome or firefox
                    setTimeout(
                        this.printDone.bind(this),
                        10
                    );
                }

                printDone(){
                    for (let i = 0; i < this.printBody.length; i++) {
                        this.printBody[i].classList.remove('hidden');
                    }
                    document.querySelector('html').remove('print');
                    document.body.classList.remove('print');
                    document.body.removeChild(this.elementToPrint);
                    this.elementToPrint = null;
                    this.printBody  = null;
                }
            }
        }

        component.init();
    }
)();
