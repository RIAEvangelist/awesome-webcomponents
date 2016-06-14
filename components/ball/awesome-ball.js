'use strict';

awesome.requireCSS(`${awesome.path}components/ball/awesome-ball.css`);

(
    function(){

        function init(){
            window.off(
                'awesome-ready',
                init
            );

            class AwesomeBall extends awesome.component.BaseComponent{
                createdCallback(){
                    this.defaults=this.defaults||{};
                    this.defaults.value = '0';
                    this.defaults.units  = '';
                    super.createdCallback();
                    this.classList.add(AwesomeBall.elementTagName);
                    this.caresAbout.push('data-value');
                    this.innerHTML=`
                        <div id = 'ballValue' class='ballValue'>${this.dataset.value}</div>
                    `;
                    this.ballValue = this.querySelector('.ballValue');
                }

                increment(){
                    console.log(this.dataset.value);
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

            AwesomeBall.elementTagName = 'awesome-ball';
            awesome.register(AwesomeBall);
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
)()
