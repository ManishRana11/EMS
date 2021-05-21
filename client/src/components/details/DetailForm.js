import React, { useState, useContext, useEffect } from 'react'
import DetailContext from '../../context/detail/detailContext'
// import styles from './Detail.module.css'
import './Detail.css'
import DetailFilter from '../details/DetailFilter'

const DetailForm = () => {
    const detailContext = useContext(DetailContext);

    const { addDetail, updateDetail, clearCurrent, current } = detailContext;

    const [detail, setDetail] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        department: '',
    });

    useEffect(() => {
        if (current !== null) {
            setDetail(current);
        }
        else {
            setDetail({
                name: '',
                email: '',
                phone: '',
                designation: '',
                department: ''
            });

        }
    }, [detailContext, current])


    const { name,
        email,
        phone,
        designation,
        department,
    } = detail;

    const onChange = e => setDetail({ ...detail, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();

        if (current === null) {
            addDetail(detail);
        } else {
            updateDetail(detail);
        }
        clearAll();
    };
    const clearAll = () => {
        clearCurrent();
    }

    return (

        <>
            <div className="wrapper">
                <div className="form">
                    <div className="left-col">
                        <img src="img/ellipse1.png" className="img1" alt="" />
                        <h2 style={{ color: '#fff' }}>{current ? 'Edit Employee Details' : 'Add Employee Details'}</h2>
                        <form onSubmit={onSubmit}>
                            <div className="result" />
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder="Name"
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Phone'
                                    name='phone'
                                    value={phone}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Designation'
                                    name='designation'
                                    value={designation}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type='text'
                                    placeholder='Department'
                                    name='department'
                                    value={department}
                                    onChange={onChange}
                                />

                            </div>
                            <div>
                                <input className="btn-form" type="submit" value={current ? 'Update Employee' : 'Add Employee'} />
                            </div>
                            {current && <div>
                                <button className='btn btn-light btn-block' onClick={clearAll} >Clear</button>
                            </div>}
                        </form>
                    </div>
                    <DetailFilter />
                </div>
            </div>
        </>
    )
}
export default DetailForm
