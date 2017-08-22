jsLibs.exportModule('spocky', 'Node', (require, module) => { 'use strict';

const abTypes = require('./ab-types');


class Node
{

    static get Children()
    {
        return Children;
    }

    static get IListener()
    {
        return IListener;
    }


    get active()
    { let self = this;
        return self._active;
    }

    get children()
    { let self = this;
        if (self._children === null)
            throw new Error('Node does not support child nodes.');

        return self._children;
    }

    get __firstHtmlElement()
    { let self = this;
        let first_html_element = self.listener.__getNodeFirstHtmlElement();
        return first_html_element !== null ?
                first_html_element : self.nextHtmlElement;
    }

    get htmlElement()
    { let self = this;
        return self.listener.__getNodeHtmlElement();
    }

    get listener()
    { let self = this;
        if (self._listener === null)
            throw new Error('`listener` not set.');

        return self._listener;
    }

    get nextHtmlElement()
    { let self = this;
        return self.nextNode === null ? null : self.nextNode.__firstHtmlElement;
    }

    get nextNode()
    { let self = this;
        return self.parentNode.__getChildNodeNextNode(self);
    }

    get parentNode()
    { let self = this;
        return self._parentNode;
    }

    // get firstHtmlElement()
    // { let self = this;
    //     return self.__getFirstHtmlElement();
    // }
    //
    // get parentHtmlElement()
    // { let self = this;
    //     return self._parentNode === null ? null : self._parentNode.htmlElement;
    // }


    constructor()
    { let self = this;
        self._active = null;

        self._listener = null;
        self._children = null;

        self._parentNode = null;
    }

    activate()
    { let self = this;
        if (self.active)
            return;

        self.listener.__onNodeActivate();
        self._active = true;
    }

    deactivate()
    { let self = this;
        if (!self.active)
            return;

        self.listener.__onNodeDeactivate();
        self._active = false;
    }

    __setListeners(node_listener, node_children_listener = null)
    { let self = this;
        abTypes.args(arguments, Node.IListener, Children.IListener);

        self._listener = node_listener;
        if (node_children_listener !== null)
            self._children = new Children(self, node_children_listener);
    }

    // hide()
    // { let self = this;
    //
    // }
    //
    // show(parent_node, previous_node, next_node)
    // { let self = this;
    //     self._parentNode = parent_node;
    //     self._previousNode = previous_node;
    //
    //     if (previous_node !== null)
    //         self._previousNode.setNextNode(self);
    //     if (next_node !== null)
    //         self._nextNode.setPreviousNode(self);
    //
    //     if (next_node === null)
    //         parent_node.getHtmlNode().appendChild(self.getHtmlNode());
    //     else
    //         parent_node.getHtmlNode().insertBefore(self.getNextHtmlNode());
    // }

}


const IListener = new abTypes.Interface(class {
    __onNodeActivate() {}
    __onNodeDeactivate() {}

    __getNodeHtmlElement() {}
    __getNodeFirstHtmlElement() {}
});


class Children
{

    static get IListener()
    {
        return IChildren_Listener;
    }


    get length()
    { let self = this;
        return self._children.length;
    }

    constructor(node, node_children_listener)
    { let self = this;
        abTypes.args(arguments, Node, Children.IListener);

        self._node = node;
        self._listener = node_children_listener;
        self._children = [];
    }

    add(child_node, next_node = null)
    { let self = this;
        let insert_index = next_node === null ?
                self._children.length : self._children.indexOf(next_node);
        if (insert_index === -1)
            new Error('`next_node` does not exist in `child_node` parent.');

        child_node._parentNode = self._node;

        self._children.splice(insert_index, 0, child_node);

        self._listener.__onAddNodeChild(child_node);
    }

    get(child_node_index)
    { let self = this;
        return self._children[child_node_index];
    }

    getNext(child_node)
    { let self = this;
        let child_node_index = self._children.indexOf(child_node);
        abTypes.assert(child_node_index !== -1, '`child_node` not found.');

        if (child_node_index < self._children.length - 1)
            return self._children[child_node_index + 1];

        return null;
    }

}


const IChildren_Listener = new abTypes.Interface(class {
    __onAddNodeChild() {}
    __getChildNodeNextNode() {}
});

module.exports = Node;
 });