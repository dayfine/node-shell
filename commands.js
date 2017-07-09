var
  fs = require('fs'),
  request = require('request'),
  ret

module.exports = {
  pwd: function () {
    process.stdout.write(process.cwd() + '\n')
  },
  date: function () {
    ret = new Date()
    ret = ret.toString() + '\n'
    process.stdout.write(ret)
  },
  ls: function () {
    fs.readdir('.', function (err, files) {
      if (err) throw err
      files.forEach(function (file) {
        process.stdout.write(file.toString() + '\n')
      })
      process.stdout.write('prompt > ')
    })
  },
  echo: function (args) {
    ret = args.join(' ')
    process.stdout.write(ret)
  },
  cat: function (filenames) {
    for (var i = 0; i < filenames.length; i++) {
      fs.readFile('./' + filenames[i], 'utf8', function (err, data) {
        process.stdout.write(data)
        process.stdout.write('prompt > ') // needs to deal with prompt in genearl
      })
    }
  },
  head: function (filename) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      ret = data.split('\n', 5).join('\n') + '\n'
      process.stdout.write(ret)
      process.stdout.write('prompt > ')
    })
  },
  tail: function (filename) {
    filename = filename[0]
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      ret = data.split('\n').slice(-5).join('\n') + '\n'
      process.stdout.write(ret)
      process.stdout.write('prompt > ')
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
  curl: function (url) {
    request(url[0], function (error, response, body) {
      ret = body.toString()
      process.stdout.write(ret)
    })
  }
}
