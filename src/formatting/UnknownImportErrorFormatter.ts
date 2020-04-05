import { SourceFormatter } from './SourceFormatter'
import { UnknownImportError } from 'tony-lang'
import chalk from 'chalk'

export class UnknownImportErrorFormatter {
  perform = async (error: UnknownImportError): Promise<void> => {
    console.error(
      `Cannot import files with this file extension (${chalk.bold.whiteBright(
        error.sourcePath,
      )}).`,
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
