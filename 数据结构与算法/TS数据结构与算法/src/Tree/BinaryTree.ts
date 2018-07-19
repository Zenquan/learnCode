import { Node } from './Node'

export class Tree {
  private root: Node<number>

  private list: any [] = []

  constructor () {
    this.root = null
  }

  public getRoot (): Node<number> {
    return this.root
  }

  public insert (data: number) {
    let node = new Node<number>(data)

    if (this.root === null) {
      this.root = node
    } else {
      let current = this.root
      let parent: Node<number> = null

      while (current) {
        parent = current

        if (data < current.getData()) {
          current = current.left
          if (current === null) {
            parent.left = node
            break
          }
        } else {
          current = current.right

          if (current === null) {
            parent.right = node
            break
          }
        }

      }

    }
  }

  public inOrder (node: Node<number>) {
    if (! (node === null)) {
      this.inOrder(node.left)
      this.list.push(node.getData())
      this.inOrder(node.right)
    }
  }

  public preOrder (node: Node<number>) {
    if (!(node === null)) {
      this.list.push(node.getData())
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  public postOrder (node: Node<number>) {
    if (!(node === null)) {
      this.preOrder(node.left)
      this.preOrder(node.right)
      this.list.push(node.getData())
    }
  }

  public getList (): any[] {
    return this.list
  }

  public clearList () {
    this.list = []
  }

  public getMin (node): Node<number> {
    let current = node

    while (current.left) {
      current = current.left
    }

    return current
  }

  public getMax (node): Node<number> {
    let current = node

    while (current.right) {
      current = current.right
    }

    return current
  }

  public find (data): Node<number> {
    let current = this.root

    while (current) {
      if (current.getData() === data) {
        return current
      } else if (data < current.getData()) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  public deleteNode (node: Node<number>) {
    if (node.left == null) {
      this.transPlant(node, node.right)
    } else if (node.right == null) {
      this.transPlant(node, node.left)
    } else {
      let current = this.getMin(node.right)

      if (current.parent !== node) {
        this.transPlant(current, current.right)
        current.right = node.right
        current.right.parent = current
      }

      this.transPlant(node, current)
      current.left = node.left
      current.left.parent = current

    }
  }

  public iterativePreOrder (node: Node<number>) {
    const stack: Node<number>[] = []

    if (!(node === null)) {
      stack.push(node)
      while (stack.length !== 0) {
        node = stack.pop()
        this.list.push(node.getData())
        if (node.right !== null) {
          stack.push(node.right)
        }
        if (node.left !== null) {
          stack.push(node.left)
        }
      }
    }

  }

  public iterativeInOrder (node: Node<number>) {
    const stack: Node<number>[] = []

    while (node !== null || stack.length > 0) {

      while (node !== null) {
        stack.push(node)
        node = node.left
      }

      if (stack.length > 0) {
        node = stack.pop()
        this.list.push(node.getData())
        node = node.right
      }
    }
  }

  private transPlant (u, v) {
    if (u.parent === null) {
      this.root = u
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    if (v !== null) {
      v.parent = u.parent
    }
  }

}
