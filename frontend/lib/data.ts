/* eslint-disable prefer-const */
// TEMPORARY DATA

// Types
export type User = {
  id: string;
  name: string;
  email?: string;
  photo?: string;
  phone?: string;
};

export type Student = User & {
  studentId: string;
  anneeBac: number;
  class: string;
  address: string;
};

export type Teacher = User & {
  name: string;
};

export type Departement = {
  id: string;
  name: string;
  description: string;
};

export type Option = {
  id: string;
  name: string;
  description: string;
  duration: string;
  departement: Departement;
};

export type Module = {
  id: string;
  name: string;
  description: string;
  option: Option;
};

export type Room = {
  id: string;
  name: string;
};

export type EmploiDuTemps = {
  id: string;
  module: Module;
  room: Room;
  startTime: string;
  endTime: string;
  title: string; // Ajout pour affichage direct dans `react-big-calendar`
};

// Data
export let role = "admin";

export const teachersData: Teacher[] = [];
export const studentsData: Student[] = [];

export const optionsData = async (): Promise<Option[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/options`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Échec de la récupération des options");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const departementsData = async (): Promise<Departement[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/departements`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Échec de la récupération des départements");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const modulesData = async (): Promise<Module[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/module`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Échec de la récupération des modules");
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Les données des modules ne sont pas un tableau", data);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

 //
 export const fetchStudentSchedule = async (studentId: string): Promise<EmploiDuTemps[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/emplois-du-temps/student/${studentId}`, // Injection du studentId dans l'URL
      { headers: { "Content-Type": "application/json" } }
    );

    if (!res.ok) {
      console.error("Échec de la récupération de l'emploi du temps. Statut :", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Les données reçues ne sont pas un tableau :", data);
      return [];
    }

    return data.map((item: EmploiDuTemps) => {
      if (!item.startTime || !item.endTime || !item.module?.name) {
        console.error("Données manquantes dans l'élément :", item);
        return null; // Ignorer cet élément
      }

      return {
        ...item,
        start: new Date(item.startTime), // Conversion en objet Date
        end: new Date(item.endTime),     // Conversion en objet Date
        title: item.module.name,         // Nom du module comme titre
      };
    }).filter((item) => item !== null); // Filtrer les éléments invalides
  } catch (error) {
    console.error("Erreur lors de la récupération de l'emploi du temps :", error);
    return [];
  }
};

export const announcementsData: any[] = [];
export const classesData: any[] = [];
export const eventsData: any[] = [];
export const lessonsData: any[] = [];
