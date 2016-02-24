'use strict';

const Errors=require(`${__dirname}/../Errors.js`);

console.log(multiplyNumbers(6,5));

function multiplyNumbers(numberOne,numberTwo){
    let err;
    numberOne=Number(numberOne);
    numberTwo=Number(numberTwo);

    if(!numberOne){
        err=new Errors.Type;
        err.setMessage(
            'numberOne',
            'Number',
            numberOne
        );
        throw err;
    }

    if(!numberTwo){
        err=new Errors.Type;
        err.setMessage(
            'numberTwo',
            'Number',
            numberTwo
        );
        throw err;
    }

    return numberOne*numberTwo;
}
