import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../Icon";

function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full text-white px-4 pb-14 bg-gradient-to-b from-slate-900 from-10% to-slate-950 to-90%">
      {children}
      <nav className="bg-slate-800 text-white py-3 -mx-4 text-center w-full fixed bottom-0">
        <ul className="flex justify-center gap-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                classNames(
                  "inline-flex items-center py-2 px-4 rounded-lg hover:bg-primary-400",
                  { "bg-primary-400": isActive }
                )
              }
              to="/expenses"
            >
              <Icon prefix="fas" name="dollar-sign" className="mr-3" />
              Gastos
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                classNames(
                  "inline-flex items-center py-2 px-4 rounded-lg hover:bg-primary-400",
                  { "bg-primary-400": isActive }
                )
              }
              to="/bakery"
            >
              <Icon prefix="fas" name="utensils" className="mr-3" />
              Reposteria
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileLayout;
