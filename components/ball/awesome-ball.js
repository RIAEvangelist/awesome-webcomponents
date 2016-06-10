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
                    this.defaults = {
                        value :'0'
                    }
                    super.createdCallback();
                    this.caresAbout.push('data-value');
                    this.classList.add(AwesomeBall.elementTagName);
                    this.innerHTML=`
                        <div class='ballValue'>${this.dataset.value}</div>
                    `;
                    this.ballValue = this.querySelector('.ballValue');
                }

                increment(){
                    this.dataset.value++;
                    this.ballValue.innerHTML = this.dataset.value;
                    this.classList.add('increment');
                    setTimeout(
                        this.incrementHandler.bind(this),
                        200
                    );
                }

                incrementHandler(ballValue){
                    this.classList.remove('increment');
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
