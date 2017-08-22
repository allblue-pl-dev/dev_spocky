jsLibs.exportModule('spocky', 'nodes/Module', (require, module) => { 'use strict';

const Viewable = require('./Viewable');


class Module
{

    get $view()
    { let self = this;
        return self._view;
    }

    set $view(viewable)
    { let self = this;
        Viewable.Validate(viewable);

        self._view = viewable;
        self._view.activate();
    }


    constructor()
    { let self = this;
        self._viewable = self._createViewable();
    }


    _createViewable(parent_html_node)
    { let self = this;
        return new Viewable({
            activate: () => {

            },
            deactivate: () => {

            },
        });
    }

}

module.exports = Module;
 });