const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const metadata = require('../package.json');
const snippets = require('../generated/snippets.json');
const dedent = require('dedent');
const dedentHelper = require('hbs-dedent-helper');

dedentHelper.register();

const template = fs.readFileSync(path.join(__dirname, './templates/README.md.hbs')).toString();
const compiled = Handlebars.compile(template, {noEscape: true});

const quoteLineRegex = /^('|"|`)$/;

const extractQuoted = (str) => {
    const lines = str.split('\n');
    let boundTop = 0;
    let boundBottom = lines.length;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.match(quoteLineRegex) || line.length === 0) {
            boundTop++;
        } else break;
    }
    for (let i = lines.length; i > 0; i--) {
        const line = lines[i-1].trim();
        if (line.match(quoteLineRegex) || line.length === 0) {
            boundBottom--;
        } else break;
    }
    return dedent(lines.slice(boundTop, boundBottom).join('\n')).replace(/\\\\\"/g, '"');
};

const stripLeadingComments = (str) =>
    dedent(str.split('\n')
      .map(l => l.replace(/^\s*\/\//, ''))
      .join('\n'));

fs.writeFileSync(path.join(__dirname, '../README.md'), compiled({
    name: metadata.name,
    description: metadata.description,
    dataSource: snippets['example-data'].content,
    exampleSnippets: [
        'jp-get',
        'jp-get-in',
        'jp-descend',
        'jp-descend-in'
    ].map((name) => ({
        name,
        description: stripLeadingComments(snippets[`${name}-info`].content),
        template: extractQuoted(snippets[`${name}-example`].content),
        result: extractQuoted(snippets[`${name}-example-result`].content)
    }))
}));
