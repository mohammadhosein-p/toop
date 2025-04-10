import ScheduleContainer from "./ScheduleContainer";

export default async function AsyncScheduleWrapper({ date }: {date?:string}) {
  return <ScheduleContainer date={date} />;
}
