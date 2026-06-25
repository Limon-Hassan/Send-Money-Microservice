'use client';

import { useState } from 'react';
import {
  Settings2,
  Globe2,
  ArrowLeftRight,
  Plug,
  Save,
  CreditCard,
  MessageSquare,
  Mail,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  defaultGeneralSettings,
  defaultRegionalSettings,
  defaultTransactionSettings,
  integrationSettings,
  generalSettingsOptions,
  regionalSettingsOptions,
} from '@/lib/data';

const integrationIconMap: Record<string, React.ElementType> = {
  CreditCard,
  MessageSquare,
  Mail,
  MapPin,
};

type TabKey = 'general' | 'regional' | 'transaction' | 'integrations';

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'general', label: 'General', icon: Settings2 },
  { key: 'regional', label: 'Regional', icon: Globe2 },
  { key: 'transaction', label: 'Transactions', icon: ArrowLeftRight },
  { key: 'integrations', label: 'Integrations', icon: Plug },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [toast, setToast] = useState<string | null>(null);

  const [general, setGeneral] = useState(defaultGeneralSettings);
  const [regional, setRegional] = useState(defaultRegionalSettings);
  const [transaction, setTransaction] = useState(defaultTransactionSettings);
  const [integrations, setIntegrations] = useState(integrationSettings);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleSave = (section: string) => {
    showToast(`${section} settings saved successfully!`);
  };

  const toggleCurrency = (currency: string) => {
    setRegional((prev) => {
      const exists = prev.supportedCurrencies.includes(currency);
      return {
        ...prev,
        supportedCurrencies: exists
          ? prev.supportedCurrencies.filter((c) => c !== currency)
          : [...prev.supportedCurrencies, currency],
      };
    });
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
            ...i,
            status:
              i.status === 'Connected' ? 'Not Connected' : 'Connected',
          }
          : i,
      ),
    );
    const item = integrations.find((i) => i.id === id);
    showToast(
      item?.status === 'Connected'
        ? `${item.name} disconnected`
        : `${item?.name} connected`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-lg">
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure platform-wide settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        {/* Sidebar Tabs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${activeTab === tab.key
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          {/* GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                General Settings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Platform Name
                  </label>
                  <input
                    value={general.platformName}
                    onChange={(e) =>
                      setGeneral({ ...general, platformName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Support Email
                  </label>
                  <input
                    value={general.supportEmail}
                    onChange={(e) =>
                      setGeneral({ ...general, supportEmail: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Support Phone
                  </label>
                  <input
                    value={general.supportPhone}
                    onChange={(e) =>
                      setGeneral({ ...general, supportPhone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Default Language
                  </label>
                  <select
                    value={general.defaultLanguage}
                    onChange={(e) =>
                      setGeneral({ ...general, defaultLanguage: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {generalSettingsOptions.languages.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Timezone
                  </label>
                  <select
                    value={general.timezone}
                    onChange={(e) =>
                      setGeneral({ ...general, timezone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {generalSettingsOptions.timezones.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Date Format
                  </label>
                  <select
                    value={general.dateFormat}
                    onChange={(e) =>
                      setGeneral({ ...general, dateFormat: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {generalSettingsOptions.dateFormats.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  {general.maintenanceMode ? (
                    <AlertTriangle size={18} className="text-amber-500" />
                  ) : (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Maintenance Mode
                    </p>
                    <p className="text-xs text-slate-400">
                      When enabled, the platform shows a maintenance page to
                      all users.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setGeneral({
                      ...general,
                      maintenanceMode: !general.maintenanceMode,
                    })
                  }
                  className={`relative w-11 h-6 rounded-full transition shrink-0 ${general.maintenanceMode
                      ? 'bg-amber-500'
                      : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${general.maintenanceMode ? 'translate-x-5' : ''
                      }`}
                  />
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSave('General')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* REGIONAL */}
          {activeTab === 'regional' && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Regional Settings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Base Currency
                  </label>
                  <select
                    value={regional.baseCurrency}
                    onChange={(e) =>
                      setRegional({ ...regional, baseCurrency: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {regionalSettingsOptions.currencies.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Default Country
                  </label>
                  <select
                    value={regional.defaultCountry}
                    onChange={(e) =>
                      setRegional({ ...regional, defaultCountry: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    {regionalSettingsOptions.countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 block">
                  Supported Currencies
                </label>
                <div className="flex flex-wrap gap-2">
                  {regionalSettingsOptions.currencies.map((currency) => {
                    const active = regional.supportedCurrencies.includes(currency);
                    return (
                      <button
                        key={currency}
                        onClick={() => toggleCurrency(currency)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                      >
                        {currency}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Decimal Separator
                  </label>
                  <select
                    value={regional.decimalSeparator}
                    onChange={(e) =>
                      setRegional({
                        ...regional,
                        decimalSeparator: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    <option value=".">. (Dot)</option>
                    <option value=",">, (Comma)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Thousand Separator
                  </label>
                  <select
                    value={regional.thousandSeparator}
                    onChange={(e) =>
                      setRegional({
                        ...regional,
                        thousandSeparator: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200"
                  >
                    <option value=",">, (Comma)</option>
                    <option value=".">. (Dot)</option>
                    <option value=" ">Space</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSave('Regional')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TRANSACTIONS */}
          {activeTab === 'transaction' && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Transaction Settings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Minimum Transfer Amount ($)
                  </label>
                  <input
                    type="number"
                    value={transaction.minTransferAmount}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        minTransferAmount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Maximum Transfer Amount ($)
                  </label>
                  <input
                    type="number"
                    value={transaction.maxTransferAmount}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        maxTransferAmount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Daily Limit per User ($)
                  </label>
                  <input
                    type="number"
                    value={transaction.dailyLimit}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        dailyLimit: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Transaction Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={transaction.transactionFeePercent}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        transactionFeePercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5 block">
                    Auto-approve Transactions Below ($)
                  </label>
                  <input
                    type="number"
                    value={transaction.autoApproveBelow}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        autoApproveBelow: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <p className="text-xs text-slate-400 mt-1.5">
                    Transactions under this amount skip manual review.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleSave('Transaction')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Integrations
              </h2>

              <div className="space-y-3">
                {integrations.map((integration) => {
                  const Icon = integrationIconMap[integration.icon] ?? Plug;
                  const connected = integration.status === 'Connected';
                  return (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {integration.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {integration.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`flex items-center gap-1.5 text-xs font-medium ${connected
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-400'
                            }`}
                        >
                          {connected ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {integration.status}
                        </span>

                        <button
                          onClick={() => toggleIntegration(integration.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${connected
                              ? 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                          {connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;