import { TopCards } from 'src/components/dashboards/modern/TopCards';
import { RevenueUpdate } from 'src/components/dashboards/modern/RevenueUpdate';
import { RecentTransaction } from 'src/components/dashboards/modern/RecentTransaction';
import { Footer } from 'src/components/dashboards/modern/Footer';
import ProfileWelcome from 'src/components/dashboards/modern/ProfileWelcome';
import { StatusRumahList } from 'src/components/dashboards/modern/StatusRumahList';

const Moderndash = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <ProfileWelcome />
        </div>

        <div className="col-span-12">
          <TopCards />
        </div>

        <div className="lg:col-span-8 col-span-12 flex">
          <RevenueUpdate />
        </div>

        <div className="lg:col-span-4 col-span-12">
          <RecentTransaction />
        </div>

        <div className="col-span-12 flex">
          <StatusRumahList />
        </div>
        <div className="col-span-12">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Moderndash;
