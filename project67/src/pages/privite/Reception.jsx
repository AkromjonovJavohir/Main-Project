import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import successMessage from '../../utils/notification/NotificationSuccess'
export default function Reception() {
  const [dep, setDep] = useState(false)
  const [reception, setReception] = useState([])
  const [cours, setCours] = useState([])
  const name = useRef()
  const phone = useRef()
  const course = useRef()
  const [editData, setData] = useState(null)

  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {

        setReception(res.data)
      }
      )
      .catch(error => console.log(error))
  }, [dep])
  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setCours(res.data);


    })
      .catch(error => console.log(error))
  }, [])
  const deleteStudent = (id) => {
    axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception/${id}`)
      .then(res => {
        setDep(!dep)
        successMessage("Student deleted")
      })
      .catch(error => console.log(error))
  }

  const Student = (e) => {
    e.preventDefault()
    let newStudent = {
      name: name.current.value,
      phone: phone.current.value,
      course:JSON.parse(course.current.value)
    }

    if(!editData){
      axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception", newStudent, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      e.target.reset()
      setDep(!dep)
      successMessage("Student created")
    })
    }
    else{
      axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception/${editData}`, newStudent, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        e.target.reset()
        setDep(!dep)
        successMessage('Teacher updated')
        setData(null)
      })
    }
  }



  const getStudents = (data) => {
    name.current.value = data.name
    phone.current.value = data.phone
    course.current.value = JSON.stringify(data.course)
    

    setData(data.id)
    
  }
  return (
    <div className="content">
      <h1 className="reception-h1">Reception</h1>
      <div className="reception-form">
        <form  className='Student' onSubmit={Student}>
          <input type="text" placeholder="Enter Name" className="name" ref={name} required/>
          <input type="number" placeholder="Enter Phone" className="surname" ref={phone} required/>
          <select name="select" id="" className="course" ref={course}>

            {
              cours.map(item =>
                <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>
              )
            }
          </select>
<button className="reception-btn"  type='submit'>{
  editData?"Update":"ADD"
}</button>
        </form>
        

      </div>
      <div className="reception-table-content">
        <table className="reception-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Course </th>
              <th>-/-</th>
            </tr>
          </thead>
          <tbody className="reception-tbody ">


            {
              reception.map(item =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td className="reception-div">
                    <img className='course-logo' src={item.course?.img} alt="" />
                    {item.course?.name}
                  </td>
                  <td>
                    <div className="reception-delete">
                      <div className="reception-delet">
                        <i className="bi bi-trash3" onClick={() => deleteStudent(item.id)}></i>
                      </div>
                      <div className="recept  ion-edit" onClick={() => getStudents(item)}>
                        <i className="bi bi-pen"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>







  )
}
