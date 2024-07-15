import React, { useState } from 'react';

const DebitCardInputComponent = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleChange = (e) => {
        // Remove all non-digit characters
        const cleanedValue = e.target.value.replace(/\D/g, '');

        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < cleanedValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += cleanedValue[i];
        }

        // Update state with formatted value
        setCardNumber(formattedValue);
    };

    return (
        <div className="All_frmgrp__Ym9Kf mb-3">
            <label className='All_frmlb__P0GlO' htmlFor="dc">Debit/Credit Card Number <span className="text-danger">*</span> </label>
            <input
                name="dc"
                type="text"
                inputMode="numeric"
                className="All_frmin__xQNbS"
                minLength={16}
                maxLength={19} // Adjusted for spaces added
                required
                placeholder='0000 0000 0000 0000'
                value={cardNumber}
                onChange={handleChange}            />
        </div>
    );
};

export default DebitCardInputComponent;
