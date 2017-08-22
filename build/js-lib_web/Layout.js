jsLibs.exportModule('spocky', 'Layout', (require, module) => { 'use strict';

const Viewable = require('./Viewable');


class LayoutNode
{

    constructor(init_fn)
    { let self = this;
        Object.defineProperties(self, {
            viewable: { value: self._createViewable() },

            _nodes: { value: [] },
            _fields: { value: {} },
        });

        self._nodes = [];
        self._fields = {};

        self._data = self._parseData(init_fn());
    }


    _createViewable()
    { let self = this;
        return new Viewable({
            activate: (parent_html_node) => {

            },
            deactivate: (parent_html_node) => {

            },
        });
    }

    _parseData(data)
    { let self = this;
        if (typeof data !== 'object')
            throw new Error('Layout `init_fn` must return an object.');


    }

}

class Layout_Public
{

    get $fields()
    { let self = this;
        return self._$private.fields;
    }

    get $viewable()
    { let self = this;
        return self._$private.viewable;
    }

    construct()
    { let self = this;
        Object.defineProperties(self, {

        });
    }

}

module.exports = Layout;
 });