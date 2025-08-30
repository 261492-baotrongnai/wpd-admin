export interface Menu {
  id: number;
  name: string;
  grade: "A" | "B" | "C";
  description: string | null;

  category: "อาหาร-ของว่าง" | "เครื่องดื่ม" | "ผลไม้" | "ธัญพืช";
  addedFromUser: boolean;
  createdAt: string;
  updatedAt: string;
}
