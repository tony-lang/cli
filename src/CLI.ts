import * as Tony from 'tony-lang'
import { ErrorHandler } from './ErrorHandler'
import { TreeFormatter } from './formatting'
import path from 'path'

export default class CLI {
  debug = false

  enableDebugMode = (): void => {
    this.debug = true
    console.log('Running Tony in debug mode...')
  }

  run = (
    project: string,
    args: string[],
    {
      outFile,
      webpackMode,
    }: {
      outFile: string
      webpackMode: string
    },
  ): void => {
    Tony.compile(project, {
      outFile,
      webpackMode,
      verbose: this.debug,
    })
      .then((entryPath) => {
        if (entryPath === undefined)
          throw new Tony.InternalError(
            'entryPath should only be undefined when no emit is false.',
          )

        return Tony.exec(entryPath, args, { verbose: this.debug })
      })
      .catch((error) => new ErrorHandler().perform(error))
  }

  compile = (
    project: string,
    {
      outFile,
      emit,
      webpackMode,
    }: {
      outFile: string
      emit: boolean
      webpackMode: string
    },
  ): void => {
    Tony.compile(project, {
      outFile,
      emit,
      webpackMode,
      verbose: this.debug,
    })
      .then((entryPath) => {
        console.log('Done!')

        if (emit)
          console.log(`Your built project can be found here: ${entryPath}`)
      })
      .catch((error) => new ErrorHandler().perform(error))
  }

  exec = (file: string, args: string[]): void => {
    Tony.exec(path.join(process.cwd(), file), args, {
      verbose: this.debug,
    }).catch((error) => new ErrorHandler().perform(error))
  }

  parse = (file: string): void => {
    Tony.parse(file, { verbose: this.debug })
      .then((tree) => console.log(new TreeFormatter().perform(tree.rootNode)))
      .catch((error) => new ErrorHandler().perform(error))
  }
}
