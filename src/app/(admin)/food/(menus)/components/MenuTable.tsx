"use client";

import Fuse from "fuse.js";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Modal } from "@/components/ui/modal";

interface MenuTableProps {
  menuItems: Menu[];
}

import type { BadgeColor } from "@/components/ui/badge/Badge";
import { useModal } from "@/hooks/useModal";
import { Menu } from "@/types/menu.types";
import EditMenuForm from "./EditMenuForm";
import Pagination from "@/components/tables/Pagination";
import CategoryCount from "./CategoryCount";
import { deleteFood } from "@/actions/delete-food";

const renderBadge = (color: BadgeColor, text: string, show: boolean) => (
  <Badge
    variant="light"
    color={color}
    size="sm"
    endIcon={show ? <IconX stroke={1.25} height={16} width={16} /> : null}
  >
    {text}
  </Badge>
);

// type FilterOption = {
//   label: JSX.Element;
//   value: {
//     is_confirmed?: boolean;
//     is_rejected?: boolean;
//     grade?: string;
//   };
// };

const filterOptions = (showCloseIcon: boolean) => [
  {
    label: renderBadge("primary", "อาหาร-ของว่าง", showCloseIcon),
    value: { category: "อาหาร-ของว่าง" },
  },
  {
    label: renderBadge("primary", "เครื่องดื่ม", showCloseIcon),
    value: { category: "เครื่องดื่ม" },
  },
  {
    label: renderBadge("primary", "ผลไม้", showCloseIcon),
    value: { category: "ผลไม้" },
  },
  {
    label: renderBadge("primary", "ธัญพืช", showCloseIcon),
    value: { category: "ธัญพืช" },
  },
  {
    label: renderBadge("warning", "grade A", showCloseIcon),
    value: { grade: "A" },
  },
  {
    label: renderBadge("warning", "grade B", showCloseIcon),
    value: { grade: "B" },
  },
  {
    label: renderBadge("warning", "grade C", showCloseIcon),
    value: { grade: "C" },
  },
];

// type Grade = "A" | "B" | "C";

// type FilterOptionValue = {
//   is_confirmed?: boolean[];
//   is_rejected?: boolean[];
//   grades?: Grade[];
// };

