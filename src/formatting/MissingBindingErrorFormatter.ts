import { MissingBindingError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'
import chalk from 'chalk'

export class MissingBindingErrorFormatter {
  perform = async (error: MissingBindingError): Promise<void> => {
    console.error(
      `The name ${chalk.bold.whiteBright(error.binding)} is not bound in ` +
        'the current scope or any parent scope.',
    )

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
