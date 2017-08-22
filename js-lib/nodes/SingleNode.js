'use strict';

const abTypes = require('../ab-types');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');


class SingleNode extends Node
{

    constructor(html_element_type)
    { super(); let self = this;
        self._htmlElement = document.createElement(html_element_type);

        self.__setListeners(self, self);
    }


    /* Node */
    __onNodeActivate()
    { let self = this;
        abTypes.assert(self.parentNode !== null, 'Parent node not set.');

        HtmlElement.AddChild(self.parentNode.__htmlElement, self._htmlElement,
                self.nextHtmlElement);
    }

    __onNodeDeactivate()
    { let self = this;
        HtmlElement.RemoveChild(self.parentNode.__htmlElement, self._htmlElement);
    }

    __getNodeHtmlElement()
    { let self = this;
        return self._htmlElement;
    }

    __getNodeFirstHtmlElement()
    { let self = this;
        if (!self.active)
            return null;

        return self._htmlElement;
    }
    /* / Node */


    /* Node.Children */
    __onAddNodeChild(child_node, next_node)
    { let self = this;
        child_node.activate();
    }

    __getChildNodeNextNode(child_node)
    { let self = this;
        return self.children.getNext(child_node);
    }
    /* / Node.Children */

}

module.exports = SingleNode;
