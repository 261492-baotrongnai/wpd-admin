"use server";

import { getProgramByCode } from "@/actions/get_program_info";
import ComponentCard from "@/components/common/ComponentCard";
import EditableInfoBox from "@/app/(admin)/program/components/EditableInfoBox";
import { GroupIcon } from "@/icons";
import { Program } from "@/types/program.type";

const infoBox = (label: string, info: string) => {
  return (
    <div className="inline-flex items-center gap-2 w-full">
      <span className="text-gray-400 w-[30%]">{label}</span>
      <span className="text-gray-600 w-[70%]">{info}</span>
    </div>
  );
};

const userMetrics = (label: string, count: number) => {
  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {count}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  let detail: Program;
  const { code } = await params;
  console.log("Program code:", code);
  try {
    detail = await getProgramByCode(code);

    console.log("Program detail:", detail);
  } catch {
    return <p>Program data is corrupted.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* <!-- Program Info Card --> */}
        <div className="col-span-12 xl:col-span-8">
          <ComponentCard title={`รายละเอียดโครงการ`}>
            <div className="space-y-10 flex flex-col">
              {/* {infoBox("Program Name", detail.program.name)} */}
              <EditableInfoBox
                programId={detail.id}
                label="Program Name"
                info={detail.name}
                editable={true}
              />
              <EditableInfoBox
                programId={detail.id}
                label="Organization"
                info={detail.organization?.thai_name || "N/A"}
                editable={true}
                type="select"
              />
              {infoBox("Code", detail.code)}
              {infoBox(
                "Created at",
                new Date(detail.createdAt).toLocaleDateString()
              )}
            </div>
          </ComponentCard>
        </div>
        {/* <!-- User Metric --> */}
        <div className="col-span-12 xl:col-span-4">
          {userMetrics("ผู้เข้าร่วม", detail.users?.length || 0)}
        </div>
      </div>
    </>
  );
}
