#!/usr/bin/env node

const path = require('path')
const rimraf = require('rimraf')
const glob = require('glob')
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  {
    name: 'path',
    alias: 'p',
    type: String
  }
]
const options = commandLineArgs(optionDefinitions)
const targetApp = options.path

const { convertArticle } = require('./convertArticle')

// const baseSrcDir = path.resolve(process.cwd(), '/posts')

const baseSrcDir = path.resolve(process.cwd() + '/' + targetApp)

const globPath = path.resolve(baseSrcDir, 'markdown/**/**.md')

const mdFiles = glob.sync(globPath)
const exportDir = path.resolve(baseSrcDir, 'json')
const summaryFilePath = path.resolve(baseSrcDir, 'json', '_summary.json')
const fileMapFilePath = path.resolve(baseSrcDir, 'json', '_filemap.json')

rimraf.sync(exportDir)
convertArticle(mdFiles, exportDir, summaryFilePath, fileMapFilePath, targetApp)
