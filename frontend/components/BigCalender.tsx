"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment, { localeData } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "moment/locale/fr"; // Import French locale for moment
import { Emploidutemps} from "@/lib/data";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Pour générer des tableaux dans jsPDF

// Set moment's locale to French
moment.locale("fr");

const localizer = momentLocalizer(moment);

const BigCalendar = ({ schedules }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  // French translations for the calendar
  const messages = {
    today: "Aujourd'hui",
    previous: "Précédent",
    next: "Suivant",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    work_week: "Semaine de travail",
    agenda: "Agenda",
    date: "Date",
    time: "Heure",
    event: "Événement",
    noEventsInRange: "Aucun événement dans cette plage.",
  };

  // Transform the schedule data into the format expected by react-big-calendar
  const events = schedules?.map((schedule: Emploidutemps) => {
    const startDate = moment(schedule.jour, "dddd").toDate();
    const startTime = moment(schedule.heureDebut, "HH:mm").toDate();
    const endTime = moment(schedule.heureFin, "HH:mm").toDate();
    if(schedule.type ==="student"){
      return {
        title: `${schedule?.module?.name} \n ${schedule?.salle?.name}`,
        start: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        ),
        end: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          endTime.getHours(),
          endTime.getMinutes()
        ),
      };
    }

    if(schedule.type ==="teacher"){
      
      return {
        title: `${schedule?.module?.name} \n ${schedule?.salle?.name} \n ${schedule?.module?.option?.name}`,
        start: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startTime.getHours(),
          startTime.getMinutes()
        ),
        end: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          endTime.getHours(),
          endTime.getMinutes()
        ),
      };
    }
    
  });

  const handleExportPDF = () => {
    const doc = new jsPDF("landscape");

    // Titre du PDF
    doc.setFontSize(18);
    doc.text(`Emploi du temps : ${schedules[0].module?.option?.name}`, 14, 20);
  

    // En-tête du tableau
    const headers = [
      "Jour",
      "Heure",
      "Salle",
      "Module",
      
    ];

    // Préparer les données du tableau
    const data = schedules?.map((schedule: Emploidutemps) => [
      schedule.jour, // Jour (Lundi, Mardi, etc.)
      `${schedule.heureDebut} - ${schedule.heureFin}`, // Heure
      schedule.salle?.name, // Salle
      schedule.module?.name, // Module
      
    
    ]);

    // Générer le tableau avec jspdf-autotable
    (doc as any).autoTable({
      startY: 30, // Position Y pour commencer le tableau
      head: [headers], // En-têtes
      body: data, // Données
      theme: "grid", // Style du tableau
      styles: { fontSize: 10, cellPadding: 3 }, // Style des cellules
      headStyles: { fillColor: [22, 160, 133] }, // Style de l'en-tête
    });

    // Sauvegarder le PDF
    doc.save("emploi_du_temps.pdf");
  };

  

  return (
    <div>
    
    

      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        defaultView={Views.WORK_WEEK} // Set default view to work week
        style={{ height: "98%" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 19, 0, 0)}
        messages={messages} // Pass French translations
      />
    <div className="mt-4"> {/* Ajoute une marge en haut pour l'espace */}
  {/* Bouton aligné à droite avec espace */}
  <div className="mt-4 flex justify-end">
    <button
      onClick={handleExportPDF}
      className="px-2 py-2 bg-green-500 text-white border-none rounded-lg cursor-pointer text-base font-bold shadow-md transition-all hover:bg-green-500"
    >
      Exporter en PDF
    </button>
  </div>

</div>
    </div>
    
  );
}

export default BigCalendar;