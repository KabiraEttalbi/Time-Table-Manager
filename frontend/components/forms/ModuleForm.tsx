/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { options } from "@/app/(dashboard)/list/filieres/page";
import { Niveau, Option, Teacher } from "@/lib/data";
import { useEffect } from "react"; // Add useEffect for pre-filling form data
import { modules } from "@/app/(dashboard)/list/modules/page";
import { niveaux } from "@/app/(dashboard)/list/niveaux/page";
import { teachers } from "@/app/(dashboard)/list/teachers/page";

const schema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire !" }),
  nbhours: z.coerce.number().min(1, { message: "Le nombre d'heures est obligatoire !" }),
  niveau: z.string().min(1, { message: "Le niveau est obligatoire !" }),
  option: z.string().min(1, { message: "L'option 'est obligatoire !" }),
  teacher: z
    .string()
    .min(1, { message: "Le nom de l'enseignant est obligatoire !" }),
});
type Inputs = z.infer<typeof schema>;

const moduleForm = ({
  type,
  data,
  onSuccess, // Add this prop
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void; // Callback function to notify parent
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue to pre-fill form fields
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // Pre-fill form fields if in update mode
  useEffect(() => {
    if (type === "update" && data) {
      // Find the module in the modules array
      const module = modules.find((m) => m._id === data._id);
      if (module) {
        setValue("name", module.name);
        setValue("nbhours", module.nbhours);
        setValue("option", module.option?._id);
        setValue("teacher", module.teacher?._id);
        setValue("niveau", module.niveau?._id);
      }
    }
  }, [type, data, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Construire le payload avec user et option
      const payload = {
        name: formData.name,
        nbhours: formData.nbhours,
        option: formData.option,
        niveau: formData.niveau,
        teacher: formData.teacher,
      };
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      }
      if (type === "update") {
        console.log(data._id, payload);
        const response = await axios.put(
          `http://localhost:3001/module/${data._id}`,
          payload
        );
        console.log("option Updated:", response.data);
      } else if (type === "create") {
        const response = await axios.post(
          "http://localhost:3001/module",
          payload
        );
        console.log("option Created:", response.data);
      }
    } catch (error: any) {
      console.error("Error:", error.response.data || error.message);
    }
  });

  return (

    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Ajouter un module"
          : "Modifier les Informations du module "}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations du module
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom du module"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Nombre d'heures"
          name="nbhours"
          defaultValue={data?.nbhours}
          register={register}
          type= "number"
          error={errors.nbhours}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Niveau</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("niveau")}
            defaultValue={data?.niveau?.name || ""} // Use optional chaining to avoid errors
          >
            <option value="" hidden>
              Sélectionner un niveau
            </option>   
            {niveaux.map((niveau: Niveau) => (
              <option key={niveau._id} value={niveau._id}>
                {niveau.name}
              </option>
            ))}
          </select>
          {errors.niveau?.message && (
            <p className="text-xs text-red-400">
              {errors.niveau.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Filière</label>
            <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("option")}
            defaultValue={data?.option?.name || ""} // Use optional chaining to avoid errors
            >
            <option value="" hidden>
                Sélectionner une filière
            </option>
            {options.map((option: Option) => (
                <option key={option._id} value={option._id}>
                {option.name}
                </option>
            ))}
            </select>
            {errors.option?.message && (
            <p className="text-xs text-red-400">
                {errors.option.message.toString()}
            </p>
            )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Enseigant</label>
            <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teacher")}
            defaultValue={`${data?.teacher?.user?.nom} ${data?.teacher?.user?.prenom}` || ""} // Use optional chaining to avoid errors
            >
            <option value="" hidden>
                Sélectionner un enseignant
            </option>
            {teachers.map((teacher: Teacher) => (
                <option key={teacher._id} value={teacher._id}>
                {`${teacher.user.nom} ${teacher.user.prenom}`}
                </option>
            ))}
            </select>
            {errors.teacher?.message && (
            <p className="text-xs text-red-400">
                {errors.teacher.message.toString()}
            </p>
            )}
        </div>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};

export default moduleForm;
