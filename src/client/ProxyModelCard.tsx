/**
 * 模型代理 page: the card registered into 设置 → 插件 (`plugins.item`), the
 * configurable-plugin tab the Plugins page owns. The header names the plugin
 * and the body discloses the configurable items in place — the proxy endpoint
 * (host + port), the 走代理的模型 multi-select (populated from the configured
 * model list via the host bridge), and the retry policy (retries + interval).
 * Written through the llm-proxy settings scope (official `configForms` path
 * with the package's loopback bridge as fallback). Changes apply live on the
 * host — no restart needed.
 *
 * Everything else stays on the DIRECT path by default; only the selected
 * models' baseURL hosts route through the proxy. Loopback is always direct.
 * Model image input is owned by the official Models page (dsh ≥ 0.1.7), so
 * this card no longer mirrors input modalities.
 */
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconChevronDownOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {
  FieldWrite, ProxyModelRow, ProxyModelScope, ProxyModelSnapshot, TestResult,
} from './settings-scope.ts'
import type { en } from './locales.ts'
import styles from './proxy-model.module.css'

/** Injected dependencies of the card (slot `inject`). */
export interface ProxyModelCardInjected {
  /** The bound llm-proxy settings scope (official → bridge fallback). */
  scope: ProxyModelScope
  /** uSES subscription hook bound to the scope snapshot. */
  useSnapshot: () => ProxyModelSnapshot
  /** Card copy. */
  t: (key: keyof typeof en) => string
}

/** Props delivered by the slot outlet (inject face spread flat). */
export type ProxyModelCardProps =
  PropsRuntime<'plugins.item'>
  & InjectFace<ProxyModelCardInjected>

/** The resolved llm-proxy config shape (mirrors lib/index.js Config). */
interface ProxyConfig {
  proxyHost: string
  proxyPort: number
  proxiedModels: string[]
  retries: number
  retryIntervalMs: number
}

/** Schema defaults mirrored from lib/index.js (reset target + base merge). */
const DEFAULTS: ProxyConfig = {
  proxyHost: '127.0.0.1',
  proxyPort: 7897,
  proxiedModels: [],
  retries: 3,
  retryIntervalMs: 1000,
}

/** Fields surfaced in the UI, in write order. */
const UI_FIELDS = ['proxyHost', 'proxyPort', 'proxiedModels', 'retries', 'retryIntervalMs'] as const

/** The draft form state backing the manual-entry fields. */
interface FormState {
  proxyHost: string
  proxyPort: string
  proxiedModels: string[]
  retries: string
  retryIntervalMs: string
}

/** JSON-compatible deep equality (the card values are plain JSON). */
function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

/** Build a fresh empty form. */
function emptyForm(): FormState {
  return {
    proxyHost: '',
    proxyPort: String(DEFAULTS.proxyPort),
    proxiedModels: [],
    retries: String(DEFAULTS.retries),
    retryIntervalMs: String(DEFAULTS.retryIntervalMs),
  }
}

/** Hydrate the form from a resolved config value. */
function formFromConfig(value: ProxyConfig): FormState {
  return {
    proxyHost: value.proxyHost ?? '',
    proxyPort: String(value.proxyPort ?? DEFAULTS.proxyPort),
    proxiedModels: [...(value.proxiedModels ?? [])],
    retries: String(value.retries ?? DEFAULTS.retries),
    retryIntervalMs: String(value.retryIntervalMs ?? DEFAULTS.retryIntervalMs),
  }
}

/** Extract one top-level field's plain-JSON value from the form. */
function fieldFromForm(form: FormState, field: (typeof UI_FIELDS)[number]): unknown {
  switch (field) {
    case 'proxyHost': return form.proxyHost.trim()
    case 'proxyPort': return Number(form.proxyPort)
    case 'proxiedModels': return [...form.proxiedModels]
    case 'retries': return Number(form.retries)
    case 'retryIntervalMs': return Number(form.retryIntervalMs)
  }
}

/** Validate the draft; returns an error key or null. */
function validateForm(form: FormState): 'invalidEmpty' | 'invalidRange' | null {
  if (form.proxyHost.trim() === '') return 'invalidEmpty'
  if (!/^\d+$/.test(form.proxyPort.trim())) return 'invalidRange'
  const port = Number(form.proxyPort)
  if (port < 1 || port > 65535) return 'invalidRange'
  if (!/^\d+$/.test(form.retries.trim())) return 'invalidRange'
  if (!/^\d+$/.test(form.retryIntervalMs.trim())) return 'invalidRange'
  if (Number(form.retries) > 10) return 'invalidRange'
  if (Number(form.retryIntervalMs) > 60000) return 'invalidRange'
  return null
}

