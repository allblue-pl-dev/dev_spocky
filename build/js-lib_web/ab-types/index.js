jsLibs.exportModule('spocky', 'ab-types/index', (require, module) => { 'use strict';


const abTypes = new class abTypes
{

    get Presets() {
        return require('./Presets');
    }


    constructor()
    {

    }

    args(args)
    {
        for (let i = 0; i < args.length; i++) {
            if (i + 1 >= arguments.length)
                return;

            this.var(args[i], arguments[i + 1]);
        }
    }

    argsC(args, errors = [])
    {
        for (let i = 0; i < args.length; i++)
            if (!this.varC(args[i], arguments[i + 1]))
                return false;

        return true;
    }

    assert(value, message = '')
    {
        if (!value)
            throw new ABTypes_AssertionError(message);
    }

    implements(object, prop_class)
    {
        if (!this.implementsC(object, prop_class)) {
            throw new TypeError(`Object of type \`${object.constructor.name}\`` +
                    ` doesn't implement property.`);
        }
    }

    implementsC(object, prop_class)
    {
        this.args(arguments, 'object', 'function');

        if (prop_class.PropName in object) {
            if (object[prop_class.PropName] instanceof prop_class)
                return true;
        }

        return false;
    }

    prop(main_object, prop_class)
    {
        this.args(arguments, 'object', 'function');

        if (!('Property' in prop_class))
            throw new Error(`\`prop_class\` is not a \`Property\`.`);

        let prop_args = [ null ];
        for (let i = 2; i < arguments.length; i++)
            prop_args.push(arguments[i]);

        let prop = new (Function.prototype.bind.apply(prop_class, prop_args))();
        Object.defineProperty(main_object, prop_class.Property, {
            value: prop
        });
    }

    var(value, value_type)
    {
        let errors = [];
        if (this.varC(value, value_type, errors))
            return;

        console.error('Error:', errors);
        throw new TypeError('Wrong variable type.');
    }

    varC(value, value_type, errors = [])
    {
        if (value === null)
            return true;

        let typeof_value_type = typeof value_type;

        /* Basic types. */
        if (typeof_value_type === 'string') {
            if (typeof value !== value_type) {
                let real_value_type = typeof value;

                errors.push(`Variable \`${value}\` of type \`${real_value_type}\` should be` +
                        ` of type \`${value_type}\`.`);
                return false;
            }

            return true;
        }

        if (typeof_value_type === 'object') {
            /* Multiple Types */
            if (value_type instanceof Array) {
                for (let i = 0; i < value_type.length; i++)
                    this.var(value, value_type[i], errors);

                if (errors.length > 0)
                    return false;
            }

            return true;
        }

        if (typeof_value_type === 'function') {
            /* Property */
            if ('PropName' in value_type) {
                if (!this.implementsC(value, value_type)) {

                    errors.push(`Variable does not implement property
                            \`${value_type.constructor}\`.`);
                    return false;
                }

                return true;
            }

            /* Class */
            if (!(value instanceof value_type)) {
                errors.push(`Variable \`${value}\` is not  an instance of` +
                        ` \`${value_type.name}\`.`);
                return false;
            }

            return true;
        }

        throw new Error(`Unknown \`value_type\`: ${typeof_value_type}`);
    }

    virtual(object = null)
    {
        if (object === null)
            throw new ABTypes_NotImplementedError();

        throw new NotImplementedError(`Method not implemented in:` +
                ` \`${object.main.constructor.name}\`.`);
    }

}();
module.exports = abTypes;


Object.defineProperties(abTypes, {

    AssertionError: { value:
    class ABTypes_AssertionError extends Error
    {
        constructor(...args)
        {
            super(...args);
        }

    }},


    NotImplementedError: { value:
    class ABTypes_NotImplementedError extends Error
    {

        constructor(...args)
        {
            super(...args);
        }

    }},


    TypeError: { value:
    class ABTypes_TypeError extends Error
    {

        constructor(...args)
        {
            super(...args);
        }

    }},

});
 });