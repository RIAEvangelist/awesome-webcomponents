'use strict';
window.on=window.addEventListener;
window.off=window.removeEventListener;

/**
 *
 * @namespace Awesome
 */
class Awesome{
    constructor(){
        Object.defineProperties(
            this,
            {
                /**
                 * path used for requiring scripts or CSS to components or screens
                 * @type {String}
                 */
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
                /**
                 * constants
                 * @type {Object}
                 */
                constants:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                /**
                 * dispatchers
                 * @type {Object}
                 */
                dispatchers:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                /**
                 * stores
                 * @type {Object}
                 */
                stores:{
                    enumerable:true,
                    writable:false,
                    value:{}
                },
                loadTemplate:{
                    enumerable:true,
                    writable:false,
                    value:loadTemplate
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

        Object.defineProperty(
            this,
            /**
             * Path to bower components
             * @type {String}
             */
            'bower',
            {
                enumerable:true,
                writable:false,
                value:(document.location.pathname.indexOf('/awesome-webcomponents/') !== 0)?
                    this.path.split('awesome-webcomponents/')[0]
                        :
                    '/awesome-webcomponents/bower_components/'
            }
        );

        Object.defineProperties(
            this.constants,
            {
                /**
                 * action constants
                 * @type {Object}
                 */
                action:{
                    enumerable:true,
                    /**
                     * get the action constants
                     * @type {[type]}
                     */
                    get:getActionConstants,
                    /**
                     * set the actions constants
                     * @type {[type]}
                     */
                    set:setActionConstants
                },
                /**
                 * store constants
                 * @type {Object}
                 */
                store:{
                    enumerable:true,
                    /**
                     * get store constants
                     * @type {[type]}
                     */
                    get:getStoreConstants,
                    /**
                     * set store constants
                     * @type {[type]}
                     */
                    set:setStoreConstants
                },
                /**
                 * component constants
                 * @type {Object}
                 */
                component:{
                    enumerable:true,
                    /**
                     * get component constants
                     * @type {[type]}
                     */
                    get:getComponentConstants,
                    /**
                     * set component constants
                     * @type {[type]}
                     */
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

        /**
         * [loadTemplate description]
         * @param  {[type]} instance [description]
         * @return {[type]}          [description]
         */
        function loadTemplate(instance){
            const template=instance.querySelector('template');
            let content='';
            if(template){
                content=`
                    ${template.innerHTML}
                    ${template.outerHTML}
                `;
            }
            return content;
        }

        /**
         * [requireScript description]
         * @param  {[type]} path [description]
         * @return {[type]}      [description]
         */
        function requireScript(path){
            const script=document.createElement('script');
            const existingScript=document.head.querySelector(`script[src='${path}']`);
            if(existingScript){
                return false;
            }
            script.src=path;
            script.async=false;
            script.defer=true;
            script.type='text/javascript';
            script.onload=scriptLoaded.bind(path);
            document.head.appendChild(script);
            return true;
        }

        /**
         * [scriptLoaded description]
         * @return {[type]} [description]
         */
        function scriptLoaded(){
            const e=new CustomEvent(
                'awesome-script-loaded',
                {
                    detail:this
                }
            );

            window.dispatchEvent(e);
        }

        /**
         * [requireCSS description]
         * @param  {[type]} path [description]
         * @return {[type]}      [description]
         */
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

        /**
         * [mergeDataset description]
         * @param {[type]} el       [description]
         * @param {[type]} defaults [description]
         */
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

        /**
         * [updateAttributesFromData description]
         * @param  {[type]} el    [description]
         * @param  {[type]} key   [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        function updateAttributesFromData(el,key,value){
            if(key.indexOf('data-')!==0){
                return el;
            }

            el[
                key.replace('data-','')
            ]=value;

            return el;
        }

        /**
         * [uniqueEntries description]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
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
awesome.requireScript(`${awesome.bower}browser-error-classes/Errors.js`);

//constants
awesome.requireScript(`${awesome.path}stores/constants.js`);
awesome.requireScript(`${awesome.path}actions/constants.js`);
awesome.requireScript(`${awesome.path}components/constants.js`);

//dispatchers
awesome.requireScript(`${awesome.path}dispatchers/store.js`);
awesome.requireScript(`${awesome.path}dispatchers/action.js`);
awesome.requireScript(`${awesome.path}dispatchers/component.js`);

//awesome classes
awesome.requireScript(`${awesome.path}stores/store.js`);
