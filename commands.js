var
  fs = require('fs'),
  request = require('request'),
  ret

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
    filenames.forEach(function (filename) {
      fs.readFile('./' + filename, 'utf8', function (err, data) {
        console.log(ret)
        ret += data
      })
    })
    done(ret)
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
  sort: function (filename) {
    filename = filename[0]
    process.stdout.write('lol')
  },
  wc: function (filename) {
    filename = filename[0]
    process.stdout.write('lol')
  },
  uniq: function (filename) {
    filename = filename[0]
    process.stdout.write('lol')
  },
  find: function (filename) {
    filename = filename[0]
    process.stdout.write('lol')
  },
  curl: function (url, done) {
    request(url[0], function (error, response, body) {
      ret = body.toString()
      done(ret)
    })
  }
}
