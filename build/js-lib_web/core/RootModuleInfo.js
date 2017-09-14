jsLibs.exportModule('spocky', 'core/RootModuleInfo', (require, module) => { 'use strict';

const Module = require('../Module');


class RootModuleInfo
{

    constructor(id, html_element, path)
    {
        Object.defineProperties(this, {
            id: { value: id, },
            htmlElement: { value: html_element, },
            pathInfo: { value: new Module.PathInfo(path), },
        });
    }

}
module.exports = RootModuleInfo;
 });