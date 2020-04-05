import * as Tony from 'tony-lang'
import {
  CyclicDependenciesErrorFormatter,
  DuplicateBindingErrorFormatter,
  ExportOutsideModuleScopeErrorFormatter,
  ImportOutsideFileModuleScopeErrorFormatter,
  InternalErrorFormatter,
  InvalidPropertyAccessErrorFormatter,
  MissingBindingErrorFormatter,
  SyntaxErrorFormatter,
  TypeErrorFormatter,
  UnknownImportErrorFormatter,
} from './formatting'
import chalk from 'chalk'

export class ErrorHandler {
  perform = async (error: Error): Promise<void> => {
    console.error(
      `${chalk.gray(error.stack)}\n\n${chalk.bold.underline.redBright(
        error.name,
      )}`,
    )

    if (error instanceof Tony.InternalError)
      await new InternalErrorFormatter().perform(error)
    else if (error instanceof Tony.SyntaxError)
      await new SyntaxErrorFormatter().perform(error)
    else if (error instanceof Tony.CyclicDependenciesError)
      await new CyclicDependenciesErrorFormatter().perform(error)
    else if (error instanceof Tony.DuplicateBindingError)
      await new DuplicateBindingErrorFormatter().perform(error)
    else if (error instanceof Tony.ExportOutsideModuleScopeError)
      await new ExportOutsideModuleScopeErrorFormatter().perform(error)
    else if (error instanceof Tony.ImportOutsideFileModuleScopeError)
      await new ImportOutsideFileModuleScopeErrorFormatter().perform(error)
    else if (error instanceof Tony.InvalidPropertyAccessError)
      await new InvalidPropertyAccessErrorFormatter().perform(error)
    else if (error instanceof Tony.MissingBindingError)
      return new MissingBindingErrorFormatter().perform(error)
    else if (error instanceof Tony.TypeError)
      return new TypeErrorFormatter().perform(error)
    else if (error instanceof Tony.UnknownImportError)
      await new UnknownImportErrorFormatter().perform(error)
    else console.error(error.message)
  }
}
