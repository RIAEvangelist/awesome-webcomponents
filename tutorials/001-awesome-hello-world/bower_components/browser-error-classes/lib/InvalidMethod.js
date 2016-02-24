'use strict';

if(!window.Errors){
    window.Errors={};
}

/**
 * Error for methods which are either undefined or not methods (functions)
 *
 * @extends Error
 * @class Errors.InvalidMethod
 * */
window.Errors.InvalidMethod = class InvalidMethod extends Error{
    /**
     * @example
     *
     *
         class User{
            constructor(name,age){
                this.name=name;
                this.age=age;
            }
         }

        const bob=new User('bob',42);

        if(!bob.getInfo || typeof bob.getInfo !== 'function'){
            const err=new Errors.InvalidMethod;
            err.setMessage('getInfo',bob.getInfo,bob);
        }

     * @example
     *
     * ```sh
     *

 invalidMethod.html:25 Uncaught InvalidMethod: Expects "getInfo" to be Function but got undefined
             Scope : {
     "name": "bob",
     "age": 42
 }
     *
     * ```
     *
     * @method Errors.InvalidMethod.setMessage
     * @param  {String} methodName      method name
     * @param  {Any} method  expected method
     * @param  {Any} [scope] scope in which the invalid method is expected
     * @returns {String}    compiled error message
     */
    setMessage(methodName, method, scope){
        this.name = 'InvalidMethod';
        this.message = `Expects ${JSON.stringify(methodName,null,4)} to be Function but got ${JSON.stringify(method,null,4)}
            ${(scope)?
                `Scope : ${JSON.stringify(scope,null,4)}`:
                ''
            }`;
        return this.message;
    }
}
