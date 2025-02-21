/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { options } from "@/app/(dashboard)/list/filieres/page";
import {useDepartements} from "@/app/(dashboard)/list/departements/page"

import { useEffect } from "react"; // Add useEffect for pre-filling form data
import { Departement } from "@/lib/data";

const schema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire !" }),
  description: z.string().min(1, { message: "La description est obligatoire !" }),
  duration: z.string().min(1, { message: "La durée est obligatoire !" }),
  departement: z.string().min(1, { message: "Le département est obligatoire !" }),
});
type Inputs = z.infer<typeof schema>;

const OptionForm = ({
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

  const departements = useDepartements();
  

  // Pre-fill form fields if in update mode
  useEffect(() => {
    if (type === "update" && data) {
      // Find the option in the options array
      const option = options.find((o) => o._id === data._id);
      if (option) {
        console.log(option);
        setValue("name", option.name);
        setValue("description", option.description);
        setValue("duration", option.duration);
        setValue("departement", option.departement._id);
      }
      
    }
  }, [type, data, setValue]);


  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Construire le payload avec user et option
      const payload = {
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        departement: formData.departement,


      };
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      } 
      if (type === "update") {
        console.log(data._id, payload);
        const response = await axios.put(`http://localhost:3001/options/${data._id}`, payload);
        console.log("option Updated:", response.data);
      }else if (type === "create") {
        const response = await axios.post("http://localhost:3001/options", payload);
        console.log("option Created:", response.data);
      }} 
      catch (error: any) {
        console.error("Error:", error.response.data || error.message);
      }
 } );
  
  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Ajouter une Filière" : "Modifier les Informations de la Filière "}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations de la filière
      </span>
      <div className="flex  flex-wrap gap-4">
        <InputField
          label="Nom de la filière"
          name="name"   
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
          style={{ width: "400px" }} 
        />
      </div>
      <div className="flex  flex-wrap gap-4">
        <InputField
            label="Durée"
            name="duration"   
            defaultValue={data?.duration}
            register={register}
            error={errors.duration}
            />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Département</label>
                <select
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    {...register("departement")}
                    defaultValue={data?.department?.name || ""} // Use optional chaining to avoid errors
                >
                    <option value="" hidden>Sélectionner un département</option>
                    {departements.map((department: Departement) => (
                    <option key={department._id} value={department._id}>
                        {department.name}
                    </option>
                    ))}
                    </select>
                {errors.departement?.message && (
                    <p className="text-xs text-red-400">
                    {errors.departement.message.toString()}
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

export default OptionForm;     