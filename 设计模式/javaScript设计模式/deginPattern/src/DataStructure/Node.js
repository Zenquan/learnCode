function Node(el) {
  this.element = el;
  this.next = null;
}

function Llist() {
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.display = display;
  this.findPrevious = findPrevious;
}

function find(item) {
  let currNode = this.head;
  while (currNode.element !== item) {
    currNode = currNode.next;
  }
  return currNode;
}

function insert(newEl, item) {
  let newNode = new Node(newEl);
  let current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
}

function display() {
  let currNode = this.head;
  while (!(currNode.next === null)) {
    console.log(currNode.element);
    currNode = currNode.next;
  }
}

function findPrevious(item) {
  let currNode = this.head;
  while (!(currNode.next === null) && (currNode.next.element !== item)) {
    currNode = currNode.next;
  }
  return currNode;
}

function remove(item) {
  let preNode = this.findPrevious(item);
  if (preNode.next) {
    console.log(preNode.next);
    console.log(preNode.next.next);
    preNode.next = preNode.next.next;
  }
}

let cities = new Llist();
cities.insert('Conway', 'head');
cities.insert('Russellville', 'Conway');
cities.insert('Alma', 'Russellville');
cities.display();
cities.remove('Alma');
cities.display();