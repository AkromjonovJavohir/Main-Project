import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/logo.jpg";
import axios from "axios";
import Spinner from "../../components/Spinner";
import successMessage from "../../utils/notification/NotificationSuccess";
import Modal, { closeModal } from "../../components/modal/Modal";
import { openModal } from "../../components/modal/Modal";
import { useRef } from "react";
export default function Course() {
  const name = useRef()
  const img = useRef()
  const duration = useRef()
  const price = useRef()
  const description = useRef()
  const [course, setCourse] = useState([])
  const [loading, setLoading] = useState(true)
  const [dep, setDep] = useState(false)
 const [editData,setEditData] = useState(null)

  useEffect(() => {
    axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setCourse(res.data);
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
      .catch(error => console.log(error))
  }, [dep])


  const deleteCourse = (id) => {
    axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course/${id}`)
      .then(res => {
        setDep(!dep)
        successMessage("Course deleted")
      })
      .catch(error => console.log(error))
  }
  const createCourse = (e) => {
    e.preventDefault()
    let newCourse = {
      name: name.current.value,
      price: price.current.value,
      duration: duration.current.value,
      description: description.current.value,
      img: img.current.value
    }
    if(!editData){
          axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course", newCourse, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setDep(!dep)
      closeModal()
      e.target.reset()
      successMessage('Course created')
    })
    }
    else{
      axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/course/${editData}`, newCourse, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        setDep(!dep)
        closeModal()
        e.target.reset()
        successMessage('Course updated')
        setEditData(null)
      })
    }

  }
  const getAllCourse = (data) => {
    openModal()
    name.current.value = data.name
    price.current.value = data.price
    duration.current.value = data.duration
    description.current.value = data.description
    img.current.value = data.img
    setEditData(data.id)


  }
  const onChanges=()=>{
    openModal()
    setEditData(null)
  }
  return (
    <div>

      <div className="courses__title">
        <h1>Popular Courses</h1>
          <button className="open-modal" onClick={onChanges}>Add</button>
      </div>
      <div className="course_body">
        {
          loading ?
            <Spinner />
            :

            course.map(item =>
              <div className="courses__card1" key={item.id}>
                <div className="courses__card1__img">
                  <img src={item.img} alt="" />
                  <button>
                    <i className="bi bi-three-dots-vertical">
                      <ul className="card-menu">
                        <li><i className="bi bi-pencil-fill" onClick={() => getAllCourse(item)}></i></li>
                        <li><i className="bi bi-trash-fill" onClick={() => deleteCourse(item.id)}></i></li>
                      </ul>
                    </i></button>
                </div>
                <h1 className="courses__card1__title">{item.name}</h1>
                <p className="courses__card1__text">
                  Duration: <span className="duration">{item.duration} month</span>
                </p>
                <section className="courses__card1__text">
                  Price: <span className="price1">{item.price} UZS/Month</span>{" "}
                </section>

                <div className="courses__card1__text2">{item.description}</div>
              </div>)

        }


      </div>

      <Modal>
        <form onSubmit={createCourse}>
          <input ref={name} type="text" placeholder="Enter course's name" required />
          <input ref={img} type="text" placeholder="Enter course image URL" required />
          <input ref={price} type="text" placeholder="Enter course's price: USZ " required />
          <input ref={duration} type="text" placeholder="Enter course's duration: Month " required />
          <input ref={description} type="text" placeholder="Enter course's description" required />
         <button type="submit">{
          editData?'Updated':"Created"
         }</button>
        </form>
      </Modal>


    </div>
  );
}

