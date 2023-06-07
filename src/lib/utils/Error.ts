export class OSError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
