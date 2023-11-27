// import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 p-5 h-[100vh]">
        <p className="font-bold text-lg">
          Test Frontend PT. Ihsan Solusi Informatika
        </p>
        <div
          onClick={() => navigate("testLogic")}
          className="flex gap-10 text-center items-center"
        >
          <div className="flex items-center justif-center gap-5 p-5 font-semibold cursor-pointer bg-blue-400 rounded-sm text-white hover:scale-[1.1] active:scale-[1] active:bg-blue-500 duration-300">
            <p>Test Logika dan Algoritma</p>
            <FaChevronRight />
          </div>
          <div
            onClick={() => navigate("appTest")}
            className="flex items-center justif-center gap-5 p-5 font-semibold cursor-pointer bg-blue-400 rounded-sm text-white hover:scale-[1.1] active:scale-[1] active:bg-blue-500 duration-300"
          >
            <p>Test Aplikasi Pemrograman</p>
            <FaChevronRight />
          </div>
        </div>
      </div>
    </>
  );
}
