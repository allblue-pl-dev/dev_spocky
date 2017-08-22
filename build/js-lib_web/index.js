jsLibs.exportModule('spocky', 'index', (require, module) => { 'use strict';

const Config = require('./Config');


class Spocky
{

    constructor()
    { let self = this;
        self._config = new Config();

        self._layouts = {};
    }

    config(init_fn)
    { let self = this;
        init_fn(self._config);
    }

    init()
    { let self = this;
        // self._rootNode = new RootNode('content');
        //
        // let test_module = new $spk.site.Site();
        // self._rootNode.insertBefore(test_module, null);
    }

    layout(name, init_fn)
    {let self = this;
        self._layouts[name] = init_fn;
    }

    package(name, init_fn)
    {

    }


    get _lib()
    { let self = this;
        return {
            Config: require('./Config'),
            // Element: require('./Element'),
            Node: require('./Node'),
            HtmlElement: require('./HtmlElement'),
            // Viewable: require('./Viewable'),

            nodes: {
                // Layout: require('./nodes/LayoutNode'),
                // Module: require('./nodes/Module'),
                RepeatNode: require('./nodes/RepeatNode'),
                RootNode: require('./nodes/RootNode'),
                ShowNode: require('./nodes/ShowNode'),
                SingleNode: require('./nodes/SingleNode'),
                TextNode: require('./nodes/TextNode'),
            }
        };
    }

}

module.exports = new Spocky();
 });