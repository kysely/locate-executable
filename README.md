# Locate Executable [![npm version](https://badge.fury.io/js/locate-executable.svg)](https://badge.fury.io/js/locate-executable)

#### Locate executable files for specific commands (useful for `child_process` inside Electron apps)


After building an Electron app using `electron-builder`, the `$PATH` variable inside `child_process` may get set to `/usr/bin:/bin:/usr/sbin:/sbin` which makes it virtually impossible to spawn additional non-UNIX commands.

This package allows you to locate paths of executable files for such commands. You can then use these paths to spawn `child_process` inside the compiled app.

## Install
*Tested on macOS only. Let me know if it does/not work on Linux/Windows.*
```sh
npm install --save locate-executable
```

## `locateExecutable(command[,subpath][,callback])`
Looks for executable files for specified `command` in user's home directory recursively. You can narrow down the search by specifying additional `subpath`.

- `command` (String) Command you need the executable of
- `subpath` (String) *(optional)* Specify a particular subpath you want to look at
- `callback` (Function) *(optional)*
    - `error` (String)
    - `paths` (Array) List of absolute paths to executables

```javascript
// Example
import locateExecutable from 'locate-executable'

locateExecutable('jupyter-console', (error, paths) => {
    if (error) console.log(error)

    console.log(paths)
    return
})
```

NOTE: As the search inside the home directory recursively can take some time, consider running it only on the first launch and saving the paths persistently in something like [`electron-store`](https://www.npmjs.com/package/electron-store).

## Contribute
So if you're awesome and want to contribute to this project, go fork, clone and send pull requests! These are the tips for features to work on:
- support for Windows and Linux (if it already doesn't work)

## License
MIT
