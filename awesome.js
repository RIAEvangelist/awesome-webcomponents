'use strict';

class Awesome{
    constructor(){
        Object.defineProperties(
            this,
            {
                path:{
                    enumerable:true,
                    writable:false,
                    value:'';
                },
                constants:{
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
                }
            }
        );

        Object.defineProperties(
            this.constants,
            {
                actions:{
                    enumerable:true,
                    get:getActionConstants,
                    set:setActionConstants
                },
                stores:{
                    enumerable:true,
                    get:getStoreConstants,
                    set:setStoreConstants
                },
                components:{
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
            util.uniqueEntries(actions);
            return actions;
        }

        function getStoreConstants(){
            return stores;
        }

        function setStoreConstants(constants){
            Object.assign(stores,constants);
            util.uniqueEntries(stores);
            return stores;
        }

        function getComponentConstants(){
            return components;
        }

        function setComponentConstants(constants){
            Object.assign(components,constants);
            util.uniqueEntries(components);
            return components;
        }

        function requireScript(path){
            const script=document.createElement('script');
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            script.src=path;
            document.head.appendChild(script);
            return true;
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

            duplicateCheckArray=duplicateKeyArray=keys=null;

            return true;
        };
    }
}

const awesome=new Awesome;
