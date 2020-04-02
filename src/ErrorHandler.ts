import * as Tony from 'tony-lang'
import {
  DuplicateBindingErrorFormatter,
  InternalErrorFormatter,
  MissingBindingErrorFormatter,
  SyntaxErrorFormatter,
  TypeErrorFormatter,
} from './formatting'
import chalk from 'chalk'

export class ErrorHandler {
  perform = async (error: Error): Promise<void> => {
    console.error(`${chalk.bold.underline.redBright(error.name)}`)
    if (error instanceof Tony.InternalError)
      await new InternalErrorFormatter().perform(error)
    else if (error instanceof Tony.SyntaxError)
      await new SyntaxErrorFormatter().perform(error)
    else if (error instanceof Tony.DuplicateBindingError)
      await new DuplicateBindingErrorFormatter().perform(error)
    else if (error instanceof Tony.MissingBindingError)
      return new MissingBindingErrorFormatter().perform(error)
    else if (error instanceof Tony.TypeError)
      return new TypeErrorFormatter().perform(error)
    else console.error(error.message)
  }
}
