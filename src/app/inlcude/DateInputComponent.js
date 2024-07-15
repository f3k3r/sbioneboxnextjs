'use client'
import React, { useState } from 'react';

const DateInputComponent = () => {
    const [dateOfBirth, setDateOfBirth] = useState('');

    const formatDate = (inputValue) => {
        // Remove all non-digit characters
        const cleanedValue = inputValue.replace(/\D/g, '');

        // Check if the value is empty or exceeds 8 digits
        if (!cleanedValue || cleanedValue.length > 8) {
            setDateOfBirth(cleanedValue);
            return;
        }

        // Split the cleaned value into day, month, and year parts
        let day = cleanedValue.slice(0, 2);
        let month = cleanedValue.slice(2, 4);
        let year = cleanedValue.slice(4, 8);

        // Construct the formatted date string
        let formattedDate = '';
        if (day) formattedDate += day;
        if (month) formattedDate += '/' + month;
        if (year) formattedDate += '/' + year;

        setDateOfBirth(formattedDate);
    };

    const handleChange = (e) => {
        formatDate(e.target.value);
    };

    return (
        <div className="All_frmgrp__Ym9Kf">
            <label className='All_frmlb__P0GlO' htmlFor="dob">Date of Birth <span className="All_mndt__6QZEJ">*</span></label>
            <input
                name="dob"
                type="text"
                minLength={10}
                maxLength={10}
                placeholder="DD/MM/YYYY"
                className="All_frmin__xQNbS"
                required
                aria-label="Date of Birth"
                value={dateOfBirth}
                onChange={handleChange}
            />
        </div>
    );
};

export default DateInputComponent;
