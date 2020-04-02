import path from 'path'
import * as Tony from 'tony-lang'

export default class CLI {
  debug = false

  enableDebugMode = (): void => {
    this.debug = true
    console.log('Running Tony in debug mode...')
  }

  run = (
    project: string,
    args: string[],
    { outFile, webpackMode }: {
      outFile: string;
      webpackMode: string;
    }
  ): void => {
    Tony.compile(project, { outFile, webpackMode, verbose: this.debug })
      .then(entryPath => Tony.exec(entryPath, args, { verbose: this.debug }))
      .catch(error => console.error(error.message))
  }

  compile = (
    project: string,
    { outFile, noEmit, webpackMode }: {
      outFile: string;
      noEmit: boolean;
      webpackMode: string;
    }
  ): void => {
    Tony.compile(project, { outFile, noEmit, webpackMode, verbose: this.debug })
      .then(entryPath => {
        console.log('Done!')

        if (!noEmit)
          console.log(`Your built project can be found here: ${entryPath}`)
      })
      .catch(error => console.error(error.message))
  }

  exec = (file: string, args: string[]): void => {
    Tony.exec(path.join(process.cwd(), file), args, { verbose: this.debug })
      .catch(error => console.error(error.message))
  }

  parse = (file: string): void => {
    Tony.parse(file, { verbose: this.debug })
      .then(tree => console.log(tree.rootNode.toString()))
      .catch(error => console.error(error.message))
  }
}
