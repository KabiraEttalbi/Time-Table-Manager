/* eslint-disable prefer-const */
// TEMPORARY DATA


//Types
export type User = {
    id: string;
    nom: string;
    prenom: string;
    email?: string;
    username: string;
    password: string;
    isAuthenticated: boolean;
    role: 'admin' | 'enseignant' | 'etudiant';
};

export type Student = {
    id: string;
    user: User;
    niveau: Niveau;
    image: string;
    gender: string; 
    phoneNumber?: string;
    anneeBaccalaureat: number;
    option: Option;
    address: string;
  };
  
export type Niveau = {
    id: string;
    nom: string;
    cycle: number;
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

  export type Module = {
    id: string;
    name: string;
    description: string;
    option: Option;
};


//Data

export let role = "admin";

export const teachersData = [];

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

export const classesData = [];

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

  // Afficher les données pour vérifier la structure
  console.log("Données récupérées des Modules :", data);

  // Vérifier directement si 'data' est un tableau
  if (Array.isArray(data)) {
    return { modules: data };
  } else {
    console.error("Les données des modules ne sont pas un tableau", data);
    return { modules: [] };
  }
};



export const announcementsData = [];

