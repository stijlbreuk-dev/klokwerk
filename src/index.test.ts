import {
  DateGetterMethodName,
  DateSetterMethodName,
  DateToMethodName,
  DateTime,
} from "./index";

const setterMethods: DateSetterMethodName[] = [
  "setDate",
  "setFullYear",
  "setHours",
  "setMilliseconds",
  "setMinutes",
  "setMonth",
  "setSeconds",
  "setTime",
  "setUTCDate",
  "setUTCFullYear",
  "setUTCHours",
  "setUTCMilliseconds",
  "setUTCMinutes",
  "setUTCMonth",
  "setUTCSeconds",
];

const getterMethods: DateGetterMethodName[] = [
  "getDate",
  "getDay",
  "getFullYear",
  "getHours",
  "getMilliseconds",
  "getMinutes",
  "getMonth",
  "getSeconds",
  "getTime",
  "getTimezoneOffset",
  "getUTCDate",
  "getUTCDay",
  "getUTCFullYear",
  "getUTCHours",
  "getUTCMilliseconds",
  "getUTCMinutes",
  "getUTCMonth",
  "getUTCSeconds",
];

const toMethods: DateToMethodName[] = [
  "toDateString",
  "toISOString",
  "toJSON",
  "toLocaleDateString",
  "toLocaleString",
  "toLocaleTimeString",
  "toString",
  "toTimeString",
  "toUTCString",
];

describe("DateTime object creation", () => {
  it("should create a DateTime object", () => {
    expect(new DateTime()).toBeInstanceOf(DateTime);
  });

  it("should create a DateTime object from string", () => {
    expect(new DateTime("1993-03-20")).toBeInstanceOf(DateTime);
  });

  it("should create a DateTime object from number", () => {
    expect(new DateTime(732585600000)).toBeInstanceOf(DateTime);
  });

  it("should create a DateTime object from numbers", () => {
    expect(new DateTime(1993, 2, 20)).toBeInstanceOf(DateTime);
  });

  it("should create a DateTime object from Date", () => {
    expect(new DateTime(new Date())).toBeInstanceOf(DateTime);
  });

  it("should create a DateTime object from DateTime", () => {
    expect(new DateTime(new DateTime())).toBeInstanceOf(DateTime);
  });

  it("should have a native Date property", () => {
    expect(new DateTime().native).toBeInstanceOf(Date);
  });

  it("should recreate <DateTime>.native date mutating it directly", () => {
    const datum = new DateTime();
    const date1 = datum.native;
    datum.native.setTime(0);
    const date2 = datum.native;
    expect(date1).not.toBe(date2);
  });

  it("should implement all native Date `setX` methods", () => {
    const date = new DateTime();
    expect(setterMethods.every((method) => method in date)).toBe(true);
  });

  it("should implement getters for all native Date `getX` methods", () => {
    const date = new DateTime();
    expect(
      getterMethods.every((method) => {
        const withoutGet = method.replace("get", "");
        const property = withoutGet.startsWith("UTC")
          ? withoutGet
          : withoutGet[0].toLocaleLowerCase() + withoutGet.slice(1);
        return (
          Object.getOwnPropertyDescriptor(Object.getPrototypeOf(date), property)
            ?.get != undefined
        );
      })
    ).toBe(true);
  });

  it("should implement all native Date `toX` methods", () => {
    const date = new DateTime();
    expect(toMethods.every((method) => method in date)).toBe(true);
  });

  it("should return ISO format when calling `toString`", () => {
    expect(new DateTime(1993, 2, 20).toString()).toBe(
      "1993-03-19T23:00:00.000Z"
    );
  });

  it("should return a number when calling `valueOf`", () => {
    expect(new DateTime(1993, 2, 20).valueOf()).toBe(732582000000);
    expect(typeof +new DateTime()).toBe("number");
  });
});

function itShouldReturnNewDateTimeObject(method: DateSetterMethodName) {
  it("should return a new DateTime object", () => {
    const date = new DateTime();
    expect(date[method](1)).toBeInstanceOf(DateTime);
    expect(date[method](1)).not.toBe(date);
  });
}

describe("setDate", () => {
  it("should set date, using number params", () => {
    expect(new DateTime().setDate(1).date).toBe(1);
  });
  it("should set date, using setter function", () => {
    expect(new DateTime(1993, 2, 20).setDate((c) => c.date - 1).date).toBe(19);
  });
  itShouldReturnNewDateTimeObject("setDate");
});

describe("setFullYear", () => {
  it("should set year, using number params", () => {
    expect(new DateTime().setFullYear(1993).fullYear).toBe(1993);
  });
  it("should set year, using number params", () => {
    expect(new DateTime().setFullYear(1993, 12).fullYear).toBe(1994);
  });
  it("should set year, using setter function", () => {
    expect(
      new DateTime(1993, 2, 20).setFullYear((c) => c.fullYear - 1).fullYear
    ).toBe(1992);
  });
  itShouldReturnNewDateTimeObject("setFullYear");
});

