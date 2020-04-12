#!/usr/bin/env node

import CLI from './CLI'
import { VERSION } from 'tony-lang'
import commander from 'commander'

const cli = new CLI(commander)

commander.storeOptionsAsProperties(false).passCommandToAction(false)

commander
  .version(`Tony ${VERSION}`, '-v, --version')
  .option('-d, --debug', 'enable debug mode', false)

commander
  .command('run <file> [args...]')
  .description('Compile and execute a file')
  .option('-o, --out-file <path>', 'output file')
  .option(
    '--webpack-mode <mode>',
    'enable production optimizations or development hints\n' +
      '[choices: "development", "production", "none"]',
    'production',
  )
  .action(cli.run)

commander
  .command('compile <file>')
  .description('Compile a file to JavaScript')
  .option('-o, --out-file <path>', 'output file')
  .option('--no-emit', 'do not emit outputs')
  .option('--no-webpack', 'do not combine and minify outputs with Webpack')
  .option(
    '--webpack-mode <mode>',
    'enable production optimizations or development hints\n' +
      '[choices: "development", "production", "none"]',
    'production',
  )
  .action(cli.compile)

commander
  .command('exec <file> [args...]')
  .description('Execute compiled source of a project')
  .action(cli.exec)

commander
  .command('parse <file>')
  .description('Print the abstract syntax tree of a file')
  .action(cli.parse)

commander.parseAsync(process.argv)
