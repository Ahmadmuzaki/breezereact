import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import DataTable from 'react-data-table-component';
import TypewriterComponent from 'typewriter-effect';


export default function Wilayah(props) {
    function handleChange(e) {
        e.preventDefault();
        Inertia.post('/wilayah', { provinsi: e.target.value })
    }
    const columns = [
        {
            name: 'Wilayah',
            selector: row => row.nama,
        },
        {
            name: 'Kode Wilayah',
            selector: row => row.kode,
        },
    ];
    console.log(props);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wilayah</h2>}
        >
            <Head title="Wilayah" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <select onChange={handleChange}>
                            {props.data.map((item, index) => (
                                <option key={index} value={item.kode}>{item.nama}</option>
                            ))}
                        </select>
                        {props.errors.first_name && <div>{props.errors.first_name}</div>}
                        {/* <Link href={route('get.provinsi')} method="post" as='button' >Get Data Provinsi</Link> */}
                        <select>
                            {props.provinsi.map((item, index) => (
                                <option key={index} value="">{item.nama}</option>
                            ))}
                        </select>
                        <TypewriterComponent options={{
                            strings: ['Hello', 'World'],
                            autoStart: true,
                            loop: true,
                        }} />
                        <div>
                            <DataTable columns={columns} data={props.data} pagination selectableRows />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
