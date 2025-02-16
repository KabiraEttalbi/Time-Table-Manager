import { useState } from "react";
import { Salle, Emploidutemps, Module } from "@/lib/data";

const ReservationForm = ({
  onReserve,
  schedules,
  salles,
  modules,
}: {
  onReserve: (reservation: Emploidutemps) => void;
  schedules: Emploidutemps[];
  salles: Salle[];
  modules: Module[];
}) => {
  const [jour, setJour] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [salleId, setSalleId] = useState("");
  const [moduleId, setModuleId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier les conflits de réservation
    const isConflict = schedules.some((schedule) => {
      return (
        schedule.salle._id === salleId &&
        schedule.jour === jour &&
        ((heureDebut >= schedule.heureDebut && heureDebut < schedule.heureFin) ||
          (heureFin > schedule.heureDebut && heureFin <= schedule.heureFin) ||
          (heureDebut <= schedule.heureDebut && heureFin >= schedule.heureFin))
      );
    });

    if (isConflict) {
      alert("Conflit de réservation : La salle est déjà réservée à cette heure.");
      return;
    }

    // Trouver la salle et le module sélectionnés
    const selectedSalle = salles.find((salle) => salle._id === salleId);
    const selectedModule = modules.find((module) => module._id === moduleId);

    if (!selectedSalle || !selectedModule) {
      alert("Veuillez sélectionner une salle et un module valides.");
      return;
    }

    // Créer la réservation
    const newReservation: Emploidutemps = {
      _id: Math.random().toString(), // Générer un ID temporaire
      jour,
      heureDebut,
      heureFin,
      salle: selectedSalle,
      module: selectedModule,
      type: "teacher",
      user: { _id: "", nom: "", prenom: "", email: "", username: "", password: "", isAuthenticated: false, role: "enseignant" },
    };

    onReserve(newReservation);
    alert("Réservation effectuée avec succès !");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Jour</label>
        <input
          type="date"
          value={jour}
          onChange={(e) => setJour(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heure de début</label>
        <input
          type="time"
          value={heureDebut}
          onChange={(e) => setHeureDebut(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heure de fin</label>
        <input
          type="time"
          value={heureFin}
          onChange={(e) => setHeureFin(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Salle</label>
        <select
          value={salleId}
          onChange={(e) => setSalleId(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Sélectionnez une salle</option>
          {salles.map((salle) => (
            <option key={salle._id} value={salle._id}>
              {salle.name} ({salle.type})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Module</label>
        <select
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Sélectionnez un module</option>
          {modules.map((module) => (
            <option key={module._id} value={module._id}>
              {module.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Réserver
      </button>
    </form>
  );
};

export default ReservationForm;