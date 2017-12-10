import * as TestSuite from './TestSuite.js';
import BTree from './BTree.js'

TestSuite.runTest('getInsertionNode', () => {
    const tree = new BTree(3);

    tree.addValue(1); // Root Node;

    TestSuite.assertEquals(tree.rootNode, tree.getInsertionNode(2, tree.rootNode));

    tree.addValue(2);

    TestSuite.assertArrayEquals([1, 2], tree.rootNode.values);
})

TestSuite.runTest('insert', () => {
    const tree = new BTree(4);

    tree.addValues(1, 2, 3, 4);
    TestSuite.assertArrayEquals([1, 2, 3, 4], tree.rootNode.values);


    tree.addValues(5);

    TestSuite.assertArrayEquals([3], tree.rootNode.values);
    TestSuite.assertArrayEquals([1,2], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([4,5], tree.rootNode.subTreeNodes[1].values);


    tree.addValues(6, 7);
    TestSuite.assertArrayEquals([4,5,6,7], tree.rootNode.subTreeNodes[1].values);

    tree.addValues(8);
    TestSuite.assertArrayEquals([3,6], tree.rootNode.values);
    TestSuite.assertArrayEquals([4,5], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([7,8], tree.rootNode.subTreeNodes[2].values);


    tree.addValues(9, 10);
    TestSuite.assertArrayEquals([7,8,9,10], tree.rootNode.subTreeNodes[2].values);

    tree.addValues(11);
    TestSuite.assertArrayEquals([3,6,9], tree.rootNode.values);
    TestSuite.assertArrayEquals([4,5], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([7,8], tree.rootNode.subTreeNodes[2].values);
    TestSuite.assertArrayEquals([10,11], tree.rootNode.subTreeNodes[3].values);

    tree.addValues(12,13,14);
    TestSuite.assertArrayEquals([3,6,9,12], tree.rootNode.values);
    TestSuite.assertArrayEquals([4,5], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([7,8], tree.rootNode.subTreeNodes[2].values);
    TestSuite.assertArrayEquals([10,11], tree.rootNode.subTreeNodes[3].values);
    TestSuite.assertArrayEquals([13,14], tree.rootNode.subTreeNodes[4].values);

    tree.addValues(15, 16);
    tree.addValues(17);
    TestSuite.assertArrayEquals([9], tree.rootNode.values);
    TestSuite.assertArrayEquals([3, 6], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([1, 2], tree.rootNode.subTreeNodes[0].subTreeNodes[0].values);
    TestSuite.assertArrayEquals([4,5], tree.rootNode.subTreeNodes[0].subTreeNodes[1].values);
})

TestSuite.runTest('insert without order', () => {
    const tree = new BTree(3);
    tree.addValues(52, 37, 16, 15, 84);

    TestSuite.assertArrayEquals([16], tree.rootNode.values);
    TestSuite.assertArrayEquals([15], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([37,52,84], tree.rootNode.subTreeNodes[1].values);

    tree.addValues(31);

    TestSuite.assertArrayEquals([16,37], tree.rootNode.values);
    TestSuite.assertArrayEquals([15], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([31], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([52,84], tree.rootNode.subTreeNodes[2].values);

    tree.addValues(32, 36, 38, 3, 4);

    TestSuite.assertArrayEquals([16,37], tree.rootNode.values);
    TestSuite.assertArrayEquals([3, 4, 15], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([31, 32, 36], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([38,52,84], tree.rootNode.subTreeNodes[2].values);

    tree.addValues(1203);

    TestSuite.assertArrayEquals([16,37,52], tree.rootNode.values);
    TestSuite.assertArrayEquals([3, 4, 15], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([31, 32, 36], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([38], tree.rootNode.subTreeNodes[2].values);
    TestSuite.assertArrayEquals([84, 1203], tree.rootNode.subTreeNodes[3].values);

    tree.addValues(35);
    TestSuite.assertArrayEquals([32], tree.rootNode.values);
    TestSuite.assertArrayEquals([16], tree.rootNode.subTreeNodes[0].values);
    TestSuite.assertArrayEquals([37,52], tree.rootNode.subTreeNodes[1].values);
    TestSuite.assertArrayEquals([3, 4, 15], tree.rootNode.subTreeNodes[0].subTreeNodes[0].values);
    TestSuite.assertArrayEquals([31], tree.rootNode.subTreeNodes[0].subTreeNodes[1].values);

    TestSuite.assertArrayEquals([35,36], tree.rootNode.subTreeNodes[1].subTreeNodes[0].values);
    TestSuite.assertArrayEquals([38], tree.rootNode.subTreeNodes[1].subTreeNodes[1].values);
    TestSuite.assertArrayEquals([84,1203], tree.rootNode.subTreeNodes[1].subTreeNodes[2].values);
})