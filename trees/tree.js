class Tree {
  constructor(key, meta, parent) {
    this.key = key;
    this.meta = meta;
    this.parent = parent;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getMeta() {
    return this.meta;
  }

  addChild(key, meta) {
    const child = new Tree(key, meta, this);
    this.children.set(key, child);
    return child;
  }

  getChild(key) {
    return this.children.get(key);
  }
  // BEGIN
  hasChildren() {
    return this.children.size !== 0;
  }

  hasChild(key) {
    return this.children.has(key);
  }

  getParent() {
    return this.parent;
  }

  removeChild(key) {
    return this.children.delete(key);
  }

  getDeepChild(keys = []) {
    if (!keys) {
      return undefined;
    }
    const [head, ...tail] = keys;
    return tail.reduce((node, key) => {
      if (node !== undefined && node.hasChild(key)) {
        return node.getChild(key);
      }
      return undefined;
    }, this.getChild(head))
  }

  getChildren() {
    return [...this.children.values()];
  }
  // END
}
