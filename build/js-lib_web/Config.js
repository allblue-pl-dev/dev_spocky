jsLibs.exportModule('spocky', 'Config', (require, module) => { 'use strict';


class Config {

    constructor()
    { let self = this;
        self._pages = {};
        self._modules = {};
    }

    page(name, alias)
    { let self = this;
        self._pages.push({
            name: name,
            alias: alias,
        });
    }

    module(html_elem_id, module_name)
    { let self = this;
        self._modules.push({
            htmlElemId: html_elem_id,
            moduleName: module_name,
        });
    }

}

module.exports = Config;
 });