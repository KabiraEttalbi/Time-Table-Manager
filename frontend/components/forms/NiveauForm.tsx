/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { options } from "@/app/(dashboard)/list/filieres/page";
import { Option } from "@/lib/data";
import { useEffect } from "react"; // Add useEffect for pre-filling form data
import { niveaux } from "@/app/(dashboard)/list/niveaux/page";

const schema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire !" }),
  cycle: z.string().min(1, { message: "Le cycle est obligatoire !" }),
  option: z.string().min(1, { message: "L'option 'est obligatoire !" }),
});
type Inputs = z.infer<typeof schema>;

const NiveauForm = ({
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
      // Find the niveau in the niveaus array
      const niveau = niveaux.find((n) => n._id === data._id);
      if (niveau) {
        console.log(niveau);
        setValue("name", niveau.name);
        setValue("cycle", niveau.cycle);
        setValue("option", niveau.option?._id);
      }
      
    }
  }, [type, data, setValue]);


  const onSubmit = handleSubmit(async (formData) => {
    try {
      // Construire le payload avec user et option
      const payload = {
        name: formData.name,
        cycle: formData.cycle,
        option: formData.option,


      };
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      } 
      if (type === "update") {
        console.log(data._id, payload);
        const response = await axios.put(`http://localhost:3001/niveau/${data._id}`, payload);
        console.log("niveau Updated:", response.data);
      }else if (type === "create") {
        const response = await axios.post("http://localhost:3001/niveau", payload);
        console.log("niveau Created:", response.data);
      }} 
      catch (error: any) {
        console.error("Error:", error.response.data || error.message);
      }
 } );
  
  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Ajouter un Niveau" : "Modifier les Informations du Niveau "}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations du niveau
      </span>
      <div className="flex  flex-wrap gap-4">
        <InputField
          label="Nom du niveau"
          name="name"   
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Cycle"
          name="cycle"
          defaultValue={data?.cycle}
          register={register}
          error={errors.cycle}
          style={{ width: "400px" }} 
        />
      </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Filière</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("option")}
            defaultValue={data?.option?.name || ""} // Use optional chaining to avoid errors
          >
            <option value="" hidden>Sélectionner une filière</option>
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

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};

export default NiveauForm;     