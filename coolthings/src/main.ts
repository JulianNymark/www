import * as fs from 'fs'
import * as Markdown from 'markdown-it'

const markdown = new Markdown.default({
    html: true,
    linkify: true,
    typographer: true,
});

const bootstrapCSS = fs.readFileSync('./src/bootstrap.css');

const convertFile = (filepath: string): string => {
    const filetext = fs.readFileSync(filepath);
    return markdown.render(filetext.toString());
}

const markdownHTML = convertFile('./src/markdown/index.md');

const customCSS = `
html {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
}
body {
    flex: 1;
    min-width: 600px;
    max-width: 800px;
}
`;

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
${markdownHTML}
</body>

</html>
`;

fs.writeFileSync('./build/index.html', outputHtml);