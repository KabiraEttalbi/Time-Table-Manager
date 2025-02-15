"use client"; // Assurez-vous que ce composant est traité comme un composant côté client

import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Définir momentLocalizer ici
const localizer = momentLocalizer(moment);

interface BigCalendarProps {
  emploisDuTemps: Array<any>; // Assurez-vous que ce type est correct
}

const BigCalendar: React.FC<BigCalendarProps> = ({ emploisDuTemps }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK); // Utiliser View ici
  const [localizerState, setLocalizerState] = useState<any>(localizer); // Utiliser localizerState

  // Initialisation de momentLocalizer uniquement côté client
  useEffect(() => {
    // MomentLocal est déjà défini plus haut, on n'a plus besoin de l'initialiser ici.
    setLocalizerState(localizer); // Définir le localizer après le rendu du client
  }, []);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView); // Le type de selectedView est maintenant View
  };

  const messages = {
    // Exemple de traduction des messages du calendrier
    allDay: "Toute la journée",
    previous: "Précédent",
    next: "Suivant",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
  };

  return (
    <Calendar
      localizer={localizerState}
      events={emploisDuTemps}
      startAccessor={(event) => new Date(event.startTime)}
      endAccessor={(event) => new Date(event.endTime)}
      titleAccessor={(event) => event.module.name}
      views={[Views.WORK_WEEK, Views.DAY]} // Utilisation de Views spécifiques
      view={view} // Assurez-vous que view est de type View
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
      messages={messages} // Pass French translations
    />
  );
};

export default BigCalendar;
