export {};

declare global {
  interface String {
    capitalize(): string;
  }
}

/*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
String.prototype.capitalize = function () {
  return this.split(' ')
    .map((el: string) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
};
