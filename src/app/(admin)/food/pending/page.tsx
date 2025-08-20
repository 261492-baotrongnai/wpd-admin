import { isEditor } from "@/actions/check_editor";
import { getWaitingConfirmation } from "@/actions/get-waiting-confirmation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageContainer from "@/components/container/PageContainer";
import PendingTable from "../components/PendingTable";
import { Food } from "@/types/food.types";

export default async function PendingFoodMenuPage() {
  const is_editor = await isEditor();
  if (!is_editor) {
    return <div>You do not have permission to view this page.</div>;
  }
  const pendingFoodItems = await getWaitingConfirmation();

  // Assign priority: 0 = waiting, 1 = confirmed, 2 = rejected
  pendingFoodItems.sort((a, b) => {
    const getPriority = (item: Food) => {
      if (item.is_confirmed === false && item.is_rejected === false) return 0;
      if (item.is_confirmed === true) return 1;
      if (item.is_rejected === true) return 2;
      return 3; // fallback for items with no status
    };
    return getPriority(a) - getPriority(b);
  });

  return (
    <PageContainer
      title="เมนูอาหารรอการยืนยัน | WanPorDee Admin"
      description="Manage pending food items"
    >
      <PageBreadcrumb pageTitle="เมนูอาหารรอการยืนยัน" />

      <PendingTable foodItems={pendingFoodItems} />
    </PageContainer>
  );
}
