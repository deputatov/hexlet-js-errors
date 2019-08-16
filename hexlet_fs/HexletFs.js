import path from 'path';
import Tree from '@hexlet/trees';

// BEGIN (write your solution here)
const getPathParts = filepath => filepath.split(path.sep).filter(n => n);
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  // BEGIN (write your solution here)
  isDirectory(filepath) {
    const current = this.findNode(filepath);
    return !!current && current.getMeta().type === 'dir';
  }

  isFile(filepath) {
    const current = this.findNode(filepath);
    return !!current && current.getMeta().type === 'file';
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const parent = this.findNode(dir);
    return parent.addChild(base, { type: 'dir' });
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const current = this.findNode(dir);
    return current.addChild(base, { type: 'file' });
  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}