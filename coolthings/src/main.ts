import * as fs from 'fs'
import * as Markdown from 'markdown-it'
//@ts-ignore
import * as abbr from 'markdown-it-abbr'
//@ts-ignore
import * as defList from 'markdown-it-deflist'
//@ts-ignore
import * as anchor from 'markdown-it-anchor'
//@ts-ignore
import * as footnote from 'markdown-it-footnote'
//@ts-ignore
import * as sub from 'markdown-it-sub'
//@ts-ignore
import * as sup from 'markdown-it-sup'

const markdown = new Markdown.default({
    html: true,
    linkify: true,
    typographer: true,
});

markdown.use(abbr.default);
markdown.use(defList.default);
markdown.use(anchor.default, {
    level: 1,
    permalink: true,
    permalinkBefore: false
});
markdown.use(footnote.default);
markdown.use(sup.default);
markdown.use(sub.default);

const bootstrapCSS = fs.readFileSync('./src/css/bootstrap.css');
const customCSS = fs.readFileSync('./src/css/custom.css');

const markdownToHTML = (filepath: string): string => {
    const filetext = fs.readFileSync(filepath);
    return markdown.render(filetext.toString());
}

const renderedHTML = markdownToHTML('./src/markdown/index.md');

const outputHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cool stuff!</title>
    <style>${bootstrapCSS}</style>
    <style>${customCSS}</style>
</head>

<body>
${renderedHTML}
</body>

</html>
`;

fs.writeFileSync('./build/gen_md2html/index.html', outputHtml);