import nmea0183 from '@signalk/nmea0183-utilities'

export default {
  nmea0183,
  coordinate (deg) {
    let d = Math.floor(deg)
    let minfloat = (deg - d) * 60
    let m = Math.floor(minfloat)
    let secfloat = (minfloat - m) * 60
    let s = secfloat.toFixed(3)

    if (s === 60) {
      m++
      s = 0
    }

    if (m === 60) {
      d++
      m = 0
    }

    d = String(d)
    m = String(m)

    if (parseInt(m, 10) < 10) {
      m = `0${m}`
    }

    if (parseInt(d, 10) < 10) {
      m = `0${d}`
    }

    if (parseInt(s.split('.')[0], 10) < 10) {
      s = `0${s.split('.')[0]}.${s.split('.')[1]}`
    }

    return d + '° ' + m + '" ' + s + '\''
  }
}
