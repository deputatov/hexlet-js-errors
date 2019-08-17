import Node from './Node';

// BEGIN (write your solution here)
export default class extends Node {
  constructor(name) {
    super(name, false, true);
  }
}
// END

// Teacher's solution
// export default class extends Node {
//   isDirectory() {
//     return true;
//   }

//   isFile() {
//     return false;
//   }
// }