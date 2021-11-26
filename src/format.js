const PATTERN_REGEX = /(M|y|d|D|h|H|m|s|S|G|Z|P|a)+/g
const ESCAPE_REGEX = /\\"|"((?:\\"|[^"])*)"|(\+)/g

const optionNames = {
  y: 'year',
  M: 'month',
  d: 'day',
  D: 'weekday',
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
  S: [1, 2, 3],
  G: ['narrow', 'short', 'long'],
  Z: ['short', 'long'],
  P: ['narrow', 'short', 'long'],
  a: [true],
}

const time = {
  h: 'getHours',
  H: 'getHours',
  m: 'getMinutes',
  s: 'getSeconds',
}

function pad(value, length) {
  if (length === 2 && value / 10 < 1) {
    return '0' + value
  }

  return value
}

function formatType(date, type, length, { locale, timeZone } = {}) {
  // special treatment for time as its handled in a weird way
  const timeGetter = time[type]

  if (timeGetter) {
    const timeValue = date[timeGetter]()
    return pad(type === 'h' ? timeValue % 12 : timeValue, length)
  }

  const option = optionNames[type]
  const value = values[type][length - 1]

  if (!value) {
    return
  }

  const options = {
    [option]: value,
    timeZone,
  }

  if (type === 'a') {
    return Intl.DateTimeFormat(locale, {
      ...options,
      hour: 'numeric',
    })
      .formatToParts(date)
      .pop().value
  }

  if (type === 'G' || type === 'Z') {
    return Intl.DateTimeFormat(locale, options).formatToParts(date).pop().value
  }

  return Intl.DateTimeFormat(locale, options).format(date)
}

export default function format(date, pattern, config) {
  return pattern
    .split(ESCAPE_REGEX)
    .filter((sub) => sub !== undefined)
    .map((sub, index) => {
      // keep escaped strings as is
      if (index % 2 !== 0) {
        return sub
      }

      return sub.replace(PATTERN_REGEX, (match) => {
        const type = match.charAt(0)
        return formatType(date, type, match.length, config) || match
      })
    })
    .join('')
}
