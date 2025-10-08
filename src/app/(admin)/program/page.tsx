"use client";

import "./components/styles.css";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageContainer from "@/components/container/PageContainer";
import ComponentCard from "@/components/common/ComponentCard";
import ProgramsTable from "./components/ProgramTable";
import { getProgramTable } from "@/actions/get_program_info";
import { ProgramTable } from "@/types/program.type";
import { useEffect, useState } from "react";
import ProgramsTableSkeleton from "./components/ProgramTableSkeleton";

export default function ProgramsPage() {
  const [tableData, setTableData] = useState<ProgramTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getProgramTable();
        setTableData(data);
      } catch (error) {
        console.error("Error fetching program data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageContainer
        title="โครงการ | WanPorDee Admin"
        description="รายการโครงการทั้งหมด"
      >
        <PageBreadcrumb pageTitle="Programs" />
        <ComponentCard title="รายการโครงการทั้งหมด">
          {isLoading ? (
            <ProgramsTableSkeleton rows={5} />
          ) : (
            <ProgramsTable tableData={tableData} />
          )}
        </ComponentCard>
      </PageContainer>
    </>
  );
}
