import path from 'path';
import Tree from '@hexlet/trees';
import { Dir, File } from '@hexlet/fs';


const getPathParts = filepath => filepath.split(path.sep).filter(part => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const current = this.findNode(filepath);
    if (current) {
      return false;
    }
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().isFile()) {
      return false;
    }
    parent.addChild(base, new Dir(base));
    return true;
  }

  // BEGIN (write your solution here)
  mkdirpSync(filepath) {
    let answer = false;
    getPathParts(filepath).reduce((acc, elem) => {
      const newacc = `${acc}/${elem}`;
      answer = this.mkdirSync(newacc);
      return newacc;
    }, '');
    return answer;
  }

  readdirSync(filepath) {
    const current = this.findNode(filepath);
    if (!current || current.getMeta().isFile()) {
      return false;
    }
    return [...current.children.keys()];
  }
  // END

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return false;
    }
    if (parent.getMeta().isFile()) {
      return false;
    }
    parent.addChild(base, new File(base, ''));
    return true;
  }

  rmdirSync(filepath) {
    const { base } = path.parse(filepath);
    const current = this.findNode(filepath);
    if (!current) {
      return false;
    }
    if (current.getMeta().isFile() || current.hasChildren()) {
      return false;
    }
    current.getParent().removeChild(base);
    return true;
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

// Teacher's solution
// BEGIN
// mkdirpSync(filepath) {
//   const result = getPathParts(filepath).reduce((subtree, part) => {
//     if (!subtree) {
//       return false;
//     }
//     const current = subtree.getChild(part);
//     if (!current) {
//       return subtree.addChild(part, new Dir(part));
//     }
//     if (current.getMeta().isFile()) {
//       return false;
//     }

//     return current;
//   }, this.tree);

//   return !!result;
// }

// readdirSync(filepath) {
//   const current = this.findNode(filepath);
//   if (!current || current.getMeta().isFile()) {
//     return false;
//   }
//   return current.getChildren()
//     .map(child => child.getKey());
// }
// END