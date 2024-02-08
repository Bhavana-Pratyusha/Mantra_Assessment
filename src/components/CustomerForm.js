import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CustomerForm = () => {
  const [savedData, setSavedData] = useState(null);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const clearData = () => {
      localStorage.removeItem('customerData');
      setSavedData(null);
    };

    window.addEventListener('beforeunload', clearData);

    return () => {
      window.removeEventListener('beforeunload', clearData);
    };
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    employeeId: Yup.number().required('Employee ID is required').positive('Employee ID must be positive'),
    city: Yup.string().required('City is required'),
    gender: Yup.string().required('Gender is required'),
  });

  const formik = useFormik({
    initialValues: {
      name:'',
      employeeId:'',
      city:'',
      gender:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('customerData', JSON.stringify(values));
      setSavedData(values);
      setEditMode(false);
    },
  });

  const toggleEditMode = () => {
    setEditMode(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Customer Information Form</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name: <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            className={`input ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={!editMode}
            onClick={toggleEditMode}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="employeeId" className="block mb-1">Employee ID: <span className="text-red-500">*</span></label>
          <input
            type="number"
            id="employeeId"
            name="employeeId"
            placeholder="Enter Employee ID"
            className={`input ${formik.touched.employeeId && formik.errors.employeeId ? 'border-red-500' : ''}`}
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={!editMode}
            required
          />
          {formik.touched.employeeId && formik.errors.employeeId ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.employeeId}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block mb-1">City: <span className="text-red-500">*</span></label>
          <select
            id="city"
            name="city"
            className={`input ${formik.touched.city && formik.errors.city ? 'border-red-500' : ''}`}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={!editMode}
            required
          >
            <option value="">▼ Select City ▼</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </select>
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Gender: <span className="text-red-500">*</span></label>
          <label htmlFor="male" className="inline-block mr-4">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              className="mr-1"
              checked={formik.values.gender === 'Male'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              disabled={!editMode}
            />
            Male
          </label>
          <label htmlFor="female" className="inline-block mr-4">
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              className="mr-1"
              checked={formik.values.gender === 'Female'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              disabled={!editMode}
            />
            Female
          </label>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
          ) : null}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Save</button>
      </form>

      {savedData && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Customer Details</h2>
          <p>Name: {savedData.name}</p>
          <p>Employee ID: {savedData.employeeId}</p>
          <p>City: {savedData.city}</p>
          <p>Gender: {savedData.gender}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
