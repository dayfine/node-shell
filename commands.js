const
  fs = require('fs'),
  request = require('request'),
  chalk = require('chalk'),
  path = require('path')

let
  ret, len, data, file

module.exports = {
  pwd: pwd,
  date: date,
  ls: ls,
  echo: echo,
  head: head,
  tail: tail,
  cat: cat,
  sort: sort,
  wc: wc,
  uniq: uniq,
  find: find,
  grep: grep,
  curl: curl,
  handleErr: handleErr
}

function pwd (stdin, arg, done) {
  done(process.cwd())
}

function date (stdin, arg, done) {
  done(Date())
}

function ls (stdin, arg, done) {
  let ret = ''
  fs.readdir('.', (err, files) => {
    if (err) handleErr(err)
    ret = files.join('\n')
    done(ret)
  })
}

function echo (stdin, args, done) {
  done(args
    .map(arg => (arg[0] === '$') ? process.env[arg.slice(1)] : arg)
    .join(' ')
  )
}

function cat (stdin, filenames, done) {
  let ret = '', len = filenames.length
  filenames.forEach(filename => {
    fs.readFile('./' + filename, 'utf8', (err, data) => {
      ret += data
      len--
      if (len <= 0) done(ret)
    })
  })
}

function fileOp (stdin, filename, done, fn) {
  filename = String(filename)
  function output (err, data) {
    if (err) handleErr(err)
    data = data || ''
    done(fn(data))
  }

  stdin && !filename
    ? output(null, stdin)
    : fs.readFile('./' + filename, 'utf8', output)
}

function head (stdin, arg, done) {
  fileOp(stdin, arg, done, data => data.split('\n').slice(0, 5).join('\n'))
}

function tail (stdin, arg, done) {
  fileOp(stdin, arg, done, data => data.split('\n').slice(-5).join('\n'))
}

function sort (stdin, arg, done) {
  fileOp(stdin, arg, done, data => data.split('\n').sort().join('\n'))
}

function wc (stdin, arg, done) {
  fileOp(stdin, arg, done, data => data.split('\n').length)
}

function uniq (stdin, arg, done) {
  fileOp(stdin, arg, done, data => {
    return data
            .split('\n')
            .filter((line, lnNum, arr) => lnNum === 0 || line !== arr[lnNum - 1])
            .join('\n')
  })
}

function find (stdin, arg, done) {
  let arg = String(arg) || '.'
  let ret = ''
  _serialwalk(arg, ret, done)
}

function _serialwalk (dir, ret, done) {
  fs.readdir(dir, (err, list) => {
    if (err) handleErr(err)
    let i = 0
    next()

    function next () {
      if (i === list.length) return done(ret)
      file = path.join(dir, list[i++])

      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          _serialwalk(file, ret, (err, res) => {
            if (res) ret += res + '\n'
            next()
          })
        } else {
          ret += file + '\n'
          next()
        }
      })
    }
  })
}

function grep (stdin, arg, done) {
  arg = String(arg)
  let regex = new RegExp(arg, 'i')
  done(stdin
    .split('\n')
    .filter(line => regex.test(line))
    .join('\n')
  )
}

function curl (stdin, arg, done) {
  arg = String(arg)
  const url = (arg.slice(0, 7) === 'http://') ? arg : ('http://' + arg)
  request(url, (err, response, body) => {
    if (err) handleErr(err)
    done(body || '0')
  })
}

function handleErr (err) {
  process.stderr.write(chalk.red('err: ' + err) + '\n')
}
