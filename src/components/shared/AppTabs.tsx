import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface AppTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
}

export default function AppTabs({ tabs, defaultValue }: AppTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className="w-full">
      <TabsList className="border-b w-full flex">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="px-4 pb-2">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
