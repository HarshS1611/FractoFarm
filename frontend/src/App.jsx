import { Routes, Route } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import "./assets/css/animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-nice-select/css/nice-select.css";
import "./assets/css/bootstrap-icons.css";
import "tiny-slider/dist/tiny-slider.css";
import "./assets/scss/style.scss";

import HomeOne from "./pages/HomeOne";

import ExploreOne from "./pages/ExploreOne";
import ExploreTwo from "./pages/ExploreTwo";
import FeaturedItems from "./pages/FeaturedItems";
import LiveBidding from "./pages/LiveBidding";
import Collections from "./pages/Collections";

import LiveAuctionDetails from "./components/liveAuction/LiveAuctionDetails";

import Dashboard from "./dashboard/Dashboard";
import DashboardLiveBids from "./dashboard/LiveBids";
import DashboardCollection from "./dashboard/MyCollection";
import DashboardWallet from "./dashboard/MyWallet";
import DashboardNotification from "./dashboard/Notifications";
import DashboardNotificationDetails from "./dashboard/NotificationDetails";
import DashboardSettings from "./dashboard/Settings";

import Activity from "./pages/Activity";
import CreateNew from "./pages/CreateNew";
import ConnectWallet from "./pages/ConnectWallet";

import NotFound from "./pages/NotFound";

import Farm from "./pages/Farm";
import LiveFarmDetails from "./components/liveFarm/liveFarmDetails";
import Epns from "./dashboard/epns";
import EpnsOpt from "./dashboard/epnsOpt";
import SendepnsNotification from "./dashboard/SendepnsNotification.js";
import BridgeComponent from "./dashboard/BridgeComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<HomeOne />} />
        <Route path="/home1" element={<HomeOne />} />

        <Route path="/farm" element={<Farm />} />
        <Route path="/explore2" element={<ExploreTwo />} />
        <Route path="/featured-items" element={<FeaturedItems />} />
        <Route path="/live-bidding" element={<LiveBidding />} />
        <Route path="/collections" element={<Collections />} />

        <Route path="/live-bid/:BIDSID" element={<LiveAuctionDetails />} />
        <Route path="/live-farm/:BIDSID" element={<LiveFarmDetails />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bridge" element={<BridgeComponent />} />
        <Route path="/epns" element={<Epns />} />
        <Route path="/epnsfeed" element={<Epns />} />
        <Route path="/epnsOpt" element={<EpnsOpt />} />
        <Route path="/epnsNotify" element={<SendepnsNotification />} />
        <Route path="/live-bids" element={<DashboardLiveBids />} />
        <Route path="/my-collection" element={<DashboardCollection />} />
        <Route path="/my-wallet" element={<DashboardWallet />} />
        <Route path="/notifications" element={<DashboardNotification />} />
        <Route
          path="/notification-details/:NOTIFYID"
          element={<DashboardNotificationDetails />}
        />
        <Route path="/settings" element={<DashboardSettings />} />

        <Route path="/activity" element={<Activity />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Scroll To Top */}
      <ScrollToTop
        id="scrollTopButton"
        width="14"
        height="14"
        component={<i className="bi bi-arrow-up-short" />}
        color="white"
        smooth
        top={200}
      />
    </div>
  );
}

export default App;
