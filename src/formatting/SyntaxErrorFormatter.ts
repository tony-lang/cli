import { SyntaxError } from 'tony-lang'
import chalk from 'chalk'
import a from 'indefinite'
import Parser from 'tree-sitter'

import { SourceFormatter } from './SourceFormatter'
import { TreeFormatter } from './TreeFormatter'

export class SyntaxErrorFormatter {
  perform = async (error: SyntaxError): Promise<void> => {
    const erroneousNode = this.findErronousNode(error.tree.rootNode)

    console.error(
      `An error occured in line ${erroneousNode.startPosition.row + 1} at ` +
      `position ${erroneousNode.startPosition.column + 1} while parsing ` +
      `${chalk.whiteBright(error.filePath)}.`
    )

    console.error(
      'Here is an the relevant segment of the abstract syntax tree:\n'
    )
    if (erroneousNode !== error.tree.rootNode) console.error('⋮')
    console.error(new TreeFormatter().perform(erroneousNode))
    if (erroneousNode !== error.tree.rootNode) console.error('⋮')

    console.error('\nThis is where the error occured:\n')
    await new SourceFormatter().perform(
      error.filePath,
      erroneousNode.startPosition,
      erroneousNode.endPosition
    )
    console.error()

    if (erroneousNode.type !== 'ERROR') {
      console.error(
        `It looks as though you tried to use ${a(erroneousNode.type)}.\n` +
        'Reference: https://tony-lang.github.io/docs/reference/syntax' +
        `#${erroneousNode.type}`
      )
    }
  }

  findErronousNode = (node: Parser.SyntaxNode): Parser.SyntaxNode => {
    const erroneousChildren = node.namedChildren
      .filter(child => child.hasError())

    if (erroneousChildren.length > 0)
      return this.findErronousNode(erroneousChildren[0])
    else return node
  }
}
