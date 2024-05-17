
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
export default function Students() {
    const [load,setLoad] = useState(false)
    const [allStudents, setAllStudent] = useState()
    const param = useParams()
    const [dep, setDep] = useState(false)
    const [student, setStudent] = useState([])
    const [group, setGroup] = useState([])


    useEffect(() => {
        axios.get(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${param.id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data)
                setAllStudent(res.data)
                setGroup(res?.data?.students)
                getReception(res?.data?.course?.id)
            }
            )
            .catch(error => console.log(error))
    }, [dep])

    const getReception = (id) => {
        axios.get("https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                let d = res.data.filter(item => item.course.id === id)
                setStudent(d)
            }
            )
            .catch(error => console.log(error))
    }
    const updateGroup = (student) => {
        setLoad(true)
         
        let d = { ...allStudents, students: [...allStudents.students, student] }

        axios.put(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/group/${param.id}`, d, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                removeStudent(student.id)
            }
            )
            .catch(error => console.log(error))
    }
    const removeStudent = (id) => {
        axios.delete(`https://65d5ecaff6967ba8e3bcf8f2.mockapi.io/reception/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                setDep(!dep)
                setLoad(false)
            }
            )
            .catch(error => console.log(error))
    }




    return (
        <div className='students-content'>
            <div className='students-col'>
                <div className='studets-col1-header'>
                    <div className='students-group-info'>
                        <div className='Cours-name'>{allStudents?.name} ({allStudents?.course?.name})</div>
                    </div>
                    <div className='students-header-title'>
                        <div>{allStudents?.course?.name} Devolepment</div>
                        <div>{allStudents?.teacher?.name}</div>
                    </div>
                    <div className='students-price'>
                        Price:{allStudents?.course?.price} sum
                    </div>
                </div>
                <table className='studends-table'>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>-/-</th>
                        </tr>
                    </thead>
                    <tbody>

                        {

                            student.map(item =>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td >
                                        <span  className='student-plus' onClick={() => updateGroup(item)}>
                                            {
                                                load?<Spin size='small' />: <i className="bi bi-plus"></i>
                                            }
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table >
            </div>
            <div className='students-col'>
                <table className="reception-table  students-main-table">
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
                            group.length > 0 ?
                                group.map(item =>

                                    <tr>
                                        <td>{item.name}</td>
                                        <td>998</td>
                                        <td>frontend</td>
                                        <td>
                                            <div className="reception-delete">
                                                <div className="reception-delet">
                                                    <i className="bi bi-trash3" ></i>
                                                </div>

                                            </div>
                                        </td>
                                    </tr>
                                )
                                :
                                <tr><td colSpan={4}>No data</td></tr>
                        }


                    </tbody>
                </table></div>
        </div>
    )
}
