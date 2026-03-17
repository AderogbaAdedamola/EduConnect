import { useState } from 'react'
import Icon from '../common/Icon'

// ─── Safe defaults ────────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  requireLogin: false,
  allowAnonymous: true,
  oneResponseOnly: false,
  showRespondentsToCreator: true,
  showResultsToRespondent: true,
  hasDeadline: false,
  deadline: '',
  collectUserData: false,
}

const FIELD_TYPES = [
  { value: 'text',   label: 'Short text' },
  { value: 'email',  label: 'Email' },
  { value: 'number', label: 'Number' },
]

// ─── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({ id, label, description, checked, onChange, disabled = false }) {
  return (
    <div className={`flex items-start justify-between gap-4 ${disabled ? 'opacity-40' : ''}`}>
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className={`text-sm font-semibold text-slate-800 dark:text-slate-200 ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="relative shrink-0 mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={disabled ? undefined : (e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          onClick={disabled ? undefined : () => onChange(!checked)}
          className={`w-10 h-5 rounded-full transition-colors ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'} ${checked ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        />
        <div
          onClick={disabled ? undefined : () => onChange(!checked)}
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${!disabled ? 'cursor-pointer' : ''} ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </div>
    </div>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({ icon, title, description, iconBg, iconColor, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon name={icon} aria-hidden="true" className={`text-sm ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{title}</p>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="px-5 py-4 space-y-4">
        {children}
      </div>
    </div>
  )
}

const Divider = () => <div className="h-px bg-slate-100 dark:bg-slate-700" />

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Step4SettingsAccess({ formData, setFormData }) {
  const [newFieldLabel, setNewFieldLabel] = useState('')
  const [newFieldType, setNewFieldType] = useState('text')

  // Merge with defaults so every key is always defined
  const settings = { ...DEFAULT_SETTINGS, ...(formData.settings ?? {}) }
  const userDataFields = formData.userDataFields ?? []

  // ── Settings updater ───────────────────────────────────────────────────────
  const updateSetting = (key, value) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...DEFAULT_SETTINGS,
        ...(prev.settings ?? {}),
        [key]: value,
      }
    }))
  }

  const handleRequireLogin = (val) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...DEFAULT_SETTINGS,
        ...(prev.settings ?? {}),
        requireLogin: val,
        // if login required, anonymous must be off
        allowAnonymous: val ? false : (prev.settings?.allowAnonymous ?? true),
        // one-response only makes sense with login
        oneResponseOnly: val ? (prev.settings?.oneResponseOnly ?? false) : false,
      }
    }))
  }

  // ── User data fields ───────────────────────────────────────────────────────
  const updateField = (index, key, value) => {
    setFormData(prev => {
      const fields = [...(prev.userDataFields ?? [])]
      fields[index] = { ...fields[index], [key]: value }
      return { ...prev, userDataFields: fields }
    })
  }

  const addField = () => {
    const label = newFieldLabel.trim()
    if (!label) return
    setFormData(prev => ({
      ...prev,
      userDataFields: [
        ...(prev.userDataFields ?? []),
        { id: Date.now(), label, type: newFieldType, placeholder: '', required: false }
      ]
    }))
    setNewFieldLabel('')
    setNewFieldType('text')
  }

  const removeField = (index) => {
    setFormData(prev => ({
      ...prev,
      userDataFields: (prev.userDataFields ?? []).filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">

      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <Icon name="settings" aria-hidden="true" className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Settings & Access
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Control who can answer and what data you collect
          </p>
        </div>
      </div>

      {/* ── Access & Privacy ───────────────────────────────────────────────── */}
      <SectionCard
        icon="shield"
        title="Access & Privacy"
        description="Control who can answer your questions"
        iconBg="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
      >
        <ToggleRow
          id="setting-require-login"
          label="Require login to answer"
          description="Respondents must sign in before they can submit"
          checked={settings.requireLogin}
          onChange={handleRequireLogin}
        />

        <Divider />

        <ToggleRow
          id="setting-allow-anonymous"
          label="Allow anonymous answers"
          description="Respondents can answer without an account — shown as Anon #1, #2..."
          checked={settings.allowAnonymous}
          onChange={(val) => updateSetting('allowAnonymous', val)}
          disabled={settings.requireLogin}
        />
        {settings.requireLogin && (
          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 -mt-2">
            <Icon name="info" aria-hidden="true" className="shrink-0 text-xs" />
            Anonymous answers are disabled when login is required
          </p>
        )}

        <Divider />

        <ToggleRow
          id="setting-one-response"
          label="One response per person"
          description="Prevents the same account from submitting more than once"
          checked={settings.oneResponseOnly}
          onChange={(val) => updateSetting('oneResponseOnly', val)}
          disabled={!settings.requireLogin}
        />
        {!settings.requireLogin && (
          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5 -mt-2">
            <Icon name="info" aria-hidden="true" className="shrink-0 text-xs" />
            Enable "Require login" to enforce one response per person
          </p>
        )}

        <Divider />

        <ToggleRow
          id="setting-show-respondents"
          label="Show respondent names to you"
          description="See who answered — anonymous users still show as Anon #n"
          checked={settings.showRespondentsToCreator}
          onChange={(val) => updateSetting('showRespondentsToCreator', val)}
        />

        <Divider />

        <ToggleRow
          id="setting-show-results"
          label="Show results to respondents"
          description="Respondents can see their score and AI feedback after submitting"
          checked={settings.showResultsToRespondent}
          onChange={(val) => updateSetting('showResultsToRespondent', val)}
        />

        <Divider />

        <ToggleRow
          id="setting-deadline"
          label="Set a response deadline"
          description="Stop accepting answers after a specific date and time"
          checked={settings.hasDeadline}
          onChange={(val) => updateSetting('hasDeadline', val)}
        />
        {settings.hasDeadline && (
          <div>
            <label htmlFor="deadline-input" className="sr-only">Deadline</label>
            <input
              id="deadline-input"
              type="datetime-local"
              value={settings.deadline ?? ''}
              onChange={(e) => updateSetting('deadline', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            />
          </div>
        )}
      </SectionCard>

      {/* ── Collect Respondent Data ────────────────────────────────────────── */}
      <SectionCard
        icon="user-check"
        title="Collect Respondent Info"
        description="Ask respondents for extra details before they answer"
        iconBg="bg-green-100 dark:bg-green-900/30"
        iconColor="text-green-600 dark:text-green-400"
      >
        <ToggleRow
          id="setting-collect-data"
          label="Ask for respondent details"
          description="Show a short form before the questions (e.g. name, class, email)"
          checked={settings.collectUserData}
          onChange={(val) => updateSetting('collectUserData', val)}
        />

        {settings.collectUserData && (
          <div className="space-y-3 pt-1">

            {/* Existing fields */}
            {userDataFields.length > 0 && (
              <div className="space-y-2">
                {userDataFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 space-y-2"
                  >
                    {/* Label + remove */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(index, 'label', e.target.value)}
                        placeholder="Field label"
                        aria-label={`Field ${index + 1} label`}
                        className="flex-1 bg-transparent text-sm font-semibold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 min-w-0"
                      />
                      <button
                        type="button"
                        onClick={() => removeField(index)}
                        aria-label={`Remove field ${index + 1}`}
                        className="p-1 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      >
                        <Icon name="x" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Placeholder */}
                    <input
                      type="text"
                      value={field.placeholder ?? ''}
                      onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                      placeholder="Placeholder text (optional)"
                      aria-label={`Field ${index + 1} placeholder`}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 outline-none placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
                    />

                    {/* Type + Required */}
                    <div className="flex items-center gap-3">
                      <select
                        value={field.type}
                        onChange={(e) => updateField(index, 'type', e.target.value)}
                        aria-label={`Field ${index + 1} type`}
                        className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 text-slate-600 dark:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer"
                      >
                        {FIELD_TYPES.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>

                      <label className="flex items-center gap-1.5 cursor-pointer select-none ml-auto">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={field.required ?? false}
                            onChange={(e) => updateField(index, 'required', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 rounded-full bg-slate-300 dark:bg-slate-600 peer-checked:bg-blue-500 transition-colors cursor-pointer" />
                          <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4 cursor-pointer" />
                        </div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Required</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {userDataFields.length === 0 && (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">
                No fields yet — add one below
              </p>
            )}

            {/* Add new field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addField() } }}
                placeholder="Field label e.g. Full Name, Class"
                aria-label="New field label"
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                aria-label="New field type"
                className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 text-slate-600 dark:text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer shrink-0"
              >
                {FIELD_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addField}
                disabled={!newFieldLabel.trim()}
                aria-label="Add field"
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
              >
                <Icon name="plus" aria-hidden="true" />
                Add
              </button>
            </div>
          </div>
        )}
      </SectionCard>

    </div>
  )
}