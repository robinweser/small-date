import format from '../format'

describe('Formatting dates', () => {
  it('should correctly format', () => {
    expect(format(new Date('03/03/2021'), 'dd-MM-yyyy')).toEqual('03-03-2021')
    expect(format(new Date('03/03/2021'), 'DD dd-MM-yyyy')).toEqual(
      'Wed 03-03-2021'
    )
    expect(format(new Date('03/03/2021'), 'DDD dd-MM-yyyy')).toEqual(
      'Wednesday 03-03-2021'
    )
    expect(format(new Date('03/03/2021'), 'dd-0MM-yyyy')).toEqual('03-003-2021')
    expect(format(new Date('03/03/2021'), 'dd-MMM-yyyy')).toEqual('03-Mar-2021')
    expect(format(new Date('03/03/2021 11:45:21'), 'hh:mm:ss a')).toEqual(
      '11:45:21 am'
    )
    expect(format(new Date('03/03/2021 11:45:21 PM'), 'hh:mm')).toEqual('11:45')
    expect(format(new Date('03/03/2021 11:45:21 PM'), 'HH:mm')).toEqual('23:45')
    expect(
      format(new Date('03/03/2021 11:45:21'), 'dd-MM-yyyy hh:mm:ss')
    ).toEqual('03-03-2021 11:45:21')
    expect(format(new Date('03/03/2021 11:05:05'), 'dd-MM-yyyy h:m:s')).toEqual(
      '03-03-2021 11:5:5'
    )
    expect(
      format(new Date(2021, 3, 3, 11, 45, 21, 23), 'dd-MM-yyyy hh:mm:ss.SSS')
    ).toEqual('03-04-2021 11:45:21.023')
  })
  it('should correctly format special cases', () => {
    expect(format(new Date(2020, 3, 3, 9, 9, 9), 'hh:mm:ss')).toEqual(
      '09:09:09'
    )
  })
  it('should correctly keep non-pattern text', () => {
    expect(
      format(new Date('03/03/2021'), '"Today is" MMMM "the" dd. "in year" y')
    ).toEqual('Today is March the 03. in year 2021')
  })
  it('should correctly apply the locale', () => {
    expect(format(new Date('03/03/2021'), 'DDD dd MMMM yyyy')).toEqual(
      'Wednesday 03 March 2021'
    )
    expect(
      format(new Date('03/03/2021'), 'DDD dd MMMM yyyy', { locale: 'sv-SE' })
    ).toEqual('onsdag 03 mars 2021')
    expect(
      format(new Date(2021, 3, 3, 9, 9, 9), 'hh:mm:ss a', { locale: 'sv-SE' })
    ).toEqual('09:09:09 fm')
  })
  it('should support both HH and hh', () => {
    expect(format(new Date('2022-11-16T15:03:00.000Z'), 'HH', {timeZone: 'Europe/Stockholm'})).toEqual('16')
    expect(format(new Date('2022-11-16T15:03:00.000Z'), 'hh', {timeZone: 'Europe/Stockholm'})).toEqual('04')
  })
  it('should care about timezone', () => {
    expect(format(new Date('2022-11-16T22:20:00.000Z'), 'yyyy-MM-dd HH:mm', {timeZone: 'Europe/Stockholm'})).toEqual('2022-11-16 23:20')
    expect(format(new Date('2022-11-16T22:20:00.000Z'), 'yyyy-MM-dd HH:mm', {timeZone: 'Asia/Tbilisi'})).toEqual('2022-11-17 02:20')
    expect(format(new Date('2022-11-16T22:20:00.000Z'), 'yyyy-MM-dd HH:mm', {timeZone: 'America/St_Johns'})).toEqual('2022-11-16 18:50')
  })
})
