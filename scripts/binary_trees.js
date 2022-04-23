const canvas = document.querySelector('canvas');


class TreeVisualizerHelper {
    constructor(canvas) {
        this.centerX = canvas.getBoundingClientRect().width / 2;
        this.centerY = canvas.getBoundingClientRect().height / 2;
        this.ctx = canvas.getContext('2d');
        this.nodes = []
    }

    drawNode = (x, y, size, value) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        // size == radius
        this.ctx.arc(x, y, size, 0, 2 * 3.145, true);
        this.ctx.stroke();

        this.ctx.strokeText(value, x - 6, y + 4);
        

        this.nodes.push({ x, y, size, value });
    }

    connectNodes(node1, node2) {
        // since one value can only appear once in our tree this is a fine solution
        let node1Data = this.nodes.find(v => v.value === node1.value);
        let node2Data = this.nodes.find(v => v.value === node2.value);
        // connecting the nodes
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        // we add the arc size so the line will go from the edge of the circle
        this.ctx.moveTo(node1Data.x, node1Data.y + node1Data.size);
        // we substract the arc size so the line will go from the edge of the circle
        this.ctx.lineTo(node2Data.x, node2Data.y - node2Data.size);
        // drawing line
        this.ctx.stroke();
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.nodes = [];
    }

    #drtree(node, befNode, offsetx, offsety, size) {
        if(node === undefined) {
            return;
        }
        const befNodeData = this.nodes.find(v => v.value === befNode.value);
        let newX = undefined;
        let newY = undefined;

        if(befNode.value > node.value) {
            newX = befNodeData.x - offsetx;
            newY = befNodeData.y + offsety
        }
        else {
            newX = befNodeData.x + offsetx;
            newY = befNodeData.y + offsety
        }

        this.drawNode(newX, newY, size, node.value);
        this.connectNodes(befNode, node);

        if(node.left !== undefined) {
            this.#drtree(node.left, node, offsetx, offsety, size);
        }
        if(node.right !== undefined) {
            this.#drtree(node.right, node, offsetx, offsety, size);
        }

    }

    drawTree(tree) {
        // too big or uninitialized
        if(tree.getDepth() >= 10 || tree.trunk === undefined) {
            return;
        }
        const size = 20;
        this.drawNode(this.centerX, this.centerY / 2, size, tree.trunk.value);
        this.#drtree(tree.trunk.left, tree.trunk, 50, 70, size);
        this.#drtree(tree.trunk.right, tree.trunk, 50, 70, size);
    }
}

class TreeNode {
    constructor(value, left = undefined, right = undefined) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class SearchTree {
    constructor(trunk = undefined) {
        this.trunk = trunk;
    }

    // inserts value into tree
    insert(value, node = this.trunk) {

        // if the trunk is uninitalized we can't insert anywhere else but the trunk
        if (this.trunk === undefined) {
            this.trunk = new TreeNode(value);
            return;
        }

        if (node.value == value) {
            // can't insert element if it's already in tree
            return;
        }

        // if the value is smaller than this node than it belongs to the left node
        if (node.value > value) {
            // if the left node is free we insert it there
            if (node.left === undefined) {
                node.left = new TreeNode(value);
            }
            // if not then we check the next node
            else {
                this.insert(value, node.left);
            }
        }
        // if the value is larger than this node than it belongs to the right node
        else {
            if (node.right === undefined) {
                node.right = new TreeNode(value);
            }
            else {
                this.insert(value, node.right);
            }
        }
    }

    getDepth() {
        return this.#depth(this.trunk);
    }

    #depth(node) {
        if (node === undefined)
            return 0;

        let leftChild = node.left;
        let rightChild = node.right;
        // the depth is the max of the left and right child's depth + 1 
        return 1 + Math.max(this.#depth(leftChild), this.#depth(rightChild));
    }

    remMin() {
        if (this.trunk === undefined)
            return undefined;

        let node = this.trunk;
        let before = undefined;
        // getting to the min value
        while (node.left !== undefined) {
            before = node;
            node = node.left;
        }
        // if the min is the trunk we make the right node the new trunk
        if (before === undefined) {
            this.trunk = this.trunk.right;
        }
        else {
            if (node.right === undefined) {
                before.left = undefined;
            }
            else {
                before.left = node.right;
            }
        }
        return node.value;
    }

    remMax() {
        if (this.trunk === undefined)
            return undefined;

        let node = this.trunk;
        let before = undefined;
        // getting the element on the rightest node (max value)
        while (node.right !== undefined) {
            before = node;
            node = node.right;
        }
        // if the max is the trunk we make the left node the new trunk
        if (before === undefined) {
            this.trunk = this.trunk.left;
        }
        else {
            if (node.right === undefined) {
                before.right = undefined;
            }
            else {
                before.right = node.left;
            }
        }
        return node.value;
    }
}

class Visualizer {
    constructor(searchTree, visualizerHelper) {
        this.tree = searchTree;
        this.helper = visualizerHelper;
    }

    insert(value) {
        this.tree.insert(value);
        this.helper.clearScreen();
        this.helper.drawTree(this.tree);
    }

    remMin() {
        this.tree.remMin();
        this.helper.clearScreen();
        this.helper.drawTree(this.tree);
    }
    
    remMax() {
        this.tree.remMax();
        this.helper.clearScreen();
        this.helper.drawTree(this.tree);
    }
}

let v = new Visualizer(new SearchTree(), new TreeVisualizerHelper(canvas));