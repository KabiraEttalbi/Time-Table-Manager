"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "moment/locale/fr"; // Import French locale for moment

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
  const events = schedules.map((schedule) => {
    const startDate = moment(schedule.jour, "dddd").toDate();
    const startTime = moment(schedule.heureDebut, "HH:mm").toDate();
    const endTime = moment(schedule.heureFin, "HH:mm").toDate();

    return {
      title: `Module: ${schedule.module}, Salle: ${schedule.salle}`,
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
  });

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
      messages={messages} // Pass French translations
    />
  );
};

export default BigCalendar;