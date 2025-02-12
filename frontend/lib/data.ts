/* eslint-disable prefer-const */
// TEMPORARY DATA


//Types
export type User = {

}

export type Student = {
    id: string;
    studentId: string;
    name: string;
    email?: string;
    photo: string;
    phone?: string;
    anneeBac: number;
    class: string;
    address: string;
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
    departement: Departement
  };  


//Data

export let role = "admin";

export const teachersData = [];

export const studentsData = [];

export const optionsData = async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/options`)
    const options: Option[] = await res.json();
    return { options };
};

export const classesData = [];

export const eventsData = [];

export const lessonsData = [];

export const departementsData = async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/departements`)
    const departements: Departement[] = await res.json();
    return { departements };
};

export const announcementsData = [];

