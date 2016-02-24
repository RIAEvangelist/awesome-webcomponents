'use strict';

const Errors=require(`${__dirname}/../Errors.js`);

console.log(multiplyNumbers(6,5));

function multiplyNumbers(numberOne,numberTwo){
    let err;
    numberOne=Number(numberOne);
    numberTwo=Number(numberTwo);

    if(numberOne>5){
        err=new Errors.InvalidParameter;
        err.setMessage(
            'numberOne',
            'a value less than 5',
            numberOne
        );
        throw err;
    }

    if(numberTwo>10){
        err=new Errors.InvalidParameter;
        err.setMessage(
            'numberTwo',
            'a value less than 10',
            numberTwo
        );
        throw err;
    }

    return numberOne*numberTwo;
}
