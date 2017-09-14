'use strict';

const abTypes = require('../ab-types');
const abNodes = require('../ab-nodes');


class Layout
{

    constructor(layout_content)
    {
        this._nodes = {};

        let parent_nodes_stack = [ null ];
        let parent_node_contents_stack = [[ layout_content ]];

        while (parent_nodes_stack.length > 0) {
            let parent_node = parent_nodes_stack[0];
            let parent_node_content = parent_node_contents_stack[0];

            for (let i = 0; i < parent_node_content.length; i++) {
                let node_info = this._parseNodeInfo(
                        parent_node_content[i]);

                let node = this._createNode(node_info);

                if (parent_node !== null)
                    parent_node.children.add(node);

                if (abTypes.implementsC(node, abNodes.Node.PChildren)) {
                    parent_nodes_stack.push(node);
                    parent_node_contents_stack.push(node_info.content);
                }
            }

            parent_nodes_stack.splice(0, 1);
            parent_node_contents_stack.splice(0, 1);
        }
    }

    getNodes()
    {
        return this._nodes;
    }

    getNodeById(id)
    {
        if (!(id in this._nodes))
            throw new Error('Node with id `' + id + '` does not exist.');

        return this._nodes[id];
    }


    _createNode(node_info)
    {
        let node = null;

        let node_type = node_info.type;
        let node_attribs = node_info.attribs;
        let node_content = node_info.content;

        let layout_node_presets = {};

        if (node_type[0] === '_') {
            console.error('Error info:', node_type, node_content);
            throw new Error('Attrs are only allowed in first attribute node.');
        } else if (node_type[0] === '$') {
            if (node_type === '$repeat')
                node = new abNodes.RepeatNode();
            else if (node_type === '$root') {
                if (!('_element' in node_attribs))
                    throw new Error('`_element` attrib not set in root layout.');
                node = new abNodes.RootNode(node_attribs._element);
            } else if (node_type === '$show')
                node = new abNodes.ShowNode();
            else if (node_type === '$text') {
                let text = '_text' in node_attribs ?
                        node_attribs._text : '';
                node = new abNodes.TextNode(text);
            } else {
                console.error('Error info:', node_type, node_content);
                throw new Error('Unknown node type `' + node_type + '`.');
            }
        } else
            node = new abNodes.SingleNode(node_type);

        if ('_id' in node_attribs) {
            if (node_attribs._id in this._nodes)
                console.warn('Node with id `' + node_attribs._id + '` already exists.');
            this._nodes[node_attribs._id] = node;
        }


        abTypes.assert(node !== null, '`node` shouldn\'t be `null`.');

        return node;
    }

    _parseNodeInfo(node_info)
    {
        /* Validate */
        if (typeof node_info !== 'object') {
            console.error('Error info:', node_info)
            throw new Error('Node info is not an object.');
        }

        let node_info_keys = Object.keys(node_info);
        if (node_info_keys.length !== 1) {
            console.error('Error info:', node_info);
            throw new Error('Node info must contain exactly one key.');
        }
        /* / Validate */

        let node_type = node_info_keys[0];
        let node_content = node_info[node_type];
        this._validateNodeContent(node_content);

        let node_attribs = this._parseNodeAttrs(node_type, node_content);
        if (node_attribs !== null)
            node_content.splice(0, 1);

        return {
            type: node_type,
            attribs: node_attribs === null ? {} : node_attribs,
            content: node_content,
        };
    }

    _parseNodeAttrs(node_type, node_content)
    {
        if (node_content === null)
            return null;
        if (node_content.length === 0)
            return null;
        if (Object.keys(node_content[0]).length === 0)
            return {};

        let attribs = null;
        for (let attrib_name in node_content[0]) {
            if (attrib_name[0] !== '_') {
                if (attribs !== null) {
                    console.error('Error info:', { node_type:  node_content });
                    new Error('Only attribs are allowed in first content element.');
                }

                continue;
            }

            if (attribs === null)
                attribs = {};

            attribs[attrib_name] = node_content[0][attrib_name];
        }

        return attribs;
    }

    _validateNodeContent(node_content)
    {
        if (node_content !== null) {
            if (!(node_content instanceof Array)) {
                console.error('Error info:', node_type, node_content);
                throw new Error('Node content must be `null` or `Array`.');
            }
        }
    }

}
module.exports = Layout;
