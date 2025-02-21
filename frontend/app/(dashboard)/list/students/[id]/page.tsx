import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import Image from "next/image";
import { students } from "../page";
import { schedulesData } from "@/lib/data";

export const {schedules} = await schedulesData();
console.log(schedules)

const SingleStudentPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // Get student ID from URL
  const student = students.find((student) => student._id === id);
  // Check if student exists
  if (!student) {
    return <div>Student not found</div>;
  }

  const schedule = schedules.filter((schedule) => schedule.user._id === student?.user._id);
  console.log(schedule)

  if (student) {
    return (
      <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  src={student.image}
                  alt=""
                  width={144}
                  height={144}
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-xl font-semibold">{`${
                  student.user.nom + " " + student.user.prenom
                }`}</h1>
                <p className="text-sm text-gray-500">
                  {student.cne.toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                  Année Baccalaureat : {student.anneeBaccalaureat}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/identity.png" alt="" width={14} height={14} />
                    <span>{student.cni.toUpperCase()}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>{new Date(student.birthdate).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>{student.user.email}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>{student.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleLesson.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">{student.option.name}</h1>
                  <span className="text-sm text-gray-400">Filière</span>
                </div>
              </div>
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
                <Image
                  src="/singleClass.png"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <div className="">
                  <h1 className="text-xl font-semibold">{`${student.niveau.name} ${student.niveau.cycle}`}</h1>
                  <span className="text-sm text-gray-400">Semestre</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
            <h1>Emploi du temps</h1>
            <BigCalendar  schedules={schedule}/>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-4">
          <Announcements />
        </div>
      </div>
    );
  }
};

export default SingleStudentPage;