import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div>

      <div><Navbar /></div>

      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title">Card title</h5>
            <p className="card-text">Important Text</p>
            <div className='container w-100'>
              {/* select : dropdown options for select quantity */}
              <select className='m-2 h-100 bg-success rounded'>
                {Array.from(Array(6), (e, i) => {        //arrow function return html element
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  )
                })}
              </select>
              {/* select : for other food options : half or full */}
              <select className="m-2 h-100 bg-success rounded">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>

              <div className='d-inline h-100 fs-5'>Total</div>

            </div>

          </div>
        </div>
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home