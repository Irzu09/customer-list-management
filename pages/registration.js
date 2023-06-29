'use client'
import React, { useState } from 'react';
import Form from '@/components/Form';
import { DribbbleOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { message } from 'antd';
import DropdownOption from '@/components/Dropdown';

export default function Registration() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    icNumber: '',
    age: '',
    phoneNum: '',
    email: '',
    residencyStatus: '',
    address: '',
    investmentExp: '',
    riskTolerance: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    addData();
    // reset
    setForm({
      name: '',
      dob: '',
      icNumber: '',
      age: '',
      phoneNum: '',
      email: '',
      residencyStatus: '',
      address: '',
      investmentExp: '',
      riskTolerance: ''
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prevData) => ({ ...prevData, [name]: value }))
  }

  const addData = () => {
    fetch('/api/userData', {
      method: "POST",
      body: JSON.stringify({
        method: "Add",
        name: form.name,
        age: form.age,
        phoneNum: form.phoneNum,
        dob: form.dob,
        icNumber: form.icNumber,
        email: form.email,
        residencyStatus: form.residencyStatus,
        address: form.address,
        investmentExp: form.investmentExp,
        riskTolerance: form.riskTolerance,
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.error) {
          console.log("Server error");
          return;
        }
        else if (response.success) message.success('Registration successful! Please wait for your login details to be emailed to you within 1-3 working days.');
      });
  }

  // set Client id

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
    <form className='d-flex flex-column' onSubmit={handleSubmit}>
      <Form
        label="Fullname"
        type="text"
        name="name"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
        required={true}
      />
      <Form
        label="Date of birth"
        type="date"
        name="dob"
        placeholder="01/01/1990"
        value={form.dob}
        onChange={handleChange}
        required={true}
      />
      <Form
        label="MyKad number (w/o '-')"
        type="text"
        name="icNumber"
        placeholder="910407XXXXXX"
        value={form.icNumber}
        onChange={handleChange}
        required={true}
      />
      <Form
        label="Age"
        type="number"
        name="age"
        placeholder="28"
        value={form.age}
        onChange={handleChange}
        required={true}
      />
      <Form
        label="Phone number"
        type="tel"
        name="phoneNum"
        placeholder="0123456789"
        value={form.phoneNum}
        onChange={handleChange}
        required={true}
      />
      <Form
        label="Email"
        type="email"
        name="email"
        placeholder="john.doe@aham.com"
        value={form.email}
        onChange={handleChange}
        required={true}
      />
      <DropdownOption
        label="Residency status"
        menuProps={residencyStatus}
        buttonName={form.residencyStatus === "" ? "Please select" : form.residencyStatus}
      />
      <Form
        label="Mailing address"
        type="text"
        name="address"
        placeholder="3, Jalan Kuntum, Taman Rama, 12345, Selangor."
        value={form.address}
        onChange={handleChange}
        required={true}
      />
      <DropdownOption
        label="Investment experience"
        menuProps={expMenu}
        buttonName={form.investmentExp === "" ? "Please select" : form.investmentExp}
      />
      <DropdownOption
        label="Risk tolerance"
        menuProps={riskMenu}
        buttonName={form.riskTolerance === "" ? "Please select" : form.riskTolerance}
      />
      <button type='submit' className="mx-auto save btn btn-primary">Register</button>
    </form>
  )
}
