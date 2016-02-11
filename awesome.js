'use strict';
window.on=window.addEventListener;
window.off=window.removeEventListener;

class Awesome{
    constructor(){
        function findBower(){
            let bower='bower_components/';

            const nestedAwesome=document.head.querySelector(
                `[src$="${bower}awesome-webcomponents/awesome.js"]`
            );

            if(!nestedAwesome){
                return `./${bower}`;
            }

            return nestedAwesome.src.split('awesome-webcomponents/')[0];
        }

        Object.defineProperties(
            this,
            {
                path:{
                    enumerable:true,
                    writable:false,
                    value:document.head.querySelector(
                        '[src$="/awesome.js"]'
                    ).src.replace(
                        /awesome\.js$/,
                        ''
                    )
                },
                bower:{
                    enumerable:true,
                    writable:false,
                    value:findBower()
                },
                constants:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                dispatchers:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                stores:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                actions:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                validators:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                requireScript:{
                    enumerable:true,
                    writable:false,
                    value:requireScript
                },
                requireCSS:{
                    enumerable:true,
                    writable:false,
                    value:requireCSS
                },
                uniqueEntries:{
                    enumerable:true,
                    writable:false,
                    value:uniqueEntries
                },
                mergeDataset:{
                    enumerable:true,
                    writable:false,
                    value:mergeDataset
                },
                updateAttributesFromData:{
                    enumerable:true,
                    writable:false,
                    value:updateAttributesFromData
                }
            }
        );

        Object.defineProperties(
            this.constants,
            {
                action:{
                    enumerable:true,
                    get:getActionConstants,
                    set:setActionConstants
                },
                store:{
                    enumerable:true,
                    get:getStoreConstants,
                    set:setStoreConstants
                },
                component:{
                    enumerable:true,
                    get:getComponentConstants,
                    set:setComponentConstants
                }
            }
        );

        const actions={};
        const stores={};
        const components={};

        function getActionConstants(){
            return actions;
        }

        function setActionConstants(constants){
            Object.assign(actions,constants);
            uniqueEntries(actions);
            return actions;
        }

        function getStoreConstants(){
            return stores;
        }

        function setStoreConstants(constants){
            Object.assign(stores,constants);
            uniqueEntries(stores);
            return stores;
        }

        function getComponentConstants(){
            return components;
        }

        function setComponentConstants(constants){
            Object.assign(components,constants);
            uniqueEntries(components);
            return components;
        }

        function requireScript(path){
            const script=document.createElement('script');
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            script.src=path;
            script.onload=scriptLoaded.bind(path);
            document.head.appendChild(script);
            return true;
        }

        function scriptLoaded(){
            const e=new CustomEvent(
                'awesome-script-loaded',
                {
                    detail:this
                }
            );

            window.dispatchEvent(e);
        }

        function requireCSS(path){
            const css=document.createElement('link');
            const existingCSS=document.head.querySelector(`link[href='${path}']`);

            if(existingCSS){
                return false;
            }

            css.rel='stylesheet';
            css.href=path;
            document.head.appendChild(css);
        }

        function mergeDataset(el,defaults){
            const data={};
            Object.assign(
                data,
                defaults
            );

            Object.assign(
                data,
                el.dataset
            );

            Object.assign(
                el.dataset,
                data
            );
        }

        function updateAttributesFromData(el,key,value){
            if(key.indexOf('data-')!==0){
                return el;
            }

            el[
                key.replace('data-','')
            ]=value;

            return el;
        }

        function uniqueEntries(data){
            var duplicateCheckArray=[];
            var duplicateKeyArray=[];

            var keys=Object.keys(data);
            for(var i=0; i<keys.length; i++){
                var key=keys[i];
                var entry=data[
                    key
                ];
                var duplicateKeyIndex=duplicateKeyArray.indexOf(key);
                var duplicateIndex=duplicateCheckArray.indexOf(entry);

                if(duplicateKeyIndex>-1){
                    var error=[
                        'duplicate key of',
                        key,
                        'const keys MUST be unique!'
                    ].join(' ');

                    throw(error);
                }

                if(duplicateIndex>-1){
                    var error=[
                        'duplicate value string of',
                        data[key],
                        'found on',
                        key,
                        '&&',
                        keys[duplicateIndex],
                        'const value strings MUST be unique!'
                    ].join(' ');

                    throw(error);
                }
                duplicateKeyArray.push(key);
                duplicateCheckArray.push(entry);
            }

            return true;
        };
    }
}

const awesome=new Awesome;

//bootstrap css
awesome.requireCSS(`${awesome.path}css/component.css`);

//node modules
awesome.requireScript(`${awesome.bower}event-pubsub/event-pubsub-browser.js`);
awesome.requireScript(`${awesome.bower}js-message/js-message-vanilla.js`);

//dispatchers
awesome.requireScript(`${awesome.path}dispatchers/store.js`);
awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}dispatchers/component.js`);

//constants
awesome.requireScript(`${awesome.path}stores/constants.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}components/constants.js`);

//awesome classes
awesome.requireScript(`${awesome.path}stores/store.js`);
