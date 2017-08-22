'use strict';

const abTypes = require('../ab-types');

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');

const TextNode = require('./TextNode');


class RepeatNode extends Node
{

    get length()
    { let self = this;
        return self._show;
    }

    set length(show_value)
    { let self = this;
        abTypes.args(arguments, 'boolean');

        if (show_value === self._show)
            return;
        self._show = show_value;

        if (show_value) {
            for (let i = 0; i < self.children.length; i++)
                self.children.get(i).activate();
        } else {
            for (let i = 0; i < self.children.length; i++)
                self.children.get(i).deactivate();
        }
    }


    constructor()
    { super(); let self = this;
        self.__setListeners(self, self);

        self._nodeInstances = [];
    }

    pop()
    { let self = this;
        let last_node_instance = self._nodeInstances.pop();
        last_node_instance.deactivate();
    }

    push()
    { let self = this;
        let node_instance = new NodeInstance(self);
        for (let i = 0; i < self.children.length; i++)
            node_instance.children.add(new TextNode('Test'));
        self._nodeInstances.push(node_instance);

        node_instance.activate();
    }


    /* Node */
    __onNodeActivate()
    { let self = this;
        abTypes.assert(self.parentNode !== null, 'Parent node not set.');

        for (let i = 0; i < self._nodeInstances.length; i++)
            self._nodeInstances[i].activate();
    }

    __onNodeDeactivate()
    { let self = this;
        for (let i = 0; i < self._nodeInstances.length; i++)
            self._nodeInstances[i].deactivate();
    }

    __getNodeHtmlElement()
    { let self = this;
        abTypes.assert(self.parentNode !== null, 'Parent node not set.');

        return self.parentNode.__htmlElement;
    }

    __getNodeFirstHtmlElement()
    { let self = this;
        return self._nodeInstances.length === 0 ?
                null : self._nodeInstances[0].__firstHtmlElement;
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


class NodeInstance extends Node
{

    constructor(repeat_node)
    { super(); let self = this;
        abTypes.args(arguments, RepeatNode);

        self._repeatNode = repeat_node;

        self.__setListeners(self, self);
    }


    /* Node */
    __onNodeActivate()
    { let self = this;
        for (let i = 0; i < self.children.length; i++)
            self.children.get(i).activate();
    }

    __onNodeDeactivate()
    { let self = this;
        for (let i = 0; i < self.children.length; i++)
            self.children.get(i).deactivate();
    }

    __getNodeHtmlElement()
    { let self = this;
        return self._repeatNode.__htmlElement;
    }

    __getNodeFirstHtmlElement()
    { let self = this;
        return self.children.length === 0 ? null : self.children.get(0).__firstHtmlElement;
    }
    /* / Node */


    /* Node.Children */
    __onAddNodeChild(child_node, next_node)
    { let self = this;
        child_node.activate();
    }

    __getChildNodeNextNode(child_node)
    { let self = this;
        let next_node = self.children.getNext(child_node);
        if (next_node !== null)
            return next_node;

        let node_instance_index = self._repeatNode._nodeInstances.indexOf(self);
        abTypes.assert(node_instance_index === -1, 'Instance not in repeat node.');

        if (node_instance_index === self._repeatNode._nodeInstances.length - 1)
            return self._repeatNode.nextNode;

        return self._repeatNode._nodeInstances[node_instance_index + 1].__firstHtmlElement;
    }
    /* / Node.Children */

}


module.exports = RepeatNode;
