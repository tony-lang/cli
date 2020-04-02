import { MissingBindingError } from 'tony-lang'
import chalk from 'chalk'

import { SourceFormatter } from './SourceFormatter'

export class MissingBindingErrorFormatter {
  perform = async (error: MissingBindingError): Promise<void> => {
    if (error.type && error.representation) {
      console.error(
        `The name ${chalk.bold.whiteBright(error.binding)} is not bound by ` +
        `the type ${chalk.whiteBright(error.type)} with the representation ` +
        `${chalk.whiteBright(error.representation)}.`
      )
    } else {
      console.error(
        `The name ${chalk.bold.whiteBright(error.binding)} is not bound in ` +
        'the current scope or any parent scope.'
      )
    }

    if (error.filePath && error.context) {
      console.error('\nThis is where the error occured:\n')
      await new SourceFormatter()
        .perform(error.filePath, error.context.start, error.context.end)
    }
  }
}