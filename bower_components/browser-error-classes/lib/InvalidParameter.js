'use strict';

if(!window.Errors){
    window.Errors={};
}

/**
 * Error for invalid parameters
 *
 * @extends Error
 * @class Errors.InvalidParameter
 * */
window.Errors.InvalidParameter = class InvalidParameter extends Error {
    /**
     * @example
     *
     * let test={a:1,b:0};
     *
     * if(test.b<1){
     *     err=new Errors.InvalidParameter;
     *     err.setMessage(
     *         'b',
     *         'a value greater than 0',
     *         test.b,
     *         test
     *     );
     *     throw err;
     * }
     *
     * @example
     *
     * ```sh
     *


        InvalidParameter: 'b' Expects 'a value greater than 0' but got 0

        at InvalidParameter (/home/bmiller/git/node-error-classes/lib/InvalidParameter.js:11:1)
        at multiplyNumbers (/home/bmiller/git/node-error-classes/example/invalidParam.js:13:13)
     *
     * ```
     *
     * @method Errors.InvalidParameter.setMessage
     * @param  {Any} parameterName name of parameter
     * @param  {Any} expected      what it expected
     * @param  {Any} got           what it got
     * @param  {Any} [scope]     optional value where the parameter came from like an object or array
     * @returns {String}    compiled error message
     */
    setMessage(parameterName,expected,got,scope){
        this.name='InvalidParameter';
        this.message=`${JSON.stringify(parameterName,null,4)} Expects ${JSON.stringify(expected,null,4)} but got ${JSON.stringify(got,null,4)}
        ${(scope)?
            `Scope : ${JSON.stringify(scope,null,4)}`:
            ''
        }`;
        return this.message;
    }
}