export default function MenuTable({ menuItems }: MenuTableProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [filterBadges, setFilterBadges] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [optimisticItems, setOptimisticItems] = useState<Menu[] | null>(null);

  // Transition state for server action
  const [isPending, startTransition] = useTransition();

  const itemsPerPage = 10;

  // Keep filteredItems updated; also clear selections for removed rows
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => filteredItems.some((it) => it.id === id))
    );
  }, [filteredItems]);

  // Bulk delete handler using server action
  function handleBulkDelete() {
    if (selectedIds.length === 0 || isPending) return;

    const ids = [...selectedIds];

    // Optimistic UI: remove items locally
    const prev = filteredItems;
    setOptimisticItems(prev);
    setFilteredItems(prev.filter((item) => !ids.includes(item.id)));
    setSelectedIds((prevSel) => prevSel.filter((id) => !ids.includes(id)));

    startTransition(async () => {
      const result = await deleteFood(ids);
      if (!result.success) {
        // Revert on failure
        if (optimisticItems) setFilteredItems(optimisticItems);
        console.error(result.message);
      }
      setOptimisticItems(null);
    });
  }

  function toggleSelectSingle(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for current page
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // function toggleSelectAllCurrentPage() {
  //   const pageIds = paginatedItems.map((i) => i.id);
  //   const allSelected = pageIds.every((id) => selectedIds.includes(id));
  //   if (allSelected) {
  //     setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
  //   } else {
  //     setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
  //   }
  // }

  // Header checkbox indeterminate handling
  const headerCheckboxRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const pageIds = paginatedItems.map((i) => i.id);
    const checkedCount = pageIds.filter((id) =>
      selectedIds.includes(id)
    ).length;
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        checkedCount > 0 && checkedCount < pageIds.length;
    }
  }, [paginatedItems, selectedIds]);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function closeDropdown() {
    setIsDropdownOpen(false);
  }

  function addFilter(index: number) {
    if (index >= 0) {
      if (!filterBadges.includes(index)) {
        setFilterBadges((prev) => [...prev, index]);
      }
    }
  }

  function removeFilter(index: number) {
    if (index >= 0) {
      if (filterBadges.includes(index)) {
        setFilterBadges((prev) => prev.filter((n) => n !== index));
      }
    }
  }

  function MenuClick(data: Menu) {
    console.log("Menu item clicked:", data);
    openModal();
    setSelectedMenu(data);
  }

  // filter and search logic
  useEffect(() => {
    let finalFiltered = menuItems;

    // Apply filters if any
    if (filterBadges.length > 0) {
      const activeFilters = filterBadges.map(
        (index) => filterOptions(false)[index].value
      );

      const gradeFilters = activeFilters.filter((f) => f && f.grade);

      // Filter by category
      const categoryFilters = activeFilters.filter((f) => f && f.category);
      if (categoryFilters.length > 0) {
        finalFiltered = finalFiltered.filter((item) =>
          categoryFilters.some(
            (filter) => filter && item.category === filter.category
          )
        );
      }

      // Then filter by grade (if any grade filter exists)
      if (gradeFilters.length > 0) {
        finalFiltered = finalFiltered.filter((item) =>
          gradeFilters.some((filter) => filter && item.grade === filter.grade)
        );
      }
    }

    // Fuzzy search by name using Fuse.js
    if (searchTerm.trim() !== "") {
      const fuse = new Fuse(finalFiltered, {
        keys: ["name"], // search by menu name
        threshold: 0.4, // adjust for fuzziness (lower = stricter)
      });
      finalFiltered = fuse
        .search(searchTerm.trim())
        .map((result) => result.item);
    }

    setFilteredItems(finalFiltered);
  }, [filterBadges, menuItems, searchTerm]);

  const renderFilteredBadges = (filterBadges: number[]) => {
    if (filterBadges.length === 0) {
      return (
        <div className="flex flex-col gap-1 max-w-[400px] justify-end my-auto">
          {renderBadge("light", "No filters applied", false)}
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-1 max-w-[400px] justify-end my-auto">
        {(filterBadges.includes(0) ||
          filterBadges.includes(1) ||
          filterBadges.includes(2) ||
          filterBadges.includes(3)) && (
          <div className="flex flex-row justify-end">
            <span className="text-gray-400 dark:text-gray-400 ">category:</span>
            <div className="flex flex-row gap-2 ml-2">
              {filterOptions(true)
                .slice(0, 4)
                .map((option, index) => {
                  if (filterBadges.includes(index)) {
                    return (
                      <div
                        key={index}
                        className="px-auto cursor-pointer"
                        onClick={() => removeFilter(index)}
                      >
                        {filterOptions(true)[index].label}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
        {(filterBadges.includes(4) ||
          filterBadges.includes(5) ||
          filterBadges.includes(6)) && (
          <div className="flex flex-row justify-end">
            <span className="text-gray-400 dark:text-gray-400 ">grade:</span>
            <div className="flex flex-row gap-2 ml-2">
              {filterOptions(true)
                .slice(4, 7)
                .map((option, index) => {
                  if (filterBadges.includes(index + 4)) {
                    return (
                      <div
                        key={index + 4}
                        className="px-auto cursor-pointer"
                        onClick={() => removeFilter(index + 4)}
                      >
                        {filterOptions(true)[index + 4].label}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDropdownItems = () => {
    return (
      <>
        {filterOptions(false)
          .slice(0, 4)
          .map((option, index) => (
            <DropdownItem
              key={index}
              tag="a"
              onItemClick={() => addFilter(index)}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {option.label}
            </DropdownItem>
          ))}

        <div className="border-b border-gray-200 dark:border-white/[0.05] my-1" />
        {filterOptions(false)
          .slice(4, 7)
          .map((option, index) => (
            <DropdownItem
              key={index + 4}
              tag="a"
              onItemClick={() => addFilter(index + 4)}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {option.label}
            </DropdownItem>
          ))}
        <div className="border-b border-gray-200 dark:border-white/[0.05] my-1" />
        <DropdownItem
          tag="a"
          onItemClick={() => {
            setFilterBadges([]);
            setFilteredItems(menuItems);
          }}
          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          {renderBadge("light", "Clear Filters", false)}
        </DropdownItem>
      </>
    );
  };

  const renderDropdownFilter = () => {
    return (
      <div className="relative inline-block">
        <Button
          variant="outline"
          className="dropdown-toggle h-full"
          size="sm"
          startIcon={<IconFilter stroke={1.5} />}
          onClick={toggleDropdown}
        >
          Filter
        </Button>

        <Dropdown
          isOpen={isDropdownOpen}
          onClose={closeDropdown}
          className="w-40 p-2 top-8 "
        >
          {renderDropdownItems()}
        </Dropdown>
      </div>
    );
  };

  const searchByNameInput = () => {
    return (
      <div className="relative md:w-[440px] w-full">
        <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
          <IconSearch stroke={1.5} className="text-gray-400" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาด้วยชื่อเมนูอาหาร..."
          className="dark:bg-dark-900 h-11 w-[100%] md:w-[440px] rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />

        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
        >
          <span> Clear </span>
        </button>
      </div>
    );
  };

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterBadges, searchTerm]);

  const renderCategoryCounts = () => {
    const categories = Array.from(
      new Set(menuItems.map((item) => item.category))
    );

    return categories.map((category) => {
      const count = menuItems.filter(
        (item) => item.category === category
      ).length;

      return (
        <div
          onClick={() =>
            addFilter(
              filterOptions(false).findIndex(
                (opt) => opt.value.category === category
              )
            )
          }
          key={category}
          className="cursor-pointer"
        >
          <CategoryCount key={category} category={category} count={count} />
        </div>
      );
    });
  };

  // const pageIds = paginatedItems.map((i) => i.id);
  // const allPageSelected =
  //   pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

  return (
    <div className="grid grid-cols-4 gap-4">
      {renderCategoryCounts()}
      <div className="col-span-4 min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] ">
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="p-5 lg:p-10 relative"
        >
          {selectedMenu && (
            <EditMenuForm menu={selectedMenu} closeModal={closeModal} />
          )}
        </Modal>
        <div className="w-full  ">
          {/* Search and filter */}
          <div className="flex mb-2  lg:flex-row flex-col  items-center  gap-2">
            {/* Search Input */}
            <div className="mr-auto w-full md:w-fit">{searchByNameInput()}</div>
            {/* Filter Dropdown */}
            <div className=" ml-auto h-full inline-flex lg:flex-row items-start gap-2 mb-2">
              {renderFilteredBadges(filterBadges)}
              {renderDropdownFilter()}
            </div>
          </div>

          {/* Results count */}
          {/* <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredItems.length} of {foodItems.length} items
        </div> */}

          {/* Table Container */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        ชื่อเมนู
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        เกรด
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        category
                      </TableCell>
                      <TableCell isHeader className="w-0 pr-4">
                        <div className="flex justify-center items-center gap-2">
                          <Button
                            variant="delete"
                            className="h-8"
                            disabled={selectedIds.length === 0 || isPending}
                            onClick={() => {
                              handleBulkDelete();
                            }}
                          >
                            {isPending
                              ? "Deleting..."
                              : `Delete Selected${
                                  selectedIds.length
                                    ? ` (${selectedIds.length})`
                                    : ""
                                }`}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {paginatedItems.length === 0 ? (
                      <TableRow>
                        <td
                          colSpan={5}
                          className="px-5 py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          No items match the current filters
                        </td>
                      </TableRow>
                    ) : (
                      paginatedItems.map((item) => {
                        const checked = selectedIds.includes(item.id);
                        return (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-white/[0.05] cursor-pointer"
                            onClick={() => MenuClick(item)}
                          >
                            <TableCell className="px-5 py-4 sm:px-6 text-start truncate">
                              {item.name}
                            </TableCell>
                            <TableCell className="px-5 py-4 sm:px-6 text-start truncate">
                              {item.grade}
                            </TableCell>
                            <TableCell className="px-5 py-4 sm:px-6 text-start truncate">
                              {item.category}
                            </TableCell>
                            <TableCell className="px-3 py-4 flex justify-center ">
                              <input
                                type="checkbox"
                                aria-label={`Select ${item.name}`}
                                checked={checked}
                                onChange={() => toggleSelectSingle(item.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer py-auto"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-2">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <div className="text-gray-500 dark:text-gray-400 my-auto">
              Page {currentPage} of {totalPages} | {paginatedItems.length} items
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
