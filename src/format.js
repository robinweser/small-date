const PATTERN_REGEX = /(M|y|d|D|h|H|m|s|S|G|Z|P|a)+/g
const ESCAPE_REGEX = /\\"|"((?:\\"|[^"])*)"|(\+)/g

const optionNames = {
  y: 'year',
  M: 'month',
  d: 'day',
  D: 'weekday',
  h: 'hour',
  H: 'hour',
  m: 'minute',
  s: 'second',
  S: 'fractionalSecondDigits',
  G: 'era',
  Z: 'timeZoneName',
  P: 'dayPeriod',
  a: 'hour12',
}

const values = {
  y: ['numeric', '2-digit', undefined, 'numeric'],
  M: ['narrow', '2-digit', 'short', 'long'],
  d: [undefined, '2-digit'],
  D: ['narrow', 'short', 'long'],
  h: ['numeric', '2-digit'],
  H: ['numeric', '2-digit'],
  m: ['numeric', '2-digit'],
  s: ['numeric', '2-digit'],
  S: [1, 2, 3],
  G: ['narrow', 'short', 'long'],
  Z: ['short', 'long'],
  P: ['narrow', 'short', 'long'],
  a: [true],
}

function formatType(date, type, length, { locale, timeZone } = {}) {
  const option = optionNames[type]
  const value = values[type][length - 1]

  if (!value) {
    return
  }

  const options = {
    [option]: value,
    timeZone,
  }

  // special treatment since hour is returned in a weird format
  if (type === 'h') {
    return Intl.DateTimeFormat(locale, options).formatToParts(date)[0].value
  }

  if (type === 'H') {
    return Intl.DateTimeFormat(locale, {
      ...options,
      hour12: false,
    }).formatToParts(date)[0].value
  }

  if (type === 'G' || type === 'Z') {
    return Intl.DateTimeFormat(locale, options)
      .formatToParts(date)
      .pop().value
  }

  if (type === 'a') {
    return Intl.DateTimeFormat(locale, {
      ...options,
      hour: 'numeric',
    })
      .formatToParts(date)
      .pop().value
  }

  return Intl.DateTimeFormat(locale, options).format(date)
}

export default function format(date, pattern, config) {
  return pattern
    .split(ESCAPE_REGEX)
    .filter(sub => sub !== undefined)
    .map((sub, index) => {
      // keep escaped strings as is
      if (index % 2 !== 0) {
        return sub
      }

      return sub.replace(PATTERN_REGEX, match => {
        const type = match.charAt(0)
        return formatType(date, type, match.length, config) || match
      })
    })
    .join('')
}
