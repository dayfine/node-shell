const
  commands = require('./commands'),
  chalk = require('chalk'),
  userCommand = process.argv[2],
  prompt = chalk.blue('\n+prompt > ')
var cmdList //uh fugly

if (userCommand) commands[userCommand]()

process.stdout.write(prompt)
process.stdin.on('data', function (data) {
  cmdList = data.toString().split(/\s*\|\s*/g)
  pipeline(cmdList.shift(), done, null)
})

function done (output) {
  cmdList.length ? pipeline(cmdList.shift(), done, output)
                 : process.stdout.write(output + prompt)
}

function pipeline (curCmd, done, memo) {
  var
    parts = curCmd.split(' '),
    cmd = parts[0],
    args = parts.slice(1)

  !!commands[cmd]
    ? commands[cmd](memo, args, done)
    : process.stdout.write(cmd + ' command not found' + prompt)
}

// test for uniq
// test for uniq
// test for uniq
