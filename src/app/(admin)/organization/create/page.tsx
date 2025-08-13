import PageContainer from "@/components/container/PageContainer";
import CreateOrganizationForm from "../components/CreateOrganizationForm";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function CreateOrganizationPage() {
  return (
    <div>
      <PageContainer
        title="Create Organization"
        description="Create a new organization"
      >
        <PageBreadcrumb pageTitle="สร้าง organization ใหม่" />
        <ComponentCard title="กรอกข้อมูล  organization ">
          <div style={{ padding: "20px" }}>
            {" "}
            <CreateOrganizationForm />
          </div>
        </ComponentCard>
      </PageContainer>
    </div>
  );
}
