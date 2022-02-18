# Januari

Januari is a utility library that improves developer experience when working with JS `Date` objects. The library features chainable setters, dynamic getters and immutability.

## Usage

The library exposes a single class `DateTime`, which is shaped after [the native JS Date interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). `DateTime` reimplements the native `Date` constructor and its methods in a way that improves developer experience.

### Quick example

```typescript
let oneYearFromNow = new DateTime().setYear((current) => current.fullYear + 1);
```

### Creating a date object

you can construct a new date object just like you are used to do with `Date`. It essentially works the same as the native JS `Date` interface.

```typescript
import { DateTime } from "januari";

new DateTime(); // date from current time
new DateTime("2022-02-18"); // date from string
new DateTime(2022, 1, 18); // date from parameters
new DateTime(1645201589942); // date from time
new DateTime(new Date()); // date from Date
new DateTime(new DateTime()); // date from other DateTime object
```

### Changing a date object

You can use the same setter methods as the native `Date` interface. However, there are some differences.

You can use the current date state as reference to update a property:

```typescript
let myDate = new DateTime();

// increment by one month
myDate.setMonth((current) => current.month + 1);
```

`DateTime`'s are immutabe: Its setter methods return a new `DateTime` instance with updated properties.

```typescript
let myDate = new DateTime();
let otherDate = myDate.setYear(2022);

myDate === otherDate; // false
```

Since every setter/setX method returns a new `DateTime` instance, you can chain these methods.

```typescript
let myDate = new DateTime().setYear(1993).setMonth(2).setDate(20);
```

### Reading a date object's properties

`DateTime` implements dynamic getters, which mirror JS' `Date` getter methods. For example, a native `Date` has the method `getFullYear()`. The `DateTime` equivalent is simply `fullYear`.

```typescript
let year = new DateTime().fullYear;
```

### Accessing the native `Date` object

You can access the native date object by referencing `.native`.

```typescript
new DateTime().native; // Date
```
