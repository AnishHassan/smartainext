import '@styles/global.css'

export const metadata = {
    title : 'SmartAppAI',
    description : 'Explore AI prompts and share them'
}

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
    <body>
        <div className='main'>
            <div className='gradient'/>
        </div>

        <main className='app'>
           {children}
        </main>
    </body>
    </html>
  )
}

export default Rootlayout