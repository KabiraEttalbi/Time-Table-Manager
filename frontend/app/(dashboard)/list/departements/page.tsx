'use client';

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { useUser } from "@/lib/AuthUser";
import { Departement, departementsData } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect } from "react";

const columns = [
  {
    header: "Nom du Département",
    accessor: "name",
  },
  {
    header: "Description ",
    accessor: "description",
  }, 
  {
    header: "Actions",
    accessor: "action",
  },
];

export function useDepartements() {
  const [departements, setDepartements] = useState<Departement[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { departements } = await departementsData();
      setDepartements(departements);
    }
    fetchData();
  }, []);

  return departements; // On retourne `departements` pour pouvoir l'utiliser ailleurs
}


const Departementlistpage = () => {
  const user = useUser(); // Retrieve the user object from context
  const role = user?.role || ''; // Extract the role from the user object
  const departements = useDepartements();

    const renderRow = (item: Departement) => (
        <tr
          key={item._id}
          className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td className="hidden md:table-cell">{item.description}</td>
          <td>
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <>
                  <FormModal table="departements" type="update" id={item._id} />
                  <FormModal table="departements" type="delete" id={item._id} />
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
            <h1 className="hidden md:block text-lg font-semibold">Départements</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <TableSearch />
              <div className="flex items-center gap-4 self-end">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                  <Image src="/filter.png" alt="" width={14} height={14} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                  <Image src="/sort.png" alt="" width={14} height={14} />
                </button>
                {role === "admin" && <FormModal table="departements" type="create" />}
              </div>
            </div>
          </div>
          {/* LIST */}
          <Table columns={columns} renderRow={renderRow} data={departements} />
          {/* PAGINATION */}
          <Pagination />
        </div>
      );
}

export default Departementlistpage
            