import React from 'react';
import { GetServerSideProps, NextPage} from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface UserDoc {
    _id: number;
    name: string;
    username: string;
    age: number;
    email: string;
    image: string;
}

interface UserProps {
    users: UserDoc[];
}

const Users: NextPage<UserProps> = ({ users }) => {
    return (
        <div>
            <Head>
                <title>รายชื่อ | HeroPhumiphat</title>
            </Head>
            <main className='w-full px-12 pt-8 overflow-hidden pb-5'>
                <div className='w-full flex justify-center'>
                    <div className='text-2xl md:text-3xl'>
                        <h1 className='mb-1.5 mx-5'>รายชื่อผู้ใช้</h1>
                        <div className='bg-gradient-to-r from-transparent via-neutral-500 via-50% to-transparent w-full' style={{height: 1}}></div>
                    </div>
                </div>
                <div className='flex justify-center mt-12'>
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3x:grid-cols-6 gap-x-16 gap-y-2 min-[420px]:gap-x-6 min-[420px]:gap-y-3 sm:gap-x-2 justify-items-center items-center mb-5'>
                        {
                            users.map((user) => (
                                <Link href={'/users/' + user._id} key={user._id}>
                                    <div className='text-center border mx-0 sm:mx-1 py-4 w-[160px] sm:w-[230px] rounded-sm hover:cursor-pointer sm:hover:scale-105 z-10 hover:z-20 bg-white transition delay-100 duration-300 ease-in-out' style={{boxShadow: '0px 0px 3px #c1c1c1'}}>
                                        <div className='h-32 sm:h-48 w-full flex justify-center items-center text-neutral-300' style={{backgroundImage: `url(${user?.image})`}}>
                                            {
                                                user?.image === undefined
                                                    ? <div className='px-10 py-9 border rounded-full'>
                                                        <FontAwesomeIcon icon={faUser} className='text-2xl' />
                                                      </div>
                                                    : ''
                                            }
                                        </div>
                                        <p className=''>{user.name}</p>
                                        <p className='text-lg text-neutral-400'>{user.username}</p>
                                    </div>
                                    <div>{user._id}</div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps<UserProps> = async () => {
    const res = await axios.get('http://localhost:8080/users');
    const users = res.data.users;

    return {
        props: {
            users: users,
        }
    }
}

export default Users;