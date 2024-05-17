import React, { useEffect, useState } from 'react'
import axios from "axios";
import successMessage from "../../utils/notification/NotificationSuccess";
import Modal, { closeModal, openModal } from "../../components/modal/Modal";
import Spinner from '../../components/Spinner'
import { useRef } from "react";
import { useContext } from 'react';
import { NotificationContext } from '../../context/count';

export default function News() {
  const [notificationCount, setNotificationCount] = useContext(NotificationContext)
  const title = useRef()
  const date = useRef()
  const [editData, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([])
  const [dep, setDep] = useState(false)
  useEffect(() => {
    
    setInterval(() => {
      axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/news", {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        let d = res.data.filter(item => item.active===false)
        setNotificationCount(d.length)
        setNews(res.data);setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
        .catch(error => console.log(error))
      
    }, 3000);

  }, [dep])
  const deleteNews = (id) => {
    axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/news/${id}`)
      .then(res => {
        setDep(!dep)
        successMessage("News deleted")
      })
      .catch(error => console.log(error))
  }
  const createNews = (e) => {
    e.preventDefault()
    let newNews = {
      title: title.current.value,
      date: date.current.value
    }
    !editData ?
      axios.post("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/news", newNews, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        e.target.reset()
        closeModal()
        setDep(!dep)
        successMessage("News created")
      })
      :
      axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/news/${editData}`, newNews, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        setDep(!dep)
        closeModal()
        e.target.reset()
        successMessage('News updated')
        setData(null)
      })
  }
  const getAllNews = (data) => {
    openModal()
    title.current.value = data.title
    date.current.value = data.date
    setData(data.id)
  }
  const onChanges = () => {
    openModal()
    title.current.value = ""
    date.current.value = ""
    setData(null)
  }
  const checkRead = (item) => {
    item.active = true
    axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/news/${item.id}`, item, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then( res => {
      setDep(!dep)
    }
      
    )

}
return (
  <div>
    <div className="news-head">
      <h1>News</h1>
      <button onClick={onChanges}>Add</button>
    </div>
    {
      loading ?
        <Spinner />
        :
        <div className="news-body">
          {
            news.map(item =>
              <div className="news-alert" key={item.id}>
                <div className="news-alert-left">
                  <div className="news-alert-title">
                    {item.title}
                  </div>
                  <div className="news-alert-description">
                    {item.date}
                  </div>
                </div>
                <div className="news-alert-right">
                  <button className='eye-alert' onClick={() => checkRead(item)}>
                    {!item.active ? <i class="bi bi-eye-slash-fill"></i> : <i class="bi bi-eye"></i>}




                  </button>
                  <button className="edit-alert" onClick={() => getAllNews(item)}>
                    <i className="bi bi-pen"></i>
                  </button>
                  <button className="delete-alert" onClick={() => deleteNews(item.id)}>
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>)
          }
        </div>
    }
    <Modal>
      <form onSubmit={createNews}>
        <input type="text" ref={title} required />
        <input type="date" ref={date} required />
        <button type="submit">{
          editData ? "Update" : "Create"
        }</button>
      </form>
    </Modal>
  </div>
)
}
