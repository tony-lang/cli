import { DuplicateBindingError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'
import chalk from 'chalk'

export class DuplicateBindingErrorFormatter {
  perform = async (error: DuplicateBindingError): Promise<void> => {
    console.error(
      `The name ${chalk.bold.whiteBright(error.binding)} is already bound in ` +
        'the current scope and cannot be reassigned.',
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
