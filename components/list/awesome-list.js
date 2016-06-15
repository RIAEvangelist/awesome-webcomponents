'use strict';

awesome.requireCSS(`${awesome.path}components/list/awesome-list.css`);

(
    function(){
        const component=new AwesomeComponent;
        component.tagName='awesome-list';
        component.extends='BaseComponent';

        component.create=function createAwesomeList(){
            return class AwesomeList extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeList.elementTagName)

                    this.innerHTML=`
                        <ul>
                            ${this.content.content}
                        </ul>
                        ${this.content.template}
                    `;
                }
            }
        }

        component.init();
    }
)();
