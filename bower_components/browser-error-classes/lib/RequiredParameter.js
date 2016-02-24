'use strict';

if(!window.Errors){
    window.Errors={};
}

/**
 *
 * error for required params that are not set or passed
 *
* @extends Error
* @class Errors.RequiredParameter
 * */
window.Errors.RequiredParameter = class RequiredParameter extends Error {
    /**
     * @example
     *
     * let test={a:1,b:0};
     *
     * if(!test.c){
     *     err=new Errors.RequiredParameter;
     *     err.setMessage(
     *         'c',
     *         test
     *     );
     *     throw err;
     * }
     *
     * @example
     *
     * ```sh
     *

        RequiredParameter: Expects 'numberOne' to be defined

        at RequiredParameter (/home/bmiller/git/node-error-classes/lib/RequiredParameter.js:12:1)
        at multiplyNumbers (/home/bmiller/git/node-error-classes/example/requiredParam.js:13:13)

     *```
     *
     * @method Errors.RequiredParameter.setMessage
     * @param  {Any} parameterName name of parameter
     * @param  {Any} [scope]     optional value where the parameter came from like an object or array
     * @returns {String}    compiled error message
     */
    setMessage(parameterName,scope){
        this.name='RequiredParameter';
        this.message=`Expects ${JSON.stringify(parameterName,null,4)} to be defined
        ${(scope)?
            `Scope : ${JSON.stringify(scope,null,4)}`:
            ''
        }`;
        return this.message;
    }
}
