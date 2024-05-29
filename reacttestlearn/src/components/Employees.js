import { useEffect, useState } from 'react'



const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('/employees.json')
    .then(response => response.json())
    .then(employeeData => setEmployeeData(employeeData))
    .catch(error =>console.error("fetching data",error))
  },[])
  return (
    <div>
      <h1>Employee Table</h1>
      <table className='customTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(data => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{ data.name }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Employees