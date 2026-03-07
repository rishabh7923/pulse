import { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

function MenuButton({ children, to }: { children: ReactNode; to: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `block w-full rounded-lg p-2 text-center transition-all duration-300
        hover:bg-(--sidebar-link-hover)
        ${isActive ? "bg-(--sidebar-link-active)" : ""}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default MenuButton