'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";

export default function Home() {
    
  return (
    <>
    <Header />
    <br />
    <br />
    <br />
    <h1 className="text-danger text-center" >Please Wait !</h1>
    <div className="text-center">
    <img src="/load.gif" width="70" className="my-4 text-center" />
   
    </div>
     <p className="text-center">It will take time to completion...</p>
    <br />
    <br />

    <Footer />
</>
  );
}
