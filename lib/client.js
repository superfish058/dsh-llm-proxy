window.__ModuleLoader__.load({
	id: "@superfish058/dsh-llm-proxy",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_cordis = require("@deepseek-ai/cordis");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region \0dsh-css:E:\thirdparty\dsh-plugins\dsh-llm-proxy\src\client\proxy-model.module.css.mjs
		const css = ".GJODEq_card{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-3,#fff);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.GJODEq_card:hover{border-color:var(--dsw-alias-label-dimmed,#8b949e)}.GJODEq_cardOpen{background:var(--dsw-alias-bg-layer-2,#f6f8fa);border-color:var(--dsw-alias-label-dimmed,#8b949e)}.GJODEq_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.GJODEq_header:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:-2px}.GJODEq_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.GJODEq_name{color:var(--dsw-alias-label-primary,#1f2329);font-size:15px;font-weight:600;line-height:1.4}.GJODEq_description{color:var(--dsw-alias-label-tertiary,#6b7280);font-size:13px;line-height:1.5}.GJODEq_chevron{color:var(--dsw-alias-label-tertiary,#6b7280);flex:none;transition:transform .16s}.GJODEq_chevronOpen{transform:rotate(180deg)}.GJODEq_body{border-top:1px solid var(--dsw-alias-border-l2,#d0d7de);flex-direction:column;gap:14px;margin:0 16px;padding:14px 0 8px;display:flex}.GJODEq_status{color:var(--dsw-alias-label-tertiary,#6b7280);margin:4px 0;font-size:13px;line-height:1.5}.GJODEq_field{flex-direction:column;gap:4px;display:flex}.GJODEq_fieldRow{gap:10px;display:flex}.GJODEq_fieldRow>.GJODEq_field{flex:1 1 0;min-width:0}.GJODEq_fieldLabel{color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;font-weight:500}.GJODEq_fieldHint{color:var(--dsw-alias-label-tertiary,#6b7280);font-size:12px;line-height:1.45}.GJODEq_input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);width:100%;color:var(--dsw-alias-label-primary,#1f2329);color-scheme:light;border-radius:6px;padding:6px 8px;font-size:13px}.GJODEq_input:focus{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:-1px}.GJODEq_textarea{resize:vertical;min-height:56px;font-family:inherit;}.GJODEq_rowList{flex-direction:column;gap:6px;margin:0;padding:0;list-style:none;display:flex}.GJODEq_row{align-items:center;gap:6px;display:flex}.GJODEq_rowLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary,#1f2329);flex:1 1 0;font-size:13px;overflow:hidden}.GJODEq_select{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);width:100%;color:var(--dsw-alias-label-primary,#1f2329);color-scheme:light;border-radius:6px;padding:6px 8px;font-size:13px}.GJODEq_select:focus{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:-1px}body[data-ds-dark-theme] .GJODEq_input,body[data-ds-dark-theme] .GJODEq_select{color-scheme:dark}.GJODEq_select option{background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-primary,#1f2329)}.GJODEq_rowInput{flex:1 1 0;}.GJODEq_rowInputNarrow{flex:0 110px;}.GJODEq_rowRemove{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;border-radius:6px;flex:none;padding:4px 8px;font-size:12px}.GJODEq_rowRemove:hover{border-color:var(--dsw-alias-state-error-primary,#d1242f);color:var(--dsw-alias-state-error-primary,#d1242f)}.GJODEq_rowAdd{border:1px dashed var(--dsw-alias-border-l3,#a6adb4);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;background:0 0;border-radius:6px;align-self:flex-start;padding:4px 10px;font-size:12px}.GJODEq_rowAdd:hover{border-color:var(--dsw-alias-state-business-primary,#4f8cff);color:var(--dsw-alias-state-business-primary,#4f8cff)}.GJODEq_footer{align-items:center;gap:10px;margin-top:2px;display:flex}.GJODEq_primaryButton{background:var(--dsw-alias-button-primary-fill,#4f8cff);color:var(--dsw-alias-label-primary-foreground,#fff);cursor:pointer;border:none;border-radius:6px;padding:6px 14px;font-size:13px;font-weight:500}.GJODEq_primaryButton:hover{background:var(--dsw-alias-button-primary-hover,#3b76e0)}.GJODEq_primaryButton:disabled{opacity:.6;cursor:default}.GJODEq_ghostButton{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;border-radius:6px;padding:6px 12px;font-size:13px}.GJODEq_ghostButton:hover{border-color:var(--dsw-alias-border-l3,#a6adb4)}.GJODEq_saveStatus{font-size:12px;line-height:1.4}.GJODEq_saveStatusOk{color:var(--dsw-alias-state-success-primary,#1a7f37)}.GJODEq_saveStatusError{color:var(--dsw-alias-state-error-primary,#d1242f)}.GJODEq_saveStatusHint{color:var(--dsw-alias-label-tertiary,#6b7280)}.GJODEq_testBarHint{color:var(--dsw-alias-label-tertiary,#6b7280);font-size:11px;line-height:1.4}.GJODEq_rowWrap{flex-direction:column;gap:2px;display:flex}.GJODEq_rowTest{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;border-radius:6px;flex:none;padding:4px 8px;font-size:12px}.GJODEq_rowTest:hover{border-color:var(--dsw-alias-state-business-primary,#4f8cff);color:var(--dsw-alias-state-business-primary,#4f8cff)}.GJODEq_rowTest:disabled{opacity:.55;cursor:default}.GJODEq_testResult{padding-left:2px;font-size:12px;line-height:1.4}.GJODEq_testResultOk{color:var(--dsw-alias-state-success-primary,#1a7f37)}.GJODEq_testResultError{color:var(--dsw-alias-state-error-primary,#d1242f)}";
		const tagId = "@superfish058/dsh-llm-proxy/proxy-model.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@superfish058/dsh-llm-proxy";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var proxy_model_module_css_default = {
			"chevron": "GJODEq_chevron",
			"row": "GJODEq_row",
			"select": "GJODEq_select",
			"description": "GJODEq_description",
			"body": "GJODEq_body",
			"rowList": "GJODEq_rowList",
			"saveStatusHint": "GJODEq_saveStatusHint",
			"name": "GJODEq_name",
			"cardOpen": "GJODEq_cardOpen",
			"primaryButton": "GJODEq_primaryButton",
			"testBarHint": "GJODEq_testBarHint",
			"testResultError": "GJODEq_testResultError",
			"chevronOpen": "GJODEq_chevronOpen",
			"rowAdd": "GJODEq_rowAdd",
			"input": "GJODEq_input",
			"saveStatusOk": "GJODEq_saveStatusOk",
			"fieldRow": "GJODEq_fieldRow",
			"rowTest": "GJODEq_rowTest",
			"status": "GJODEq_status",
			"field": "GJODEq_field",
			"rowWrap": "GJODEq_rowWrap",
			"rowInputNarrow": "GJODEq_rowInputNarrow",
			"headText": "GJODEq_headText",
			"fieldLabel": "GJODEq_fieldLabel",
			"saveStatusError": "GJODEq_saveStatusError",
			"ghostButton": "GJODEq_ghostButton",
			"testResult": "GJODEq_testResult",
			"footer": "GJODEq_footer",
			"fieldHint": "GJODEq_fieldHint",
			"header": "GJODEq_header",
			"card": "GJODEq_card",
			"textarea": "GJODEq_textarea",
			"rowInput": "GJODEq_rowInput",
			"rowLabel": "GJODEq_rowLabel",
			"rowRemove": "GJODEq_rowRemove",
			"testResultOk": "GJODEq_testResultOk",
			"saveStatus": "GJODEq_saveStatus"
		};
		//#endregion
		//#region src/client/ProxyModelCard.tsx
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
		/** Schema defaults mirrored from lib/index.js (reset target + base merge). */
		const DEFAULTS = {
			proxyHost: "127.0.0.1",
			proxyPort: 7897,
			proxiedModels: [],
			retries: 3,
			retryIntervalMs: 1e3
		};
		/** Fields surfaced in the UI, in write order. */
		const UI_FIELDS = [
			"proxyHost",
			"proxyPort",
			"proxiedModels",
			"retries",
			"retryIntervalMs"
		];
		/** JSON-compatible deep equality (the card values are plain JSON). */
		function deepEqual(a, b) {
			return JSON.stringify(a) === JSON.stringify(b);
		}
		/** Build a fresh empty form. */
		function emptyForm() {
			return {
				proxyHost: "",
				proxyPort: String(DEFAULTS.proxyPort),
				proxiedModels: [],
				retries: String(DEFAULTS.retries),
				retryIntervalMs: String(DEFAULTS.retryIntervalMs)
			};
		}
		/** Hydrate the form from a resolved config value. */
		function formFromConfig(value) {
			return {
				proxyHost: value.proxyHost ?? "",
				proxyPort: String(value.proxyPort ?? DEFAULTS.proxyPort),
				proxiedModels: [...value.proxiedModels ?? []],
				retries: String(value.retries ?? DEFAULTS.retries),
				retryIntervalMs: String(value.retryIntervalMs ?? DEFAULTS.retryIntervalMs)
			};
		}
		/** Extract one top-level field's plain-JSON value from the form. */
		function fieldFromForm(form, field) {
			switch (field) {
				case "proxyHost": return form.proxyHost.trim();
				case "proxyPort": return Number(form.proxyPort);
				case "proxiedModels": return [...form.proxiedModels];
				case "retries": return Number(form.retries);
				case "retryIntervalMs": return Number(form.retryIntervalMs);
			}
		}
		/** Validate the draft; returns an error key or null. */
		function validateForm(form) {
			if (form.proxyHost.trim() === "") return "invalidEmpty";
			if (!/^\d+$/.test(form.proxyPort.trim())) return "invalidRange";
			const port = Number(form.proxyPort);
			if (port < 1 || port > 65535) return "invalidRange";
			if (!/^\d+$/.test(form.retries.trim())) return "invalidRange";
			if (!/^\d+$/.test(form.retryIntervalMs.trim())) return "invalidRange";
			if (Number(form.retries) > 10) return "invalidRange";
			if (Number(form.retryIntervalMs) > 6e4) return "invalidRange";
			return null;
		}
		/** Compute the field writes that land the form on the resolved value. */
		function diffWrites(form, snapshot) {
			const value = snapshot.value;
			const base = snapshot.base;
			const writes = [];
			for (const field of UI_FIELDS) {
				const next = fieldFromForm(form, field);
				const current = value?.[field];
				if (deepEqual(next, current)) continue;
				const baseValue = base?.[field];
				if (deepEqual(next, baseValue)) writes.push({
					field,
					op: "unset"
				});
				else writes.push({
					field,
					op: "set",
					value: next
				});
			}
			return writes;
		}
		/** Merge the composition base over the schema defaults (reset target). */
		function mergeDefaults(base) {
			return {
				proxyHost: base?.proxyHost ?? DEFAULTS.proxyHost,
				proxyPort: base?.proxyPort ?? DEFAULTS.proxyPort,
				proxiedModels: base?.proxiedModels ?? DEFAULTS.proxiedModels,
				retries: base?.retries ?? DEFAULTS.retries,
				retryIntervalMs: base?.retryIntervalMs ?? DEFAULTS.retryIntervalMs
			};
		}
		/** One labeled field; numeric fields use type="number" so non-digits are rejected by the browser. */
		function TextField(props) {
			const { label, hint, value, onChange, placeholder, testId, type = "text", min, max, step } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: proxy_model_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: proxy_model_module_css_default.fieldLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						className: proxy_model_module_css_default.input,
						type,
						value,
						placeholder,
						min,
						max,
						step,
						"data-testid": testId,
						onChange: (event) => onChange(event.target.value)
					}),
					hint !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: proxy_model_module_css_default.fieldHint,
						children: hint
					})
				]
			});
		}
		/** The card body: the configurable items form plus the save/reset footer. */
		function CardBody(props) {
			const { scope, useSnapshot, t } = props;
			const snapshot = useSnapshot();
			const [form, setForm] = (0, react.useState)(() => emptyForm());
			const [saving, setSaving] = (0, react.useState)(false);
			const [saved, setSaved] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const hydratedRef = (0, react.useRef)(false);
			const [models, setModels] = (0, react.useState)([]);
			const [modelsError, setModelsError] = (0, react.useState)(null);
			const [testingKey, setTestingKey] = (0, react.useState)(null);
			const [testResults, setTestResults] = (0, react.useState)({});
			(0, react.useEffect)(() => {
				if (snapshot.status === "ready" && !hydratedRef.current) {
					hydratedRef.current = true;
					setForm(formFromConfig(snapshot.value));
				}
			}, [snapshot.status]);
			(0, react.useEffect)(() => {
				if (models.length > 0 || modelsError !== null) return;
				let cancelled = false;
				scope.listModels().then((rows) => {
					if (!cancelled) setModels(rows);
				}).catch(() => {
					if (!cancelled) setModelsError(t("statusUnavailable"));
				});
				return () => {
					cancelled = true;
				};
			}, [
				models.length,
				modelsError,
				scope,
				t
			]);
			if (snapshot.status === "loading") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: proxy_model_module_css_default.status,
				children: t("statusLoading")
			});
			if (snapshot.status === "unavailable") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: proxy_model_module_css_default.status,
				children: t("statusUnavailable")
			});
			const handleSave = async () => {
				const validation = validateForm(form);
				if (validation !== null) {
					setSaved(false);
					setError(t(validation));
					return;
				}
				const writes = diffWrites(form, snapshot);
				if (writes.length === 0) {
					setSaved(true);
					setError(null);
					return;
				}
				setSaving(true);
				setError(null);
				const result = await scope.mutate(writes);
				setSaving(false);
				if (result.ok) setSaved(true);
				else {
					setSaved(false);
					setError(result.message ?? t("saveError"));
				}
			};
			const handleReset = async () => {
				setSaving(true);
				setError(null);
				const result = await scope.mutate(UI_FIELDS.map((field) => ({
					field,
					op: "unset"
				})));
				setSaving(false);
				if (result.ok) {
					setForm(formFromConfig(mergeDefaults(snapshot.base)));
					setSaved(true);
				} else {
					setSaved(false);
					setError(result.message ?? t("saveError"));
				}
			};
			const toggleModel = (key) => {
				setSaved(false);
				const selected = form.proxiedModels.includes(key) ? form.proxiedModels.filter((k) => k !== key) : [...form.proxiedModels, key];
				setForm({
					...form,
					proxiedModels: selected
				});
			};
			const handleTest = async (key) => {
				setTestingKey(key);
				const result = await scope.test(key);
				setTestResults((previous) => ({
					...previous,
					[key]: result
				}));
				setTestingKey(null);
			};
			/** One-line test detail: ✓ 连接成功 · 200 · 38ms · 经代理 / ✗ 连接失败：… */
			const formatTestDetail = (result) => {
				if (result.ok) {
					const parts = [];
					if (typeof result.status === "number") parts.push(String(result.status));
					if (typeof result.latencyMs === "number") parts.push(`${result.latencyMs}ms`);
					parts.push(result.viaProxy ? t("testViaProxy") : t("testDirect"));
					return parts.length > 0 ? ` · ${parts.join(" · ")}` : "";
				}
				return `：${result.message ?? result.code ?? t("testFail")}`;
			};
			/** Display label for a model row: `[厂商] 模型名`; the vendor prefix is
			* dropped when the model name already carries it (e.g. B.AI names are
			* already "deepseek-v4-flash（B.AI）", so the bracketed prefix would just
			* repeat the same text). */
			const rowLabel = (row) => row.providerLabel !== "" && !row.name.includes(row.providerLabel) ? `[${row.providerLabel}] ${row.name}` : row.name;
			/**
			* Models still selectable (not yet proxied), in config order. Every listed
			* model is offered regardless of whether its provider already resolves a
			* baseURL host: a provider without one simply routes nothing until the user
			* fills its baseURL in the Models page (the host resolver skips empty hosts
			* instead of erroring), so hiding those rows only made the list look
			* partial.
			*/
			const selectableModels = () => models.filter((row) => !form.proxiedModels.includes(row.key));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: proxy_model_module_css_default.body,
				"data-testid": "proxy-model-form",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: proxy_model_module_css_default.fieldRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("fieldProxyHost"),
							hint: t("fieldProxyHostHint"),
							value: form.proxyHost,
							placeholder: DEFAULTS.proxyHost,
							testId: "field-proxyHost",
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									proxyHost: value
								});
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("fieldProxyPort"),
							hint: t("fieldProxyPortHint"),
							value: form.proxyPort,
							placeholder: String(DEFAULTS.proxyPort),
							testId: "field-proxyPort",
							type: "number",
							min: 1,
							max: 65535,
							step: 1,
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									proxyPort: value
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: proxy_model_module_css_default.field,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: proxy_model_module_css_default.fieldLabel,
								children: t("fieldProxiedModels")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: proxy_model_module_css_default.fieldHint,
								children: t("fieldProxiedModelsHint")
							}),
							modelsError !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: proxy_model_module_css_default.status,
								children: modelsError
							}) : models.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: proxy_model_module_css_default.status,
								children: t("statusLoading")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
								className: proxy_model_module_css_default.rowList,
								children: form.proxiedModels.map((key) => {
									const row = models.find((m) => m.key === key);
									const result = testResults[key];
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
										className: proxy_model_module_css_default.rowWrap,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: proxy_model_module_css_default.row,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: proxy_model_module_css_default.rowLabel,
													children: row ? rowLabel(row) : key
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: proxy_model_module_css_default.rowTest,
													"data-testid": "test-proxied-model",
													disabled: testingKey !== null,
													onClick: () => {
														handleTest(key);
													},
													children: testingKey === key ? t("testing") : t("test")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: proxy_model_module_css_default.rowRemove,
													"data-testid": "remove-proxied-model",
													onClick: () => toggleModel(key),
													children: t("remove")
												})
											]
										}), result !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: `${proxy_model_module_css_default.testResult} ${result.ok ? proxy_model_module_css_default.testResultOk : proxy_model_module_css_default.testResultError}`,
											"data-testid": "test-proxied-result",
											children: [
												result.ok ? "✓ " : "✗ ",
												result.ok ? t("testOk") : t("testFail"),
												formatTestDetail(result)
											]
										})]
									}, key);
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
								className: proxy_model_module_css_default.select,
								"data-testid": "add-proxied-model",
								value: "",
								disabled: models.length === 0,
								onChange: (event) => {
									if (event.target.value !== "") toggleModel(event.target.value);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: "",
									children: t("selectModel")
								}), selectableModels().map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
									value: row.key,
									children: rowLabel(row)
								}, row.key))]
							}),
							form.proxiedModels.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: proxy_model_module_css_default.testBarHint,
								children: t("testBarHint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: proxy_model_module_css_default.fieldRow,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("fieldRetries"),
							hint: t("fieldRetriesHint"),
							value: form.retries,
							placeholder: String(DEFAULTS.retries),
							testId: "field-retries",
							type: "number",
							min: 0,
							max: 10,
							step: 1,
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									retries: value
								});
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("fieldRetryIntervalMs"),
							hint: t("fieldRetryIntervalMsHint"),
							value: form.retryIntervalMs,
							placeholder: String(DEFAULTS.retryIntervalMs),
							testId: "field-retryIntervalMs",
							type: "number",
							min: 0,
							max: 6e4,
							step: 1,
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									retryIntervalMs: value
								});
							}
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: proxy_model_module_css_default.footer,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: proxy_model_module_css_default.primaryButton,
								"data-testid": "save-proxy-model",
								disabled: saving || !snapshot.writable,
								onClick: () => {
									handleSave();
								},
								children: saving ? t("saving") : t("save")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: proxy_model_module_css_default.ghostButton,
								"data-testid": "reset-proxy-model",
								disabled: saving || !snapshot.writable,
								onClick: () => {
									handleReset();
								},
								children: t("reset")
							}),
							saved && !error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `${proxy_model_module_css_default.saveStatus} ${proxy_model_module_css_default.saveStatusOk}`,
								children: t("saved")
							}),
							error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: `${proxy_model_module_css_default.saveStatus} ${proxy_model_module_css_default.saveStatusError}`,
								children: [
									t("saveError"),
									"：",
									error
								]
							})
						]
					})
				]
			});
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
		function ProxyModelCard(props) {
			const { scope, useSnapshot, t, view } = props;
			if (scope === void 0 || useSnapshot === void 0 || t === void 0) return null;
			if (view === "summary") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"data-testid": "proxy-model-summary",
				children: t("description")
			});
			if (view === "page") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBody, {
				scope,
				useSnapshot,
				t
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StandaloneCard, {
				scope,
				useSnapshot,
				t
			});
		}
		/** The legacy dsh 0.1.7 rendering: a self-contained card with a header naming
		* the plugin over a line describing what its settings govern, disclosing the
		* configurable items in place. It opens expanded because the Plugins page
		* already spent one click on the tab. */
		function StandaloneCard(props) {
			const { scope, useSnapshot, t } = props;
			const [open, setOpen] = (0, react.useState)(true);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: proxy_model_module_css_default.card,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: proxy_model_module_css_default.header,
					"aria-expanded": open,
					"aria-label": `${t(open ? "collapse" : "expand")}: ${t("title")}`,
					"data-testid": "proxy-model-card-header",
					onClick: () => setOpen((current) => !current),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: proxy_model_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: proxy_model_module_css_default.name,
							children: t("title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: proxy_model_module_css_default.description,
							children: t("description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutlineRegular, { className: proxy_model_module_css_default.chevron + (open ? ` ${proxy_model_module_css_default.chevronOpen}` : "") })]
				}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBody, {
					scope,
					useSnapshot,
					t
				})]
			});
		}
		//#endregion
		//#region src/client/settings-scope.ts
		/**
		* Settings scope for dsh-llm-proxy.
		*
		* dsh 0.1.7 serves a plugin's settings document through the shared
		* `configForms` service, addressed by the plugin's Loader entry id
		* (`llm-proxy`); the old `settingsScope` binder is gone. This module adapts
		* that service to the `ProxyModelScope` face the card consumes, and keeps the
		* package's own loopback bridge as a fallback for a host whose official
		* document is unreachable (the bridge reads and writes the same entry id, so
		* both paths land on the same Host document).
		*/
		/** Settings namespace owned by the plugin (mirrors lib/settings.js). */
		const LLM_PROXY_NAMESPACE = "llm-proxy";
		/** Bridge route prefix (same-origin, loopback-only). */
		const SETTINGS_BRIDGE_PREFIX = "/api/dsh-llm-proxy/settings";
		/** True when the value is a well-formed bridge RPC result. */
		function isBridgeResult(value) {
			if (typeof value !== "object" || value === null) return false;
			const record = value;
			if (typeof record.ok !== "boolean") return false;
			if (record.ok) return typeof record.value === "object" && record.value !== null;
			return typeof record.code === "string" && typeof record.message === "string";
		}
		/** Build the fetch-backed settings face for the bridge routes. */
		function createBridgeApi(fetchFn) {
			const post = async (path, body) => {
				try {
					const response = await fetchFn(SETTINGS_BRIDGE_PREFIX + path, {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(body)
					});
					if (!response.ok) return {
						ok: false,
						code: "internal",
						message: "bridge HTTP " + response.status
					};
					const parsed = await response.json();
					if (!isBridgeResult(parsed)) return {
						ok: false,
						code: "internal",
						message: "bridge malformed response"
					};
					return parsed;
				} catch {
					return {
						ok: false,
						code: "internal",
						message: "settings bridge unreachable"
					};
				}
			};
			return {
				describe: () => post("/describe", {}),
				mutate: (payload) => post("/mutate", payload),
				models: async () => {
					const result = await post("/models", {});
					if (!result.ok || typeof result.value !== "object" || result.value === null) return [];
					const value = result.value;
					if (!Array.isArray(value.models)) return [];
					return value.models.filter(isModelRow);
				},
				test: async (key) => {
					const result = await post("/test", { key });
					if (!result.ok || typeof result.value !== "object" || result.value === null) return {
						key,
						ok: false,
						code: result.code ?? "internal",
						message: result.message ?? "test failed"
					};
					return result.value;
				}
			};
		}
		/** Type guard for a bridge model row. */
		function isModelRow(row) {
			if (typeof row !== "object" || row === null) return false;
			const record = row;
			return typeof record.key === "string" && typeof record.name === "string" && typeof record.providerLabel === "string" && typeof record.host === "string";
		}
		/**
		* A minimal SettingsScopeController over the bridge face, mirroring the
		* official controller's ordering (serialized queue, revision-fenced writes,
		* recovery read after a refusal).
		*/
		var BridgeScopeController = class {
			api;
			store;
			tail = Promise.resolve();
			disposed = false;
			constructor(fetchFn) {
				this.api = createBridgeApi(fetchFn);
				this.store = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({
					status: "loading",
					value: void 0,
					base: void 0,
					user: void 0,
					revision: void 0,
					writable: false,
					mode: "host"
				});
			}
			getSnapshot() {
				return this.store.getSnapshot();
			}
			subscribe(listener) {
				return this.store.subscribe(listener);
			}
			/** Queue a Host refresh through the bridge. */
			load() {
				return this.enqueue(() => this.read());
			}
			mutate(fields) {
				return this.enqueue(() => this.writeBatch(fields));
			}
			listModels() {
				return this.api.models();
			}
			test(key) {
				return this.enqueue(() => this.api.test(key));
			}
			async dispose() {
				this.disposed = true;
				await this.tail;
			}
			enqueue(operation) {
				if (this.disposed) return Promise.resolve(void 0);
				const task = this.tail.then(async () => {
					if (this.disposed) return void 0;
					return operation();
				});
				this.tail = task.then(() => void 0, () => void 0);
				return task;
			}
			async read() {
				let response;
				try {
					response = await this.api.describe();
				} catch {
					if (!this.disposed) this.markUnavailable();
					return;
				}
				if (!response.ok || this.disposed) {
					if (!this.disposed) this.markUnavailable();
					return;
				}
				const value = response.value;
				const view = (value.namespaces ?? []).find((candidate) => candidate.ns === LLM_PROXY_NAMESPACE);
				if (view === void 0) {
					this.store.update((draft) => {
						draft.status = "unavailable";
						draft.writable = value.writable !== false;
					});
					return;
				}
				this.accept(view, value.writable !== false);
			}
			async writeBatch(fields) {
				const revision = this.getSnapshot().revision;
				const ops = fields.map(({ field, op, value }) => op === "set" ? {
					op,
					path: [field],
					value
				} : {
					op,
					path: [field]
				});
				let response;
				try {
					response = await this.api.mutate({
						ns: LLM_PROXY_NAMESPACE,
						ops,
						...revision === void 0 ? {} : { expectedRevision: revision }
					});
				} catch {
					await this.read();
					return {
						ok: false,
						code: "internal",
						message: "settings bridge unreachable"
					};
				}
				if (!response.ok || this.disposed) {
					const refusal = response.ok === false ? response : {
						ok: false,
						code: "internal",
						message: "settings bridge unreachable"
					};
					await this.read();
					return {
						ok: false,
						code: refusal.code,
						message: refusal.message
					};
				}
				this.accept(response.value, this.getSnapshot().writable);
				return { ok: true };
			}
			accept(view, writable) {
				this.store.update((draft) => {
					draft.revision = view.revision;
					draft.base = view.base;
					draft.user = view.user;
					draft.writable = writable;
					if (view.value === void 0 || view.value === null) return;
					draft.status = "ready";
					draft.value = view.value;
				});
			}
			markUnavailable() {
				this.store.update((draft) => {
					draft.status = "unavailable";
				});
			}
		};
		/** Normalize any scope snapshot into the shared snapshot shape. */
		function snapshotOf(snapshot) {
			return snapshot;
		}
		/** Wrap the official settings scope with the bridge fallback. */
		function createCompatScope(primary, fetchFn) {
			const fallback = new BridgeScopeController(fetchFn);
			const store = (0, _deepseek_ai_dsh_client_store.createSnapshotStore)({
				status: "loading",
				value: void 0,
				base: void 0,
				user: void 0,
				revision: void 0,
				writable: false,
				mode: "host"
			});
			let fallbackStarted = false;
			const project = () => {
				const primarySnapshot = snapshotOf(primary.getSnapshot());
				if (primarySnapshot.status === "ready") return primarySnapshot;
				const bridgeSnapshot = fallback.getSnapshot();
				if (bridgeSnapshot.status === "ready") return bridgeSnapshot;
				if (primarySnapshot.status === "loading" || bridgeSnapshot.status === "loading") return {
					...primarySnapshot,
					status: "loading"
				};
				return primarySnapshot;
			};
			const publish = () => {
				store.set({
					...project(),
					mode: "host"
				});
			};
			const startFallback = () => {
				if (fallbackStarted) return;
				fallbackStarted = true;
				fallback.load();
			};
			const unsubscribes = [primary.subscribe(() => {
				publish();
				if (snapshotOf(primary.getSnapshot()).status !== "ready") startFallback();
			}), fallback.subscribe(publish)];
			if (snapshotOf(primary.getSnapshot()).status !== "ready") startFallback();
			publish();
			const active = () => {
				if (snapshotOf(primary.getSnapshot()).status === "ready") return primary;
				return fallback;
			};
			return {
				getSnapshot: () => store.getSnapshot(),
				subscribe: (listener) => store.subscribe(listener),
				load: async () => {
					fallbackStarted = true;
					await fallback.load();
				},
				listModels: () => fallback.listModels(),
				test: (key) => fallback.test(key),
				mutate: async (fields) => {
					const backend = active();
					if (backend === fallback) {
						if (fallback.getSnapshot().status !== "ready") await fallback.load();
						return fallback.mutate(fields);
					}
					const official = backend;
					let firstFailure;
					for (const { field, op, value } of fields) try {
						if (op === "set") await official.set(field, value);
						else await official.unset(field);
					} catch {
						firstFailure ??= {
							ok: false,
							code: "internal",
							message: "settings write failed"
						};
					}
					return firstFailure ?? { ok: true };
				},
				dispose: async () => {
					for (const unsubscribe of unsubscribes.splice(0)) unsubscribe();
					await fallback.dispose();
					await primary.dispose();
				}
			};
		}
		/**
		* Reach the settings service on a context, or undefined when this host does
		* not provide it (the caller stays inert instead of failing its own fiber).
		*/
		function configFormsOf(ctx) {
			const service = ctx.get("configForms");
			if (typeof service !== "object" || service === null) return void 0;
			const record = service;
			if (typeof record.get !== "function" || typeof record.whileServed !== "function") return void 0;
			return service;
		}
		/**
		* The settings scope binder, provided as the `llmProxySettings` service.
		* Rides the official `configForms` document first and hands the bridge
		* controller in only while that document is not ready, so official behaviour
		* stays untouched wherever it works and the Host remains the authority.
		*/
		var LlmProxySettingsBinder = class extends _deepseek_ai_cordis.Service {
			constructor(ctx) {
				super(ctx, "llmProxySettings");
			}
			/**
			* Bind the llm-proxy settings document.
			* @param forms - the configForms service (see {@link configFormsOf}).
			* @returns the composite scope the card consumes.
			*/
			bind(forms) {
				const ctx = this.ctx;
				const form = forms.get(LLM_PROXY_NAMESPACE);
				const scope = createCompatScope({
					getSnapshot: () => form.getSnapshot(),
					subscribe: (listener) => form.subscribe(listener),
					set: async (field, value) => {
						if (!await form.set(field, value)) throw new Error("llm-proxy: the Host refused the write");
					},
					unset: async (field) => {
						if (!await form.unset(field)) throw new Error("llm-proxy: the Host refused the clear");
					},
					load: () => Promise.resolve(),
					dispose: () => Promise.resolve()
				}, (input, init) => fetch(input, init));
				ctx.effect(() => {
					const remote = ctx.get("remote");
					const disposers = [];
					if (remote !== void 0 && typeof remote.$on === "function") disposers.push(remote.$on("settings/document-updated", (namespace) => {
						if (namespace !== void 0 && namespace !== "llm-proxy") return;
						scope.load();
					}));
					disposers.push(ctx.on("connection/reset", () => {
						scope.load();
					}));
					return () => {
						for (const dispose of disposers) dispose();
						scope.dispose();
					};
				}, "dsh-llm-proxy: compat scope invalidation");
				return scope;
			}
		};
		//#endregion
		//#region src/client/locales.ts
		/**
		* The `settings.llm-proxy` locale dictionaries for the 模型代理 page.
		* Keys track exactly the UI-surfaced fields (proxyHost/proxyPort,
		* proxiedModels, retries/retryIntervalMs).
		*/
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			nav: "模型代理",
			title: "模型代理（dsh-llm-proxy）",
			description: "选中的模型请求走代理并自动重试。",
			statusLoading: "加载中…",
			statusUnavailable: "设置服务不可用，无法读取或写入代理配置。",
			fieldProxyHost: "代理地址（proxyHost）",
			fieldProxyHostHint: "代理服务器主机或 IP，不必是本机。",
			fieldProxyPort: "代理端口（proxyPort）",
			fieldProxyPortHint: "代理服务端口（1–65535）。",
			fieldProxiedModels: "走代理的模型（proxiedModels）",
			fieldProxiedModelsHint: "按 API 地址走代理：选中一个模型会将该地址下的所有模型都路由到代理。",
			fieldRetries: "重试次数（retries）",
			fieldRetriesHint: "请求失败（网络错误 / 429 / 5xx）时的最大重试次数（0–10）。",
			fieldRetryIntervalMs: "重试间隔（retryIntervalMs）",
			fieldRetryIntervalMsHint: "每次重试之间的等待毫秒数（0–60000）。",
			selectModel: "选择模型…",
			remove: "移除",
			save: "保存",
			saving: "保存中…",
			saved: "已保存，立即生效",
			reset: "恢复默认",
			saveError: "保存失败",
			invalidRange: "端口或数值超出允许范围。",
			invalidEmpty: "代理地址不能为空。",
			expand: "展开",
			collapse: "收起",
			test: "测试连接",
			testing: "测试中…",
			testOk: "连接成功",
			testFail: "连接失败",
			testViaProxy: "经代理",
			testDirect: "直连",
			testBarHint: "「测试连接」走已保存的配置，改代理勾选后请先保存再测试。"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			nav: "Proxy Model",
			title: "Proxy Model (dsh-llm-proxy)",
			description: "Selected models route through the proxy with automatic retries.",
			statusLoading: "Loading…",
			statusUnavailable: "Settings service unavailable; the proxy configuration cannot be read or written.",
			fieldProxyHost: "Proxy host (proxyHost)",
			fieldProxyHostHint: "Proxy server hostname or IP; does not have to be this machine.",
			fieldProxyPort: "Proxy port (proxyPort)",
			fieldProxyPortHint: "Proxy service port (1–65535).",
			fieldProxiedModels: "Proxied models (proxiedModels)",
			fieldProxiedModelsHint: "Proxy routing is per API base URL: selecting one model also routes all models sharing that host.",
			fieldRetries: "Retries (retries)",
			fieldRetriesHint: "Max retry attempts on failure (network error / 429 / 5xx), 0–10.",
			fieldRetryIntervalMs: "Retry interval (retryIntervalMs)",
			fieldRetryIntervalMsHint: "Milliseconds between retry attempts (0–60000).",
			selectModel: "Select model…",
			remove: "Remove",
			save: "Save",
			saving: "Saving…",
			saved: "Saved, applied live",
			reset: "Reset to defaults",
			saveError: "Save failed",
			invalidRange: "Port or numeric value out of range.",
			invalidEmpty: "Proxy host must not be empty.",
			expand: "Expand",
			collapse: "Collapse",
			test: "Test",
			testing: "Testing…",
			testOk: "Connected",
			testFail: "Failed",
			testViaProxy: "via proxy",
			testDirect: "direct",
			testBarHint: "Test uses the saved routing; save before testing a newly proxied model."
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.llm-proxy";
		/** Required services (cordis fiber inject) — core UI services only. */
		const inject = ["slots", "locale"];
		/**
		* Mount the 模型代理 page once the settings service answers, and bind the
		* llm-proxy settings document it serves.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-llm-proxy: copy dictionaries");
			const t = ctx.locale.bind(NS);
			ctx.inject(["configForms"], (child) => {
				const forms = configFormsOf(child);
				if (forms === void 0) return;
				const scope = new LlmProxySettingsBinder(child).bind(forms);
				const useSnapshot = () => (0, react.useSyncExternalStore)(scope.subscribe, scope.getSnapshot);
				const injected = () => ({
					scope,
					useSnapshot,
					t
				});
				child.effect(() => forms.whileServed([LLM_PROXY_NAMESPACE], () => child.slots.inject("plugins.item", () => child.slots.register({
					name: "plugins.item",
					id: LLM_PROXY_NAMESPACE,
					order: 50,
					label: () => t("title"),
					locale: NS,
					inject: injected
				}, ProxyModelCard))), "dsh-llm-proxy: settings page");
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map