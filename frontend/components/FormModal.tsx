/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
import { JSX, useState } from "react";
import DepartementForm from "./forms/DepartementForm";
import OptionForm from "./forms/OptionForm";
import NiveauForm from "./forms/NiveauForm";
import ModuleForm from "./forms/ModuleForm";


const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Chargement...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Chargement...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any, onSuccess?: () => void) => JSX.Element;
} = {
  teachers: (type, data, onSuccess) => <TeacherForm type={type} data={data} onSuccess={onSuccess} />,
  students: (type, data, onSuccess) => <StudentForm type={type} data={data} onSuccess={onSuccess} />,
  departements: (type, data, onSuccess) => <DepartementForm type={type} data={data} onSuccess={onSuccess} />,
  options: (type, data, onSuccess) => <OptionForm type={type} data={data} onSuccess={onSuccess} />,
  niveau: (type, data, onSuccess) => <NiveauForm type={type} data={data} onSuccess={onSuccess} />,
  modules: (type, data, onSuccess) => <ModuleForm type={type} data={data} onSuccess={onSuccess} />,

};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teachers"
    | "departements"
    | "students"
    | "options"
    | "niveau"
    | "event"
    | "announcement"
    | "module";
  type: "create" | "update" | "delete";
  data?: any;
  id?: string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (id) {
        await axios.delete(`http://localhost:3001/${table}/${id}`);
        console.log(`${table.slice(0, -1)} deleted successfully`);
        setOpen(false); // Close the modal after deletion
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className="p-4 flex flex-col gap-4"
      >
        <span className="text-center font-medium">
          Toutes les données seront perdues. Êtes-vous sûr de vouloir supprimer cet enregistrement?
        </span>
        <button
          type="submit"
          className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
        >
          Supprimer
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, { ...data, _id: id }, () => setOpen(false)) // Pass the `id` as part of the `data` object
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;