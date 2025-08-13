import { getOrganizationTable } from "@/actions/get_organizations";
import ComponentCard from "@/components/common/ComponentCard";
import PageContainer from "@/components/container/PageContainer";
import { Organization } from "@/types/organization.type";
import OrganizaitonsTable from "./components/OrganizationsTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default async function OrganizationPage() {
  const organizations: Organization[] = await getOrganizationTable();
  return (
    <PageContainer
      title="Organizations | WanPorDee Admin"
      description="List of all organizations"
    >
      <PageBreadcrumb pageTitle="Organizations" />
      <ComponentCard title="รายการ organizations ทั้งหมด">
        <OrganizaitonsTable tableData={organizations} />
      </ComponentCard>
    </PageContainer>
  );
}
