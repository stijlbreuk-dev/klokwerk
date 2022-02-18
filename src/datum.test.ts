import {
  DateGetterMethodName,
  DateSetterMethodName,
  DateToMethodName,
  Datum,
} from "./datum";

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

describe("Datum object creation", () => {
  it("should create a Datum object", () => {
    expect(new Datum()).toBeInstanceOf(Datum);
  });

  it("should create a Datum object from string", () => {
    expect(new Datum("1993-03-20")).toBeInstanceOf(Datum);
  });

  it("should create a Datum object from number", () => {
    expect(new Datum(732585600000)).toBeInstanceOf(Datum);
  });

  it("should create a Datum object from numbers", () => {
    expect(new Datum(1993, 2, 20)).toBeInstanceOf(Datum);
  });

  it("should create a Datum object from Date", () => {
    expect(new Datum(new Date())).toBeInstanceOf(Datum);
  });

  it("should create a Datum object from Datum", () => {
    expect(new Datum(new Datum())).toBeInstanceOf(Datum);
  });

  it("should have a native Date property", () => {
    expect(new Datum().native).toBeInstanceOf(Date);
  });

  it("should recreate <Datum>.native date mutating it directly", () => {
    const datum = new Datum();
    const date1 = datum.native;
    datum.native.setTime(0);
    const date2 = datum.native;
    expect(date1).not.toBe(date2);
  });

  it("should implement all native Date `setX` methods", () => {
    const date = new Datum();
    expect(setterMethods.every((method) => method in date)).toBe(true);
  });

  it("should implement getters for all native Date `getX` methods", () => {
    const date = new Datum();
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
    const date = new Datum();
    expect(toMethods.every((method) => method in date)).toBe(true);
  });

  it("should return ISO format when calling `toString`", () => {
    expect(new Datum(1993, 2, 20).toString()).toBe("1993-03-19T23:00:00.000Z");
  });
});

function itShouldReturnNewDatumObject(method: DateSetterMethodName) {
  it("should return a new Datum object", () => {
    const date = new Datum();
    expect(date[method](1)).toBeInstanceOf(Datum);
    expect(date[method](1)).not.toBe(date);
  });
}

describe("setDate", () => {
  it("should set date, using number params", () => {
    expect(new Datum().setDate(1).date).toBe(1);
  });
  it("should set date, using setter function", () => {
    expect(new Datum(1993, 2, 20).setDate((c) => c.date - 1).date).toBe(19);
  });
  itShouldReturnNewDatumObject("setDate");
});

describe("setFullYear", () => {
  it("should set year, using number params", () => {
    expect(new Datum().setFullYear(1993).fullYear).toBe(1993);
  });
  it("should set year, using number params", () => {
    expect(new Datum().setFullYear(1993, 12).fullYear).toBe(1994);
  });
  it("should set year, using setter function", () => {
    expect(
      new Datum(1993, 2, 20).setFullYear((c) => c.fullYear - 1).fullYear
    ).toBe(1992);
  });
  itShouldReturnNewDatumObject("setFullYear");
});

describe("setHours", () => {
  it("should set hours, using number params", () => {
    expect(new Datum().setHours(1).hours).toBe(1);
  });
  it("should set hours, using number params", () => {
    expect(new Datum().setHours(1, 60).hours).toBe(2);
  });
  it("should set hours, using setter function", () => {
    expect(new Datum(1993, 2, 20, 2).setHours((c) => c.hours - 1).hours).toBe(
      1
    );
  });
  itShouldReturnNewDatumObject("setHours");
});

describe("setMilliseconds", () => {
  it("should set milliseconds, using number params", () => {
    expect(new Datum().setMilliseconds(1).milliseconds).toBe(1);
  });
  it("should set milliseconds, using setter function", () => {
    expect(
      new Datum(1993, 2, 20, 1, 1, 1, 2).setMilliseconds(
        (c) => c.milliseconds - 1
      ).milliseconds
    ).toBe(1);
  });
  itShouldReturnNewDatumObject("setMilliseconds");
});

describe("setMinutes", () => {
  it("should set minutes, using number params", () => {
    expect(new Datum().setMinutes(1).minutes).toBe(1);
  });
  it("should set minutes, using number params", () => {
    expect(new Datum().setMinutes(1, 60).minutes).toBe(2);
  });
  it("should set minutes, using setter function", () => {
    expect(
      new Datum(1993, 2, 20, 1, 2).setMinutes((c) => c.minutes - 1).minutes
    ).toBe(1);
  });
  itShouldReturnNewDatumObject("setMinutes");
});

describe("setMonth", () => {
  it("should set month, using number params", () => {
    expect(new Datum().setMonth(1).month).toBe(1);
  });
  it("should set month, using number params", () => {
    expect(new Datum().setMonth(1, 31).month).toBe(2);
  });
  it("should set month, using setter function", () => {
    expect(new Datum(1993, 2).setMonth((c) => c.month - 1).month).toBe(1);
  });
  itShouldReturnNewDatumObject("setMonth");
});

