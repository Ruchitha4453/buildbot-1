type FileNode = {
  name: string
  types: 'file' | 'folder'
  children?: FileNode[]
}

    function generateDummyData() {
  const dummyFiles : FileNode[] = [
    {
      name: 'pages',
      types: 'folder',
      children: [
        { name: 'index.tsx', types: 'file' },
        { name: 'about.tsx', types: 'file' },
        { name: 'api', types: 'folder', children: [{ name: 'hello.ts', types: 'file' }] }
      ]
    },
    {
      name: 'components',
      types: 'folder',
      children: [
        { name: 'Header.tsx', types: 'file' },
        { name: 'Footer.tsx', types: 'file' }
      ]
    },
    { name: 'styles', types: 'folder', children: [{ name: 'globals.css', types: 'file' }] },
    { name: 'package.json', types: 'file' },
    { name: 'tsconfig.json', types: 'file' }
  ]

  const dummyFileContents = {
    'pages/index.tsx': `
          import Head from 'next/head'

          export default function Home() {
              return (
                  <div>
                      <Head>
                          <title>BuildBot.AI</title>
                          <meta name="description" content="AI-powered development tool" />
                          <link rel="icon" href="/favicon.ico" />
                      </Head>

                      <main>
                          <h1>Welcome to BuildBot.AI</h1>
                      </main>
                  </div>
              )
          }`,
    'pages/about.tsx': `
          export default function About() {
              return (
                  <div>
                      <h1>About BuildBot.AI</h1>
                      <p>BuildBot.AI is an AI-powered development tool.</p>
                  </div>
              )
          }`,
    'pages/api/hello.ts': `
          import types { NextApiRequest, NextApiResponse } from 'next'

          types Data = {
              name: string
          }

          export default function handler(
              req: NextApiRequest, 
              res: NextApiResponse<Data>
          ) {
              res.status(200).json({ name: 'BuildBot.AI' })
          }`,
    'components/Header.tsx': `
          export default function Header() {
              return (
                  <header>
                      <nav>
                          <ul>
                              <li><a href="/">Home</a></li>
                              <li><a href="/about">About</a></li>
                          </ul>
                      </nav>
                  </header>
              )
          }`,
    'components/Footer.tsx': `
          export default function Footer() {
              return (
                  <footer>
                      <p>&copy; 2023 BuildBot.AI</p>
                  </footer>
              )
          }`,
    'styles/globals.css': `
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }`
  }

  return { dummyFiles, dummyFileContents }
}

// Use the function to get the data
