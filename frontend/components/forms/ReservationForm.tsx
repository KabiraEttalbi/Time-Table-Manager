import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form"; // Import useWatch
import { z } from "zod";
import InputField from "../InputField";
import axios from "axios";
import { Salle, Module, sallesData, modulesData, reservationsData } from "@/lib/data";
import { useEffect } from "react";
import { useUser } from "@/lib/AuthUser";

const {salles} = await sallesData();
const {modules} = await modulesData();
const {reservations} = await reservationsData();

const schema = z.object({
  title: z.string().min(1, { message: "Le titre est obligatoire !" }),
  description: z.string().min(1, { message: "La description est obligatoire !" }),
  type: z.enum(["event", "course", "td", "tp"], {
    message: "Le type de reservation est invalide !",
  }),
  salle: z.string().min(1, { message: "La salle est obligatoire !" }),
  date: z.coerce.date().refine((date) => !isNaN(date.getTime()), {
    message: "La date est obligatoire !",
  }),
  heureDebut: z
    .string()
    .min(1, { message: "L'heure de début est obligatoire !" })
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
      message: "L'heure de début doit être au format HH:MM !",
    }),
  heureFin: z
    .string()
    .min(1, { message: "L'heure de fin est obligatoire !" })
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, {
      message: "L'heure de fin doit être au format HH:MM !",
    }),
  module: z.string().optional(), // Make module optional
});
type Inputs = z.infer<typeof schema>;

const ReservationForm = ({
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
    control, // Add control for useWatch
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // Watch the "type" field
  const selectedType = useWatch({
    control,
    name: "type",
    defaultValue: data?.type || "", // Default to data.type if in update mode
  });

  const user = useUser(); // Retrieve the user object from context
  const userId = user?._id
  const formatDate = (date: Date | string): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Pre-fill form fields if in update mode
  useEffect(() => {
    if (type === "update" && data) {
      const reservation = reservations.find((m) => m._id === data._id);
      if (reservation) {
        setValue("title", reservation.title);
        setValue("description", reservation.description);
        setValue("heureDebut", reservation.heureDebut);
        setValue("heureFin", reservation.heureFin);
        const formattedDate = formatDate(reservation.date);
        setValue("date", formattedDate);
        setValue("type", reservation.type);
        setValue("salle", reservation.salle?._id);
        if (["course", "tp", "td"].includes(reservation.type)) {
          setValue("module", reservation.module?._id || "");
        }
      }
    }
  }, [type, data, setValue]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        heureDebut: formData.heureDebut,
        heureFin: formData.heureFin,
        date: formData.date,
        salle: formData.salle,
        module: formData.module,
        type: formData.type,
        user: userId
      };
      if (onSuccess) {
        onSuccess();
      }
      if (type === "update") {
        const response = await axios.put(
          `http://localhost:3001/reservation/${data._id}`,
          payload
        );
        console.log("reservation Updated:", response.data);
      } else if (type === "create") {
        const response = await axios.post(
          "http://localhost:3001/reservation",
          payload
        );
        console.log("reservation Created:", response.data);
      }
    } catch (error: any) {
      console.error("Error:", error.response.data || error.message);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Ajouter une reservation"
          : "Modifier les Informations de reservation"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Informations de reservation
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Titre de la reservation"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />
        <InputField
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
          type="date"
        />
        <InputField
          label="Heure de Début"
          name="heureDebut"
          defaultValue={data?.heureDebut}
          register={register}
          error={errors.heureDebut}
        />
        <InputField
          label="Heure de fin"
          name="heureFin"
          defaultValue={data?.heureFin}
          register={register}
          error={errors.heureFin}
        />

        {/* Salle Select */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Salle</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("salle")}
            defaultValue={data?.salle?.name || ""}
          >
            <option value="" hidden>
              Sélectionner une salle
            </option>
            {salles.map((salle: Salle) => (
              <option key={salle._id} value={salle._id}>
                {salle.name}
              </option>
            ))}
          </select>
          {errors.salle?.message && (
            <p className="text-xs text-red-400">
              {errors.salle.message.toString()}
            </p>
          )}
        </div>

        {/* Type de reservation */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500">Type de reservation</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            {...register("type")}
            defaultValue={data?.type || ""}
          >
            <option value="" hidden>
              Sélectionner un type
            </option>
            <option value="event">Evénement</option>
            <option value="course">Cours</option>
            <option value="tp">TP</option>
            <option value="td">TD</option>
          </select>
          {errors.type?.message && (
            <p className="text-xs text-red-400">{errors.type.message.toString()}</p>
          )}
        </div>

        {/* Conditionally render Module Select */}
        {["course", "tp", "td"].includes(selectedType) && (
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Module</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...register("module")}
              defaultValue={data?.module?._id || ""}
            >
              <option value="" hidden>
                Sélectionner un module
              </option>
              {modules.map((module: Module) => (
              <option key={module._id} value={module._id}>
                {module.name}
              </option>
              ))}
            </select>
            {errors.module?.message && (
              <p className="text-xs text-red-400">
                {errors.module.message.toString()}
              </p>
            )}
          </div>
        )}
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
};

export default ReservationForm;