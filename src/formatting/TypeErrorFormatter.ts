import { SourceFormatter } from './SourceFormatter'
import { TypeError } from 'tony-lang'
import chalk from 'chalk'

export class TypeErrorFormatter {
  perform = async (error: TypeError): Promise<void> => {
    console.error(
      'Type unification resulted in an empty type disjunction.\n\nUnification trace:',
    )

    error.trace.forEach((internalTypeError) => {
      console.error(chalk.bold.whiteBright(internalTypeError.message))

      internalTypeError.trace.forEach(([expected, actual]) => {
        if (actual)
          console.error(
            `${chalk.gray('- expected')} ${chalk.whiteBright(
              expected,
            )}\n       ` + `${chalk.gray('got')} ${chalk.whiteBright(actual)}`,
          )
        else
          console.error(
            `${chalk.gray('-')}          ${chalk.whiteBright(expected)}`,
          )
      })
    })

    if (error.filePath && error.context) {
      console.error('\nThis is where the error occured:\n')
      await new SourceFormatter().perform(
        error.filePath,
        error.context.start,
        error.context.end,
      )
    }
  }
}
