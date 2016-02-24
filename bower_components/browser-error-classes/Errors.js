'use strict';

/**
 * # Custom and Explicit Javascript Error Classes
 *
 * ` bower install browser-error-classes `
 *
 Easy to read custom and extensible error classes for the browser which extend the native error classes.

 Include all the errors with ` Error.js ` ***OR*** include just what you need from the ` lib/ ` dir.

 Sometimes, just throwing an error isn't that helpful. Sometimes, handling an error elegantly preventing a crash just isn't quite good enough sometimes you want to handle explicit errors in the UI in specific ways. During team development there are times when you want to throw explicit errors to both help developers understand whats going on, as well as enforce some strict rules. That is what this module is for.
 *
 *
 * @example
 *
 * <script src='bower_components/browser-error-classes/Errors.js'></script>
 *
 * @namespace Errors
 */

(
    function ErrorsClosure(){
        const errors=[
            'Immutable',
            'InvalidMethod',
            'InvalidParameter',
            'RequiredParameter',
            'SocketUnavailable',
            'Type',
            'UndefinedValue'
        ];

        const path=document.head.querySelector(
            '[src$="browser-error-classes/Errors.js"]'
        ).src.replace(
            /Errors\.js$/,
            ''
        );

        for(let i=0; i<errors.length; i++){
            requireScript(`${path}lib/${errors[i]}.js`);
        }

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
            document.head.appendChild(script);
            return true;
        }
    }
)();
