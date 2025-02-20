"use client";

import { useUser } from "@/lib/AuthUser";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Acceuil",
        href: "/admin",
        visible: ["admin"],
      },
      {
        icon: "/teacher.png",
        label: "Enseignants",
        href: "/list/teachers",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/student.png",
        label: "Etudiants",
        href: "/list/students",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/departement.png",
        label: "Departements",
        href: "/list/departements",
        visible: ["admin"],
      },
      {
        icon: "/filiere.png",
        label: "Filieres",
        href: "/list/filieres",
        visible: ["admin"],
      },
      {
        icon: "/niveau.png",
        label: "Semestres",
        href: "/list/niveaux",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/module.png",
        label: "Modules",
        href: "/list/modules",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/salle.png",
        label: "Salles",
        href: "/list/salles",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/event.png",
        label: "Evénements",
        href: "/list/events",
        visible: ["admin", "enseignant", "etudiant"],
      },
      {
        icon: "/reservation.png",
        label: "Reservations",
        href: "/list/reservations",
        visible: ["admin", "enseignant"],
      },
      {
        icon: "/calendar.png",
        label: "Emplois du temps",
        href: "/list/timetables",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Annonces",
        href: "/list/announcement",
        visible: ["admin", "enseignant", "etudiant"],
      }
    ],
  }
];

const Menu = () => {
  const user = useUser(); // Retrieve the user object from context
  const role = user?.role || ''; // Extract the role from the user object

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) { // Check if the role is included in the visible array
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;