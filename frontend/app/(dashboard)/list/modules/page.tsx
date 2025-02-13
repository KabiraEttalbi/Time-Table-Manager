import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Module, modulesData, role } from "@/lib/data";
import Image from "next/image";

const columns = [
  {
    header: "Nom du Module",
    accessor: "name",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "Option",
    accessor: "option.name",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ModuleListPage = async () => {
  const { modules } = await modulesData();

  // Vérifier si 'modules' est un tableau
  if (!Array.isArray(modules)) {
    return <div>Error: Data is not an array</div>;
  }

  console.log("Modules Data in Component:", modules); // Afficher les modules ici

  const renderRow = (item: Module) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.description}</td>
      <td className="hidden md:table-cell">{item.option?.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="modules" type="update" data={item} />
              <FormModal table="modules" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Modules</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="modules" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={modules} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};


export default ModuleListPage;
