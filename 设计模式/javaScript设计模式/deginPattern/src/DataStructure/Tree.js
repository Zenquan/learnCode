function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
  this.count = 1;
}
function show() {
  return this.data;
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.inOrder =inOrder;
  this.getMin = getMin;
  this.getMax = getMax;
  this.getSmallest = getSmallest;
  this.remove = remove;
}

function insert(data) {
  let n = new Node(data, null, null);
  if(!this.root) {
    this.root = n;
  } else {
    let current = this.root;
    let parent;
    while(true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (!current) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if(!current) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function inOrder(node) {
  if (node) {
    inOrder(node.left);
    console.log(node.show() + ' ');
    inOrder(node.right);
  }
}

function preOrder(node) {
  if (node) {
    console.log(node.show() + ' ');
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + ' ');
  }
}

function getMin() {
  let current = this.root;
  while (current.left) {
    current = current.left;
  }
  return current.data;
}

function getSmallest(node) {
  let current = node;
  while (current.left) {
    current = current.left;
  }
  return current;
}

function getMax() {
  let current = this.root;
  while (current.right) {
    current = current.right;
  }
  return current.data;
}

function find (data) {
  let current = this.root;
  while(current) {
    if (current.data === data) {
      return current;
    } else if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return null;
}

function remove(data) {
  let root = removeNode(this.root, data);
}
function removeNode(node, data) {
  if (!node) {
    return null;
  }
  if (data === node.data) {
    if (!node.left && !node.right) {
      return null;
    }
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }
    let tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

