"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { useEffect } from "react";
import {sallesData} from '@/lib/data'

const { salles } = await sallesData();

// Schéma de validation
const salleSchema = z.object({
  name: z.string().min(1, { message: "Le nom de la salle est obligatoire !" }),
  capacite: z.coerce 
    .number()
    .min(1, { message: "La capacité doit être supérieure à 0 !" }),
  type: z.enum(["amphi", "normal", "haull"], {
    message: "Le type de salle est invalide !",
  }),
  disponible: z.boolean(),
});

type Inputs = z.infer<typeof salleSchema>;

const SalleForm = ({
  type,
  data,
  onSuccess,
}: {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(salleSchema),
  });

  // Pré-remplir le formulaire en mode "update"
  useEffect(() => {
    if (type === "update" && data) {
      const salle = salles.find((s) => s._id === data._id);
      if (salle) {
        setValue("name", salle.name);
        setValue("capacite", salle.capacite);
        setValue("type", salle.type);
        setValue("disponible", salle.disponible);
      }
    }
  }, [type, data, setValue]);

  // Soumission du formulaire
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const payload = {
        name: formData.name,
        capacite: formData.capacite,
        type: formData.type,
        disponible: formData.disponible,
      };

      if (type === "update") {
        await axios.put(`http://localhost:3001/salle/${data._id}`, payload);
      } else {
        await axios.post("http://localhost:3001/salle", payload);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Ajouter une Salle" : "Modifier  les Informations de la Salle"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations de la salle
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        {/* Nom de la salle */}
        <InputField
          label="Nom de la salle"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />

        {/* Capacité */}
        <InputField
          label="Capacité"
          name="capacite"
          type="number"
          defaultValue={data?.capacite}
          register={register}
          error={errors.capacite}
        />
        {/* Type de salle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Type de salle</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("type")}
            defaultValue={data?.type || ""}
          >
            <option value="" hidden>
              Sélectionner un type
            </option>
            <option value="amphi">Amphi</option>
            <option value="normal">Normal</option>
            <option value="haull">Haull</option>
          </select>
          {errors.type?.message && (
            <p className="text-xs text-red-400">{errors.type.message.toString()}</p>
          )}
        </div>
         {/* Disponibilité */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="disponible"
            {...register("disponible")}
            defaultChecked={data?.disponible || false}
          />
          <label htmlFor="disponible" className="text-sm">
            Disponible
          </label>
        </div>
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};

export default SalleForm;