describe("setHours", () => {
  it("should set hours, using number params", () => {
    expect(new DateTime().setHours(1).hours).toBe(1);
  });
  it("should set hours, using number params", () => {
    expect(new DateTime().setHours(1, 60).hours).toBe(2);
  });
  it("should set hours, using setter function", () => {
    expect(
      new DateTime(1993, 2, 20, 2).setHours((c) => c.hours - 1).hours
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setHours");
});

describe("setMilliseconds", () => {
  it("should set milliseconds, using number params", () => {
    expect(new DateTime().setMilliseconds(1).milliseconds).toBe(1);
  });
  it("should set milliseconds, using setter function", () => {
    expect(
      new DateTime(1993, 2, 20, 1, 1, 1, 2).setMilliseconds(
        (c) => c.milliseconds - 1
      ).milliseconds
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setMilliseconds");
});

describe("setMinutes", () => {
  it("should set minutes, using number params", () => {
    expect(new DateTime().setMinutes(1).minutes).toBe(1);
  });
  it("should set minutes, using number params", () => {
    expect(new DateTime().setMinutes(1, 60).minutes).toBe(2);
  });
  it("should set minutes, using setter function", () => {
    expect(
      new DateTime(1993, 2, 20, 1, 2).setMinutes((c) => c.minutes - 1).minutes
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setMinutes");
});

describe("setMonth", () => {
  it("should set month, using number params", () => {
    expect(new DateTime().setMonth(1).month).toBe(1);
  });
  it("should set month, using number params", () => {
    expect(new DateTime().setMonth(1, 31).month).toBe(2);
  });
  it("should set month, using setter function", () => {
    expect(new DateTime(1993, 2).setMonth((c) => c.month - 1).month).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setMonth");
});

describe("setSeconds", () => {
  it("should set seconds, using number params", () => {
    expect(new DateTime().setSeconds(1).seconds).toBe(1);
  });
  it("should set seconds, using number params", () => {
    expect(new DateTime().setSeconds(1, 1001).seconds).toBe(2);
  });
  it("should set seconds, using setter function", () => {
    expect(
      new DateTime(1993, 2, 20, 1, 1, 2).setSeconds((c) => c.seconds - 1)
        .seconds
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setSeconds");
});

describe("setTime", () => {
  it("should set time, using number params", () => {
    expect(new DateTime().setTime(732585600000).time).toBe(732585600000);
  });
  it("should set time, using setter function", () => {
    expect(new DateTime(732585600000).setTime((c) => c.time + 1).time).toBe(
      732585600001
    );
  });
  itShouldReturnNewDateTimeObject("setTime");
});

describe("setUTCDate", () => {
  it("should set UTC date, using number params", () => {
    expect(new DateTime().setUTCDate(1).UTCDate).toBe(1);
  });
  it("should set UTC date, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00 GMT").setUTCDate(
        (c) => c.UTCDate + 1
      ).UTCDate
    ).toBe(21);
  });
  itShouldReturnNewDateTimeObject("setUTCDate");
});

describe("setUTCFullYear", () => {
  it("should set UTC year, using number params", () => {
    expect(new DateTime().setUTCFullYear(1993).UTCFullYear).toBe(1993);
  });
  it("should set UTC year, using number params", () => {
    expect(new DateTime().setUTCFullYear(1993, 12, 1).UTCFullYear).toBe(1994);
  });
  it("should set UTC year, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00 GMT").setUTCFullYear(
        (c) => c.UTCFullYear + 1
      ).UTCFullYear
    ).toBe(1994);
  });
  itShouldReturnNewDateTimeObject("setUTCFullYear");
});

describe("setUTCHours", () => {
  it("should set UTC hours, using number params", () => {
    expect(new DateTime().setUTCHours(1).UTCHours).toBe(1);
  });
  it("should set UTC hours, using number params", () => {
    expect(new DateTime().setUTCHours(1, 60).UTCHours).toBe(2);
  });
  it("should set UTC hours, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00 GMT").setUTCHours(
        (c) => c.UTCHours + 1
      ).UTCHours
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setUTCHours");
});

describe("setUTCMilliseconds", () => {
  it("should set UTC milliseconds, using number params", () => {
    expect(new DateTime().setUTCMilliseconds(1).UTCMilliseconds).toBe(1);
  });
  it("should set UTC milliseconds, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00:01 GMT").setUTCMilliseconds(
        (c) => c.UTCMilliseconds + 1
      ).UTCMilliseconds
    ).toBe(2);
  });
  itShouldReturnNewDateTimeObject("setUTCMilliseconds");
});

describe("setUTCMinutes", () => {
  it("should set UTC minutes, using number params", () => {
    expect(new DateTime().setUTCMinutes(1).UTCMinutes).toBe(1);
  });
  it("should set UTC minutes, using number params", () => {
    expect(new DateTime().setUTCMinutes(1, 60).UTCMinutes).toBe(2);
  });
  it("should set UTC minutes, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:01:00 GMT").setUTCMinutes(
        (c) => c.UTCMinutes + 1
      ).UTCMinutes
    ).toBe(2);
  });
  itShouldReturnNewDateTimeObject("setUTCMinutes");
});

describe("setUTCMonth", () => {
  it("should set UTC month, using number params", () => {
    expect(new DateTime().setUTCMonth(1).UTCMonth).toBe(1);
  });
  it("should set UTC month, using number params", () => {
    expect(new DateTime().setUTCMonth(0, 32).UTCMonth).toBe(1);
  });
  it("should set UTC month, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00 GMT").setUTCMonth(
        (c) => c.UTCMonth + 1
      ).UTCMonth
    ).toBe(3);
  });
  itShouldReturnNewDateTimeObject("setUTCMonth");
});

describe("setUTCSeconds", () => {
  it("should set UTC seconds, using number params", () => {
    expect(new DateTime().setUTCSeconds(1).UTCSeconds).toBe(1);
  });
  it("should set UTC seconds, using number params", () => {
    expect(new DateTime().setUTCSeconds(1, 1001).UTCSeconds).toBe(2);
  });
  it("should set UTC seconds, using setter function", () => {
    expect(
      new DateTime("Fri, 20 Mar 1993 00:00:00 GMT").setUTCSeconds(
        (c) => c.UTCSeconds + 1
      ).UTCSeconds
    ).toBe(1);
  });
  itShouldReturnNewDateTimeObject("setUTCSeconds");
});
