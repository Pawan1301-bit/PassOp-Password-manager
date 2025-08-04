import { FaCopy } from "react-icons/fa";
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", Password: "" });
  const [PasswordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let Passwords = localStorage.getItem("Password");
    if (Passwords) {
      setPasswordArray(JSON.parse(Passwords));
    }

  }, [])

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const notify = () => {
    toast("Text Copied ")
  };
  
  const notifysave = () => {
    toast("Password saved")
  };

  const showpass = () => {
    // alert("show the Password");
    passwordref.current.type = "text";
    if (ref.current.src.includes("Icons/close.png")) {
      ref.current.src = "Icons/eye.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "Icons/close.png";
      passwordref.current.type = "password";
    }
  }

  const savePassword = () => {
    //saving Password on local storage  
    if (form.site?.length || 0>= 5 && form.username?.length || 0>= 5 > 3 && form.password?.length || 0>= 5) {
      notifysave();
      setPasswordArray([...PasswordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("Password", JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }]));
      setform({ site: "", username: "", Password: "" });
    }
  }

  const deletePassword = (id) => {
    if (confirm('Do you want to delete this passward!')) {

      console.log(`Deleting password with id : ${id}`);
      setPasswordArray(PasswordArray.filter(item => item.id != id));
      localStorage.setItem("Password", JSON.stringify([...PasswordArray, { ...form, id: uuidv4() }]));
    }
  }

  const editPassword = (id) => {
    console.log(`editing password with id : ${id}`);
    setform(PasswordArray.filter(i => i.id === id)[0]);
    setPasswordArray(PasswordArray.filter(i => i.id != id));
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className="mycontainer bg-slate-50 w-full max-w-none sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <h1 className='mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">Op/ &gt;</span>
          {/* <span className='hacker flex absolute left-0'>
            <dotlottie-player
              
              src="https://lottie.host/84cf4919-dc4e-446a-8004-62613a3549b5/PwiWKNByk8.lottie"
              background="transparent"
              speed="1"
              style={{ width: "150px", height: "180px" }}
              loop
              autoplay
            ></dotlottie-player>
          </span> */}

        </h1>
        <p className='text-green-900 text-sm sm:text-base md:text-lg lg:text-xl text-center'>Your own Password manager</p>
        <div className="text-white flex flex-col p-2 sm:p-4 w-full">
          <input onChange={handlechange} value={form.site} placeholder='enter website url' className='rounded-full border border-green-500 w-full text-black px-4 py-2 mb-2' type="text" name='site' />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
            <input onChange={handlechange} value={form.username} placeholder='enter usename' type="text" className='rounded-full border border-green-500 w-full text-black px-4 py-2' name='username' />
            <div className="relative w-full">
              <input onChange={handlechange} ref={passwordref} value={form.Password} placeholder='enter password' type="password" name='Password' className='rounded-full border border-green-500 w-full text-black px-4 py-2 pr-12' />
              <span className="text-black absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showpass}>
                <img width={24} ref={ref} src="Icons/close.png" alt="show" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='text-black border border-green-900 flex justify-center m-auto items-center bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-500 mt-4 text-sm sm:text-base'>
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              state="hover-swirl"
              colors="primary:#121331,secondary:#242424"
            >
            </lord-icon>
            Save Password</button>
        </div>

        <div className="Passwords px-2 sm:px-4 w-full">
          <h2 className='font-bold text-lg sm:text-xl md:text-2xl py-4'>Your Passwords</h2>
          {PasswordArray.length === 0 && <div className="text-sm sm:text-base text-center py-8">No Passwords To Show</div>}
          {PasswordArray.length !== 0 &&
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full overflow-hidden rounded-lg">
                <thead className='bg-green-800 text-white'>
                  <tr>
                    <th className='text-center py-2 px-1 border border-white text-xs sm:text-sm'>Site</th>
                    <th className='text-center py-2 px-1 border border-white text-xs sm:text-sm'>UserName</th>
                    <th className='text-center py-2 px-1 border border-white text-xs sm:text-sm'>Password</th>
                    <th className='text-center py-2 px-1 border border-white text-xs sm:text-sm'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {PasswordArray.map((items) => {
                    return <tr key={uuidv4()}>
                      <td className='text-center py-2 px-1 border border-white text-xs sm:text-sm relative'>
                        <a href="items.site" target='_blank' className="block truncate max-w-[80px] sm:max-w-none">{items.site}</a> 
                        <span onClick={() => { copyText(items.site); notify() }} className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-xs"> <FaCopy /></span>
                      </td>
                      <td className='text-center py-2 px-1 border border-white text-xs sm:text-sm relative'>
                        <span className="block truncate max-w-[80px] sm:max-w-none">{items.username}</span>
                        <span onClick={() => { copyText(items.username); notify(); }} className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-xs"> <FaCopy /></span>
                      </td>
                      <td className='text-center py-2 px-1 border border-white text-xs sm:text-sm relative'>
                        <span className="block truncate max-w-[80px] sm:max-w-none">{items.Password}</span>
                        <span onClick={() => {
                          copyText(items.Password);
                          notify()
                        }} className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer text-xs"> <FaCopy /></span>
                      </td>
                      <td className='text-center py-2 px-1 border border-white'>
                        <div className="flex justify-center items-center gap-1">
                          <span onClick={() => { deletePassword(items.id)}} className="cursor-pointer"><lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000"
                            stroke="bold"
                            style={{ "width": "18px", "height": "18px" }}>
                          </lord-icon>
                          </span>
                          <span onClick={() => { editPassword(items.id)}} className="cursor-pointer">
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              colors="primary:#121331,secondary:#000000"
                              stroke="bold"
                              style={{ "width": "18px", "height": "18px" }}>
                            </lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>

                  })}


                </tbody>
              </table>
            </div>
          }
        </div>


      </div>
    </>
  )
}

export default Manager