import React from 'react'
import logo1 from '../images/hinanna.jpeg'
import logo2 from'../images/devara.jpeg'
import logo3 from '../images/gunrurkaram.jpeg'
import logo4 from '../images/veerasimha.jpg'
import './Admin.css'
export default function AdminHome() {
  return (
    <div className="main_content">
      
    <div className="info">
      

    <h1 align="center">Feel The Taste Of Music</h1>
    <br/>
    <table>
    
      <td><div className="card">
                <img src={logo1} alt='imaf'/>
                <h3>HiNanna</h3>
                <button className='abutton'>Play</button>
            </div></td>
            <td><div className="card">
                <img src={logo2 }alt='imafr'/>
                <h3>Devara: Part 1</h3>
                <button className='abutton'>Play</button>
            </div></td>
            <td><div className="card">
                <img src={logo3}alt='imafr'/>
                <h3>Guntur Karam</h3>
                <button className='abutton'>Play</button>
            </div></td>
            <td><div className="card">
                <img src={logo4}alt='imafr'/>
                <h3>Veera Simha Reddy</h3>
                <button className='abutton'>Play</button>
            </div></td>
            
    </table>
            
          
      
  </div>
  
</div>
  )
}
