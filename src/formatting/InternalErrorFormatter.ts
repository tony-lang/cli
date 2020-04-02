import { InternalError } from 'tony-lang'
import chalk from 'chalk'

export class InternalErrorFormatter {
  perform = async (error: InternalError): Promise<void> => {
    if (error.context) console.error(`\n${error.context}`)

    console.error(
      `\n${chalk.bold.whiteBright(error.message)}\n\n` +
        "[500] Oh noes! Some of Tony's insides just turned upside down.\n" +
        'This is very likely to be a bug. Tony would be delighted, if you ' +
        'reported it in the issue tracker.\n\n' +
        'https://github.com/tony-lang/tony/issues',
    )
  }
}
