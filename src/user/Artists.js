
import React from 'react'
import './artist.css'
import logo1 from '../images/anirudh.jpg'
import logo2 from '../images/melodrama.jpeg'
import logo3 from '../images/Thriller.jpg'

export default function Artists() {
  return (
    <div className="main_content">
      
    <div className="info">
      

    <h1 align="center">Feel The Taste Of Music</h1>
    <br/>
    <table>
    
      <td className='art'><div className="acard">
                <img className='artist' src={logo1} alt='imaf'/>
                <h3>Anirudh</h3>
                <button className='home'>Play</button>
            </div></td>
            <td className='art'><div className="acard">
                <img className='artist' src={logo2 }alt='imafr'/>
                <h3>Melodrama</h3>
                <button className='home'>Play</button>
            </div></td>
            <td className='art'><div className="acard">
                <img className='artist' src={logo3}alt='imafr'/>
                <h3>Thriller</h3>
                <button className='home'>Play</button>
            </div></td>
            
    </table>
            
          
      
  </div>
  
  
</div>
  )
}
