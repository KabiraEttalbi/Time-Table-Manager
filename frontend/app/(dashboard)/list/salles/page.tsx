import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Salle, sallesData, role } from "@/lib/data";
import Image from "next/image";

const columns = [
  {
    header: "Nom de la Salle",
    accessor: "name",
  },
  {
    header: "Capacité",
    accessor: "capacite",
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Disponibilité",
    accessor: "disponible",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export const { salles } = await sallesData();

const SalleListPage = async () => {

  const renderRow = (item: Salle) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacite}</td>
      <td className="hidden md:table-cell">{item.type}</td>
      <td className="hidden md:table-cell">
        {item.disponible ? "Disponible" : "Occupée"}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="salle" type="update" id={item._id} />
              <FormModal table="salle" type="delete" id={item._id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Salles</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="salle" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={salles} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default SalleListPage;