class TreeUnit {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
class BinaryTree {
    constructor() {
        this.root = null;
        this.length = 0;
    }
    addElem(key) {
        const elemToInsert = new TreeUnit(key);
        this.length++;
        // check if tree is empty
        if (this.root == null) {
            this.root = elemToInsert;
            return;
        }
        // find proper place to insert new elem
        let currentRoot = this.root;
        while (currentRoot) {
            if (elemToInsert.key < currentRoot.key) {
                if (!currentRoot.left) {
                    currentRoot.left = elemToInsert;
                    break; // element inserted, exit loop
                }
                currentRoot = currentRoot.left;
            }
            if (elemToInsert.key >= currentRoot.key) {
                if (!currentRoot.right) {
                    currentRoot.right = elemToInsert;
                    break; // element inserted, exit loop
                }
                currentRoot = currentRoot.right;
            }
        }
    } // end of func addElem
    findElem(key) {
        let currentRoot = this.root;
        while (currentRoot) {
            // it looks like we need function of comprasion here
            if (key === currentRoot.key) {
                return currentRoot.key;
            }
            if (key < currentRoot.key) {
                currentRoot = currentRoot.left;
            }
            else if (key > currentRoot.key) {
                currentRoot = currentRoot.right;
            }
        }
        return null;
    }
    deleteElem(key) {
        let currentRoot = this.root;
        let parentRoot = null;
        while (currentRoot) {
            if (key === currentRoot.key) {
                // element is found, length should be changed
                this.length--;
                // node has no childs
                if (currentRoot.left === null && currentRoot.right === null) {
                    this.deleteElemFromParent(parentRoot, currentRoot, null);
                    return key;
                }
                // node has one child
                if (currentRoot.left === null) {
                    this.deleteElemFromParent(parentRoot, currentRoot, currentRoot.right);
                    return key;
                }
                if (currentRoot.right === null) {
                    this.deleteElemFromParent(parentRoot, currentRoot, currentRoot.left);
                    return key;
                }
                // node has 2 childs
                if (currentRoot.left !== null && currentRoot.right !== null) {
                    // node->right->left is empty
                    // replace current node with node->right in parent node
                    if (currentRoot.right.left === null) {
                        this.deleteElemFromParent(parentRoot, currentRoot, currentRoot.right);
                        currentRoot.right.left = currentRoot.left;
                        return key;
                    }
                    // else take the most left node of node->right
                    // and replace current node with the most left node in parent node
                    let mostLeft = currentRoot.right.left;
                    let parentOfMostLeft = currentRoot.right;
                    while (mostLeft) {
                        if (mostLeft.left === null) {
                            break;
                        }
                        parentOfMostLeft = mostLeft;
                        mostLeft = mostLeft.left;
                    }
                    this.deleteElemFromParent(parentRoot, currentRoot, mostLeft);
                    mostLeft.left = currentRoot.left;
                    mostLeft.right = currentRoot.right;
                    parentOfMostLeft.left = null;
                    return key;
                }
            }
            else if (key < currentRoot.key) {
                parentRoot = currentRoot;
                currentRoot = currentRoot.left;
            }
            else if (key > currentRoot.key) {
                parentRoot = currentRoot;
                currentRoot = currentRoot.right;
            }
        }
        return null;
    }
    printTree() {
        const currentRoot = this.root;
        const parentRoot = null;
        return this.root ? this.addElemToString(currentRoot, parentRoot, "root") : "Tree is empty";
    }
    addElemToString(currentRoot, parentRoot, typeOfChild, deep = 1) {
        let outPut = "";
        if (currentRoot === null) {
            return outPut;
        }
        outPut += Array(deep).join("   ") + typeOfChild + " " + currentRoot.key + "\n";
        outPut += this.addElemToString(currentRoot.left, parentRoot, "left", deep + 1);
        outPut += this.addElemToString(currentRoot.right, parentRoot, "right", deep + 1);
        return outPut === "" ? "Tree is empty" : outPut;
    }
    deleteElemFromParent(parentRoot, currentRoot, unitToReplace) {
        if (parentRoot) {
            if (parentRoot.left === currentRoot) {
                parentRoot.left = unitToReplace;
            }
            else if (parentRoot.right === currentRoot) {
                parentRoot.right = unitToReplace;
            }
        }
        if (currentRoot === this.root) {
            this.root = unitToReplace;
        }
    }
}
let binaryTree = new BinaryTree();
let menuText = "What to do?\n1. Add new element\n2. Delete element\n3. Find element\n4. Print current binary tree\n\nIf you need console just click 'Cancel'";
let response = prompt(menuText, "1");
while (response) {
    let responseSwitch;
    switch (response) {
        // add new element
        case "1":
            responseSwitch = prompt("Adding new element\nPlease input key", "0");
            if (!isNaN(+responseSwitch) && responseSwitch !== null) {
                binaryTree.addElem(+responseSwitch);
            }
            else if (isNaN(+responseSwitch)) {
                alert("We can't recognize such key");
            }
            break;
        // delete element and retutn it
        case "2":
            responseSwitch = prompt("Deleting new element\nPlease input key", "0");
            if (!isNaN(+responseSwitch) && responseSwitch !== null) {
                let retunValue;
                retunValue = binaryTree.deleteElem(+responseSwitch);
                if (retunValue === null) {
                    alert("We don't have such element");
                }
                else {
                    alert(`The element: {${retunValue}} was deleted`);
                }
            }
            else if (isNaN(+responseSwitch)) {
                alert("We can't recognize such key");
            }
            break;
        // Find element
        case "3":
            responseSwitch = prompt("Seeking new element\nPlease input key", "0");
            if (!isNaN(+responseSwitch) && responseSwitch !== null) {
                let retunValue;
                retunValue = binaryTree.findElem(+responseSwitch);
                if (retunValue === null) {
                    alert("We don't have such element");
                }
                else {
                    alert(`Found element: {${retunValue}}`);
                }
            }
            else if (isNaN(+responseSwitch)) {
                alert("We can't recognize such key");
            }
            break;
        // Print Tree
        case "4":
            alert(binaryTree.printTree());
            break;
        default:
            break;
    }
    const numResponse = +response;
    // response = (numResponse >= 0 && numResponse <= 4) ? prompt(menuText, "1") : null;
    response = prompt(menuText, "1");
}
let addElem = (key) => binaryTree.addElem(key);
let deleteElem = (key) => binaryTree.deleteElem(key);
let findElem = (key) => binaryTree.findElem(key);
let printTree = () => binaryTree.printTree();
const consoleText = "Instructions:\
\n1. To add element type addElem(key), where key is number\
\n2. To delete element type deleteElem(key), where key is number\
\n3. To find element type findElem(key), where key is number\
\n4. To print current tree type printTree()";
console.log(consoleText);
