"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { useUser } from "@/lib/AuthUser";
import { useTeachers } from "../list/teachers/page";
import { schedules } from "../list/teachers/[id]/page";


const TeacherPage = () => {
  const user = useUser(); // Retrieve the user object from context
  const id = user?._id || ''; // Extract the id from the user object
  const teachers = useTeachers();

  const teacher = teachers.find((teacher) => teacher.user._id === id);
  // Check if teacher exists
  if (!teacher) {
    return <div>teacher not found</div>;
  }
    
  const schedule = schedules.filter((schedule) => schedule.user._id === teacher?.user._id);
  
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Emploi du Temps</h1>
          <BigCalendar schedules={schedule}/> 
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
