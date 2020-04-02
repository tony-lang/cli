import chalk from 'chalk'
import fs from 'fs'

const CONTEXT = Object.freeze(2)

type Position = {
  row: number
  column: number
}

export class SourceFormatter {
  perform = async (
    filePath: string,
    start: Position,
    end: Position,
  ): Promise<void> => {
    const firstLine = start.row - CONTEXT >= 0 ? start.row - CONTEXT : 0
    const lastLine = end.row + CONTEXT
    const source = await SourceFormatter.readFile(filePath)
    const lines = source.split('\n')
    const context = lines.slice(firstLine, lastLine + 1)

    if (firstLine > 0) console.error('⋮')
    context.forEach((line, i) => {
      this.printLine(line, firstLine + i, start, end)
    })
    if (lastLine < lines.length - 1) console.error('⋮')
  }

  printLine = (
    line: string,
    lineno: number,
    start: Position,
    end: Position,
  ): void => {
    let coloredLine

    if (lineno == start.row && lineno == end.row) {
      const first = line.slice(0, start.column)
      const error = chalk.bold.redBright(line.slice(start.column, end.column))
      const last = line.slice(end.column)

      coloredLine = `${first}${error}${last}`
    } else if (lineno == start.row) {
      const first = line.slice(0, start.column)
      const error = chalk.bold.redBright(line.slice(start.column))

      coloredLine = `${first}${error}`
    } else if (lineno == end.row) {
      const error = chalk.bold.redBright(line.slice(0, end.column))
      const last = line.slice(end.column)

      coloredLine = `${error}${last}`
    } else if (lineno > start.row && lineno < end.row)
      coloredLine = chalk.bold.redBright(line)
    else coloredLine = line

    console.error(`${chalk.gray(lineno + 1)}  ${coloredLine}`)
  }

  static readFile = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        !error ? resolve(data) : reject(error)
      })
    })
  }
}
