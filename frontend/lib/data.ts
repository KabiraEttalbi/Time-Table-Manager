/* eslint-disable prefer-const */
// TEMPORARY DATA

import { Departement } from "@/app/(dashboard)/list/departements/page";

export let role = "admin";

export const teachersData = [];

export const studentsData = [];

export const subjectsData = [];

export const classesData = [];

export const eventsData = [];

export const lessonsData = [];

export const departementsData = async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/departements`)
    const departements: Departement[] = await res.json();
    return { departements };
};

export const announcementsData = [];

