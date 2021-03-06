import * as fs from 'fs'
import * as path from 'path'
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
//@ts-ignore
import * as checkbox from 'markdown-it-checkbox';
//@ts-ignore
import emoji from 'markdown-it-emoji';
import hljs from 'highlight.js'

//@ts-ignore
const markdown = new Markdown.default({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: '',
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
    },
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
markdown.use(checkbox.default);
markdown.use(emoji);

const markdownToHTML = (filepath: string): string => {
    const filetext = fs.readFileSync(filepath);
    return markdown.render(filetext.toString());
}

const templateDocument = (inputHTML: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Cool stuff!</title>

        <style>html{visibility:hidden;opacity:0;}</style>
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/monokai.css">
        <link rel="stylesheet" href="css/mermaid.css">
        <link rel="stylesheet" href="css/fa-all.css">
        <link rel="stylesheet" href="css/custom.css">
        <link rel="stylesheet" href="css/htmlvisible.css">
    </head>
    
    <body>
    ${inputHTML}
        <script src="js/mermaid.min.js"></script>
        <script>mermaid.initialize({startOnLoad:true});</script>
    </body>
    </html>
    `;
}

fs.mkdirSync('./build/gen_md2html', { recursive: true })

fs.readdir('./src/markdown/', (err, files) => {
    files.forEach(fileOrig => {
        const file = path.basename(fileOrig, '.md');
        console.log('FILE: ', file, ' .md');
        const renderedHTML = markdownToHTML(`./src/markdown/${fileOrig}`);
        const outputHTML = templateDocument(renderedHTML);
        fs.writeFileSync(`./build/gen_md2html/${file}.html`, outputHTML);
    });
});
