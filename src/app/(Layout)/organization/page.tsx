import { getOrganizations } from "@/app/actions/get_organizations";
import { Organization } from "@/types/organization.type";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";

export default async function OrganizationPage() {
  const organization: Organization[] = await getOrganizations();
  return (
    <PageContainer>
      <DashboardCard title="Organizations">
        <div>
          {organization ? (
            organization.map((org) => (
              <div key={org.id}>
                <h2>{org.thai_name}</h2>
                <p>{org.eng_name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
