import {
  FileVideo,
  FileVideoIcon,
  History,
  HistoryIcon,
  Home,
  House,
  ListVideo,
  ListVideoIcon,
  ThumbsUp,
  ThumbsUpIcon,
  Twitter,
  TwitterIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const location = useLocation();

  const sideBarItems = [
    {
      name: "Home",
      slug: "/",
      icon: Home,
      solidIcon: House,
    },
    {
      name: "Like Video",
      slug: "/liked-videos",
      icon: ThumbsUp,
      solidIcon: ThumbsUpIcon,
    },
    {
      name: "History",
      slug: "/history",
      icon: History,
      solidIcon: HistoryIcon,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      icon: MdDashboard,
      solidIcon: MdDashboard,
    },
    {
      name: "Playlist",
      slug: "/playlist",
      icon: ListVideo,
      solidIcon: ListVideoIcon,
    },
    {
      name: "Subcriber",
      slug: "/subscribers",
      icon: Users,
      solidIcon: UsersIcon,
    },
    {
      name: "Tweets",
      slug: "/all-tweets",
      icon: Twitter,
      solidIcon: TwitterIcon,
    },
  ];

  return (
    <div className="flex flex-col h-full pt-20">
      <nav className="flex-1">
        <ul>
          {sideBarItems.map((item) => {
            const isActive = location.pathname === item.slug;
            const Icon = isActive ? item.solidIcon : item.icon;

            return (
              <Link to={item.slug} key={item.name}>
                <li
                  className={`flex items-center p-4 hover:bg-gray-900 rounded-lg ${
                    isActive ? "bg-gray-900 text-white" : ""
                  }`}
                >
                  <Icon size={20} className="mr-2" />
                  {!isCollapsed && <span>{item.name}</span>}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
