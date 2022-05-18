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
type Setter = (current: DateTime) => number | NumArgs;
type SetArg = number | Setter;

type FilterStartsWith<
  Keys,
  Template extends string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Keys extends `${Template}${infer _X}` ? Keys : never;

export type DateSetterMethodName = FilterStartsWith<keyof Date, "set">;
export type DateGetterMethodName = FilterStartsWith<keyof Date, "get">;
export type DateToMethodName = FilterStartsWith<keyof Date, "to">;

export class DateTime {
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
  constructor(value: DateTime);
  constructor() {
    if (!arguments[0]) {
      this.native = new Date();
    } else if (arguments[0] instanceof DateTime) {
      this.native = new Date(arguments[0].native);
    } else {
      this.native = new Date(...(arguments as unknown as DateConstructorArgs));
    }
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
    const instance = new DateTime(this);
    instance.native[name].apply(
      instance.native,
      this._parseValue(...(args as unknown as [SetArg, ...NumArgs]))
    );
    return instance;
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

  setDate(setter: Setter): DateTime;
  setDate(date: number): DateTime;
  setDate(): DateTime {
    return this._applySetter("setDate", arguments);
  }

  get fullYear() {
    return this.native.getFullYear();
  }

  setFullYear(setter: Setter): DateTime;
  setFullYear(year: number, month?: number, date?: number): DateTime;
  setFullYear(): DateTime {
    return this._applySetter("setFullYear", arguments);
  }

  get hours() {
    return this.native.getHours();
  }

  setHours(setter: Setter): DateTime;
  setHours(
    hours: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): DateTime;
  setHours(): DateTime {
    return this._applySetter("setHours", arguments);
  }

  get milliseconds() {
    return this.native.getMilliseconds();
  }

  setMilliseconds(setter: Setter): DateTime;
  setMilliseconds(ms: number): DateTime;
  setMilliseconds(): DateTime {
    return this._applySetter("setMilliseconds", arguments);
  }

  get minutes() {
    return this.native.getMinutes();
  }

  setMinutes(setter: Setter): DateTime;
  setMinutes(minutes: number, seconds?: number, ms?: number): DateTime;
  setMinutes(): DateTime {
    return this._applySetter("setMinutes", arguments);
  }

  get month() {
    return this.native.getMonth();
  }

  setMonth(setter: Setter): DateTime;
  setMonth(month: number, day?: number): DateTime;
  setMonth(): DateTime {
    return this._applySetter("setMonth", arguments);
  }

  get seconds() {
    return this.native.getSeconds();
  }

  setSeconds(setter: Setter): DateTime;
  setSeconds(sec: number, ms?: number): DateTime;
  setSeconds(): DateTime {
    return this._applySetter("setSeconds", arguments);
  }

  get time() {
    return this.native.getTime();
  }

  setTime(setter: Setter): DateTime;
  setTime(time: number): DateTime;
  setTime(): DateTime {
    return this._applySetter("setTime", arguments);
  }

  get UTCDate() {
    return this.native.getUTCDate();
  }

  setUTCDate(setter: Setter): DateTime;
  setUTCDate(date: number): DateTime;
  setUTCDate(): DateTime {
    return this._applySetter("setUTCDate", arguments);
  }

  get UTCFullYear() {
    return this.native.getUTCFullYear();
  }

  setUTCFullYear(setter: Setter): DateTime;
  setUTCFullYear(year: number, month?: number, date?: number): DateTime;
  setUTCFullYear(): DateTime {
    return this._applySetter("setUTCFullYear", arguments);
  }

  get UTCHours() {
    return this.native.getUTCHours();
  }

  setUTCHours(setter: Setter): DateTime;
  setUTCHours(
    hours: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): DateTime;
  setUTCHours(): DateTime {
    return this._applySetter("setUTCHours", arguments);
  }

  get UTCMilliseconds() {
    return this.native.getUTCMilliseconds();
  }

  setUTCMilliseconds(setter: Setter): DateTime;
  setUTCMilliseconds(ms: number): DateTime;
  setUTCMilliseconds(): DateTime {
    return this._applySetter("setUTCMilliseconds", arguments);
  }

  get UTCMinutes() {
    return this.native.getUTCMinutes();
  }

  setUTCMinutes(setter: Setter): DateTime;
  setUTCMinutes(min: number, sec?: number, ms?: number): DateTime;
  setUTCMinutes(): DateTime {
    return this._applySetter("setUTCMinutes", arguments);
  }

  get UTCMonth() {
    return this.native.getUTCMonth();
  }

  setUTCMonth(setter: Setter): DateTime;
  setUTCMonth(month: number, date?: number): DateTime;
  setUTCMonth(): DateTime {
    return this._applySetter("setUTCMonth", arguments);
  }

  get UTCSeconds() {
    return this.native.getUTCSeconds();
  }

  setUTCSeconds(setter: Setter): DateTime;
  setUTCSeconds(sec: number, ms?: number): DateTime;
  setUTCSeconds(): DateTime {
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

  valueOf() {
    return this.native.valueOf();
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
