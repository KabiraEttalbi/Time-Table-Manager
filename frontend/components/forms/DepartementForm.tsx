/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { useDepartements } from "@/app/(dashboard)/list/departements/page";
import { useEffect } from "react"; // Add useEffect for pre-filling form data

const schema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire !" }),
  description: z.string().min(1, { message: "La description est obligatoire !" }),
});
type Inputs = z.infer<typeof schema>;

const DepartementForm = ({
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
      // Find the departement in the departements array
      const departement = departements.find((d) => d._id === data._id);
      if (departement) {
        console.log(departement);
        setValue("name", departement.name);
        setValue("description", departement.description);
      }
      
    }
  }, [type, data, setValue]);


  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Construire le payload avec user et departement
      const payload = {
        name: formData.name,
        description: formData.description,
      };
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      } 
      if (type === "update") {
        console.log(data);
        const response = await axios.put(`http://localhost:3001/departements/${data._id}`, payload);
        console.log("departement Updated:", response.data);
      }else if (type === "create") {
        const response = await axios.post("http://localhost:3001/departements", payload);
        console.log("departement Created:", response.data);
      }} 
      catch (error: any) {
        console.error("Error:", error.response.data || error.message);
      }
 } );
  
  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Ajouter un Dépatement" : "Modifier les Informations du Département "}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations du Departement
      </span>
      <div className="flex  flex-wrap gap-4">
        <InputField
          label="Nom du departement"
          name="name"   
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
          style={{ width: "350px" }} 
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};

export default DepartementForm;     