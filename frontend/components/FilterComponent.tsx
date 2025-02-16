import { useState } from "react";

const FilterComponent = ({ onFilter }) => {
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");

  const handleFilter = () => {
    onFilter({ department, teacher });
  };

  return (
    <div>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Tous les départements</option>
        {/* Ajoutez les options des départements ici */}
      </select>
      <select value={teacher} onChange={(e) => setTeacher(e.target.value)}>
        <option value="">Tous les enseignants</option>
        {/* Ajoutez les options des enseignants ici */}
      </select>
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
};

export default FilterComponent;