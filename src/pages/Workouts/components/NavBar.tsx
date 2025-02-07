import { Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent className="flex gap-4 justify-center w-full" justify="center">
        <NavbarItem>
          <NavLink
            className={({ isActive }) =>
              classNames({ "border-b-4 border-primary": isActive })
            }
            to="/workouts/mauricio"
          >
            Mauricio
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className={({ isActive }) =>
              classNames({ "border-b-4 border-primary": isActive })
            }
            to="/workouts/maria"
          >
            Maria
          </NavLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
