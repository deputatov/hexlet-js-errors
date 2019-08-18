import path from 'path';
import errors from 'errno';
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
      return [null, errors.code.ENOENT];
    }
    return [current.getMeta().getStats(), null];
  }

  // BEGIN (write your solution here)
  unlinkSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent.getChild(base)) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getChild(base).getMeta().isDirectory()) {
      return [null, errors.code.EPERM];
    }
    return [parent.removeChild(base), null];
  }

  writeFileSync(filepath, content) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [parent.addChild(base, new File(base, content)), null];     
  }

  readFileSync(filepath) {
    const dir = this.findNode(filepath);
    if (!dir) {
      return [null, errors.code.ENOENT];
    }
    if (dir.getMeta().isDirectory()) {
      return [null, errors.code.EISDIR];
    }
    return [dir.getMeta().getBody(), null];
  }
  // END

  mkdirpSync(filepath) {
    const result = getPathParts(filepath).reduce((subtree, part) => {
      if (!subtree) {
        return false;
      }
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (current.getMeta().isFile()) {
        return false;
      }

      return current;
    }, this.tree);

    return !!result;
  }

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return [null, errors.code.ENOENT];
    }
    if (parent.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [parent.addChild(base, new File(base, '')), null];
  }

  readdirSync(filepath) {
    const dir = this.findNode(filepath);
    if (!dir) {
      return [null, errors.code.ENOENT];
    }
    if (dir.getMeta().isFile()) {
      return [null, errors.code.ENOTDIR];
    }
    return [dir.getChildren().map(child => child.getKey()), null];
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

// Teacher's solutions
// BEGIN
// unlinkSync(filepath) {
//   const current = this.findNode(filepath);
//   if (!current) {
//     return [null, errors.code.ENOENT];
//   }
//   if (current.getMeta().isDirectory()) {
//     return [null, errors.code.EPERM];
//   }
//   return [current.getParent().removeChild(current.getKey()), null];
// }

// writeFileSync(filepath, body) {
//   const { base, dir } = path.parse(filepath);
//   const parent = this.findNode(dir);
//   if (!parent) {
//     return [null, errors.code.ENOENT];
//   }
//   if (parent.getMeta().isFile()) {
//     return [null, errors.code.ENOTDIR];
//   }
//   const current = parent.getChild(base);
//   if (current && current.getMeta().isDirectory()) {
//     return [null, errors.code.EISDIR];
//   }
//   return [parent.addChild(base, new File(base, body)), null];
// }

// readFileSync(filepath) {
//   const current = this.findNode(filepath);
//   if (!current) {
//     return [null, errors.code.ENOENT];
//   }
//   if (current.getMeta().isDirectory()) {
//     return [null, errors.code.EISDIR];
//   }
//   return [current.getMeta().getBody(), null];
// }
// END