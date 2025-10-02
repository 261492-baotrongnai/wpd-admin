import { PaperPlaneIcon } from "@/icons";
export default function RequestApprovalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-auto w-16 h-16 border-2 border-dashed border-gray-300 dark:border-gray-700 p-4 rounded-full relative">
        <PaperPlaneIcon className="absolute left-5 top-5 w-12 h-12 text-gray-400 dark:text-gray-500 " />
      </div>

      <p className="mt-4">คำขอการอนุมัติของคุณได้ส่งไปยังผู้ดูแลระบบแล้ว</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        รอการอนุมัติสักครู่
      </p>
    </div>
  );
}
