import "../components/styles.css";
import CreateProgramForm from "../components/CreateForm";
import PageContainer from "../../components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

export default function CreateProgramPage() {
  return (
    <PageContainer title="Create Program" description="Create a new program">
      <DashboardCard title="สร้างโครงการใหม่">
        <CreateProgramForm />
      </DashboardCard>
    </PageContainer>
  );
}
