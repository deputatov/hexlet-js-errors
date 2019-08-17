import Node from './Node';

// BEGIN (write your solution here)
export default class extends Node {
  constructor(name) {
    super(name, true, false);
  }
}
// END
// Teacher's solution
// BEGIN
// export default class extends Node {
//   constructor(name, body) {
//     super(name);
//     this.body = body;
//   }

//   getBody() {
//     return this.body;
//   }

//   isDirectory() {
//     return false;
//   }

//   isFile() {
//     return true;
//   }
// }
// END