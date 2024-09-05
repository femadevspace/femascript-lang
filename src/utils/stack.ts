export class Stack<T> {
  private stack: T[] = [];

  push(item: T) {
    this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    if (this.isEmpty()) return undefined;

    return this.stack[this.stack.length - 1];
  }

  size() {
    return this.stack.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.stack = [];
  }
}
