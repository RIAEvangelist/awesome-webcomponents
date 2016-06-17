'use strict';

awesome.requireCSS(`${awesome.path}components/ball/awesome-ball.css`);

(
    function(){

        const defaults={
            value : '0',
            units : ''
        }

        const component=new AwesomeComponent;
        component.tagName='awesome-ball';
        component.extends='BaseComponent';

        component.create=function createAwesomeBall(){
            return class AwesomeBall extends awesome.component.BaseComponent{
                createdCallback(){
                    this.mergeDataset(defaults);
                    super.createdCallback();
                    this.classList.add(AwesomeBall.elementTagName);
                    this.careAbout('data-value');
                    this.localize(
                        this.dataset.units
                    );
                    this.innerHTML=`
                        <div id = 'ballValue' class='ballValue'>${this.dataset.value}</div>
                    `;
                    this.ballValue = this.querySelector('.ballValue');
                }

                increment(){
                    this.dataset.value++;
                    this.update()
                }

                decrement(){
                    this.dataset.value--;
                    this.update()
                }

                update(){
                    this.ballValue.innerHTML = `${this.dataset.value} ${this.dataset.units}`;
                    this.classList.add('update');
                    setTimeout(
                        this.updateValueHandler.bind(this),
                        200
                    );
                }

                updateValueHandler(ballValue){
                    this.classList.remove('update');
                }
            }
        }

        component.init();
    }
)()
