import Announcements from "@/components/Announcements";
import CountChart from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
          <Announcements/>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        {/* <EventCalendar /> */}
      </div>
    </div>
  );
};

export default AdminPage;
