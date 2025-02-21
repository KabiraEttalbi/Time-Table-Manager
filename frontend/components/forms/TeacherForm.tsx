/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import axios from "axios";
import {useDepartements} from "@/app/(dashboard)/list/departements/page"
import { useTeachers } from "@/app/(dashboard)/list/teachers/page";
import { Departement } from "@/lib/data";
import { useEffect, useState } from "react"; // Add useEffect for pre-filling form data

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères !" })
    .max(20, { message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères !" }),
  email: z.string().email({ message: "Adresse e-mail invalide !" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères !" }),
  prenom: z.string().min(1, { message: "Le prénom est obligatoire !" }),
  nom: z.string().min(1, { message: "Le nom est obligatoire !" }),
  phoneNumber: z.string().min(1, { message: "Le numéro de téléphone est obligatoire !" }),
  address: z.string().min(1, { message: "L'adresse est obligatoire !" }),
  cni: z.string().min(1, { message: "Le CIN est obligatoire !" }),
  departement: z.string().min(1, { message: "Le département est obligatoire !" }),
  birthdate: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "La date de naissance est obligatoire !"
  }),
  gender: z.string().min(1, { message: "Le sexe est obligatoire !" }),
  image: z.any().refine(
    (file) => file instanceof File || typeof file === "string",
    {
      message: "L'image est obligatoire !",
    }
  ),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
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

  const formatDate = (date: Date | string): string => {
    if (!date) return ""; // Handle empty or invalid dates
  
    const d = new Date(date);
    if (isNaN(d.getTime())) return ""; // Handle invalid dates
  
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };

  const departements = useDepartements();
  const teachers = useTeachers();

  // Pre-fill form fields if in update mode
  useEffect(() => {
    if (type === "update" && data) {
      // Find the teacher in the teachers array
      const teacher = teachers.find((s) => s._id === data._id);
      if (teacher) {
        setValue("username", teacher.user.username);
        setValue("email", teacher.user.email);
        setValue("password", teacher.user.password);
        setValue("prenom", teacher.user.prenom);
        setValue("nom", teacher.user.nom);
        setValue("phoneNumber", teacher.phoneNumber);
        setValue("address", teacher.address);
        setValue("cni", teacher.cni);
        setValue("departement", teacher.department._id);
        // Format and set birthdate
        const formattedBirthdate = formatDate(teacher.birthdate);
        console.log("formattedBirthdate", formattedBirthdate);
        setValue("birthdate", formattedBirthdate);
        setValue("gender", teacher.gender);
        setValue("image", teacher.image);
      }
      
    }
  }, [type, data, setValue]);

  const [preview, setPreview] = useState<string | null>(null);
  
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Update preview
        setValue("image", reader.result as string); // Update form state
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = handleSubmit(async (formData) => {
    try {
  
      // Construire le payload avec user et teacher
      const payload = {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          prenom: formData.prenom,
          nom: formData.nom,
        },
        gender: formData.gender, 
        birthdate: formData.birthdate,
        cni: formData.cni,
        phoneNumber: formData.phoneNumber,
        department: formData.departement,
        address: formData.address,
        image: formData.image, // Base64 directement envoyée,
      };
      // Notify parent component of success
      if (onSuccess) {
        onSuccess();
      } 
      if (type === "update") {
        const response = await axios.put(`http://localhost:3001/teachers/${data._id}`, payload);
        console.log("teacher Updated:", response.data);
      }else if (type === "create") {
        const response = await axios.post("http://localhost:3001/teachers", payload);
        console.log("teacher Created:", response.data);
      }} 
      catch (error: any) {
        console.error("Error:", error.response.data || error.message);
      }
 } );
  
  

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Ajouter un Enseignant" : "Modifier les Informations de l'Enseignant "}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations d&apos;Authentication
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Nom d'utilisateur"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Mot de passe"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Informations Personnelles
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Prénom"
          name="prenom"
          defaultValue={data?.prenom}
          register={register}
          error={errors.prenom}
        />
        <InputField
          label="Nom"
          name="nom"
          defaultValue={data?.nom}
          register={register}
          error={errors.nom}
        />
        <InputField
          label="Date de naissance"
          name="birthdate"
          defaultValue={data?.birthdate}
          register={register}
          error={errors.birthdate}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sexe</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Numéro de téléphone"
          name="phoneNumber"
          defaultValue={data?.phoneNumber}
          register={register}
          error={errors.phoneNumber}
        />
        <InputField
          label="Addresse"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="CIN"
          name="cni"
          defaultValue={data?.cni}
          register={register}
          error={errors.cni}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Département</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("departement")}
            defaultValue={data?.department?.name || ""} // Use optional chaining to avoid errors
          >
            <option value="" hidden>Sélectionner un departement</option>
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
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="image"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Ajouter une photo</span>
          </label>
          <input
          type="file"
          id="image"
          {...register("image")}
          onChange={onFileChange}
          className="hidden"
          aria-label="Ajouter une photo"
          accept="image/*"
        />
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="w-24 h-24 rounded-md object-cover" />
          </div>
        )}
          {errors.image?.message && (
            <p className="text-xs text-red-400">
              {errors.image.message.toString()}
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

export default TeacherForm;     