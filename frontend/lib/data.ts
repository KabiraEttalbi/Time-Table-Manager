/* eslint-disable prefer-const */
import { teachers } from '@/app/(dashboard)/list/teachers/page';
// TEMPORARY DATA

export const role = "admin";

//Types
export type User = {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  password: string;
  isAuthenticated: boolean;
  role: 'admin' | 'enseignant' | 'etudiant';
};

export type Student = {
  _id: string;
  user: User;
  niveau: Niveau;
  image: string;
  gender: string; 
  birthdate: Date;
  cne: string;
  cni: string;
  phoneNumber: string;
  anneeBaccalaureat: number;
  option: Option;
  address: string;
};

export type Niveau = {
  _id: string;
  name: string;
  cycle: string;
  option: Option;
};

export  type Teacher = {
  _id: string;
  user: User;
  department: Departement;
  image: string;
  gender: string; 
  birthdate: Date;
  cni: string;
  phoneNumber: string;
  modules?: Module[];
  address: string;
};

export type Departement = {
  _id: string;
  name: string;
  description: string;
};

export type Option = {
  _id: string;
  name: string;
  description: string;
  duration: string;
  departement: Departement
};  

export type Module = {
  _id: string;
  name: string;
  nbhours: number;
  niveau: Niveau;
  teacher: Teacher;
  option: Option;
};

export type Salle = {
_id: string;
name: string;
capacite:number;
type:"amphi"|"normal"|"haull"
module:Module;
disponible:boolean;

};


export type Emploidutemps = {
_id: string;
jour: string;
heureDebut: string;
heureFin: string;
module:Module;
salle:Salle;
type:"student"|"teacher";
user:User;

};

export type Reservation = {
  _id: string;
  salle: Salle;
  date:Date;
  heureDebut: string;
  heureFin: string;
  utilisateur:User;
  };



export const teachersData = async function getStaticProps() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/teachers`)
const teachers: Teacher[] = await res.json();
return { teachers };
};;

export const studentsData =  async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/students`)
  const students: Student[] = await res.json();
  return { students };
};

export const optionsData = async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/options`)
  const options: Option[] = await res.json();
  return { options };
};

export const niveauData = async function getStaticProps() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/niveau`)
const niveaux: Niveau[] = await res.json();
return { niveaux };
};;

export const eventsData = [];

export const lessonsData = [];

export const departementsData = async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/departements`)
  const departements: Departement[] = await res.json();
  return { departements };
};

export const modulesData = async function getStaticProps() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/module`);

if (!res.ok) {
  console.error("Échec de la récupération des modules");
  return { modules: [] };
}

const data = await res.json();

// Vérifier directement si 'data' est un tableau
if (Array.isArray(data)) {
  return { modules: data };
} else {
  console.error("Les données des modules ne sont pas un tableau", data);
  return { modules: [] };
}
};

export const schedulesData = async function getStaticProps() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/emploi-du-temps`);
const schedules: Emploidutemps[] = await res.json();
return { schedules };
};

export const sallesData = async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/salle`);
  if (!res.ok) {
    console.error("Échec de la récupération des salles");
    return { salles: [] };
  }
  const salles: Salle[] = await res.json();
  return { salles };
};

export const reservationsData = async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations`);
  if (!res.ok) {
    console.error("Échec de la récupération des réservations");
    return { reservations: [] };
  }
  const reservations: Emploidutemps[] = await res.json();
  return { reservations };
};





export const announcementsData = [];

