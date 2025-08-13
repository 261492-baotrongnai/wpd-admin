"use server";

import "./components/styles.css";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { Metadata } from "next";
import PageContainer from "@/components/container/PageContainer";
import ComponentCard from "@/components/common/ComponentCard";
import ProgramsTable from "./components/ProgramTable";
import { getProgramTable } from "@/actions/get_program_info";
import { ProgramTable } from "@/types/program.type";

// export const metadata: Metadata = {
//   title: "โครงการ | WanPorDee Admin",
//   description: "รายการโครงการทั้งหมด",
// };

export default async function ProgramsPage() {
  const tableData: ProgramTable[] = await getProgramTable();

  return (
    <>
      <PageContainer
        title="โครงการ | WanPorDee Admin"
        description="รายการโครงการทั้งหมด"
      >
        <PageBreadcrumb pageTitle="Programs" />
        <ComponentCard title="รายการโครงการทั้งหมด">
          <ProgramsTable tableData={tableData} />
        </ComponentCard>
      </PageContainer>
    </>
  );
}
