import "../components/styles.css";
import CreateProgramForm from "../components/CreateForm";
import PageContainer from "@/components/container/PageContainer";
// import { getOrganizations } from "@/actions/get_organizations";

export default function CreateProgramPage() {
  // const OrganizationOptions = async () => {
  //   const organizations = await getOrganizations();
  //   return organizations.map((org) => ({
  //     value: org.id,
  //     label: org.thai_name || org.eng_name,
  //   }));
  // };

  // console.log("Organization Options:", OrganizationOptions);

  return (
    <PageContainer title="สร้างโครงการใหม่" description="Create a new program">
      <CreateProgramForm />
    </PageContainer>
  );
}
