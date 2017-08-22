'use strict';


class Interface
{

    constructor(interface_class)
    { let self = this;
        self._methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(
                new interface_class()));
        self._methodNames.splice(0, 1);
    }

    validate(object, not_implemented_methods = [])
    { let self = this;
        let valid = true;

        for (let i = 0; i < self._methodNames.length; i++) {
            if (!(self._methodNames[i] in object)) {
                valid = false;
                not_implemented_methods.push(self._methodNames[i]);
            }
        }

        return valid;
    }

}

module.exports = Interface;
