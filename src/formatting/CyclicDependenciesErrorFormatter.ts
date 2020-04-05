import { CyclicDependenciesError } from 'tony-lang'
import { SourceFormatter } from './SourceFormatter'
import chalk from 'chalk'

export class CyclicDependenciesErrorFormatter {
  perform = async (error: CyclicDependenciesError): Promise<void> => {
    console.error(
      `Encountered a closed dependency cycle. ${chalk.bold.whiteBright(
        error.cycilcDependency[0],
      )} depends on ${chalk.bold.whiteBright(
        error.cycilcDependency[1],
      )} and vice versa.`,
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
