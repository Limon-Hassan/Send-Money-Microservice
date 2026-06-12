import clsx from "clsx";

interface StubPageProps {
  title: string;
  description?: string;
  badge?: string | number;
  children?: React.ReactNode;
}

export default function StubPage({ title, description, badge, children }: StubPageProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
            {badge !== undefined && (
              <span className="px-2 py-0.5 text-xs font-bold bg-brand text-white rounded-full">{badge}</span>
            )}
          </h1>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center justify-center text-center min-h-64">
        <div className="text-4xl mb-3">🚧</div>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Coming Soon</div>
        <div className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-sm">
          This section is under active development. The {title} page will be available shortly.
        </div>
      </div>
      {children}
    </div>
  );
}
