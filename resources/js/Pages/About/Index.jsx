import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';

export default function Index(props) {
    const [values, setValues] = useState({
        name: '',
        email: '',

    })

    const [city, setCity] = useState([])
    const [state, setState] = useState([])
    const [stateId, setStateId] = useState('')

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post('/about/store', values)
    }
    function handleDelete(e) {
        Inertia.delete(`/about/${e}/delete`)
    }

    function getCity(id) {
        props.city.map((item, index) => {
            if (item.state_id == id) {
                setCity(item)
            }
        })
    }

    useEffect(() => {
        function getState() {
            setState([])
            props.state.map((item, index) => {
                if (item.county_code === stateId) {
                    setState(state => [...state, item])
                }
            })
        }
        getState()
    }, [stateId])
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Index</h2>}
        >
            <Head title='Index' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">This is About Page
                            <div className='my-4'>
                                <form onSubmit={handleSubmit} className="grid">
                                    <label htmlFor="name">Name: </label>
                                    <input className='rounded-md' type="text" name="name" id="name" value={values.name} onChange={handleChange} />
                                    {values.name === '' ? <p className='text-red-500'>Name is required</p> :
                                        values.name.length < 3 ? <p className='text-red-500'>Name must be at least 3 characters</p> : null}
                                    <label htmlFor="email">Email: </label>
                                    <input className='rounded-md' type="email" name="email" id="email" value={values.email} onChange={handleChange} />
                                    {values.email === '' ? <p className='text-red-500'>Email is required</p> :
                                        values.email.length < 3 ? <p className='text-red-500'>Email must be at least 3 characters</p> : null}
                                    <div className='flex justify-end'>
                                        <button type="submit" className='my-4 py-2 px-3 rounded-xl bg-gradient-to-br
                                    from-amber-500 to-pink-500 text-white
                                    hover:bg-gradient-to-br
                                    hover:from-amber-600
                                    hover:to-pink-600'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            {/* Form */}
                            <div className='my-4'>
                                <select onChange={(e) => {
                                    setStateId(e.target.value)
                                }}>
                                    <option value="">Select</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className={`my-4 ${stateId === '' ? 'hidden' : ''} `} >
                                <select>
                                    <option value="" hidden>Select State</option>
                                    {state.map((item, index) => (
                                        <option key={index} value={item.id}>{item.state}</option>
                                    ))}
                                </select>
                            </div>
                            {/* End Form */}
                            <div>
                                {props.about.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <li>{index + 1}. {item.name}</li>
                                        <Link href={`/about/${item.id}/edit`}>Edit</Link>
                                        <button onClick={() => {
                                            setdata(item.id), handleDelete(item.id)
                                        }}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
