const Tree = require('./tree');

// Generate a list of unique random integers between 0 and 100
function generateRandomIntegers(length) {
    const result = [];
    while(result.length < length) {
        const number = Math.floor(Math.random() * 100);
        if(!result.includes(number)) result.push(number);
    }
    return result;
}

// Driver script
let myTree = new Tree();
let data = generateRandomIntegers(20); // Create an array with 20 unique random numbers < 100
console.log("Original Data: ", data.sort((a, b) => a - b));

// Build a binary search tree using the original data
for(let num of data){
    myTree.insert(num);
}

// Check if the tree is initially balanced
console.log("\nIs Initial Tree Balanced?", myTree.isBalanced());

// Traverse the tree in various orders
console.log("\nLevel Order: ", myTree.levelOrder());
console.log("Pre Order: ", myTree.preOrder());
console.log("Post Order: ", myTree.postOrder());
console.log("In Order: ", myTree.inOrder());

// Add some more numbers > 100 to unbalance the tree
for(let i=105; i<=110; i++){
    myTree.insert(i);
}

// Check if the tree is now unbalanced
console.log("\nAfter Addition, Is Tree Balanced?", myTree.isBalanced());

// Rebalance the tree
myTree.rebalance();

// Check if the tree is now balanced
console.log("\nAfter Rebalancing, Is Tree Balanced?", myTree.isBalanced());

// Traverse the tree again after rebalancing
console.log("\nAfter Rebalancing...");
console.log("Level Order: ", myTree.levelOrder());
console.log("Pre Order: ", myTree.preOrder());
console.log("Post Order: ", myTree.postOrder());
console.log("In Order: ", myTree.inOrder());