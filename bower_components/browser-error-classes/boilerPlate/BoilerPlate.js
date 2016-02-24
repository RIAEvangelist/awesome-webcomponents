'use strict';

/**
 * Error BoilerPlate for whatever you want!
 *
 * @extends Error
 * @class Errors.BoilerPlate
 * */
class BoilerPlate extends Error{
    /**
 * @example

        put your example here


 * @example
 *
 * ```sh
 *
        paste error from console here as example

 * ```
 *
 * @method Errors.BoilerPlate.setMessage
 * @param  {String} param1      what param1 is
 * @param  {Any} param2  what param2 is
 * @param  {Any} [scope] scope in which the error is happening
 * @returns {String}    compiled error message
 */
    setMessage(param1, param2, scope){
        this.name = 'BoilerPlate';
        this.message = `Expects ${util.inspect(param1, {depth: 5, colors: true})} to be ${util.inspect(param2, {depth: 5, colors: true})}.
        ${(scope)?
            `Scope : ${util.inspect(scope,{depth:5,colors:true})}`:
            ''
        }`;
        return this.message;
    }
}
