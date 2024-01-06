import PropertiesFilter from "./components/PropertiesFilter";

export default async function DashboardPage() {

  return (
    <div className="w-full space-y-4 py-4">
      <div className="space-y-1 px-5">
        <h2 className="text-2xl font-semibold">{"Browse Properties"}</h2>
      </div>
      <PropertiesFilter />
    </div>
  );
}
