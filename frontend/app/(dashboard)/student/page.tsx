"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { useUser } from "@/lib/AuthUser";
import { students } from "../list/students/page";
import { schedules } from "../list/students/[id]/page";

const StudentPage = () => {
    const user = useUser(); // Retrieve the user object from context
    const id = user?._id || ''; // Extract the id from the user object
    
    const student = students.find((student) => student.user._id === id);
    // Check if student exists
    if (!student) {
      return <div>Student not found</div>;
    }
  
    const schedule = schedules.filter((schedule) => schedule.user._id === student?.user._id);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Emploi du Temps {student.niveau?.name}</h1>
          <BigCalendar schedules={schedule}/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* <EventCalendar />  */}
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