/** Compute the field writes that land the form on the resolved value. */
function diffWrites(form: FormState, snapshot: ProxyModelSnapshot): FieldWrite[] {
  const value = snapshot.value as ProxyConfig | undefined
  const base = snapshot.base as Partial<ProxyConfig> | undefined
  const writes: FieldWrite[] = []
  for (const field of UI_FIELDS) {
    const next = fieldFromForm(form, field)
    const current = value?.[field]
    if (deepEqual(next, current)) continue
    const baseValue = base?.[field]
    if (deepEqual(next, baseValue)) writes.push({ field, op: 'unset' })
    else writes.push({ field, op: 'set', value: next })
  }
  return writes
}

/** Merge the composition base over the schema defaults (reset target). */
function mergeDefaults(base: Partial<ProxyConfig> | undefined): ProxyConfig {
  return {
    proxyHost: base?.proxyHost ?? DEFAULTS.proxyHost,
    proxyPort: base?.proxyPort ?? DEFAULTS.proxyPort,
    proxiedModels: base?.proxiedModels ?? DEFAULTS.proxiedModels,
    retries: base?.retries ?? DEFAULTS.retries,
    retryIntervalMs: base?.retryIntervalMs ?? DEFAULTS.retryIntervalMs,
  }
}

/** One labeled field; numeric fields use type="number" so non-digits are rejected by the browser. */
function TextField(props: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  testId?: string
  type?: 'text' | 'number'
  min?: number
  max?: number
  step?: number
}): ReactNode {
  const { label, hint, value, onChange, placeholder, testId, type = 'text', min, max, step } = props
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        data-testid={testId}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint !== undefined && <span className={styles.fieldHint}>{hint}</span>}
    </label>
  )
}

