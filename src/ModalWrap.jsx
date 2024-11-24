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
    username: '',
    email: '',
    dob: '',
    phone: '',
  });

  // State to track validation errors
  const [errors, setErrors] = useState({
    username: '',
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
      username: '',
      email: '',
      phone: '',
    };

    if (!formData.fullName) formErrors.fullName = 'Full Name is required!';
    
    // Email Validation
    if (!formData.email || !formData.email.includes('@')) {
      formErrors.email = 'Invalid email';
      alert('Invalid email. Please check your email address.'); // Alert for invalid email
    }

    // Phone Validation
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      debugger;
      // formErrors.phone = 'Invalid phone number';
      alert('Invalid phone number. Please enter a 10-digit phone number.'); // Alert for invalid phone number
    }

    // Date of Birth Validation
    const today = new Date();
    const dob = new Date(formData.dob);
    if (dob > today) {
      // formErrors.dob = 'Invalid date of birth';
      alert('Invalid date of birth. Please enter a valid date of birth.'); // Alert for future DOB
    }

    setErrors(formErrors);

    // If no errors, process the form (e.g., submit)
    if (!Object.values(formErrors).some((err) => err !== '')) {
      alert('Form submitted successfully!');
      setIsModalOpen(false); // Close the modal on successful submit
    }
  };

  return (
    <div className="modal">
      <h1>User Details Form</h1>
      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>

      {/* Modal using react-modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-content" overlayClassName="overlay"         closeTimeoutMS={200}
      >
        <div className="modal-content">
          <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
          <h2>Enter Details</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}

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

            <button type="submit" className='submit-button'>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalWrap;
