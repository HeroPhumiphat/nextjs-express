import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
    return (
        <div>
            <Head>
                <title>เกี่ยวกับ | Herophumiphat
                </title>
            </Head>
            <main>
                <div className='w-full mt-8 flex flex-col items-center space-y-2'>
                    <p><span className='font-bold'>Make by:</span> HeroPhumiphat</p>
                    <div className='flex items-center'>
                        <p><span className='font-bold'>GitHub Profile:</span> </p>
                        <Link href='https://github.com/HeroPhumiphat' className='flex space-x-2 items-center'><p className='ml-1'>HeroPhumiphat</p></Link>
                    </div>
                    <br />
                    <div className='text-lg font-bold'>
                        <h1 className='mb-0.5 mx-5'>Front-End</h1>
                        <div className='bg-gradient-to-r from-transparent via-neutral-500 via-50% to-transparent w-full' style={{height: 0.8}}></div>
                    </div>
                    <p><span className='font-bold'>Create Product:</span> Next.js</p>
                    {/* <p><span className='font-bold'>Javascript Framework:</span> React.js</p>
                    <p><span className='font-bold'>StateManagementLibraries:</span> Redux-Toolkit</p> */}
                    <p><span className='font-bold'>CSS Framework:</span> TailwindCSS</p>

                    {/* <Link href='www.pexels.com' className='flex items-center'>
                        <span className='font-bold'>Image:</span>
                        <p>&nbsp;pexels.com</p>
                        <i className="fa-solid fa-image ml-2 text-xl"></i>
                    </Link> */}
                    <Link href='https://fontawesome.com/' className='flex items-center'>
                        <span className='font-bold'>Icons:</span>
                        <p>&nbsp;fontawesome.com/icons</p>
                    </Link>
                    {/* <Link href='https://fonts.google.com/' className='flex items-center'>
                        <span className='font-bold'>Font family:</span>
                        <p>&nbsp;fonts.google.com/</p>
                        <i className="fa-solid fa-font text-xl ml-2"></i>
                    </Link> */}

                    <br/>
                    <div className='text-lg font-bold'>
                        <h1 className='mb-0.5 mx-5'>Back-End</h1>
                        <div className='bg-gradient-to-r from-transparent via-neutral-500 via-50% to-transparent w-full' style={{height: 0.8}}></div>
                    </div>
                    <p><span className='font-bold'>Node.js Framework:</span> Express.js</p>
                    <p><span className='font-bold'>Database:</span> MongoDB (use Mongoose)</p>

                    <div>
                        <p className='text-sm w-[350px] md:w-[600px] text-center mt-8'>If there is an error or something is not correct, I apologize for this. If you have any further suggestions. You can contact me at E-mail: Herophumiphat639@gmail.com</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-center mt-4 flex items-center'><span className='text-3xl'>&nbsp;</span> Thank You!<span className='text-3xl'>&nbsp;</span></p>
                    </div>
                </div>
            </main>
        </div>
    )
}