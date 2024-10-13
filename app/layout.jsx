import Navbar from '@components/Navbar'
import '@styles/global.css'
import Provider from '@components/Provider'
import Footer from '@components/Footer'

export const metadata = {
  title: 'SmartAppAI',
  description: 'Explore AI prompts and share them'
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Navbar />
            {children}
            <Footer/>
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default Rootlayout