var
  fs = require('fs'),
  request = require('request'),
  ret, len

module.exports = {
  pwd: function (arg, done) {
    done(process.cwd())
  },

  date: function (arg, done) {
    ret = new Date()
    ret = ret.toString()
    done(ret)
  },

  ls: function (arg, done) {
    ret = ''
    fs.readdir('.', function (err, files) {
      files.forEach(function (file) {
        ret += file.toString()
      })
      done(ret)
    })
  },

  echo: function (arg, done) {
    ret = arg.join(' ')
    done(ret)
  },
  // what the fuck is this
  cat: function (filenames, done) {
    ret = ''
    len = filenames.length
    filenames.forEach(function (filename) {
      fs.readFile('./' + filename, 'utf8', function (err, data) {
        ret += data
        len--
        if (len <= 0) done(ret)
      })
    })
  },

  head: function (filename, done) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      if (err) ret = 'no such file!'
      ret = data.split('\n', 5).join('\n')
      done(ret)
    })
  },

  tail: function (filename, done) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      if (err) ret = 'no such file!'
      ret = data.split('\n').slice(-5).join('\n')
      done(ret)
    })
  },

  sort: function (filename, done) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      if (err) ret = 'no such file!'
      ret = data.split('\n').sort().join('\n')
      done(ret)
    })
  },

  wc: function (filename, done) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      if (err) ret = 'no such file!'
      ret = data.split('\n').length
      done(ret)
    })
  },

  uniq: function (filename, done) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      if (err) ret = 'no such file!'
      ret = data.split('\n').filter(function (line, lnNum, arr) {
        if (lnNum === 0) return true
        return line !== arr[lnNum - 1]
      }).join('\n')
      done(ret)
    })
  },

  find: function (arg, done) {
    ret = ''
    fs.readdir('.', function (err, files) {
      if (err) ret = 'no such file!'
      files.forEach(function (file) {
        ret += file.toString()
      })
      done(ret)
    })
  },

  grep: function (arg, done) {
    // to finish
    ret = ''
    fs.readdir('.', function (err, files) {
      if (err) ret = 'no such file!'
      files.forEach(function (file) {
        ret += file.toString()
      })
      done(ret)
    })
  },

  curl: function (url, done) {
    request(url[0], function (error, response, body) {
      ret = body.toString()
      done(ret)
    })
  }
}
