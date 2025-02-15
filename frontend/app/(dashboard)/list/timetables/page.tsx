"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { EmploiDuTemps, EmploiDuTempsData, role, ScheduleType } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

const columns = [
  { header: "Jour", accessor: "jour" },
  { header: "Heure Début", accessor: "heureDebut" },
  { header: "Heure Fin", accessor: "heureFin" },
  { header: "Module", accessor: "module.nom" },
  { header: "Salle", accessor: "salle.nom" },
  { header: "Enseignant", accessor: "teacher.nom" },
  { header: "Actions", accessor: "action" },
];

const EmploiDuTempsListPage = () => {
  const [emploisDuTemps, setEmploisDuTemps] = useState<EmploiDuTemps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmploiDuTemps = async () => {
    setLoading(true);
    try {
      const { emploisDuTemps } = await EmploiDuTempsData();
      setEmploisDuTemps(emploisDuTemps);
    } catch (error) {
      console.error("Erreur lors de la récupération des emplois du temps", error);
    } finally {
      setLoading(false);
    }
  };

  const generateEmploiDuTemps = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/emplois-du-temps/generate`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Erreur lors de la génération");
      await fetchEmploiDuTemps();
    } catch (error) {
      console.error("Erreur lors de la génération automatique", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmploiDuTemps();
  }, []);

  const renderRow = (item: EmploiDuTemps) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{item.jour}</td>
      <td className="p-4">{item.heureDebut}</td>
      <td className="p-4">{item.heureFin}</td>
      <td className="p-4">{item.module.name}</td>
      <td className="p-4">{item.salle.nom}</td>
      <td className="p-4">{item.type === ScheduleType.TEACHER ? item.user.name : "N/A"}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="emplois-du-temps" type="update" data={item} />
              <FormModal table="emplois-du-temps" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Emploi du Temps</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filtrer" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Trier" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="emplois-du-temps" type="create" />}
            {role === "admin" && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={generateEmploiDuTemps}
                disabled={loading}
              >
                {loading ? "Génération..." : "Générer Auto"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={emploisDuTemps} />
      <Pagination />
    </div>
  );
};

export default EmploiDuTempsListPage;
