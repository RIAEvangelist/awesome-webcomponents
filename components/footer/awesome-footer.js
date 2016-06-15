'use strict';

awesome.requireCSS(`${awesome.path}components/footer/awesome-footer.css`);

(
    function(){
        const component=new AwesomeComponent;
        component.tagName='awesome-footer';
        component.extends='BaseComponent';

        component.create=function createAwesomeList(){
            return class AwesomeFooter extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeFooter.elementTagName);
                    this.innerHTML=`
                        <footer>
                            ${this.content.content}
                        </footer>
                        ${this.content.template}
                    `;
                }
            }
        }

        component.init();
    }
)();