describe("setSeconds", () => {
  it("should set seconds, using number params", () => {
    expect(new Datum().setSeconds(1).seconds).toBe(1);
  });
  it("should set seconds, using number params", () => {
    expect(new Datum().setSeconds(1, 1001).seconds).toBe(2);
  });
  it("should set seconds, using setter function", () => {
    expect(
      new Datum(1993, 2, 20, 1, 1, 2).setSeconds((c) => c.seconds - 1).seconds
    ).toBe(1);
  });
  itShouldReturnNewDatumObject("setSeconds");
});

describe("setTime", () => {
  it("should set time, using number params", () => {
    expect(new Datum().setTime(732585600000).time).toBe(732585600000);
  });
  it("should set time, using setter function", () => {
    expect(new Datum(732585600000).setTime((c) => c.time + 1).time).toBe(
      732585600001
    );
  });
  itShouldReturnNewDatumObject("setTime");
});

describe("setUTCDate", () => {
  it("should set UTC date, using number params", () => {
    expect(new Datum().setUTCDate(1).UTCDate).toBe(1);
  });
  it("should set UTC date, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00 GMT").setUTCDate(
        (c) => c.UTCDate + 1
      ).UTCDate
    ).toBe(21);
  });
  itShouldReturnNewDatumObject("setUTCDate");
});

describe("setUTCFullYear", () => {
  it("should set UTC year, using number params", () => {
    expect(new Datum().setUTCFullYear(1993).UTCFullYear).toBe(1993);
  });
  it("should set UTC year, using number params", () => {
    expect(new Datum().setUTCFullYear(1993, 12, 1).UTCFullYear).toBe(1994);
  });
  it("should set UTC year, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00 GMT").setUTCFullYear(
        (c) => c.UTCFullYear + 1
      ).UTCFullYear
    ).toBe(1994);
  });
  itShouldReturnNewDatumObject("setUTCFullYear");
});

describe("setUTCHours", () => {
  it("should set UTC hours, using number params", () => {
    expect(new Datum().setUTCHours(1).UTCHours).toBe(1);
  });
  it("should set UTC hours, using number params", () => {
    expect(new Datum().setUTCHours(1, 60).UTCHours).toBe(2);
  });
  it("should set UTC hours, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00 GMT").setUTCHours(
        (c) => c.UTCHours + 1
      ).UTCHours
    ).toBe(1);
  });
  itShouldReturnNewDatumObject("setUTCHours");
});

describe("setUTCMilliseconds", () => {
  it("should set UTC milliseconds, using number params", () => {
    expect(new Datum().setUTCMilliseconds(1).UTCMilliseconds).toBe(1);
  });
  it("should set UTC milliseconds, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00:01 GMT").setUTCMilliseconds(
        (c) => c.UTCMilliseconds + 1
      ).UTCMilliseconds
    ).toBe(2);
  });
  itShouldReturnNewDatumObject("setUTCMilliseconds");
});

describe("setUTCMinutes", () => {
  it("should set UTC minutes, using number params", () => {
    expect(new Datum().setUTCMinutes(1).UTCMinutes).toBe(1);
  });
  it("should set UTC minutes, using number params", () => {
    expect(new Datum().setUTCMinutes(1, 60).UTCMinutes).toBe(2);
  });
  it("should set UTC minutes, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:01:00 GMT").setUTCMinutes(
        (c) => c.UTCMinutes + 1
      ).UTCMinutes
    ).toBe(2);
  });
  itShouldReturnNewDatumObject("setUTCMinutes");
});

describe("setUTCMonth", () => {
  it("should set UTC month, using number params", () => {
    expect(new Datum().setUTCMonth(1).UTCMonth).toBe(1);
  });
  it("should set UTC month, using number params", () => {
    expect(new Datum().setUTCMonth(0, 32).UTCMonth).toBe(1);
  });
  it("should set UTC month, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00 GMT").setUTCMonth(
        (c) => c.UTCMonth + 1
      ).UTCMonth
    ).toBe(3);
  });
  itShouldReturnNewDatumObject("setUTCMonth");
});

describe("setUTCSeconds", () => {
  it("should set UTC seconds, using number params", () => {
    expect(new Datum().setUTCSeconds(1).UTCSeconds).toBe(1);
  });
  it("should set UTC seconds, using number params", () => {
    expect(new Datum().setUTCSeconds(1, 1001).UTCSeconds).toBe(2);
  });
  it("should set UTC seconds, using setter function", () => {
    expect(
      new Datum("Fri, 20 Mar 1993 00:00:00 GMT").setUTCSeconds(
        (c) => c.UTCSeconds + 1
      ).UTCSeconds
    ).toBe(1);
  });
  itShouldReturnNewDatumObject("setUTCSeconds");
});
