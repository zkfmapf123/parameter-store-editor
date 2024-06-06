import { Run } from './cmd/runner'

Run()

process
  .on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
  })
  .on('exit', (err) => {
    console.debug('bye')
    process.exit(0)
  })
