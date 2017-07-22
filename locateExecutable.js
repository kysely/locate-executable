import { execFile } from 'child_process'
import { homedir } from 'os'
import path from 'path'

let list = ''

const locateExecutable = (cmd, specificPath, cb = () => {}) => {
    const callback =     typeof specificPath === 'function' ? specificPath : cb
    const searchInPath = typeof specificPath === 'string' ? specificPath : '.'

    const find = execFile('find', [searchInPath, '-perm', '-700', '-type', 'f'],
                         { shell: true, cwd: homedir() } )

    find.stdout.on('data', data => list += data.toString() )
    find.stderr.once('data', err => callback(err.toString(), null) )

    find.on('exit', (code, signal) => {
        if (code !== null && signal !== 'SIGTERM') return

        const locations = []
        const regExMatch = new RegExp(`\/${cmd}$`)

        list.split('\n').forEach(executable => {
            const match = executable.match(regExMatch)
            if (match) locations.push( path.join(homedir(), match.input) )
            return
        })

        callback(null, locations)
        return
    })
}

export default locateExecutable
