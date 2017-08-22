jsLibs.exportModule('spocky', 'nodes/RootNode', (require, module) => { 'use strict';

const abTypes = require('../ab-types');

const Node = require('../Node')


class RootNode extends Node
{

    constructor(html_element)
    { super(); let self = this;
        abTypes.args(arguments, HTMLElement);

        self._htmlElement = html_element;

        self.__setListeners(self, self);
    }


    /* Node.IListener */
    __onNodeActivate()
    { let self = this;
        for (let i = 0; i < self.children.length; i++) {
            self.children.get(i).activate();
        }
    }

    __onNodeDeactivate()
    { let self = this;
        for (let i = 0; i < self.children.length; i++)
            self.children.get(i).deactivate();
    }

    __getNodeHtmlElement()
    { let self = this;
        return self._htmlElement;
    }

    __getNodeFirstHtmlElement()
    { let self = this;
        return self._htmlElement;
    }
    /* / Node.IListener */


    /* Node.Children.IListener */
    __onAddNodeChild(child_node)
    { let self = this;
        if (self.active)
            child_node.activate();
    }

    __getChildNodeNextNode(child_node)
    { let self = this;
        return self.children.getNext(child_node);
    }
    /* / Node.Children.IListener */

}

module.exports = RootNode;
 });