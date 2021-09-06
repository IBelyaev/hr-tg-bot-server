import React from 'react';

type Props = {
    scriptNames: string[];
    styleNames: string[];
    children: string;
};

const AppHtml = React.memo(({ children, scriptNames, styleNames }: Props) => {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <title>Скрининги</title>
                { styleNames.map((link) => <link rel="stylesheet" href={ link } key={ link } />) }
            </head>
            <body>
                <div id='react-container' dangerouslySetInnerHTML={{ __html: children}}/>
                <div id='root-modal'></div>
            </body>
            { scriptNames.map(name => <script key={name} src={name} />) }
        </html>
    )
});

export default AppHtml;