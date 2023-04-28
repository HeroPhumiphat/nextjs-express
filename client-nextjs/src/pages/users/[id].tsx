import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface User {
    _id: string;
    name: string;
    username: string;
    age: number;
    email: string;
    image: string;
}

interface Todos {
    _id: string;
    todo: string;
    completed: boolean;
    userId: string;
}

interface Props {
    user: User;
    todos: Todos[];
}

const UserDetail = ({ user, todos } : Props) => {
    return (
        <div>
            <Head>
                <title>{
                    user.name.substring(0,1).toUpperCase() + user.name.substring(1, user.name.length).toLowerCase()
                } | Herophumiphat</title>
            </Head>
            <main>
                <div className='w-full py-7 px-12'>
                    <div className='w-80 border pb-4 p-2 rounded-sm' style={{boxShadow: '0px 0px 4px #e3e3e3'}}>
                        <h1 className='text-2xl font-semibold text-neutral-400 mb-3'>{user.username.substring(0, 1).toUpperCase() + user.username.substring(1, user.username.length).toLowerCase()}.</h1>
                        <div className='relative w-full'>
                            <div className='pl-4 py-2 border-l-8'>
                                <p><span className='font-semibold'>Name: </span>{user.name.substring(0, 1).toUpperCase() + user.name.substring(1, user.name.length).toLowerCase()}</p>
                                <p><span className='font-semibold'>Email: </span>{user.email.substring(0, 1).toUpperCase() + user.email.substring(1, user.email.length).toLowerCase()}</p>
                                <p><span className="font-semibold">Age: </span>{user.age} year old.</p>
                            </div>
                            <div className='absolute top-1 -right-1 px-2'>
                                {
                                    user.image === undefined
                                    ? <div className='text-neutral-400 px-6 py-5 border rounded-full'>
                                        <FontAwesomeIcon icon={faUser} className='text-5xl' />
                                      </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UserDetail;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params?.id
    const user = (await axios.get(`http://localhost:8080/users/${id}`)).data;
    const todos = (await axios.get(`http://localhost:8080/todos/${id}`)).data;
    return {
        props: {
            user,
            todos
        }
    }
}
