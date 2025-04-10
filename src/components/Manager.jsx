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
  const notifydel = () => {
    toast("Password deleted ")
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

      <div className="mycontainer bg-slate-50 ">
        <h1 className='mx-auto text-3xl font-bold text-center'>
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
        <p className='text-green-900 text-lg text-center'>Your own Password manager</p>
        <div className="text-white flex flex-col p-4 ">
          <input onChange={handlechange} value={form.site} placeholder='enter website url' className='rounded-full border border-green-500 w-full text-black px-4 py-1' type="text" name='site' />
          <div className="flex gap-3 py-2 mt-2 ">
            <input onChange={handlechange} value={form.username} placeholder='enter usename' type="text" className='rounded-full border border-green-500 w-full text-black px-4 py-1' name='username' />
            <div className="relative">
              <input onChange={handlechange} ref={passwordref} value={form.Password} placeholder='enter password' type="password" name='Password' className=' rounded-full border border-green-500 max-w-[280px] text-black px-4 py-1' />
              <span className="text-black absolute right-2 top-1.5 cursor-pointer" onClick={showpass}>
                <img width={28} ref={ref} src="Icons/close.png" alt="show" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='text-black border border-green-900  flex justify-center m-auto items-center bg-green-400 rounded-full px-8 py-2 w-fit  hover:bg-green-500 mt-2'>
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

        <div className="Passwords ">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {PasswordArray.length === 0 && <div>No Passwords To Show</div>}
          {PasswordArray.length !== 0 &&
            <table className="table-auto w-full overflow-hidden rounded-lg ">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='text-center w-32 py-2 border border-white'>Site</th>
                  <th className='text-center w-32 py-2 border border-white'>UserName</th>
                  <th className='text-center w-32 py-2 border border-white'>Password</th>
                  <th className='text-center w-32 py-2 border border-white'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {PasswordArray.map((items) => {
                  return <tr key={uuidv4()}>
                    <td className='text-center w-32 py-2 border border-white'><a href="items.site" target='_blank'>{items.site} </a> <span onClick={() => { copyText(items.site); notify() }} className="absolute py-1 px-2  transition-transform hover:scale-110 duration-500"> <FaCopy /></span></td>
                    <td className='text-center w-32 py-2 border border-white'>{items.username} <span onClick={() => { copyText(items.username); notify(); }} className="absolute py-1 px-2"> <FaCopy /></span></td>
                    <td className='text-center w-32 py-2 border border-white'>{items.Password}<span onClick={() => {
                      copyText(items.Password);
                      notify()
                    }
                    } className="absolute py-1 px-2"> <FaCopy /></span></td>
                    <td className='text-center w-32 py-2 border border-white'>
                      <span onClick={() => { deletePassword(items.id); notifydel()}}><lord-icon
                        src="https://cdn.lordicon.com/hwjcdycb.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#000000"
                        stroke="bold"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                      </span>
                      <span onClick={() => { editPassword(items.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          colors="primary:#121331,secondary:#000000"
                          stroke="bold"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>

                })}


              </tbody>
            </table>
          }
        </div>


      </div>
    </>
  )
}

export default Manager
