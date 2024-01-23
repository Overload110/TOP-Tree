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

    inOrder(node = this.root, callback) {
        let results = [];
        if (node) {
            if (node.left && callback) {
                this.inOrder(node.left, callback);
            }
            if (callback) {
                callback(node.data);
            } else {
                results.push(node.data);
            }
            if (node.right && callback) {
                this.inOrder(node.right, callback);
            }
        }
        return callback ? undefined : results;
    }

    preOrder(node = this.root, callback) {
        let results = [];
        if (node) {
            if (callback) {
                callback(node.data);
            } else {
                results.push(node.data);
            }
            if (node.left && callback) {
                this.preOrder(node.left, callback);
            }
            if (node.right && callback) {
                this.preOrder(node.right, callback);
            }
        }
        return callback ? undefined : results;
    }

    postOrder(node = this.root, callback) {
        let results = [];
        if (node) {
            if (node.left && callback) {
                this.postOrder(node.left, callback);
            }
            if (node.right && callback) {
                this.postOrder(node.right, callback);
            }
            if (callback) {
                callback(node.data);
            } else {
                results.push(node.data);
            }
        }
        return callback ? undefined : results;
    }

    height(node) {
        if (node === null) {
            return 0;
        }
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    depth(node, root = this.root) {
        if (node === root) {
            return 0;
        }
        if (node.data < root.data) {
            return this.depth(node, root.left) + 1;
        } else {
            return this.depth(node, root.right) + 1;
        }
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }
        const diff = this.height(node.left) - this.height(node.right);
        if (diff > 1 || diff < -1) {
            return false;
        }
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        if (!this.isBalanced()) {
            let sortedArray = this.inOrder();
            this.root = this.buildTree(sortedArray);
        }
    }
}