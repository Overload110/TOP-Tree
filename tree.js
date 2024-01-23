class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        let uniqueArray = Array.from(new Set(array)); // Remove duplicates
        uniqueArray.sort((a, b) => a - b); // Sort the array
        this.root = this.buildTree(uniqueArray); // Build the tree
    }

    buildTree(sortedArray) {
        if (!sortedArray.length) {
            return null;
        }
        
        const midIndex = Math.floor(sortedArray.length / 2);
        const node = new Node(sortedArray[midIndex]);
      
        node.left = this.buildTree(sortedArray.slice(0, midIndex));
        node.right = this.buildTree(sortedArray.slice(midIndex + 1));
      
        return node;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (node === null) {
            return new Node(value);
        } else if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        }
        return node;
    }

    delete(value) {
        this.root = this._delete(this.root, value);
    }

    _delete(node, value) {
        if (node === null) {
            return null;
        } else if (value < node.data) {
            node.left = this._delete(node.left, value);
        } else if (value > node.data) {
            node.right = this._delete(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                let tempNode = this._findMinNode(node.right);
                node.data = tempNode.data;
                node.right = this._delete(node.right, tempNode.data);
            }
        }
        return node;
    }

    _findMinNode(node) {
        if(node.left === null) {
            return node;
        }
        return this._findMinNode(node.left);
    }

    find(value) {
        return this._find(this.root, value);
    }

    _find(node, value) {
        if (node === null) {
            return null;
        } else if (value < node.data) {
            return this._find(node.left, value);
        } else if (value > node.data) {
            return this._find(node.right, value);
        } else {
            return node;
        }
    }
    
    levelOrder(callback) {
        if (!this.root) {
            return [];
        }

        let queue = [this.root];
        let results = [];

        while (queue.length > 0) {
            let currentNode = queue.shift();

            if (callback) {
                callback(currentNode.data);
            } else {
                results.push(currentNode.data);
            }

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return callback ? undefined : results;
    }
}