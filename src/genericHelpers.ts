import { Entry } from "./index";

export type F<T> = (...args: any[]) => T;

export type Fxn<T> = (...args: any[]) => T | Thunk<T>;
export type Thunk<T> = T | Fxn<T>;
export type S = string | Fxn<string>;

// Takes a function that applies to e.g. a string, and makes it one that works on Thunk<string>
export var thunkinate = <T>(f: (x: T) => T) => {
  function thunkd(x: T): T;
  function thunkd(x: Fxn<T>): Fxn<T>;
  function thunkd(x: Thunk<T>): Thunk<T>;
  function thunkd(x: any): any {
    if (x instanceof Function) {
      return (...args: any[]) => thunkd(x(...args));
    }
    return f(x);
  }
  return thunkd;
}

export var rand = (n: number) => Math.floor(n * Math.random());

export var pluralizeString = (s: string) => {
  var rules: { [key: string]: RegExp } = {
    a: /um$/,
    es: /is$/,
    i: /us$/,
    $1es: /(sh?)$/,
    icies: /(i|e)x$/,
    xes: /x$/,
    ies: /y$/,
    ves: /fe$/,
    $1s: /([^s])$/,
  };
  for (var r in rules) {
    var n: string = s.replace(rules[r], r);
    if (n !== s) return n;
  }
  return s;
}
export var plural = thunkinate(pluralizeString);

export var capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
}
export var cap = thunkinate(capitalize);

export var et = <T, A extends any[]>(x: Thunk<T>, ...args: A): T => ((x instanceof Function) ? et(x(...args)) : x);

// takes template string, returns a function that will evaluate everything inside
export var t = (strings: string[], ...nonStrings: Thunk<string>[]) => {
  return () => {
    const enstringed = nonStrings.map(et);
    enstringed.push('');
    return enstringed
      .map((item, i) => strings[i] + et(item))
      .join('')
      .replace(/  +/g, ' ');
  }
}
export var conjure = (_thing: S[]) => {
  var l = Math.floor(_thing.length / 2);
  var recents = (new Array(l));
  var randSkipRecents = (a: S[]): S => {
    var r = rand(a.length);
    if (recents.includes(r)) {
      return randSkipRecents(a);
    }
    recents.pop();
    recents.unshift(r);
    return a[r];
  }
  return <A extends any[]>(...args: A) => et<string, A>(randSkipRecents(_thing), ...args);
}

// the et is so it doesn't deplete uniqueness
export var maybe = (s: S, p = 0.5) => Math.random() < p ? `${et(s)} ` : '';
export var mb = (s1: S, s2 = "") => Math.random() < 0.5 ? et(s1) : et(s2);

export const seven = (x: number) =>
  ['one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen'][x];

export const seventh = (x: number) =>
  ['first', 'second', 'third', 'fourth',
    'fifth', 'sixth', 'seventh', 'eighth',
    'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth',
    'sixteenth', 'seventeenth', 'eighteenth'][x];

export const interp = (s: S) => (overcome: string, trial: string, number: number, parent?: Entry) => {
  return et(s)
    .replace(/overcome/g, overcome)
    .replace(/trial/g, trial)
    .replace(/_seventh/, seventh(number))
    .replace(/_seven/, seven(number))
    .replace(/parentQuest/, parent && et(parent.challenge || 'PARENTQUEST') || 'PARENTQUEST');
}