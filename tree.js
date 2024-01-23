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
}