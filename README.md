# small-color

A tiny (0.8kb) date formatting library with built-in i18n support.<br>

## Why?

There are several date formatting libraries out there. It all started with [Moment](https://momentjs.com), while nowadays smaller alternatives such as [date-fns](https://date-fns.org), [DayJS](https://day.js.org) and [Luxon](https://moment.github.io/luxon/#/) among others are raising in popularity.<br>
While [date-fns](https://date-fns.org) already comes in a really small format, it was still way to big for my most common use case: Format a date with a given pattern.<br>
So I created this tiny library as an attempt to solve this specific problem with as little bytes as possible.

## How it works

I was using [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) previously and really liked it. So I had the idea to use that under the hood while providing a nice API that accepts a pattern in a widely used format.<br>
The nice thing about [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) is that it has built-in i18n support.

## Browser Support

It works in all modern browsers.<br>

> However, if you need to support IE11, pick one of the libraries mentioned above!

## Installation

```sh
yarn add small-date
```

## Usage

The libraries exports a single function that accepts the following parameters:

| Parameter | Type      | Description                                               |
| --------- | --------- | --------------------------------------------------------- |
| Date      | `Date`    | The date that is formatted                                |
|  Pattern  |  `string` | The pattern in which the date should be formatted         |
|  Config   | `Object`  | A config option that accepts an `locale` and a `timeZone` |

```javascript
import { format } from 'small-date'

// Wednesday 03 March 2021, 11:45 am
format(new Date(), 'DDD dd MMMM yyyy, hh:mm a')

// Mittwoch 03 März 2021, 11:45
format(new Date(), 'DDD dd MMMM yyyy, HH:mm', {
  locale: 'de-DE',
})
```

### Escaping Text

Sometimes we want to add arbitary text into our pattern. The problem is: Words break if they include tokens. Therefore, it is safest to escape all words with `"` quotes.

```javascript
import { format } from 'small-date'

// Today is Wednesday the 03. of March
format(new Date(), '"Today is" DDD "the" dd. "of" MMMM')
```

### TimeZone

We can pass a `timeZone` to the configuration to get the locale date at this particular zone.

```javascript
import { format } from 'small-date'

// Wednesday 03 March 2021, 09:45 pm
format(new Date(), 'DDD dd MMMM yyyy, hh:mm a', {
  timeZone: 'Australia/Sydney',
})
```

## Pattern Tokens

> All examples below use the following date: `new Date(2021, 2, 3, 18, 7, 8, 9)` and the `en-US` locale.

| Token |  Description                    | Example                          |
| ----- | ------------------------------- | -------------------------------- |
| D     | Weekday, 1 letter               | `W`                              |
| DD    | Weekday, 3 letters              | `Wed`                            |
| DDD   | Weekday, long                   | `Wednesday`                      |
| d     | Day of the month, no padding    | `3`                              |
| dd    | Day of the month, padded to 2   | `03`                             |
| M     | Month, numeric                  | `3`                              |
| MM    | Month, 2 digits                 | `03`                             |
| MMM   | Month, 3 letters                | `Mar`                            |
| MMMM  | Month, long                     | `March`                          |
| y     | Year, numeric                   | `2021`                           |
| yy    | Year, 2 digits                  | `21`                             |
| yyyy  | Year, numeric                   | `2021`                           |
| h     | Hours, no padding               | `6`                              |
| hh    | Hours, padded to 2              | `06`                             |
| H     | Hours in 24-format, no padding  | `18`                             |
| HH    | Hours in 24-format, padded to 2 | `18`                             |
| m     | Minutes, no padding             | `7`                              |
| m     | Minutes, padded to 2            | `07`                             |
| s     | Seconds, no padding             | `8`                              |
| ss    | Seconds, padded to 2            | `08`                             |
| S     | Milliseconds, no padding        | `9`                              |
| SS    | Milliseconds, padded to 2       | `09`                             |
| SSS   | Milliseconds, padded to 3       | `009`                            |
| G     | Era, narrow                     | `A`                              |
| GG    | Era, short                      | `AD`                             |
| GGG   | Era, long                       | `Anno Domino`                    |
| Z     | Time zone, short                | `GMT+1`                          |
| ZZ    | Time short, long                | `Central European Standard Time` |
| P     | Period of the day, narrow       | `in the morning`                 |
| PP    | Period of the day, short        | `in the morning`                 |
| PPP   | Period of the day, long         | `in the morning`                 |
| a     | Meridiem                        | `pm`                             |

## License

small-color is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
