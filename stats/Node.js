import Stats from './Stats';

// BEGIN (write your solution here)
export default class {
  constructor(name, file, directory) {
    this.name = name;
    this.file = file;
    this.directory = directory;
  }

  getStats() {
    return new Stats(this.file, this.directory);
  }

  getName() {
    return this.name;
  }
}
// END
// Teacher's solution
// BEGIN
// export default class {
//   constructor(name) {
//     this.name = name;
//   }

//   getStats() {
//     return new Stats(this.isFile(), this.isDirectory());
//   }

//   getName() {
//     return this.name;
//   }
// }
// END