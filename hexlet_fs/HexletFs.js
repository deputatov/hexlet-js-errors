import path from 'path';
import Tree from '@hexlet/trees';

// BEGIN (write your solution here)
const getPathParts = filepath => path.normalize(filepath).split(path.sep).filter(n => n);
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  // BEGIN (write your solution here)
  isDirectory(filepath) {
    const node = this.findNode(filepath);
    return node !== undefined ? node.meta.type === 'dir' : false;
  }

  isFile(filepath) {
    const node = this.findNode(filepath);
    return node !== undefined ? node.meta.type === 'file' : false;
  }

  mkdirSync(filepath) {
    const pathElements = path.parse(filepath);
    if (this.isDirectory(pathElements.dir)) {
      const subtree = this.findNode(pathElements.dir);
      subtree.addChild(pathElements.base, { type: 'dir' });
    }
  }

  touchSync(filepath) {
    const pathElements = path.parse(filepath);
    if (this.isDirectory(pathElements.dir)) {
      const subtree = this.findNode(pathElements.dir);
      subtree.addChild(pathElements.base, { type: 'file' });
    }
  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}