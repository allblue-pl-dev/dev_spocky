jsLibs.exportModule('spocky', 'nodes/LayoutNode', (require, module) => { 'use strict';

const HtmlElement = require('../HtmlElement');
const Node = require('../Node');
const Types = require('../Types');


class LayoutNode
{

    constructor(init_fn)
    { let self = this;
        self.node = self._createNode();

        self._rootNodes = [];
        self._data = self._parseData(init_fn());
    }


    _createNode()
    { let self = this;
        let node = new Node();

        node.__activate = () => {
            for (let i = 0; i < self._rootNodes.length; i++) {
                HtmlElement.AddChild(node.parentHtmlElement,
                        self._rootNodes[i].htmlElement,
                        self._rootNodes[i].nextHtmlElement);
            }
        };

        node.__getHtmlElement = () => {
            return node.parentHtmlElement;
        };
    }

    _parseData(layout_data)
    { let self = this;
        Types.AssertArg('layout_data', layout_data, 'object',
                { message: '`init_fn` result must be an object.' });

        for (let element_type in layout_data) {
            let single_node = new SingleNode(element_type);
            single_node.content = 'Test content of: ' + element_type;

            self.node.addChild(single_node);
            self._rootNodes.push(single_node);
        }

    }

}

module.exports = LayoutNode;
 });