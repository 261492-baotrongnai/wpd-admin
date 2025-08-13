import {
  IconLayoutDashboard,
  IconPresentation,
  IconBuildings,
  IconBuildingPlus,
  IconPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "PROGRAMS",
  },
  {
    id: uniqueId(),
    title: "ดูโครงการทั้งหมด",
    icon: IconPresentation,
    href: "/program",
  },
  {
    id: uniqueId(),
    title: "สร้างโครงการใหม่",
    icon: IconPlus,
    href: "/program/create",
  },
  {
    navlabel: true,
    subheader: "ORGANIZATIONS",
  },
  {
    id: uniqueId(),
    title: "ดู organization ทั้งหมด",
    icon: IconBuildings,
    href: "/organization",
  },
  {
    id: uniqueId(),
    title: "สร้าง organization ใหม่",
    icon: IconBuildingPlus,
    href: "/organization/create",
  },
  // {
  //   navlabel: true,
  //   subheader: "AUTH",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
];

export default Menuitems;
