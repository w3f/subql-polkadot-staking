{{/* Returns the indexer deployment name */}}
{{- define "indexer.deploymentName" -}}
{{ .Release.Name }}-indexer
{{- end }}

{{/* Returns the indexer service name */}}
{{- define "indexer.serviceName" -}}
{{ .Release.Name }}-indexer
{{- end }}

{{/* Returns the graphql deployment name */}}
{{- define "graphql.deploymentName" -}}
{{ .Release.Name }}-graphql
{{- end }}

{{/* Returns the graphql service name */}}
{{- define "graphql.serviceName" -}}
{{ .Release.Name }}-graphql
{{- end }}