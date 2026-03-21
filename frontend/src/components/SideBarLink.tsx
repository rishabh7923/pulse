import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

function SideBarLink({ to, children }: { to: string, children: ReactNode }) {
    return (
        <li>
            <NavLink className={({ isActive }) =>
                `block w-full rounded-lg p-2 text-center transition-all duration-300
        hover:bg-(--sidebar-link-hover)
        ${isActive ? "bg-(--sidebar-link-active)" : ""}`
            } to={to}>
                <div className={`flex gap-2 items-center h-6`}>
                    {children}
                </div>
            </NavLink>
        </li>
    )
}

export default SideBarLink