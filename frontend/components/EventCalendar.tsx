"use client";

import Image from "next/image";
import { useState } from "react";
import { eventsData } from "@/lib/data";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Event = {
  id: number;
  studentId: string;
  title: string;
  time: Date;
  description: string;
};

// French translations for the calendar
const frenchTranslations = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  weekdaysShort: ["D", "L", "M", "M", "J", "V", "S"],
};

// Format the date in French
const formatDate = (date: Date) => {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar
        onChange={onChange}
        value={value}
        locale="fr-FR" // Set locale to French
        formatMonthYear={(locale, date) =>
          `${frenchTranslations.monthNames[date.getMonth()]} ${date.getFullYear()}`
        }
        formatShortWeekday={(locale, date) =>
          frenchTranslations.weekdaysShort[date.getDay()]
        }
      />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Événements</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {eventsData.map((event: Event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">
                {formatDate(event.time)} {/* Format the date in French */}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;