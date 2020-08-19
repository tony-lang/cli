import { InvalidModuleAccessError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'
import chalk from 'chalk'

export class InvalidModuleAccessErrorFormatter {
  perform = async (error: InvalidModuleAccessError): Promise<void> => {
    console.error(
      `The name ${chalk.bold.whiteBright(
        error.binding,
      )} is not a property of ` +
        `the module ${chalk.whiteBright(error.type)}.`,
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
