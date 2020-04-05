import { ImportOutsideFileModuleScopeError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'

export class ImportOutsideFileModuleScopeErrorFormatter {
  perform = async (error: ImportOutsideFileModuleScopeError): Promise<void> => {
    console.error(
      'Import expressions may only be used within file-level module scopes.',
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
