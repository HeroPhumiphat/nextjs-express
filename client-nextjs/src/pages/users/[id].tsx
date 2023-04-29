import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'

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
    const form = React.useRef()
    const [todosCopy, setTodosCopy] = React.useState(todos)

    const [todoContent, setTodoContent] = React.useState<string>('')
    const [todoEdit, setTodoEdit] = React.useState<string>('')
    const [idEdit, setIdEdit] = React.useState<string>('')

    const SubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (todoContent.length > 0) {
            await axios.post('/api/todos/add', { atUserId: user._id, todo: todoContent, completed: false })
        }

        setTodoContent('')
        updateData()
    }

    const SubmitFormEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (todoEdit.length > 0) {
            await axios.post('/api/todos/edit', { id: idEdit, todo: todoEdit })
        }

        setIdEdit('')
        updateData()
    }

    const onClickCheckList = async (id: string, check: boolean) => {
        await axios.post('/api/todos/edit', {
            id,
            completed: check === true ? 'false' : 'true'
        })

        updateData()
        //   location.reload();
    }

    const editTodo = async (id: string, content: string) => {
        // await axios.post('/api/todos/edit', { id, todo})
        setIdEdit(id)
        setTodoEdit(content)
    }

    const deleteTodo = async (id: string) => {
        await axios.post('/api/todos/delete', { id })

        await updateData()
    }

    async function updateData () {
        const newDoc = (await axios.get(`/api/todos/${user._id}`)).data
        setTodosCopy(newDoc)
    }

    return (
        <div>
            <Head>
                <title>{
                    user.name.substring(0,1).toUpperCase() + user.name.substring(1, user.name.length).toLowerCase()
                } | Herophumiphat</title>
            </Head>
            <main>
                <div className='w-full py-7 px-12'>
                    <div className='w-80 border pb-6 p-3 rounded-sm' style={{boxShadow: '0px 0px 4px #e3e3e3'}}>
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

                    <br />
                    <hr />
                    <br />

                    <div className='w-[350px] mt-5'>
                        <div className='flex items-center justify-between'>
                            <div className='text-lg font-bold w-fit'>
                                <h1 className='mb-0.5 mx-5 up text-neutral-400'>Todo Lists</h1>
                                <div className='bg-gradient-to-r from-transparent via-neutral-400 via-50% to-transparent w-full' style={{height: 0.8}}></div>
                            </div>
                            <div>
                                {/* <button className='bg-blue-400 hover:bg-blue-500 px-3 py-1.5 rounded-md text-neutral-50'>Add new Todo</button> */}
                            </div>
                        </div>
                        <div className='my-4 border p-3 rounded-md'>
                            <form onSubmit={SubmitForm} className='flex justify-between items-center'>
                                <div>
                                    <label htmlFor="todo">New: </label>
                                    <input type="text" value={todoContent} id="todo" className='border-b focus:outline-none ml-2' placeholder='Enter your Content.' onChange={(e) => setTodoContent(e.target.value)} />
                                </div>
                                <div>
                                    <button className='bg-green-300 hover:bg-green-400 px-3 py-1 rounded-md'>Enter</button>
                                </div>
                            </form>
                        </div>
                        <div className='border mt-4 rounded-md'>
                            {
                                todosCopy.length === 0
                                ? <h1 className='text-center text-neutral-400'>ไม่พบรายการข้อมูล</h1>
                                : todosCopy.map((doc, index) => (
                                    <div key={index} className={ index === todosCopy.length-1 || todosCopy.length === 1 ? 'pl-4 text-neutral-600 flex justify-between py-4' : 'pl-4 text-neutral-600 flex justify-between border-b py-4'}>
                                        <div className='flex items-center'>
                                            <div className='border-2 w-4 h-4 rounded-sm mr-6 border-neutral-300 hover:border-neutral-400 flex justify-start items-end cursor-pointer text-green-500 hover:text-red-400' onClick={() => onClickCheckList(doc._id, doc.completed)}>
                                                {
                                                    doc.completed === true
                                                        ? <FontAwesomeIcon icon={faCheck} className='text-xl ml-0.5' />
                                                        : ''
                                                }
                                            </div>
                                            <p className={ doc.completed === true ? 'line-through' : ''}>{doc.todo.substring(0, 1).toUpperCase() + doc.todo.substring(1, doc.todo.length)}</p>
                                        </div>
                                        <div className='asbolute pr-4 text-neutral-400 space-x-4 '>
                                            <button className='text-amber-300 hover:text-amber-400' onClick={() => editTodo(doc._id, doc.todo)}><FontAwesomeIcon icon={faPenToSquare} className='' /></button>
                                            <button className='text-red-300 hover:text-red-400' onClick={() => deleteTodo(doc._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                        </div>
                                    </div>
                                  ))
                            }
                        </div>
                        {
                            idEdit.length > 0
                                ? <div className='my-4 border p-3 rounded-md'>
                                    <form onSubmit={SubmitFormEdit} className='flex justify-between items-center'>
                                        <div>
                                            <label htmlFor="todo">Edit: </label>
                                            <input type="text" value={todoEdit} id="todo" className='border-b focus:outline-none ml-2' placeholder='Enter your Content.' onChange={(e) => setTodoEdit(e.target.value)} />
                                        </div>
                                        <div>
                                            <button className='bg-green-300 hover:bg-green-400 px-3 py-1 rounded-md'>Enter</button>
                                        </div>
                                    </form>
                                  </div>
                                : ''
                        }
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
