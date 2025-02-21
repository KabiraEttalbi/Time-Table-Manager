/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Module, Salle, Teacher } from "@/lib/data";
import { useEffect, useState } from "react";
import { useReservations } from "@/app/(dashboard)/list/reservations/page";
import { useModules } from "@/app/(dashboard)/list/modules/page";
import { useSalles } from "@/app/(dashboard)/list/salles/page";
import { schedules } from "@/app/(dashboard)/list/students/[id]/page";
import { useState } from "react";

const morningStartHours = ["08:00", "09:00", "10:00", "11:00"];
const afternoonStartHours = ["13:00", "14:00", "15:00", "16:00"];
const morningEndHours = ["09:00", "10:00", "11:00", "12:00"];
const afternoonEndHours = ["14:00", "15:00", "16:00", "17:00"];

const schema = z.object({
  module: z.string().min(1, { message: "Le module est obligatoire !" }),
  salle: z.string().min(1, { message: "La salle est obligatoire !" }),
  heureDebut: z.string().min(1, { message: "L'heure de début est obligatoire !" }),
  heureFin: z.string().min(1, { message: "L'heure de fin est obligatoire !" }),
});

type Inputs = z.infer<typeof schema>;

const TimetableForm = ({
  type,
  data,
  onSuccess,
  teacher,
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
  teacher?: Teacher;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  
  const salles = useSalles();
  const modules = useModules();
  const reservations = useReservations();
  const [teacherModules, setTeacherModules] = useState<Module[]>([]);

  const [conflictError, setConflictError] = useState<string | null>(null);

  // Log teacher and modules before rendering options
  console.log("Teacher data:", teacher);
  console.log("Modules data:", teacher?.modules);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (!isSalleAvailable(formData.salle, formData.heureDebut, formData.heureFin)) {
        setConflictError("La salle n'est pas disponible pour ce créneau horaire.");
        return;
      }

      if (hasStudentConflict(formData.heureDebut, formData.heureFin)) {
        setConflictError("Conflit avec l'emploi du temps des étudiants.");
        return;
      }

      const payload = {
        module: formData.module,
        salle: formData.salle,
        heureDebut: formData.heureDebut,
        heureFin: formData.heureFin,
      };

      if (onSuccess) {
        onSuccess();
      }

      if (type === "update") {
        const response = await axios.put(
          `http://localhost:3001/reservation/${data._id}`,
          payload
        );
        console.log("Reservation modifiée:", response.data);
      } else if (type === "create") {
        const response = await axios.post(
          "http://localhost:3001/reservation",
          payload
        );
        console.log("Reservation créée:", response.data);
      }
    } catch (error: any) {
      console.error("Erreur:", error.response.data || error.message);
    }
  });

  const isSalleAvailable = (salleId: string, heureDebut: string, heureFin: string) => {
    const reservationsForSalle = reservations.filter(reservation => reservation.salle._id === salleId);
    const newStartTime = new Date(`1970-01-01T${heureDebut}`);
    const newEndTime = new Date(`1970-01-01T${heureFin}`);

    return !reservationsForSalle.some(reservation => {
      const reservationStartTime = new Date(`1970-01-01T${reservation.heureDebut}`);
      const reservationEndTime = new Date(`1970-01-01T${reservation.heureFin}`);
      return (newStartTime < reservationEndTime && newEndTime > reservationStartTime);
    });
  };

  const hasStudentConflict = (heureDebut: string, heureFin: string) => {
    const studentSchedules = schedules.filter(schedule => schedule.type === "student");
    const newStartTime = new Date(`1970-01-01T${heureDebut}`);
    const newEndTime = new Date(`1970-01-01T${heureFin}`);

    return studentSchedules.some(schedule => {
      const scheduleStartTime = new Date(`1970-01-01T${schedule.heureDebut}`);
      const scheduleEndTime = new Date(`1970-01-01T${schedule.heureFin}`);
      return (newStartTime < scheduleEndTime && newEndTime > scheduleStartTime);
    });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Ajouter une réservation" : "Modifier une réservation"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {/* Sélection du module */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Module</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("module")}
          >
            <option value="">Sélectionner un module</option>
            {teacher?.modules?.map((module) => (
              <option key={module._id} value={module._id}>
                {module.name}
              </option>
            ))}
          </select>
          {errors.module?.message && (
            <p className="text-xs text-red-400">{errors.module.message.toString()}</p>
          )}
        </div>

        {/* Sélection de la salle */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Salle</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("salle")}
          >
            <option value="">Sélectionner une salle</option>
            {salles.map((salle) => (
              <option key={salle._id} value={salle._id}>
                {salle.name}
              </option>
            ))}
          </select>
          {errors.salle?.message && (
            <p className="text-xs text-red-400">{errors.salle.message.toString()}</p>
          )}
        </div>

        {/* Heure de début */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Heure de début</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("heureDebut")}
          >
            <option value="">Sélectionner l'heure de début</option>
            <optgroup label="Matin">
              {morningStartHours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </optgroup>
            <optgroup label="Après-midi">
              {afternoonStartHours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.heureDebut?.message && (
            <p className="text-xs text-red-400">{errors.heureDebut.message.toString()}</p>
          )}
        </div>

        {/* Heure de fin */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Heure de fin</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("heureFin")}
          >
            <option value="">Sélectionner l'heure de fin</option>
            <optgroup label="Matin">
              {morningEndHours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </optgroup>
            <optgroup label="Après-midi">
              {afternoonEndHours.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.heureFin?.message && (
            <p className="text-xs text-red-400">{errors.heureFin.message.toString()}</p>
          )}
        </div>
      </div>

      {conflictError && <p className="text-xs text-red-400">{conflictError}</p>}

      <button className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};


export default TimetableForm;




