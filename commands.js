const
  fs = require('fs'),
  request = require('request'),
  chalk = require('chalk')

var
  ret, len, data

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
  ret = ''
  fs.readdir('.', function (err, files) {
    files.forEach(function (file) {
      ret += file.toString() + ('\n')
    })
    done(ret)
  })
}

function echo (stdin, args, done) {
  done(args
    .map( arg => (arg[0] === '$') ? process.env[arg.slice(1)] : arg)
    .join(' ')
  )
}

function cat (stdin, filenames, done) {
  ret = ''
  len = filenames.length
  filenames.forEach(function (filename) {
    fs.readFile('./' + filename, 'utf8', function (err, data) {
      ret += data
      len--
      if (len <= 0) done(ret)
    })
  })
}

function fileOp (stdin, filename, done, fn) {
  filename = filename + ''
  function output (err, data) {
    if (err) handleErr(err)
    data = (!data) ? '': data
    done(fn(data))
  }

  stdin && !filename
    ? output(null, stdin)
    : fs.readFile('./' + filename, 'utf8', output)
}

function head (stdin, arg, done) {
  fileOp(stdin, arg, done, function (data) {
    return data.split('\n').slice(0, 5).join('\n')
  })
}

function tail (stdin, arg, done) {
  fileOp(stdin, arg, done, function (data) {
    return data.split('\n').slice(-5).join('\n')
  })
}

function sort (stdin, arg, done) {
  fileOp(stdin, arg, done, function (data) {
    return data.split('\n').sort().join('\n')
  })
}

function wc (stdin, arg, done) {
  fileOp(stdin, arg, done, function (data) {
    return data.split('\n').length
  })
}

function uniq (stdin, arg, done) {
  fileOp(stdin, arg, done, function (data) {
    return data.split('\n').filter(function (line, lnNum, arr) {
      if (lnNum === 0) return true
      return line !== arr[lnNum - 1]
    }).join('\n')
  })
}

//needs work
function find (stdin, arg, done) {
  ret = ''
  fs.readdir('.', function (err, files) {
    if (err) ret = 'no such file!'
    files.forEach(function (file) {
      ret += file.toString()
    })
    done(ret)
  })
}

function grep (stdin, arg, done) {
  arg = arg + ''
  var regex = new RegExp(arg, 'i')
  done(stdin
    .split('\n')
    .filter(line => regex.test(line))
    .join('\n')
  )
}

function curl (stdin, arg, done) {
  arg = arg + ''
  var url = (arg.slice(0,7) === 'http://') ? arg : ('http://' + arg)
  request(url, function (err, response, body) {
    if (err) handleErr(err)
    body ? done(body) : done('0')
  })
}

function handleErr (err) {
  process.stderr.write(chalk.red('err: '+ err) + '\n');
}
