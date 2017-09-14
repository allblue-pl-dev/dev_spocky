'use strict';

const A = require('./A');

console.log(A);

class B
{

    constructor()
    {
        console.log('Bam B!');
        this.a = new A();
    }

}
module.exports = B;
