export default class BTreeNode {

    /**
     * @param {number} maxDegree
     */
    constructor(maxDegree) {
        this.maxDegree = maxDegree;
        this.values = [];
        this.subTreeNodes = [];
        this.parentNode = null;
    }

    /**
     *
     * @param {number} value
     * @param {boolean} force
     */
    addValue(value, force = false) {
        if(force || this.values.length < this.maxDegree) {
            this.values.push(value);
            this.values.sort((a, b) => a-b);
            this.rearrangeSubTreeNodes();
        } else {
            throw new Error('Cant exceed the max degree of a tree node.')
        }
    }

    /**
     * Adds a sub node.
     * @param {BTreeNode} value
     * @param {boolean} force
     */
    addSubNode(treeNode, force = false) {
        if(!force && this.subTreeNodes.length > (this.maxDegree + 1)) {
            throw new Error('Cant insert another subtreenode without violating the rules.')
        }

        treeNode.parentNode = this;
        this.subTreeNodes.push(treeNode);
        this.rearrangeSubTreeNodes();
    }

    /**
     * Overwrites all values.
     *
     * @param {array} values
     */
    setValues(values) {
        if(this.values.length > this.maxDegree + 1) {
            throw new Error('The given values array is too big.')
        }

        this.values = values;
    }

    /**
     *
     * @param treeNodes
     */
    setSubNodes(treeNodes) {
        treeNodes.every((treeNode) => treeNode.parentNode = this);
        this.subTreeNodes = treeNodes;
        this.rearrangeSubTreeNodes();
    }

    /**
     *
     */
    rearrangeSubTreeNodes() {
        const tmpArray = [];
        for(let i = 0; i < this.subTreeNodes.length; ++i) {
            if(this.subTreeNodes[i]) {
                const value = this.subTreeNodes[i].values[0];

                let index = 0;
                for(let j = -1; j < this.values.length; j++) {
                    let current = j > -1 ? this.values[j] : Number.MIN_VALUE;
                    let next = this.values.length > j+1 ? this.values[j+1] : Number.MAX_VALUE;

                    if(value > current && value < next) {
                        index = j + 1;
                        break;
                    }
                }

                if(tmpArray[index]) {
                    throw new Error('There are two sub tree nodes at the same position.');
                }
                tmpArray[index] = this.subTreeNodes[i];
            }
        }

        this.subTreeNodes = tmpArray;
    }
}