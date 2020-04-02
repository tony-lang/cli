# Tony CLI

[**Documentation**](https://tony-lang.github.io/docs/cli/install)

## Development

Listen to changes and make them accessible through `tony` from the command line:

    $ yarn start

Run ESLint:

    $ yarn eslint

Run TypeScript compiler checks:

    $ yarn tsc

## Release

1. Change the version in `package.json`.
2. Create a pull request to merge the changes into `master`.
3. After the pull request was merged, create a new release listing the breaking changes and commits on `master` since the last release.
4. The release workflow will publish the package to NPM and GPR.
