type NumArgs = Array<number | undefined>;
type DateConstructorArgs = [
  number,
  number,
  number?,
  number?,
  number?,
  number?,
  number?
];
type Setter = (current: Datum) => number | NumArgs;
type SetArg = number | Setter;

type FilterStartsWith<
  Keys,
  Template extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Keys extends `${Template}${infer _X}` ? Keys : never;

export type DateSetterMethodName = FilterStartsWith<keyof Date, "set">;
export type DateGetterMethodName = FilterStartsWith<keyof Date, "get">;
export type DateToMethodName = FilterStartsWith<keyof Date, "to">;

export class Datum {
  native!: Date;

  constructor();
  constructor(value: string | number | Date);
  constructor(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  );
  constructor(value: Datum);
  constructor() {
    if (!arguments[0]) {
      this._createNativeProxy(new Date());
    } else if (arguments[0] instanceof Datum) {
      this._createNativeProxy(new Date(arguments[0].native));
    } else {
      this._createNativeProxy(
        new Date(...(arguments as unknown as DateConstructorArgs))
      );
    }
  }

  private _createNativeProxy(date: Date) {
    const self = this;
    this.native = new Proxy(date, {
      get: (target, prop) => {
        const value = target[prop as keyof Date];
        if (isString(prop) && prop.startsWith("set")) {
          return function () {
            target[prop as DateSetterMethodName](
              ...(arguments as unknown as [number, ...NumArgs])
            );
            self.native = new Date(target);
          }.bind(target);
        } else {
          return value.bind(target);
        }
      },
    });
  }

  private _parseValue<T extends NumArgs = NumArgs>(
    from: SetArg,
    ...rest: NumArgs
  ): T {
    const input = isFunction(from) ? from(this) : from;
    const result = (isNumber(input) ? [input, ...rest] : input) as unknown as T;
    return result;
  }

  private _applySetter(name: DateSetterMethodName, args: IArguments) {
    this.native[name].apply(
      this.native,
      this._parseValue(...(args as unknown as [SetArg, ...NumArgs]))
    );
    return new Datum(this);
  }

  get day() {
    return this.native.getDay();
  }

  get UTCDay() {
    return this.native.getUTCDay();
  }

  get timezoneOffset() {
    return this.native.getTimezoneOffset();
  }

  get date() {
    return this.native.getDate();
  }

  setDate(setter: Setter): Datum;
  setDate(date: number): Datum;
  setDate(): Datum {
    return this._applySetter("setDate", arguments);
  }

  get fullYear() {
    return this.native.getFullYear();
  }

  setFullYear(setter: Setter): Datum;
  setFullYear(year: number, month?: number, date?: number): Datum;
  setFullYear(): Datum {
    return this._applySetter("setFullYear", arguments);
  }

  get hours() {
    return this.native.getHours();
  }

  setHours(setter: Setter): Datum;
  setHours(
    hours: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): Datum;
  setHours(): Datum {
    return this._applySetter("setHours", arguments);
  }

  get milliseconds() {
    return this.native.getMilliseconds();
  }

  setMilliseconds(setter: Setter): Datum;
  setMilliseconds(ms: number): Datum;
  setMilliseconds(): Datum {
    return this._applySetter("setMilliseconds", arguments);
  }

  get minutes() {
    return this.native.getMinutes();
  }

  setMinutes(setter: Setter): Datum;
  setMinutes(minutes: number, seconds?: number, ms?: number): Datum;
  setMinutes(): Datum {
    return this._applySetter("setMinutes", arguments);
  }

  get month() {
    return this.native.getMonth();
  }

  setMonth(setter: Setter): Datum;
  setMonth(month: number, day?: number): Datum;
  setMonth(): Datum {
    return this._applySetter("setMonth", arguments);
  }

  get seconds() {
    return this.native.getSeconds();
  }

  setSeconds(setter: Setter): Datum;
  setSeconds(sec: number, ms?: number): Datum;
  setSeconds(): Datum {
    return this._applySetter("setSeconds", arguments);
  }

  get time() {
    return this.native.getTime();
  }

  setTime(setter: Setter): Datum;
  setTime(time: number): Datum;
  setTime(): Datum {
    return this._applySetter("setTime", arguments);
  }

  get UTCDate() {
    return this.native.getUTCDate();
  }

  setUTCDate(setter: Setter): Datum;
  setUTCDate(date: number): Datum;
  setUTCDate(): Datum {
    return this._applySetter("setUTCDate", arguments);
  }

  get UTCFullYear() {
    return this.native.getUTCFullYear();
  }

  setUTCFullYear(setter: Setter): Datum;
  setUTCFullYear(year: number, month?: number, date?: number): Datum;
  setUTCFullYear(): Datum {
    return this._applySetter("setUTCFullYear", arguments);
  }

  get UTCHours() {
    return this.native.getUTCHours();
  }

  setUTCHours(setter: Setter): Datum;
  setUTCHours(
    hours: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): Datum;
  setUTCHours(): Datum {
    return this._applySetter("setUTCHours", arguments);
  }

  get UTCMilliseconds() {
    return this.native.getUTCMilliseconds();
  }

  setUTCMilliseconds(setter: Setter): Datum;
  setUTCMilliseconds(ms: number): Datum;
  setUTCMilliseconds(): Datum {
    return this._applySetter("setUTCMilliseconds", arguments);
  }

  get UTCMinutes() {
    return this.native.getUTCMinutes();
  }

  setUTCMinutes(setter: Setter): Datum;
  setUTCMinutes(min: number, sec?: number, ms?: number): Datum;
  setUTCMinutes(): Datum {
    return this._applySetter("setUTCMinutes", arguments);
  }

  get UTCMonth() {
    return this.native.getUTCMonth();
  }

  setUTCMonth(setter: Setter): Datum;
  setUTCMonth(month: number, date?: number): Datum;
  setUTCMonth(): Datum {
    return this._applySetter("setUTCMonth", arguments);
  }

  get UTCSeconds() {
    return this.native.getUTCSeconds();
  }

  setUTCSeconds(setter: Setter): Datum;
  setUTCSeconds(sec: number, ms?: number): Datum;
  setUTCSeconds(): Datum {
    return this._applySetter("setUTCSeconds", arguments);
  }

  toDateString() {
    return this.native.toDateString();
  }

  toISOString() {
    return this.native.toISOString();
  }

  toJSON() {
    return this.native.toJSON();
  }

  toLocaleDateString() {
    return this.native.toLocaleDateString();
  }

  toLocaleString() {
    return this.native.toLocaleString();
  }

  toLocaleTimeString() {
    return this.native.toLocaleTimeString();
  }

  toString() {
    return this.native.toISOString();
  }

  toTimeString() {
    return this.native.toTimeString();
  }

  toUTCString() {
    return this.native.toUTCString();
  }
}

function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}

function isNumber(arg: unknown): arg is number {
  return typeof arg === "number";
}

function isFunction(arg: unknown): arg is Setter {
  return typeof arg === "function";
}