/** The card body: the configurable items form plus the save/reset footer. */
function CardBody(props: Required<ProxyModelCardInjected>): ReactNode {
  const { scope, useSnapshot, t } = props
  const snapshot = useSnapshot()
  const [form, setForm] = useState<FormState>(() => emptyForm())
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hydratedRef = useRef(false)
  const [models, setModels] = useState<ProxyModelRow[]>([])
  const [modelsError, setModelsError] = useState<string | null>(null)
  const [testingKey, setTestingKey] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({})

  // Hydrate the form once from the first ready snapshot.
  useEffect(() => {
    if (snapshot.status === 'ready' && !hydratedRef.current) {
      hydratedRef.current = true
      setForm(formFromConfig(snapshot.value as ProxyConfig))
    }
  }, [snapshot.status]) // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch the selectable model list from the host bridge (once the body shows).
  useEffect(() => {
    if (models.length > 0 || modelsError !== null) return
    let cancelled = false
    scope.listModels()
      .then((rows) => {
        if (!cancelled) setModels(rows)
      })
      .catch(() => {
        if (!cancelled) setModelsError(t('statusUnavailable'))
      })
    return () => { cancelled = true }
  }, [models.length, modelsError, scope, t])

  if (snapshot.status === 'loading') {
    return <p className={styles.status}>{t('statusLoading')}</p>
  }
  if (snapshot.status === 'unavailable') {
    return <p className={styles.status}>{t('statusUnavailable')}</p>
  }

  const handleSave = async (): Promise<void> => {
    const validation = validateForm(form)
    if (validation !== null) {
      setSaved(false)
      setError(t(validation))
      return
    }
    const writes = diffWrites(form, snapshot)
    if (writes.length === 0) {
      setSaved(true)
      setError(null)
      return
    }
    setSaving(true)
    setError(null)
    const result = await scope.mutate(writes)
    setSaving(false)
    if (result.ok) {
      setSaved(true)
    } else {
      setSaved(false)
      setError(result.message ?? t('saveError'))
    }
  }

  const handleReset = async (): Promise<void> => {
    setSaving(true)
    setError(null)
    const result = await scope.mutate(UI_FIELDS.map((field) => ({ field, op: 'unset' })))
    setSaving(false)
    if (result.ok) {
      setForm(formFromConfig(mergeDefaults(snapshot.base as Partial<ProxyConfig> | undefined)))
      setSaved(true)
    } else {
      setSaved(false)
      setError(result.message ?? t('saveError'))
    }
  }

  const toggleModel = (key: string): void => {
    setSaved(false)
    const selected = form.proxiedModels.includes(key)
      ? form.proxiedModels.filter((k) => k !== key)
      : [...form.proxiedModels, key]
    setForm({ ...form, proxiedModels: selected })
  }

  const handleTest = async (key: string): Promise<void> => {
    setTestingKey(key)
    const result = await scope.test(key)
    setTestResults((previous) => ({ ...previous, [key]: result }))
    setTestingKey(null)
  }

  /** One-line test detail: ✓ 连接成功 · 200 · 38ms · 经代理 / ✗ 连接失败：… */
  const formatTestDetail = (result: TestResult): string => {
    if (result.ok) {
      const parts: string[] = []
      if (typeof result.status === 'number') parts.push(String(result.status))
      if (typeof result.latencyMs === 'number') parts.push(`${result.latencyMs}ms`)
      parts.push(result.viaProxy ? t('testViaProxy') : t('testDirect'))
      return parts.length > 0 ? ` · ${parts.join(' · ')}` : ''
    }
    return `：${result.message ?? result.code ?? t('testFail')}`
  }

  /** Display label for a model row: `[厂商] 模型名`; the vendor prefix is
   * dropped when the model name already carries it (e.g. B.AI names are
   * already "deepseek-v4-flash（B.AI）", so the bracketed prefix would just
   * repeat the same text). */
  const rowLabel = (row: ProxyModelRow): string =>
    row.providerLabel !== '' && !row.name.includes(row.providerLabel)
      ? `[${row.providerLabel}] ${row.name}`
      : row.name

  /**
   * Models still selectable (not yet proxied), in config order. Every listed
   * model is offered regardless of whether its provider already resolves a
   * baseURL host: a provider without one simply routes nothing until the user
   * fills its baseURL in the Models page (the host resolver skips empty hosts
   * instead of erroring), so hiding those rows only made the list look
   * partial.
   */
  const selectableModels = (): ProxyModelRow[] =>
    models.filter((row) => !form.proxiedModels.includes(row.key))

  return (
    <div className={styles.body} data-testid="proxy-model-form">
      <div className={styles.fieldRow}>
        <TextField
          label={t('fieldProxyHost')}
          hint={t('fieldProxyHostHint')}
          value={form.proxyHost}
          placeholder={DEFAULTS.proxyHost}
          testId="field-proxyHost"
          onChange={(value) => { setSaved(false); setForm({ ...form, proxyHost: value }) }}
        />
        <TextField
          label={t('fieldProxyPort')}
          hint={t('fieldProxyPortHint')}
          value={form.proxyPort}
          placeholder={String(DEFAULTS.proxyPort)}
          testId="field-proxyPort"
          type="number"
          min={1}
          max={65535}
          step={1}
          onChange={(value) => { setSaved(false); setForm({ ...form, proxyPort: value }) }}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>{t('fieldProxiedModels')}</span>
        <span className={styles.fieldHint}>{t('fieldProxiedModelsHint')}</span>
        {modelsError !== null
          ? <p className={styles.status}>{modelsError}</p>
          : models.length === 0
            ? <p className={styles.status}>{t('statusLoading')}</p>
            : (
              <ul className={styles.rowList}>
                {form.proxiedModels.map((key) => {
                  const row = models.find((m) => m.key === key)
                  const result = testResults[key]
                  return (
                    <li key={key} className={styles.rowWrap}>
                      <div className={styles.row}>
                        <span className={styles.rowLabel}>{row ? rowLabel(row) : key}</span>
                        <button
                          type="button"
                          className={styles.rowTest}
                          data-testid="test-proxied-model"
                          disabled={testingKey !== null}
                          onClick={() => { void handleTest(key) }}
                        >
                          {testingKey === key ? t('testing') : t('test')}
                        </button>
                        <button
                          type="button"
                          className={styles.rowRemove}
                          data-testid="remove-proxied-model"
                          onClick={() => toggleModel(key)}
                        >
                          {t('remove')}
                        </button>
                      </div>
                      {result !== undefined && (
                        <span
                          className={`${styles.testResult} ${result.ok ? styles.testResultOk : styles.testResultError}`}
                          data-testid="test-proxied-result"
                        >
                          {result.ok ? '✓ ' : '✗ '}{result.ok ? t('testOk') : t('testFail')}{formatTestDetail(result)}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
        <select
          className={styles.select}
          data-testid="add-proxied-model"
          value=""
          disabled={models.length === 0}
          onChange={(event) => {
            if (event.target.value !== '') toggleModel(event.target.value)
          }}
        >
          <option value="">{t('selectModel')}</option>
          {selectableModels().map((row) => (
            <option key={row.key} value={row.key}>{rowLabel(row)}</option>
          ))}
        </select>
        {form.proxiedModels.length > 0 && (
          <span className={styles.testBarHint}>{t('testBarHint')}</span>
        )}
      </div>

      <div className={styles.fieldRow}>
        <TextField
          label={t('fieldRetries')}
          hint={t('fieldRetriesHint')}
          value={form.retries}
          placeholder={String(DEFAULTS.retries)}
          testId="field-retries"
          type="number"
          min={0}
          max={10}
          step={1}
          onChange={(value) => { setSaved(false); setForm({ ...form, retries: value }) }}
        />
        <TextField
          label={t('fieldRetryIntervalMs')}
          hint={t('fieldRetryIntervalMsHint')}
          value={form.retryIntervalMs}
          placeholder={String(DEFAULTS.retryIntervalMs)}
          testId="field-retryIntervalMs"
          type="number"
          min={0}
          max={60000}
          step={1}
          onChange={(value) => { setSaved(false); setForm({ ...form, retryIntervalMs: value }) }}
        />
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.primaryButton}
          data-testid="save-proxy-model"
          disabled={saving || !snapshot.writable}
          onClick={() => { void handleSave() }}
        >
          {saving ? t('saving') : t('save')}
        </button>
        <button
          type="button"
          className={styles.ghostButton}
          data-testid="reset-proxy-model"
          disabled={saving || !snapshot.writable}
          onClick={() => { void handleReset() }}
        >
          {t('reset')}
        </button>
        {saved && !error && <span className={`${styles.saveStatus} ${styles.saveStatusOk}`}>{t('saved')}</span>}
        {error !== null && <span className={`${styles.saveStatus} ${styles.saveStatusError}`}>{t('saveError')}：{error}</span>}
      </div>
    </div>
  )
}

/** The render context the dsh 0.2.0 plugin-manager passes through the slot
 * outlet. It mounts this one card component at three places per plugin: the
 * list row and the detail description line both render {view:'summary'} (the
 * output lands inside the host's own title/description styling), while the
 * detail config section renders {view:'page', form, renderComponents}. Older
 * hosts (0.1.7) render the card standalone with no view prop at all. */
interface ViewContext {
  view?: 'summary' | 'page'
}

/**
 * The 模型代理 card. Dispatches on the slot render context:
 * - `summary` — a compact one-line blurb (no form, no interactive state); the
 *   host already draws the title around it, so emitting the full form here
 *   spread the config across the plugin list and duplicated it on the detail
 *   page (v1.5.5 regression on dsh 0.2.0).
 * - `page` — the configuration form only (the detail header is the host's).
 * - no `view` (dsh 0.1.7 standalone) — the legacy self-contained card with its
 *   own header and expand/collapse chevron.
 * Renders nothing (returns null) until the slot outlet supplies the inject
 * face.
 */
export function ProxyModelCard(props: ProxyModelCardProps): ReactNode {
  const { scope, useSnapshot, t, view } = props as ProxyModelCardProps & ViewContext
  if (scope === undefined || useSnapshot === undefined || t === undefined) return null
  if (view === 'summary') {
    return <span data-testid="proxy-model-summary">{t('description')}</span>
  }
  if (view === 'page') {
    return <CardBody scope={scope} useSnapshot={useSnapshot} t={t} />
  }
  return <StandaloneCard scope={scope} useSnapshot={useSnapshot} t={t} />
}

/** The legacy dsh 0.1.7 rendering: a self-contained card with a header naming
 * the plugin over a line describing what its settings govern, disclosing the
 * configurable items in place. It opens expanded because the Plugins page
 * already spent one click on the tab. */
function StandaloneCard(props: Required<ProxyModelCardInjected>): ReactNode {
  const { scope, useSnapshot, t } = props
  const [open, setOpen] = useState(true)
  return (
    <li className={styles.card}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-label={`${t(open ? 'collapse' : 'expand')}: ${t('title')}`}
        data-testid="proxy-model-card-header"
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.headText}>
          <span className={styles.name}>{t('title')}</span>
          <span className={styles.description}>{t('description')}</span>
        </span>
        <IconChevronDownOutlineRegular className={styles.chevron + (open ? ` ${styles.chevronOpen}` : '')} />
      </button>
      {open && <CardBody scope={scope} useSnapshot={useSnapshot} t={t} />}
    </li>
  )
}
