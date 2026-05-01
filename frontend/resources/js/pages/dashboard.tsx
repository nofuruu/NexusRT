import { TopCards } from "../components/modern/TopCards";
import { RevenueUpdate } from "../components/modern/RevenueUpdate";
import { YearlyBreakup } from "../components/modern/YearlyBreakup";
import { MonthlyEarning } from "../components/modern/MonthlyEarning";
import { RecentTransaction } from "../components/modern/RecentTransaction";
import { ProductPerformance } from "../components/modern/ProuctPerformance";
import { Footer } from "../components/modern/Footer";
import ProfileWelcome from "../components/modern/ProfileWelcome";

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
                <div className="lg:col-span-4 col-span-12 ">
                    <YearlyBreakup />
                    <MonthlyEarning />
                </div>
                <div className="lg:col-span-4 col-span-12">
                    <RecentTransaction />
                </div>
                <div className="lg:col-span-8 col-span-12 flex">
                    <ProductPerformance />
                </div>
                <div className="col-span-12">
                    <Footer />
                </div>
            </div>

        </>
    );
};

export default Moderndash;