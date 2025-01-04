import Link from 'next/link'
import ConnectBtn from './ConnectBtn'
import React, { useState } from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'

// const Header: React.FC = () => {
//   return (
//     <header className="h-20 shadow-md p-5 sm:px-0 fixed z-50 top-0 right-0 left-0 bg-white">
//       <main className="lg:w-2/3 w-full mx-auto flex justify-between items-center flex-wrap">
//         <Link href={'/'} className="text-lg font-bold">
//           Event X
//         </Link>
//         <Desktop />
//         <Mobile />
//       </main>
//     </header>
//   )
// }
const Header: React.FC = () => {
  return (
    <header className="h-20 shadow-md p-5 sm:px-0 fixed z-50 top-0 right-0 left-0 bg-white">
      <main className="lg:w-2/3 w-full mx-auto flex justify-between items-center">
        <Link href={'/'} className="flex items-center text-lg font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
            <path
              d="M36.045 28.2037H34.3112C33.9939 28.2037 33.6001 28.4212 33.4179 28.6739C30.303 33.0582 25.0254 35.797 19.1541 35.3268C11.8371 34.7332 5.19009 28.0509 4.63764 20.7339C3.93238 11.4245 11.3082 3.6256 20.4647 3.6256C25.807 3.6256 30.5381 6.27619 33.4179 10.3314C33.6001 10.59 33.9997 10.8074 34.3112 10.8074H36.0567C37.1322 10.8074 37.5554 10.0552 36.9853 9.14422C33.318 3.31999 26.6592 -0.435487 19.1835 0.0405599C9.56854 0.657658 1.76373 8.36256 1.02321 17.9658C0.141641 29.4027 9.19828 39 20.4588 39C27.4056 39 33.5178 35.3503 36.9736 29.867C37.432 29.1441 36.8913 28.1978 36.045 28.1978V28.2037Z"
              fill="url(#paint0_linear_84_552)"
            />
            <path
              d="M38.5548 19.5056C38.5548 20.8339 37.4793 21.9094 36.157 21.9153H36.1452C34.8111 21.9153 33.7356 20.8339 33.7356 19.5056C33.7356 18.1774 34.8111 17.0901 36.1452 17.0901H36.157C37.4793 17.096 38.5548 18.1715 38.5548 19.5056Z"
              fill="url(#paint1_linear_84_552)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_84_552"
                x1="-2.23859"
                y1="12.0358"
                x2="40.4293"
                y2="26.0703"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3BE3B6" />
                <stop offset="1" stopColor="#6EB3D6" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_84_552"
                x1="-0.710218"
                y1="7.38114"
                x2="41.9636"
                y2="21.4157"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.713542" stopColor="#3BE3B6" />
                <stop offset="1" stopColor="#6EB3D6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="ml-2">Circularity Finance</span>
        </Link>
        <Desktop />
        <Mobile />
      </main>
    </header>
  );
};


const Desktop: React.FC = () => (
  <div className="hidden sm:flex justify-end items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
    <Link
      href={'/events/create'}
      className="text-md hover:text-teal-500 duration-300 transition-all"
      
    >
      Create
    </Link>
    <Link
      href={'/events/personal'}
      className="text-md hover:text-teal-500 duration-300 transition-all"
    >
      Personal
    </Link>

    <ConnectBtn networks />
  </div>
)

const Mobile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)}>
        <CgMenuLeft size={25} />
      </button>
      {isOpen && (
        <div
          className="flex flex-col space-y-4 fixed top-0 right-0 h-full w-64 bg-white
        shadow-md p-4 transition duration-500 ease-in-out transform-all"
        >
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FaTimes size={25} />
            </button>
          </div>

          <Link
            href={'/events/create'}
            className="text-md hover:text-teal-500 duration-300 transition-all block py-1"
          >
            Create
          </Link>

          <Link
            href={'/events/personal'}
            className="text-md hover:text-teal-500 duration-300 transition-all block py-1"
          >
            Personal
          </Link>
          <ConnectBtn />
        </div>
      )}
    </div>
  )
}

export default Header
