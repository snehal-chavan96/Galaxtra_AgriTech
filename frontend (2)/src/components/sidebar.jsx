import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CirclePlus,
  ALargeSmall,
  PanelRightDashed,
  House,
  Inbox,
  File,
  LayoutPanelLeft,
  Video,
  History,
  CircleEllipsis,
  MoveRight,
  Ellipsis,
  Search,
  SquarePlus,
  Rows4,
  BookmarkCheck,
  Maximize2,
  Crosshair,
  Briefcase,
  AlignCenter,
  Settings,
} from "lucide-react"; 
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-900 h-screen p-4 fixed left-0 top-10 transition-all duration-300`}
      >
        <div className="flex flex-row justify-between mb-3">
          <ALargeSmall className="h-5 w-5 cursor-pointer bg-purple-600 rounded-lg mt-1 mx-2" />
          {!isCollapsed && (
            <p className="text-sm cursor-pointer font-bold mt-1">
              Atharv's Workspace...
            </p>
          )}
          <PanelRightDashed
            className="h-5 w-5 cursor-pointer transform transition-all ease-in-out hover:scale-110 duration-300 mt-1 mx-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
        <hr />
        {/* <ul className="space-y-1 my-3 text-sm">
          {[
            { icon: House, label: "Home" },
            { icon: Inbox, label: "Inbox" },
            { icon: File, label: "Docs" },
            { icon: LayoutPanelLeft, label: "Dashboards" },
            { icon: Video, label: "Clips" },
            { icon: History, label: "Timesheets" },
            { icon: CircleEllipsis, label: "More" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-row cursor-pointer hover:bg-purple-700 rounded-lg "
            >
              <Icon className="h-5 w-5 p-1 my-2" />
              {!isCollapsed && <li className="mt-1">{label}</li>}
            </div>
          ))}
        </ul> */}
        <ul className="space-y-1 my-3 text-base">
          <Link
            to="/inbox"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <Inbox className="h-4 w-4 text-white" />
            <div className="text-white mx-2">Inbox</div>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <LayoutPanelLeft className="h-4 w-4 text-white" />
            <div className="text-white mx-2">Dashboard</div>
          </Link>
          <Link
            to="/docs"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <File className="h-4 w-4 text-white" />
            <div className="text-white mx-2">Docs</div>
          </Link>
          <Link
            to="/clips"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <Video className="h-4 w-4 text-white" />
            <div className="text-white mx-2">Clips</div>
          </Link>
          <Link
            to="/timesheets"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <History className="h-4 w-4 text-white" />
            <div className="text-white mx-2">Timesheets</div>
          </Link>
          <Link
            to="/more"
            className="flex items-center hover:bg-purple-700 rounded-md px-3 py-2 transition"
          >
            <CircleEllipsis className="h-4 w-4 text-white" />
            <div className="text-white mx-2">More</div>
          </Link>
        </ul>

        <hr />
        <div className="flex flex-row cursor-pointer my-3 text-sm text-gray-500 rounded-lg p-1">
          <p>Favorites</p>
          <MoveRight className="h-3 w-3 mt-1 mx-2" />
        </div>
        <hr />
        <div className="flex flex-row justify-between my-3 text-sm text-gray-500 rounded-lg p-1">
          <p>Spaces</p>
          <div className="flex flex-row">
            <Ellipsis className="h-4 cursor-pointer w-4 mt-1 mx-1" />
            <Search className="h-4 cursor-pointer w-4 mt-1 mx-1" />
            <SquarePlus className="h-4 cursor-pointer bg-purple-800 text-white rounded-lg w-4 mt-1 mx-1" />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar
