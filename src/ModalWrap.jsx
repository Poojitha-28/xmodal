import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import './ModalWrap.css';

// Set up the modal root element
Modal.setAppElement('#root');

function ModalWrap() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
  });

  // State to track validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    let formErrors = {
      fullName: '',
      email: '',
      phone: '',
    };

    // Validation
    if (!formData.fullName) formErrors.fullName = 'Full Name is required!';
    if (!formData.email || !formData.email.includes('@'))
      formErrors.email = 'Valid Email is required!';
    if (formData.phone.length !== 10 || isNaN(formData.phone))
      formErrors.phone = 'Phone number must be exactly 10 digits!';

    setErrors(formErrors);

    // If no errors, process the form (e.g., submit)
    if (!Object.values(formErrors).some((err) => err !== '')) {
      alert('Form submitted successfully!');
      setIsModalOpen(false); // Close the modal on successful submit
    }
  };

  return (
    <div className="App">
      <h1>User Details Form</h1>
      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>

      {/* Modal using react-modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="overlay">
        <div className="modal-content">
          <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
          <h2>Enter Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}

            {/* Date of Birth */}
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            {/* Phone Number */}
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength="10"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <button type="submit">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalWrap;
