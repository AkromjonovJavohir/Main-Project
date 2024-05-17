import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import successMessage from "../../utils/notification/NotificationSuccess";
import Modal, { closeModal } from "../../components/modal/Modal";
import { openModal } from "../../components/modal/Modal";
import { useRef } from "react";
import { json } from "react-router-dom";

export default function Teacher() {
  const name = useRef()
  const phone = useRef()
  const course = useRef()
  const img = useRef()
  const [teacher, setTeacher] = useState([])
  const [loading, setLoading] = useState(true)
  const [editData, setData] = useState(null)
  const [dep, setDep] = useState(false) 
  const [cours , setCours] = useState([])
  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setTeacher(res.data);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
      .catch(error => console.log(error))
  }, [dep])
  useEffect(()=>{
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setCours(res.data);

      
    })
      .catch(error => console.log(error))
  },[])
  const deleteTeacher = (id) => {
    axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher/${id}`)
      .then(res => {
        setDep(!dep)
        successMessage("Teacher deleted")
      })
      .catch(error => console.log(error))
  }
  const createTeacher = (e) => {
    e.preventDefault()
    let newTeacher = {
      name: name.current.value,
      phone: phone.current.value,
      course: JSON.parse(course.current.value),
      img: img.current.value,
    }
    if (!editData) {
      axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", newTeacher, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        e.target.reset()
        closeModal()
        setDep(!dep)
        successMessage("Teacher created")
      })
    }
    else {
      axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher/${editData}`, newTeacher, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        e.target.reset()
        setDep(!dep)
        closeModal()
        successMessage('Teacher updated')
        setData(null)
      })
    }
  }
  const getAllTeacher = (data) => {
    openModal()
    name.current.value = data.name
    phone.current.value = data.phone
    img.current.value = data.img
    course.current.value = JSON.stringify(data.course)
    setData(data.id)
  }
  const onChanges=()=>{
    openModal()
    setData(null)
  }
  
  return (
    <div className="content">
      <div className="teacher">
        <div className="content-header">
          <h1 className="our-teacher">Our teachers</h1>
          <button className="open-modal" onClick={onChanges}>Add</button>
        </div>
        {
          loading ?
            <Spinner />
            :
            <table className="table-teacher">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Fullname</th>
                  <th>Profession</th>
                  <th>Phone Number</th>
                  <th>-/-</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {
                  teacher.map(item =>
                    <tr key={item.id}>
                      <td>
                        <div className="table-user-img">
                         <a href={item.img} >  <img width="80px" height="80px" src={item.img} alt="" /></a>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.course.name}</td>
                      <td>{item.phone}</td>
                      <td>
                        <div className="action-btns">
                      
                          <span className="remove-icon">
                            <i className="bi bi-trash3" onClick={() => deleteTeacher(item.id)}></i>
                          </span>
                          <span className="edit-icon">
                            <i className="bi bi-pen" onClick={() => getAllTeacher(item)}></i>
                          </span>
                        </div>
                      </td>
                    </tr>)
                }
              </tbody>
            </table>
        }
      </div>
      <Modal>
        <form onSubmit={createTeacher}>
          <input type="text" placeholder="Enter teacher's full name" ref={name} required />
          <input type="text" placeholder="Enter teacher's image's URL" ref={img} required />
          <select name="" id="" ref={course}>
          {
            cours.map(item=>
              <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>
            )
          }
          </select>
          <input type="text" placeholder="Enter teacher's phone" ref={phone} required />
          <button type="submit">
            {
              editData ? "Update" : "Create"
            }
          </button>
        </form>
      </Modal>
    </div>
  );
}
