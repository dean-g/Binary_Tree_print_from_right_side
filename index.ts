interface INode {
  right: INode | null;
  left: INode | null;
  value: number;
  level: number;
}

interface IQueueNode {
  value: INode;
  next?: IQueueNode | null;
}

class BinaryTree {
  // Queue for level order lookups
  private queueRoot: IQueueNode | null = null;
  private queueTail: IQueueNode | null = null;
  private enQueue(node: INode) {
    let queueNode: IQueueNode = {
      value: node,
      next: null,
    };
    if (!this.queueTail) {
      this.queueTail = queueNode;
      this.queueRoot = queueNode;
    } else {
      this.queueTail.next = queueNode;
      this.queueTail = queueNode;
    }
  }

  private deQueue(): INode | undefined {
    if (!this.queueRoot) {
      return;
    }
    let nodeValue: INode;
    if (!this.queueRoot.next) {
      nodeValue = this.queueRoot.value;
      this.queueTail = null;
      this.queueRoot = null;
    } else {
      nodeValue = this.queueRoot.value;
      this.queueRoot = this.queueRoot.next;
    }
    return nodeValue;
  }

  private isQueueEmpty() {
    if (this.queueRoot === null) return true;
    return false;
  }

  public printAllRightVisiableNode(node: INode) {
    if (!node) {
      return;
    }
    this.enQueue(node);
    let currentNode: INode | undefined;
    let level = 0;
    let tempNode: INode | undefined;
    while (!this.isQueueEmpty()) {
      currentNode = this.deQueue();
      if (currentNode?.left) {
        this.enQueue(currentNode.left);
      }
      if (currentNode?.right) {
        this.enQueue(currentNode.right);
      }
      if (currentNode && currentNode?.level > level) {
        level = currentNode?.level;
        console.log(tempNode?.value);
      } else if (this.isQueueEmpty()) {
        console.log(currentNode?.value);
      }
      tempNode = currentNode;
    }
  }

  public printAllByRecursive(node: INode) {}
}

const nodeList: INode = {
  value: 1,
  level: 0,
  right: {
    value: 3,
    level: 1,
    right: {
      value: 6,
      right: null,
      left: null,
      level: 2,
    },
    left: {
      value: 5,
      level: 2,
      right: {
        value: 8,
        right: null,
        left: null,
        level: 3,
      },
      left: {
        value: 7,
        right: null,
        left: null,
        level: 3,
      },
    },
  },
  left: {
    value: 2,
    level: 1,
    right: {
      value: 4,
      right: null,
      left: null,
      level: 2,
    },
    left: null,
  },
};
const myTree = new BinaryTree();
myTree.printAllRightVisiableNode(nodeList);
