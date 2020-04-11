import * as Tony from 'tony-lang'
import { CommanderStatic } from 'commander'
import { ErrorHandler } from './ErrorHandler'
import { TreeFormatter } from './formatting'
import path from 'path'

export default class CLI {
  private _commander: CommanderStatic

  constructor(commander: CommanderStatic) {
    this._commander = commander
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private get options(): { [key: string]: any } {
    return this._commander.opts()
  }

  run = async (
    file: string,
    args: string[],
    {
      outFile,
      webpackMode,
    }: {
      outFile: string
      webpackMode: string
    },
  ): Promise<void> => {
    await Tony.compile(file, {
      outFile,
      webpackMode,
      verbose: this.options.debug,
    })
      .then((entryPath) => {
        if (entryPath === undefined)
          throw new Tony.InternalError(
            'entryPath should only be undefined when no emit is false.',
          )

        return Tony.exec(entryPath, args, { verbose: this.options.debug })
      })
      .catch((error) => new ErrorHandler().perform(error))
  }

  compile = async (
    file: string,
    {
      outFile,
      emit,
      webpackMode,
    }: {
      outFile: string
      emit: boolean
      webpackMode: string
    },
  ): Promise<void> => {
    await Tony.compile(file, {
      outFile,
      emit,
      webpackMode,
      verbose: this.options.debug,
    })
      .then((entryPath) => {
        console.log('Done!')

        if (emit)
          console.log(`Your compiled file can be found here: ${entryPath}`)
      })
      .catch((error) => new ErrorHandler().perform(error))
  }

  exec = async (file: string, args: string[]): Promise<void> => {
    await Tony.exec(path.join(process.cwd(), file), args, {
      verbose: this.options.debug,
    }).catch((error) => new ErrorHandler().perform(error))
  }

  parse = async (file: string): Promise<void> => {
    await Tony.parse(file, { verbose: this.options.debug })
      .then((tree) => console.log(new TreeFormatter().perform(tree.rootNode)))
      .catch((error) => new ErrorHandler().perform(error))
  }
}
