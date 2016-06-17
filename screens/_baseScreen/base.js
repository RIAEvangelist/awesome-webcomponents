'use strict';

awesome.requireCSS(`${awesome.path}screens/_baseScreen/base.css`);

(
    function(){
        const defaults={
            screen:''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-base-screen';

        component.create=function createBaseScreen(){
            return class BaseScreen extends awesome.component.BaseComponent{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();

                    this.classList.add(BaseScreen.elementTagName);
                }
            }
        }

        component.init();
    }
)()
