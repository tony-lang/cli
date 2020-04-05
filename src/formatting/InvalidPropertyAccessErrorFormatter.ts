import { InvalidPropertyAccessError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'
import chalk from 'chalk'

export class InvalidPropertyAccessErrorFormatter {
  perform = async (error: InvalidPropertyAccessError): Promise<void> => {
    console.error(
      `The name ${chalk.bold.whiteBright(
        error.property,
      )} is not a property of ` +
        `the type ${chalk.whiteBright(error.type)} with the representation ` +
        `${chalk.whiteBright(error.representation)}.`,
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
