'use strict';

const B = require('./B');


class A
{

    constructor()
    {
        console.log('Bam A!');
        this.b = new B();
    }

}
module.exports = A;
