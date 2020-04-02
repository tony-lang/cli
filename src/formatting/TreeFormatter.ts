import Parser from 'tree-sitter'
import chalk from 'chalk'

const INDENT = Object.freeze('  ')

export class TreeFormatter {
  perform = (node: Parser.SyntaxNode, depth = 0): string => {
    const children = node.namedChildren.map((child) =>
      this.perform(child, depth + 1),
    )
    const combinedChildren =
      children.length > 0 ? `\n${children.join('\n')}` : ''

    return (
      `${this.depthToString(depth)}${chalk.black('(')}` +
      `${this.nodeToString(node)}${combinedChildren}${chalk.black(')')}`
    )
  }

  private nodeToString = (node: Parser.SyntaxNode): string => {
    const type =
      node.hasError() || node.isMissing()
        ? chalk.bold.redBright(node.type)
        : node.type
    const position = chalk.gray(
      `[${node.startPosition.row}, ${node.startPosition.column}] - ` +
        `[${node.endPosition.row}, ${node.endPosition.column}]`,
    )

    return `${type} ${position}`
  }

  private depthToString = (depth: number): string => INDENT.repeat(depth)
}
