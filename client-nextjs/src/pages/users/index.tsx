import React from 'react';
import { GetServerSideProps, NextPage} from 'next';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';

interface UserDoc {
    _id: string;
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

    const [data, setData] = React.useState(users)
    const [name, setName] = React.useState<string>('')
    const [username, setUsername] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [age, setAge] = React.useState<number | undefined>()

    const SubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(name, username, email, age)

        await axios.post('/api/users/add', {name, username, age, email})

        setName('')
        setUsername('')
        setEmail('')
        setAge(+'')
        update()
    }

    const deleteUser = async (id: string) => {
        await axios.get(`/api/users/delete/${id}`)
        update()
    }

    const update = async () => {
        const doc = await (await axios.get('/api/users')).data.users
        // console.log(doc)
        setData(doc)
    }

    return (
        <div>
            <Head>
                <title>รายชื่อ | HeroPhumiphat</title>
            </Head>
            <main className='relative px-12 pt-8 overflow-hidden pb-5 w-full'>
                <div className='w-full flex justify-center mb-6'>
                    <div className='text-2xl md:text-3xl'>
                        <h1 className='mb-1.5 mx-5'>รายชื่อผู้ใช้</h1>
                        <div className='bg-gradient-to-r from-transparent via-neutral-500 via-50% to-transparent w-full' style={{height: 1}}></div>
                    </div>
                </div>
                <div className='w-full border rounded-md mb-4 p-4'>
                    <form onSubmit={SubmitForm}>
                        <div className='flex justify-between items-center'>
                            <div className='space-y-3'>
                                <div>
                                    <label htmlFor="" className='mr-2'>Name: </label>
                                    <input type="text" value={name} className='border-b focus:outline-none' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className='mr-2'>Username: </label>
                                    <input type="text" value={username} className='w-[152px] border-b focus:outline-none' placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className='mr-2'>Email: </label>
                                    <input type="email" value={email} className='w-[185px] border-b focus:outline-none' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className='mr-2'>Age: </label>
                                    <input type="number"value={age} className='w-[195px] border-b focus:outline-none' placeholder='Enter Age (Year old)' onChange={(e) => setAge(+e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <button className='bg-blue-400 text-white hover:bg-blue-500 text-sm px-4 py-2 rounded-md'>Add User.</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center border py-4 px-0 rounded-md'>
                    <table className='w-[360px]'>
                        <thead className='uppercase text-sm'>
                            <tr>
                                <th className='py-2'>no.</th>
                                <th>name</th>
                                <th>username</th>
                                <th>del</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    data.map((user, index) => (
                                        <tr key={index} className='border-t'>
                                            <th className='py-2.5'>{index + 1}</th>
                                            <td className='underline text-center hover:font-semibold'><Link href={'/users/' + user._id}>{
                                                user.name.split(' ').map(doc => (
                                                    doc.substring(0,1).toUpperCase() + doc.substring(1, doc.length) + ' '
                                                ))
                                            }</Link></td>
                                            <td className='text-center'>{user.username.substring(0, 1).toUpperCase() + user.username.substring(1, user.username.length)}</td>
                                            <td className='text-center'>
                                                <button className='text-red-400 hover:text-red-500 border border-red-300 hover:border-red-500 px-2 py-0 rounded-md' onClick={() => deleteUser(user._id)}>X</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                        </tbody>
                    </table>
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