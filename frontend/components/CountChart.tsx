"use client";
import { useStudents } from "@/app/(dashboard)/list/students/page";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const CountChart = () => {
  const students = useStudents() || []; // Ensure students is not undefined

  const totalCount = students.length;
  const maleCount = students.filter((student) => student.gender === "male").length;
  const femaleCount = students.filter((student) => student.gender === "female").length;

  const data = [
    { name: "Total", count: totalCount, fill: "white" },
    { name: "Filles", count: femaleCount, fill: "#FAE27C" },
    { name: "Garçons", count: maleCount, fill: "#C3EBFA" },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Étudiants</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        {/* Garçons */}
        <div className="flex flex-col gap-1 text-center">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{maleCount}</h1>
          <h2 className="text-xs text-gray-500">
            Garçons {`(${totalCount > 0 ? ((maleCount / totalCount) * 100).toFixed(2) : 0}%)`}
          </h2>
        </div>
        
        {/* Filles */}
        <div className="flex flex-col gap-1 text-center">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{femaleCount}</h1>
          <h2 className="text-xs text-gray-500">
            Filles {`(${totalCount > 0 ? ((femaleCount / totalCount) * 100).toFixed(2) : 0}%)`}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
