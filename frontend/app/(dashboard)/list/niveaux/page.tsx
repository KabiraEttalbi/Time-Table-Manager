'use client';

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {Niveau, niveauData } from "@/lib/data";
import Image from "next/image";
import { useUser } from "@/lib/AuthUser";

const columns = [
  {
    header: "Semestre",
    accessor: "name",
  },
  {
    header: "Cycle",
    accessor: "cycle",
    className: "hidden md:table-cell",
  },
  {
    header: "Filière",
    accessor: "option",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export const { niveaux } = await niveauData(); 


const ClassListPage = () => {
  const user = useUser(); // Retrieve the user object from context
  const role = user?.role || ''; // Extract the role from the user object

  const renderRow = (item: Niveau) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.cycle}</td>
      <td className="hidden md:table-cell">{item.option.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="niveau" type="update" id={item._id} />
              <FormModal table="niveau" type="delete" id={item._id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Semestres</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="niveau" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={niveaux} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ClassListPage;
