import React from 'react'

const ExtraStats = () => {
  return (
    <section className='w-11/12 bg-white m-auto rounded-md'>
      <div>
        <h1 className='text-4xl pt-6 mb-10 pl-10'>Recent Performances</h1>
        <div className='flex justify-between w-5/6 m-auto'>
          <div>
          <img className='w-40' src="/vitality.png" alt="Vitality" />  {/* Replace with dynamic team image */}
          <h2 className='text-2xl text-center'>Zywoo</h2>
          </div>
          <div>
          <img className='w-40' src="/vitality.png" alt="Vitality" />  {/* Replace with dynamic team image */}
          <h2 className='text-2xl text-center'>Zywoo</h2>
          </div>
        </div>
        <img className='m-auto mt-10' src="/bar.png" alt="bar" /> {/* Replace with dynamic bar chart */}
      </div>

      <div>
        <h1 className='text-4xl pt-6 mb-10 pl-10'>Top Players by K/D Ratio</h1>
        <table className='m-auto border-2 border-black w-11/12'>
          <thead>
            <tr className='border-2'>
              <th>Player</th>
              <th>Teams</th>
              <th>Maps</th>
              <th>Rounds</th>
              <th>K-D Diff</th>
              <th>K/D</th>
              <th>Rating <br/> 1.0</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Zywoo</td>
              <td><img src="/vitality.png" alt="Vitality" width="18" height="18"></img></td>
              <td>1362</td>
              <td>35266</td>
              <td>+8321</td>
              <td>1.39</td>
              <td>1.27</td>
            </tr>
            <tr>
              <td>s1mple</td>
              <td><img src="/vitality.png" alt="Vitality" width="18" height="18"></img></td>
              <td>1734</td>
              <td>45907</td>
              <td>+9679</td>
              <td>1.33</td>
              <td>1.24</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExtraStats