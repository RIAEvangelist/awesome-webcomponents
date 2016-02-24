'use strict';

if(!window.Errors){
    window.Errors={};
}

/**
 * Error for undefined values
 *
 * @extends Error
 * @class Errors.UndefinedValue
 * */
window.Errors.UndefinedValue = class UndefinedValue extends Error{
    /**
   * @example
   *
   *

    const user={
       name:'bob'
    }

    if(!user.age){
      const err = new Errors.UndefinedValue;
      err.setMessage(
          'age',
          user.age,
          user
      );
      throw err;
    }
   *
   * @example
   *
   * ```sh
   *
    git/node-error-classes/example/undefinedValue.js:14
       throw err;
       ^

    Undefined: 'string'

   * ```
   *
   * @method Errors.UndefinedValue.setMessage
   * @param  {String} variableName      varible name
   * @param  {Any} variable      varible
   * @param  {Any} [scope]      scope in which the variable should exist
   * @returns {String}    compiled error message
   */
    setMessage(variableName,variable,scope){
        this.name = 'UndefinedValue';
        this.message = `Expects ${JSON.stringify(variableName,null,4)} to be defined but got ${JSON.stringify(variableName,null,4)}
        ${(scope)?
            `Scope : ${JSON.stringify(scope,null,4)}`:
            ''
        }`;
        return this.message;
    }
}
