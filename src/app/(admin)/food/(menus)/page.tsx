import { isEditor } from "@/actions/check_editor";
import { getMenus } from "@/actions/get-menus";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageContainer from "@/components/container/PageContainer";
import { Menu } from "@/types/menu.types";
import MenuTable from "./components/MenuTable";

export default async function MenusPage() {
  const is_editor = await isEditor();
  if (!is_editor) {
    return <div>You do not have permission to view this page.</div>;
  }
  const menus: Menu[] = await getMenus();

  const sortByRecent = (a: Menu, b: Menu) => {
    const dateA = new Date(a.updatedAt ?? a.createdAt ?? 0);
    const dateB = new Date(b.updatedAt ?? b.createdAt ?? 0);
    return dateB.getTime() - dateA.getTime();
  };

  await menus.sort(sortByRecent);

  return (
    <PageContainer
      title="จัดการเมนูอาหาร | WanPorDee Admin"
      description="Manage food menus"
    >
      
      <PageBreadcrumb pageTitle="จัดการเมนูอาหาร" />
      
      <MenuTable menuItems={menus} />
    </PageContainer>
  );
}
