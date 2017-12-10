import BTreeNode from './BTreeNode.js'

export default class BTree {
    /**
     * @param {number} maxDegree Max nodes per BTreeNode
     */
    constructor(maxDegree = 4) {
        if(!Number.isInteger(maxDegree)) {
            throw new Error(`${maxDegree} is not a valid integer.`);
        }

        this.degree = maxDegree;
        this.rootNode = null;
    }

    /**
     * Adds a value to the btree
     *
     * @param {number} value
     */
    addValue(value) {
        if(!Number.isInteger(value)) {
            throw new Error(`${value} is not a valid integer.`);
        }

        if(!this.rootNode) {
            this.rootNode = new BTreeNode(this.degree);
            this.rootNode.addValue(value);
        } else {
            const insertionNode = this.getInsertionNode(value);
            insertionNode.addValue(value, true);
            if(insertionNode.values.length > this.degree) {
                this.splitNode(insertionNode);
            }
        }
    }

    /**
     * Adds multiple values at once.
     *
     * @param values
     */
    addValues(...values) {
        values.forEach(this.addValue.bind(this));
    }

    /**
     *
     * @param {BTreeNode} treeNode
     */
    splitNode(treeNode) {
        if(!treeNode.parentNode) {
            treeNode.parentNode = new BTreeNode(this.degree);
            treeNode.parentNode.addSubNode(treeNode);
            this.rootNode = treeNode.parentNode;
        }

        const values = treeNode.values;
        const left = values.splice(0, Math.floor(this.degree / 2));
        const median = values.splice(0, 1)[0];
        const right = values;

        const subTreeNodes = treeNode.subTreeNodes;
        const leftSubTreeNodes = subTreeNodes.filter((subTreeNode) => subTreeNode.values[0] < median);
        const rightSubTreeNodes = subTreeNodes.filter((subTreeNode) => subTreeNode.values[0] > median);

        treeNode.setValues(left);
        treeNode.setSubNodes(leftSubTreeNodes);

        treeNode.parentNode.addValue(median, true);

        const rightSubTree = new BTreeNode(this.degree);
        rightSubTree.setValues(right);
        rightSubTree.setSubNodes(rightSubTreeNodes);

        treeNode.parentNode.addSubNode(rightSubTree, true);

        if(treeNode.parentNode.values.length > this.degree) {
            this.splitNode(treeNode.parentNode);
        }
    }

    /**
     *
     * @param {number} value
     * @param {BTreeNode} currentNode
     * @returns {BTreeNode}
     */
    getInsertionNode(value) {
        const leaves = this.getLeaves();
        let insertionNode = null;

        for(let i = 0; i < leaves.length && !insertionNode; ++i) {
            const leave = leaves[i];
            const parent = leave.parentNode;

            if(!parent) {
                insertionNode = leave;
            } else {
                const index = parent.subTreeNodes.indexOf(leave);
                let leftValue, rightValue;

                if(index === 0) {
                    leftValue = Number.MIN_VALUE;
                    rightValue = parent.values[0];
                } else if (index === parent.subTreeNodes.length - 1) {
                    leftValue = parent.values[parent.values.length - 1];
                    rightValue = Number.MAX_VALUE;
                } else {
                    leftValue = parent.values[index - 1];
                    rightValue = parent.values[index];
                }

                if(leftValue < value && rightValue > value) {
                    insertionNode = leave;
                }
            }
        }

        return insertionNode;
    }

    /**
     * Gets all leaves.
     * @returns {BTreeNode[]}
     */
    getLeaves() {
        const leaves = [];
        const stack = [this.rootNode];

        while(stack.length) {
            const current = stack.pop();
            if(current) {
                if(current.subTreeNodes.length === 0) {
                    leaves.push(current);
                } else {
                    current.subTreeNodes.forEach((treeNode) => {
                        stack.push(treeNode);
                    });
                }
            }
        }

        return leaves;
    }
}