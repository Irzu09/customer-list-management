'use client'
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, DribbbleOutlined, SecurityScanOutlined } from '@ant-design/icons';
import FormEdit from '@/components/FormEdit';
import DropdownOption from '@/components/Dropdown';

export default function UserList() {
  const [data, setData] = useState([]);
  const [clickedData, setClickedData] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('/api/userData', { method: "GET" })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Server error");
          return;
        }
        setData(response);
      });
  }
  const editData = (clickedData) => {
    fetch('/api/userData', {
      method: "PUT",
      body: JSON.stringify({
        method: "Edit",
        id: clickedData.id,
        name: clickedData.name,
        age: clickedData.age,
        phoneNum: clickedData.phoneNum,
        dob: clickedData.dateOfBirth?.slice(0, 10),
        icNumber: clickedData.icNumber,
        email: clickedData.email,
        residencyStatus: clickedData.residencyStatus,
        address: clickedData.address,
        investmentExp: clickedData.investmentExp,
        riskTolerance: clickedData.riskTolerance,
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Server error");
          return;
        }
        getData();
      });
  }

  const deleteData = (clickedData) => {
    console.log(clickedData);
    fetch('/api/userData', {
      method: "POST",
      body: JSON.stringify({ method: "Delete", idUser: clickedData.id })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          console.log("Server error");
          return;
        }
        getData();
        setClickedData("");
      });
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setClickedData((prevData) => ({ ...prevData, [name]: value }))
  }

  // dropdown
  const handleResidency = (e) => {
    let value;
    if (e.key === "1") value = "Malaysian"
    else if (e.key === "2") value = "Others"
    console.log(value);
    setForm((prevData) => ({ ...prevData, ["residencyStatus"]: value }))
  };

  const handleExperience = (e) => {
    let value;
    if (e.key === "1") value = "Novice"
    else if (e.key === "2") value = "Intermediate"
    else if (e.key === "3") value = "Advanced"
    setForm((prevData) => ({ ...prevData, ["investmentExp"]: value }))
  };

  const handleRisk = (e) => {
    let value;
    if (e.key === "1") value = "Conservative"
    else if (e.key === "2") value = "Moderate"
    else if (e.key === "3") value = "Aggressive"
    console.log(value);
    setForm((prevData) => ({ ...prevData, ["riskTolerance"]: value }))
  };

  const residencyStatus = {
    items: [
      {
        label: 'Malaysian',
        key: '1',
      },
      {
        label: 'Others',
        key: '2',
      }
    ],
    onClick: handleResidency,
  };

  const expMenu = {
    items: [
      {
        name: 'investmentExperience',
        label: 'Novice/Beginner',
        key: '1',
        icon: <DribbbleOutlined />,

      },
      {
        label: 'Intermediate',
        key: '2',
        icon: <DribbbleOutlined />,

      },
      {
        label: 'Advanced/Experienced',
        key: '3',
        icon: <DribbbleOutlined />,

      },
    ],
    onClick: handleExperience,
  };

  const riskMenu = {
    items: [
      {
        label: 'Conservative/Low Risk',
        key: '1',
        icon: <SecurityScanOutlined />,
      },
      {
        label: 'Moderate/Medium Risk',
        key: '2',
        icon: <SecurityScanOutlined />,
      },
      {
        label: 'Aggressive/High Risk',
        key: '3',
        icon: <SecurityScanOutlined />,
      },
    ],
    onClick: handleRisk,
  };

  return (
    <>
      <>
        <table className='w-100 table'>
          <thead>
            <tr>
              <th className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1'>Id</th>
              <th className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>Name</th>
              <th className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'>Phone number</th>
              <th className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2'></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data.map((data, index) => {
              return (
                <tr key={index}>
                  <td className='col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1'>{data.id}</td>
                  <td className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>{data.name}</td>
                  <td className='col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4'>{data.phoneNumber}</td>
                  <td className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 text-center'><a className='text-primary' onClick={() => { setClickedData(data); }}>View details</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
      {clickedData &&
        <>
          <div className="card">
            <div className="card-title">Customer Details</div>
            <div className='p-3 d-flex flex-wrap cardDiv'>
              <FormEdit
                label="Id"
                value={clickedData.id}
                editMode={false}
              />
              <FormEdit
                label="Fullname"
                type="text"
                name="name"
                value={clickedData.name}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <FormEdit
                label="Date of Birth"
                type="date"
                name="dob"
                value={clickedData.dateOfBirth?.slice(0, 10)}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <FormEdit
                label="MyKad Number"
                type="number"
                name="icNumber"
                value={clickedData.icNumber}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <FormEdit
                label="Age"
                type="tel"
                name="age"
                value={clickedData.age}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <FormEdit
                label="Phone Number"
                type="tel"
                name="phoneNum"
                value={clickedData.phoneNumber}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <FormEdit
                label="Email"
                type="email"
                name="email"
                value={clickedData.email}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <DropdownOption
                label="Residency status"
                menuProps={residencyStatus}
                buttonName={clickedData.residencyStatus}
                value={clickedData.residencyStatus}
                editMode={editMode}
                custList={true}
              />
              <FormEdit
                label="Mailing Address"
                type="text"
                name="address"
                value={clickedData.address}
                onChange={handleChangeEdit}
                required={true}
                editMode={editMode}
              />
              <DropdownOption
                label="Investment experience"
                menuProps={expMenu}
                buttonName={clickedData.investmentExp}
                value={clickedData.investmentExp}
                editMode={editMode}
                custList={true}
              />
              <DropdownOption
                label="Risk tolerance"
                menuProps={riskMenu}
                buttonName={clickedData.riskTolerance}
                value={clickedData.riskTolerance}
                editMode={editMode}
                custList={true}
              />
            </div>
            {editMode ? <button className="mx-auto save btn btn-primary mt-0" onClick={() => { setEditMode(false); editData(clickedData); }}>Save</button> :
              <div className="card-actions">
                <div className="text-warning d-flex button" onClick={() => setEditMode(true)}><EditOutlined style={{ fontSize: '18px', marginRight: '6px' }} />Edit</div>
                <div className="text-danger d-flex button" onClick={() => deleteData(clickedData)}><DeleteOutlined style={{ fontSize: '18px', marginRight: '6px' }} />Delete</div>
              </div>
            }
          </div>
        </>
      }
    </>
  )
}
