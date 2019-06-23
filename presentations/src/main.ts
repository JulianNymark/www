import * as fs from 'fs'
import * as path from 'path'
import * as Markdown from 'markdown-it'
//@ts-ignore
import * as abbr from 'markdown-it-abbr'
//@ts-ignore
import * as defList from 'markdown-it-deflist'
//@ts-ignore
// import * as anchor from 'markdown-it-anchor'
//@ts-ignore
import * as footnote from 'markdown-it-footnote'
//@ts-ignore
import * as sub from 'markdown-it-sub'
//@ts-ignore
import * as sup from 'markdown-it-sup'
//@ts-ignore
import * as revealjs from 'markdown-it-revealjs'
//@ts-ignore
import * as checkbox from 'markdown-it-checkbox';
//@ts-ignore
import * as mermaid from 'markdown-it-mermaid';
import hljs from 'highlight.js'

enum theme {
    BEIGE = "beige",
    BLACK = "black",
    BLOOD = "blood",
    LEAGUE = "league",
    MOON = "moon",
    NIGHT = "night",
    SERIF = "serif",
    SIMPLE = "simple",
    SKY = "sky",
    SOLARIZED = "solarized",
    WHITE = "white",
}

const selectedTheme = theme.LEAGUE;

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
/* markdown.use(anchor.default, {
    level: 1,
    permalink: true,
    permalinkBefore: false
});
 */
markdown.use(footnote.default);
markdown.use(sup.default);
markdown.use(sub.default);
markdown.use(revealjs.default);
markdown.use(checkbox.default);
markdown.use(mermaid.default);

const markdownToHTML = (filepath: string): string => {
    const filetext = fs.readFileSync(filepath);
    return markdown.render(filetext.toString());
}

/*
        <link rel="stylesheet" href="css/bootstrap.css">
*/

const templateDocument = (inputHTML: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>Presentation</title>

        <link rel="stylesheet" href="css/reveal.css">
		<link rel="stylesheet" href="css/theme/${selectedTheme}.css">

        <link rel="stylesheet" href="css/monokai.css">

        <link rel="stylesheet" href="css/mermaid.css">
        <link rel="stylesheet" href="css/fa-all.css">

        <link rel="stylesheet" href="css/custom.css">
	</head>
    <body>
        ${inputHTML}
		<script src="js/reveal.js"></script>
		<script>
			Reveal.initialize();
        </script>

        <script src="js/mermaid.min.js"></script>
        <script>
            mermaid.initialize({
                startOnLoad:false
            });
            mermaidAPI.initialize({
                startOnLoad:false
            });
        </script>

        <script>
            Reveal.addEventListener( 'slidechanged', function( event ) {
                // event.previousSlide, event.currentSlide, event.indexh, event.indexv
                // mermaid.init();
                // Example of using the API
                var element = document.querySelector(".mermaid");

                var insertSvg = function(svgCode, bindFunctions){
                    element.innerHTML = svgCode;
                };

                var graphDefinition = element.innerText;
                var graph = mermaidAPI.render('graphDiv', graphDefinition, insertSvg);
            } );
        </script>
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
