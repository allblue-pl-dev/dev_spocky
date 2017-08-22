'use strict';

const abTypes = require('../ab-types');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');


class TextNode extends Node
{

    constructor(text)
    { super(); let self = this;
        abTypes.implements(self, Node.IListener, Node.Copyable);

        self._htmlElement = document.createTextNode(text);

        self.__setListeners(self);
    }


    /* Node */
    __onNodeActivate()
    { let self = this;
        if (self.parentNode === null)
            throw new Error('Parent node not set.');

        HtmlElement.AddChild(self.parentNode.__htmlElement, self._htmlElement,
                self.nextNode === null ? null : self.nextNode.__firstHtmlElement);
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

    /* Node.Copyable */
    __copyNode()
    { let self = this;
        return new TextNode(self._htmlElement.innerHTML);
    }
    /* / Node.Copyable */

}

module.exports = TextNode;
