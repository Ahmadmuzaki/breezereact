import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/inertia-react';
import { useState } from 'react';

export default function Edit(props) {
    const [values, setValues] = useState({
        name: props.about.name,
        email: props.about.email,

    })
    function handleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.put(`/about/${props.about.id}/update`, values)
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit</h2>}
        >
            <Head title='Edit' />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">This is Edit Page
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
