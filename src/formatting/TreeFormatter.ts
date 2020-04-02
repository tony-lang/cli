import chalk from 'chalk'
import Parser from 'tree-sitter'

const INDENT = '  '

export class TreeFormatter {
  perform = (node: Parser.SyntaxNode, depth = 0): string => {
    const children = node.namedChildren
      .map(child => this.perform(child, depth + 1))
    const combinedChildren =
      children.length > 0 ? `\n${children.join('\n')}` : ''

    return `${this.printDepth(depth)}${chalk.black('(')}${this.printNode(node)}` +
           `${combinedChildren}${chalk.black(')')}`
  }

  private printNode = (node: Parser.SyntaxNode): string => {
    const type = node.hasError() || node.isMissing() ?
      chalk.bold.redBright(node.type) : node.type
    const position = chalk.gray(
      `[${node.startPosition.row}, ${node.startPosition.column}] - ` +
      `[${node.endPosition.row}, ${node.endPosition.column}]`
    )

    return `${type} ${position}`
  }

  private printDepth = (depth: number): string => INDENT.repeat(depth)
}
