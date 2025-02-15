"use client"; // Assurez-vous que ce composant est traité comme un composant côté client

import { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { fetchStudentSchedule, EmploiDuTemps } from "@/lib/data";

const studentId = "67aff54f60700bb0925ee1d9"; // Remplace par un ID réel

const StudentPage = () => {
  const [emploisDuTemps, setEmploisDuTemps] = useState<EmploiDuTemps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentSchedule(studentId);

        // Si aucune donnée n'est récupérée, définir un message d'erreur
        if (data.length === 0) {
          setError("Aucun emploi du temps trouvé.");
        } else {
          setEmploisDuTemps(data);  // Sinon, mettre à jour les emplois du temps
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des emplois du temps", err);
        setError("Une erreur est survenue lors de la récupération des données.");
      } finally {
        setIsLoading(false); // On marque la fin du chargement
      }
    };

    fetchData();
  }, []); // Le tableau vide signifie que l'effet ne se déclenche qu'une seule fois, au montage du composant

  if (isLoading) {
    return <div>Loading...</div>; // Affichage d'un loader tant que les données ne sont pas chargées
  }

  if (error) {
    return <div>{error}</div>; // Affichage du message d'erreur si quelque chose a échoué
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Emploi du Temps (4A)</h1>
          <BigCalendar emploisDuTemps={emploisDuTemps} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
