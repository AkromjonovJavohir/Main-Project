import React from 'react'
import park from '../../assets/img/itpark.jpg'


export default function Home() {
  function updateTime() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let timeString = hours + ":" + minutes + ":" + seconds;
    return (<p>{timeString}</p>)
  }
  setInterval(updateTime, 1000);

  
  return (
    <>
      <div className="navbar-home">
        <div className="navbar-home-left">
          <h1>Hello , Ibrohim!</h1>
          <span>Hape you have a good day</span>
        </div>
        <div className="navbar-home-right">
          <p>
            {/* {updateTime()} Uzbekistan,Tashkent */}
          </p>
        </div>
      </div>

      <div className="home-content">
        <div className="home-leftcha">
          <div className="home-content-left">
            <div className="home-col c1">
              <i className="bi bi-people"></i>
              <div className="col-ali">
                <h5>Total Students</h5>
                <span>450</span>
              </div>
            </div>
            <div className="home-col c2">
              <i className="bi bi-person"></i>
              <div className="col-ali">
                <h5>New Students</h5>
                <span>50</span>
              </div>
            </div>
            <div className="home-col course c3">
              <i className="bi bi-layers"></i>
              <div className="col-ali">
                <h5>All Courses</h5>
                <span>80</span>
              </div>
            </div>
            <div className="home-col c4">
              <i className="bi bi-currency-dollar"></i>
              <div className="col-ali">
                <h5>Total Earnings</h5>
                <span>450$</span>
              </div>
            </div>

          </div>
          <div className="home-page-content">
            <div className="home-page-left">
              <h1>Our groups</h1>
              <div className="border">
                <div className="analik">


                </div>
              </div>
            </div>
            <div className="home-page-right">
              {/* <h1>Our groups</h1> */}
              <img src={park} alt="" className='home-img' />
            </div>
          </div>
        </div>
        <div className="home-col-3">
          <div className="date">
            <div className="month">апрель 2024 г.</div>
            <table className='home-table'>
              <thead>
                <tr className='home-tr'>
                  <th className='home-th'>ПН</th>
                  <th className='home-th'>ВТ</th>
                  <th className='home-th'>СР</th>
                  <th className='home-th'>ЧТ</th>
                  <th className='home-th'>ПТ</th>
                  <th className='home-th'>СБ</th>
                  <th className='home-th'>ВС</th>
                </tr>
              </thead>
              <tbody>
                <tr className='home-tr'>
                  <td className='home-th'>1</td>
                  <td className='home-th'>2</td>
                  <td className='home-th'>3</td>
                  <td className='home-th'>4</td>
                  <td className='home-th'>5</td>
                  <td className='home-th'>6</td>
                  <td className='home-th'>7</td>
                </tr>
                <tr className='home-tr'>
                  <td className='home-th'>8</td>
                  <td className='home-th'>9</td>
                  <td className='home-th'>10</td>
                  <td className='home-th'>11</td>
                  <td className='home-th'>12</td>
                  <td className='home-th'>13</td>
                  <td className='home-th'>14</td>
                </tr>
                <tr className='home-tr'>
                  <td className='home-th'>15</td>
                  <td className='home-th'>16</td>
                  <td className='home-th'>17</td>
                  <td className='home-th'>18</td>
                  <td className='home-th'>19</td>
                  <td className='home-th'>20</td>
                  <td className='home-th'>21</td>
                </tr>
                <tr className='home-tr'>
                  <td className='home-th'>22</td>
                  <td className='home-th'>23</td>
                  <td className='home-th'>24</td>
                  <td className='home-th'>25</td>
                  <td className='home-th'>26</td>
                  <td className='home-th'>27</td>
                  <td className='home-th'>28</td>
                </tr>
                <tr className='home-tr'>
                  <td className='home-th'>29</td>
                  <td className='home-th'>30</td>
                  <td className='home-th'>1</td>
                  <td className='home-th'>2</td>
                  <td className='home-th'>3</td>
                  <td className='home-th'>4</td>
                  <td className='home-th'>5</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className="best-teachers">
              <div className="b-head">
                <span>Best teachers</span>
                <a href="#">See all</a>
              </div>
              <div className="b-body">
                <div className="tr">
                  <span>Alishercha Alisherov</span>
                  <span>Frontend <i className="bi bi-telephone-fill"></i></span>
                </div>
                <div className="tr">
                  <span>Alishercha Alisherov</span>
                  <span>Frontend <i className="bi bi-telephone-fill"></i></span>
                </div>
                <div className="tr">
                  <span>Alishercha Alisherov</span>
                  <span>Frontend <i className="bi bi-telephone-fill"></i></span>
                </div>
              </div>
            </div>
            <button className='join'>Join To Courses</button>
          </div>
      </div >



    </>
  )
}
