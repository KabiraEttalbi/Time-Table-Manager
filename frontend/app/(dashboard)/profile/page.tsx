// app/profile/page.js
'use client';

import { useUser } from "@/lib/AuthUser";
import { useState, useEffect } from "react";
import { useStudents } from "../list/students/page";
import { useTeachers } from "../list/teachers/page";
import { useModules } from "../list/modules/page";

const ProfilePage = () => {
  const user = useUser();
  const [item, setItem] = useState(null);
  const teachers = useTeachers();
  const students = useStudents();
  const modules = useModules(); // Assuming you have a hook to fetch all modules

  useEffect(() => {
    if (user?._id) {
      // Check if the user is a student
      const student = students.find(s => s.user._id === user._id);
      if (student) {
        setItem({ type: 'student', data: student });
        return;
      }

      // Check if the user is a teacher
      const teacher = teachers.find(t => t.user._id === user._id);
      if (teacher) {
        setItem({ type: 'teacher', data: teacher });
        return;
      }
    }
  }, [user, students, teachers]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profil de l'utilisateur</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <img
            src="/avatar.png"
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.prenom} {user?.nom}
            </h2>
            <p className="text-gray-500">{user?.role}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p>
              <span className="font-medium">Téléphone:</span>{" "}
              {item?.data?.phoneNumber || 'Non renseigné'}
            </p>
          </div>
        </div>

        {/* Display additional information based on user type */}
        {item && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Informations supplémentaires</h3>
            {item.type === 'student' && (
              <div className="space-y-2">
                <p><span className="font-medium">Niveau:</span> {item.data.niveau.name}</p>
                <p><span className="font-medium">CNE:</span> {item.data.cne}</p>
                <p><span className="font-medium">Année du Baccalauréat:</span> {item.data.anneeBaccalaureat}</p>
                <p><span className="font-medium">Adresse:</span> {item.data.address}</p>
              </div>
            )}
            {item.type === 'teacher' && (
              <div className="space-y-2">
                <p><span className="font-medium">Département:</span> {item.data.department.name}</p>
                {/* <p>
                  <span className="font-medium">Modules:</span>{" "}
                  {item.data.modules
                    ?.map(moduleId => {
                      const module = modules.find(m => m === moduleId);
                      return module ? module.name : null;
                    })
                    .filter(name => name !== null)
                    .join(', ')}
                </p> */}
                <p><span className="font-medium">Adresse:</span> {item.data.address}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;