'use strict';

awesome.requireCSS(`${awesome.path}components/widgets/awesome-sidebar.css`);

(
    function(){
        const component=new AwesomeComponent;
        component.tagName='awesome-sidebar';
        component.extends='BaseComponent';

        component.create=function createAwesomeList(){
            return class AwesomeSidebar extends awesome.component.BaseComponent{
                createdCallback(){
                    super.createdCallback();
                    this.classList.add(AwesomeSidebar.elementTagName)

                    this.innerHTML=`
                        <div class='sidebar-stub'>
                            <span class = 'flaticon-three'>
                            </span>
                        </div>
                        <div class='sidebar-content'>${this.content.content}</div>
                        ${this.content.template}
                    `;

                    this.querySelector('.sidebar-stub').addEventListener(
                        'click',
                        this.clicked.bind(this)
                    )
                }

                clicked(){
                    this.classList.toggle('showSidebar');
                }
            }
        }

        component.init();
    }
)();
