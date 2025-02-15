"use client"; // Assurez-vous que ce composant est traité comme un composant côté client

import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EmploiDuTemps } from "@/lib/data"; // Assurez-vous que le chemin est correct

type BigCalendarProps = {
  emploisDuTemps: EmploiDuTemps[];
};

const BigCalendar: React.FC<BigCalendarProps> = ({ emploisDuTemps }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK); // Utiliser View ici
  const [localizer, setLocalizer] = useState<any>(null);

  // Initialisation de momentLocalizer uniquement côté client
  useEffect(() => {
    const momentLocal = momentLocalizer(moment);
    setLocalizer(momentLocal); // Définir le localizer après le rendu du client
  }, []);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView); // Le type de selectedView est maintenant View
  };

  if (!localizer) {
    return <div>Loading...</div>; // Affichage d'un loader ou d'un état d'attente tant que `localizer` n'est pas prêt
  }

  return (
    <Calendar
      localizer={localizer}
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
    />
  );
};

export default BigCalendar;
