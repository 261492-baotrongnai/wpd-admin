"use client";

import { getOrganizationTable } from "@/actions/get_organizations";
import ComponentCard from "@/components/common/ComponentCard";
import PageContainer from "@/components/container/PageContainer";
import { Organization } from "@/types/organization.type";
import OrganizaitonsTable from "./components/OrganizationsTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useEffect, useState } from "react";
import OrganizationsTableSkeleton from "./components/OrganizationTableSke;eton";

export default function OrganizationPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getOrganizationTable();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <PageContainer
      title="Organizations | WanPorDee Admin"
      description="List of all organizations"
    >
      <PageBreadcrumb pageTitle="Organizations" />
      <ComponentCard title="รายการ organizations ทั้งหมด">
        {isLoading ? (
          <OrganizationsTableSkeleton rows={5} />
        ) : (
          <OrganizaitonsTable tableData={organizations} />
        )}
      </ComponentCard>
    </PageContainer>
  );
}
