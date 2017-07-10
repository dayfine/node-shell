var
  commands = require('./commands'),
  userCommand = process.argv[2]

if (userCommand) commands[userCommand]()

process.stdout.write('prompt > ')

process.stdin.on('data', function (data) {
  var
    cmds = data.toString().trim().split(' '),
    cmd = cmds[0],
    args = (cmds.length > 1) ? cmds.slice(1) : undefined,
    done = function (output) {
      process.stdout.write(output + '\n')
      process.stdout.write('prompt > ')
    }

  commands.hasOwnProperty(cmd)
    ? commands[cmd](args, done)
    : process.stdout.write(cmd + ' command not found\nprompt > ')
})
