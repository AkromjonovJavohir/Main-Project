
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Spinner from "../../components/Spinner";
import successMessage from "../../utils/notification/NotificationSuccess";
import Modal, { closeModal } from "../../components/modal/Modal";
import { openModal } from "../../components/modal/Modal";
import { useRef } from "react";
import Students from './Students';
import { Link } from 'react-router-dom';
export default function Group() {
  const course = useRef()
  const teacher = useRef()
  const name = useRef()
  const duration = useRef()
  const [group, setGroup] = useState([])
  const [loading, setLoading] = useState(true)
  const [dep, setDep] = useState(false)
  const [editData, setEditData] = useState(null)
  const [cours, setCours] = useState([])
  const [teachere, setTeachere] = useState([])

  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setGroup(res.data);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
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
  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/teacher", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setTeachere(res.data);
    })
      .catch(error => console.log(error))
  }, [])

  const createGroup = (e) => {
    e.preventDefault()
    let newGroup = {
      name: name.current.value,
      course: JSON.parse(course.current.value),
      teacher: JSON.parse(teacher.current.value),
      duration: duration.current.value,
    }
    if (!editData) {
      axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group", newGroup, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        setDep(!dep)
        closeModal()
        e.target.reset()
        successMessage('Group created')
      })
    }
    else {
      axios.put(`https:65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${editData}`, newGroup, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        setDep(!dep)
        closeModal()
        e.target.reset()
        successMessage('Group updated')
        setEditData(null)

      })
    }

  }

  const getGroup = (data) => {
    openModal()
    name.current.value = data.name
    course.current.value = JSON.stringify(data.course)
    teacher.current.value = JSON.stringify(data.teacher)
    duration.current.value = data.duration
    setEditData(data.id)


  }



  const deleteGroup = (id) => {
    axios.delete(`https:65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${id}`)
      .then(res => {
        setDep(!dep)
        successMessage("Group deleted")
      })
      .catch(error => console.log(error))
  }



  return (
    <div>
      <div className="content">
        <div className="groups__header">
          <h2 className="groups__header__title">Our Groups</h2>
          <button className="open-modal gruops__header__btn" onClick={openModal}>Add</button>
        </div>
        {
          loading ?
            <Spinner />
            :
            <div className="groups__table">
              <table>
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Duration</th>
                    <th>-/-</th>
                  </tr>
                </thead>
                <tbody className="tbody">


                  {group.map(item => <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.course.name}</td>
                    <td>{item.teacher.name}</td>
                    <td>{item.duration}</td>
                    <td className="groups__btns">
                      <li><Link to={`/add-student/${item.id}`}><i className="bi bi-person-fill-add" ></i></Link></li>
                      <li><i className="bi bi-pencil-fill delete__icon" onClick={() => getGroup(item)}></i></li>
                      <li><i className="bi bi-trash-fill edit__icon" onClick={() => deleteGroup(item.id)}></i></li>
                    </td>
                  </tr>)
                  }
                </tbody>
              </table>
            </div>
        }

        <Modal>
          <form onSubmit={createGroup}>
            <input ref={name} type="text" placeholder="Enter group name" required />
            <select name="" id="" ref={course}>
              {
                cours.map(item =>
                  <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>
                )
              }
            </select>
            <select name="" id="" ref={teacher}>
              {
                teachere.map(item =>
                  <option value={JSON.stringify(item)} key={item.id}>{item.name}</option>
                )
              }
            </select>
            <input ref={duration} type="text" placeholder="Enter duration  " required />
            <button type="submit">{
              editData ? 'Updated' : "Created"
            }</button>
          </form>
        </Modal>


      </div>
    </div>
  );
}
