import { ExportOutsideModuleScopeError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'

export class ExportOutsideModuleScopeErrorFormatter {
  perform = async (error: ExportOutsideModuleScopeError): Promise<void> => {
    console.error('Export expressions may only be used within module scopes.')

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
