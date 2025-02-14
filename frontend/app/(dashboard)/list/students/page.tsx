import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, Student, studentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";


const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "CNE",
    accessor: "cne",
    className: "hidden md:table-cell",
  },
  {
    header: "Niveau",
    accessor: "niveau",
    className: "hidden lg:table-cell",
  },
  {
    header: "Filière",
    accessor: "option",
    className: "hidden lg:table-cell",
  },
  {
    header: "Année Bacalaureat",
    accessor: "anneeBac",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export const {students} = await studentsData();

const StudentListPage = () => {
  const renderRow = (item: Student) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.image}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{`${item.user.nom + " " + item.user.prenom }`}</h3>
          <p className="text-xs text-gray-500">{`${item.niveau.name + item.niveau.cycle}`}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.cne.toUpperCase()}</td>
      <td className="hidden md:table-cell">{`${item.niveau.name + item.niveau.cycle}`}</td>
      <td className="hidden md:table-cell">{item.option.name}</td>
      <td className="hidden md:table-cell">{item.anneeBaccalaureat}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item._id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="students" type="delete" id={item._id}/>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Etudiants</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="students" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={students} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
