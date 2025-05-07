import React from "react"
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"

import type { ApiConfiguration } from "@roo/shared/api"
import { liteLlmDefaultModelId } from "@roo/shared/api"
import { useAppTranslation } from "@src/i18n/TranslationContext"
// inputEventTransform might not be suitable if VSCodeTextField provides generic Event
// import { inputEventTransform } from "../transforms";

export interface ProviderSettingsProps {
	apiConfiguration: ApiConfiguration
	setApiConfigurationField: <K extends keyof ApiConfiguration>(field: K, value: ApiConfiguration[K]) => void
}

export const LiteLLM: React.FC<ProviderSettingsProps> = ({ apiConfiguration, setApiConfigurationField }) => {
	const { t } = useAppTranslation()

	// Simplified input handler for VSCodeTextField, using 'any' for event type
	// and ensuring a string value is passed for configuration.
	const onSettingChange = (field: "litellmApiKey" | "litellmApiUrl" | "litellmModelId") => (event: any) => {
		const rawValue = (event.currentTarget as HTMLInputElement)?.value
		setApiConfigurationField(field, (rawValue || "") as ApiConfiguration[typeof field])
	}

	return (
		<>
			<VSCodeTextField
				value={apiConfiguration?.litellmApiKey || ""}
				type="password"
				onInput={onSettingChange("litellmApiKey")}
				placeholder={t("settings:placeholders.apiKey")}
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.liteLLM.apiKey")}</label>
			</VSCodeTextField>
			<div className="text-sm text-vscode-descriptionForeground -mt-2">
				{t("settings:providers.apiKeyStorageNotice")}
			</div>
			<VSCodeTextField
				value={apiConfiguration?.litellmApiUrl || ""}
				type="url"
				onInput={onSettingChange("litellmApiUrl")}
				placeholder="http://localhost:4000"
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.liteLLM.apiUrl")}</label>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.litellmModelId || ""}
				onInput={onSettingChange("litellmModelId")}
				placeholder={t("settings:placeholders.modelIdOptional", {
					defaultValue: liteLlmDefaultModelId,
				})}
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.modelId")}</label>
			</VSCodeTextField>
		</>
	)
}