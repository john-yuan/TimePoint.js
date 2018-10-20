const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const fse = require('fs-extra')

const ROOT = path.resolve(__dirname, '../..')
const srcPath = path.resolve(ROOT, 'src/TimePoint.js')
const code = fs.readFileSync(srcPath).toString()

const es6Path = path.resolve(ROOT, 'dev-tools/builder/templates/es6.ejs')
const es6Template = fs.readFileSync(es6Path).toString()

const es6Code = ejs.render(es6Template, { code })
const es6Dist = path.resolve(ROOT, 'dist/es6/TimePoint.js')

fse.outputFileSync(es6Dist, es6Code);

const cmdPath = path.resolve(ROOT, 'dev-tools/builder/templates/cmd.ejs')
const cmdTemplate = fs.readFileSync(cmdPath).toString()

const cmdCode = ejs.render(cmdTemplate, { code })
const cmdDist = path.resolve(ROOT, 'dist/cmd/TimePoint.js')

fse.outputFileSync(cmdDist, cmdCode);

const umdPath = path.resolve(ROOT, 'dev-tools/builder/templates/umd.ejs')
const umdTemplate = fs.readFileSync(umdPath).toString()

const umdCode = ejs.render(umdTemplate, { code })
const umdDist = path.resolve(ROOT, 'dist/umd/TimePoint.js')

fse.outputFileSync(umdDist, umdCode);