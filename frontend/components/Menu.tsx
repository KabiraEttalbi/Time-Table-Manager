import { role } from "@/lib/data";
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
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/teacher.png",
        label: "Enseignants",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Etudiants",
        href: "/list/students",
        visible: ["admin", "teacher"],
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
        label: "Niveaux",
        href: "/list/niveaux",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/module.png",
        label: "Modules",
        href: "/list/modules",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/salle.png",
        label: "Salles",
        href: "/list/salles",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/event.png",
        label: "Evénements",
        href: "/list/events",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/reservation.png",
        label: "Reservations",
        href: "/list/reservations",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/calendar.png",
        label: "Emplois du temps",
        href: "/list/timetables",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: "/announcement.png",
        label: "Annonces",
        href: "/list/announcement",
        visible: ["admin", "teacher", "student"],
      }
    ],
  }
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
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
