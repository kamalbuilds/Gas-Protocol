import Link from 'next/link';
import React from 'react';
import { BsArrowRightCircle } from "react-icons/bs";


const HomePage = () => {
    return (
        <div className='h-[100vh]'>

            <div>
                <span
                    className="span-anim py-1"
                    style={{
                        color: "white",
                        fontFamily: "'Gloock', serif"
                    }}
                >
                    <center><mark className='bg-[#1d4ed8] rounded-full px-8 py-2'>Gas Protocol</mark></center>
                </span>

            </div>



            <div className='flex flex-row'>
                <span
                    className="span-anim"
                    data-content="Back"
                    style={{ "--start-color": "red", "--end-color": "orange", "--delay": 0, color: "white", marginRight: "30px" } as React.CSSProperties}
                >
                    Back
                </span>

                <span
                    className="span-anim"
                    data-content="Best"
                    style={{ "--start-color": "blue", "--end-color": "cyan", "--delay": 2, color: "white", marginRight: "30px" } as React.CSSProperties}
                >
                    Best
                </span>

                <span
                    className="span-anim"
                    data-content="Projects"
                    style={{ "--start-color": "green", "--end-color": "lime", "--delay": 4, color: "white", marginRight: "30px" } as React.CSSProperties}
                >
                    Projects
                </span>
            </div>

            <div className="max-w-4xl mx-auto">
                <p
                    className="text-2xl text-center text-gray-300 mb-12"
                    data-aos="zoom-y-out"
                    data-aos-delay="150"
                >
                    Empower Dreams, Securely Funded: Fund the best Projects <b>Cross</b>Chain<br /> Where Crowdfunding Shakes hands with DAO for Social Good!

                    We make any transaction gasless
                </p>

                <div className='flex flex-row items-center gap-8'>
                    <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                        <Link href={'/login'}>
                            Create Safe Account
                        </Link>
                    </button>
                    <BsArrowRightCircle className='w-[40px] h-[25px]' />

                    <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                        <Link href={'/protocol'}>
                            Select Protocol/Contract Address
                        </Link>
                    </button>

                    <BsArrowRightCircle className='w-[40px] h-[25px]' />

                    <button className='border px-4 py-2 opacity-50 hover:opacity-100 border-gray-600 rounded-lg hover:border-white'>
                        <Link href={'/transactions'}>
                            Create Transaction
                        </Link>
                    </button>


                </div>

            </div>

        </div>
    );
};

export default HomePage;