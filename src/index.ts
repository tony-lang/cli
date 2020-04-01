#!/usr/bin/env node

import commander from 'commander'
import { VERSION } from 'tony-lang'

import CLI from './CLI'

const cli = new CLI()

commander
  .version(`Tony ${VERSION}`, '-v, --version')
  .option('-d, --debug', 'enable debug mode', false)

commander
  .command('run [project] [args...]')
  .description('Run a project')
  .option('-o, --out-file <path>', 'output file')
  .option(
    '--webpack-mode <mode>',
    'enable production optimizations or development hints\n' +
      '[choices: "development", "production", "none"]',
    'production'
  )
  .action(cli.run)

commander
  .command('compile [project]')
  .description('Compile a project to JavaScript')
  .option('-o, --out-file <path>', 'output file')
  .option(
    '--webpack-mode <mode>',
    'enable production optimizations or development hints\n' +
      '[choices: "development", "production", "none"]',
    'production'
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

commander
  .parse(process.argv)

if (commander.debug) cli.enableDebugMode()
