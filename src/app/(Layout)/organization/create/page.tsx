import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CreateOrganizationForm from "../components/CreateOrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <div>
      <PageContainer
        title="Create Organization"
        description="Create a new organization"
      >
        <DashboardCard title="สร้าง Organization ใหม่">
          <div style={{ padding: "20px" }}>
            {" "}
            <CreateOrganizationForm />
          </div>
        </DashboardCard>
      </PageContainer>
    </div>
  );
}
