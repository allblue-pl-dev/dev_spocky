'use strict';

const abTypes = require('../ab-types');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');


class ShowNode extends Node
{

    get show()
    { let self = this;
        return self._show;
    }

    set show(show_value)
    { let self = this;
        abTypes.args(arguments, 'boolean');

        if (show_value === self._show)
            return;
        self._show = show_value;

        if (show_value) {
            if (self.active) {
                for (let i = 0; i < self.children.length; i++)
                    self.children.get(i).activate();
            }
        } else {
            for (let i = 0; i < self.children.length; i++)
                self.children.get(i).deactivate();
        }
    }


    constructor()
    { super(); let self = this;
        self._show = false;

        self.__setListeners(self, self);
    }


    /* Node */
    __onNodeActivate()
    { let self = this;
        abTypes.assert(self.parentNode !== null, 'Parent node not set.');

        console.log('Hm?');

        if (!self.show)
            return;

        for (let i = 0; i < self.children.length; i++)
            self.children.get(i).activate();
    }

    __onNodeDeactivate()
    { let self = this;
        if (!self.show)
            return;

        for (let i = 0; i < self.children.length; i++)
            self.children.get(i).deactivate();
    }

    __getNodeHtmlElement()
    { let self = this;
        abTypes.assert(self.parentNode !== null, 'Parent node not set.');

        return self.parentNode.__htmlElement;
    }

    __getNodeFirstHtmlElement()
    { let self = this;
        return self.children.length === 0 ?
                null : self.children.get(0).__firstHtmlElement;
    }
    /* / Node */


    /* Node.Children */
    __onAddNodeChild(child_node, next_node)
    { let self = this;
        if (next_node === null)
            child_node._nextNode = self._nextNode;

        if (self.show)
            child_node.activate();
    }

    __getChildNodeNextNode(child_node)
    { let self = this;
        let next_node = self.children.getNext(child_node);
        if (next_node !== null)
            return next_node;

        return self.nextNode;
    }
    /* / Node.Children */

}

module.exports = ShowNode;
