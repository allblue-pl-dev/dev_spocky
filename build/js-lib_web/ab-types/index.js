jsLibs.exportModule('spocky', 'ab-types/index', (require, module) => { 'use strict';


class ABTypes
{

    get AssertionError()
    { let self = this;
        return ABTypes_AssertionError
    }

    get TypeError()
    { let self = this;
        return ABTypes_TypeError;
    }

    get Interface()
    { let self = this;
        return require('./Interface');
    }


    constructor()
    { let self = this;

    }

    args(args)
    { let self = this;
        for (let i = 0; i < args.length; i++)
            self.var(args[i], arguments[i + 1]);
    }

    assert(value, message = '')
    { let self = this;
        if (!value)
            throw new ABTypes_AssertionError(message);
    }

    implements(object, interface_object)
    { let self = this;
        let not_implemented_methods = [];
        if (!interface_object.validate(object, not_implemented_methods)) {
            throw new self.TypeError('Interface methods not implemented:' +
                    not_implemented_methods.join(', '));
        }
    }

    var(value, value_type)
    { let self = this;
        /* Basic types. */
        if (typeof value_type === 'string') {
            if (typeof value !== value_type)
                throw new self.TypeError('Wrong variable type.');

            return;
        }

        /* Classes */
        if (typeof value_type === 'object') {
            if (value_type instanceof self.Interface) {
                let not_implemented_methods = [];
                if (!value_type.validate(value, not_implemented_methods)) {
                    throw new self.TypeError('Interface methods not implemented:' +
                            not_implemented_methods.join(', '));
                }

                return;
            }
        }

        if (typeof value_type === 'function') {
            if (!(value instanceof value_type))
                throw new self.TypeError('Wrong class type.');
        }
    }


    _validateInterface(object, interface_object)
    { let self = this;

    }

}


class ABTypes_AssertionError extends Error
{

    constructor(...args)
    {
        super(...args);
    }

}


class ABTypes_TypeError extends Error
{

    constructor(...args)
    {
        super(...args);
    }

}

module.exports = new ABTypes();
 });