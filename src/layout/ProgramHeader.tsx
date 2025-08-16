import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  name: string;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const programItems: NavItem[] = [
  {
    name: "Details",
    path: "",
  },
  {
    name: "Users",
    path: "/users",
  },
  {
    name: "Admins",
    path: "/admins",
  },
];

// /program/[program_name]
// /program/[program_name]/users
// /program/[program_name]/admins
const ProgramHeaderTabs: React.FC = () => {
  const pathname = usePathname();
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const name = pathParts[2];
    setProgramName(name);
    if (name) {
      document.title = `Program: ${decodeURIComponent(name)}`;
    } else {
      document.title = "Program Details";
    }
  }, [pathname]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h2
            className="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            {decodeURIComponent(programName)}
          </h2>
          {renderNavItems(pathname, programName)}
        </div>
        <nav className="flex items-center">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href="/"
              >
                Home
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href={`/program`}
              >
                Programs
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href={`/program/${programName}`}
              >
                {decodeURIComponent(programName)}
                {pathname.split("/").slice(3).join(" / ") !== "" && (
                  <svg
                    className="stroke-current"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke=""
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            </li>
            {pathname.split("/").slice(3).join(" / ") !== "" && (
              <li className="text-sm text-gray-800 dark:text-white/90">
                {pathname.split("/").slice(3).join(" / ")}
              </li>
            )}
          </ol>
        </nav>
      </div>
    </>
  );
};

const renderNavItems = (pathname: string, programName: string) => {
  return (
    <nav>
      <ul className="flex space-x-4 justify-center bg-white p-1 rounded-md w-fit mr-auto">
        {programItems.map((item) => (
          <li
            key={item.name}
            className={` ${
              pathname === `/program/${programName}${item.path}`
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100 dark:hover:bg-white/[0.05]"
            }   rounded-md px-3 py-2 transition-colors duration-200 min-w-[100px] text-center`}
          >
            <Link href={`/program/${programName}${item.path}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProgramHeaderTabs;
