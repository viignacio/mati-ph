'use client'

import { useCallback, useEffect, useState } from 'react'
import { set, unset, type StringInputProps } from 'sanity'
import { Box, Card, Flex, Grid, Text, TextInput } from '@sanity/ui'
import { ICON_OPTIONS } from '../lib/iconOptions'

const FONT_STYLE_ID = 'material-symbols-studio-font'

function injectMaterialSymbolsFont() {
  if (typeof document === 'undefined') return
  if (document.getElementById(FONT_STYLE_ID)) return
  const style = document.createElement('style')
  style.id = FONT_STYLE_ID
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    .studio-material-symbol {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
    }
  `
  document.head.appendChild(style)
}

export function IconPickerInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props
  const [search, setSearch] = useState('')

  useEffect(() => {
    injectMaterialSymbolsFont()
  }, [])

  const handleSelect = useCallback(
    (iconValue: string) => {
      if (readOnly) return
      if (iconValue === value) {
        onChange(unset())
      } else {
        onChange(set(iconValue))
      }
    },
    [onChange, readOnly, value]
  )

  const searchLower = search.toLowerCase()
  const filtered = search
    ? ICON_OPTIONS.filter(
        (icon) =>
          icon.title.toLowerCase().includes(searchLower) ||
          icon.value.includes(searchLower) ||
          icon.category.toLowerCase().includes(searchLower)
      )
    : ICON_OPTIONS

  const categories = search
    ? ['Search Results']
    : Array.from(new Set(ICON_OPTIONS.map((i) => i.category)))

  return (
    <Box>
      {/* Current selection preview */}
      {value && (
        <Card
          padding={3}
          radius={2}
          tone="primary"
          marginBottom={3}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span className="studio-material-symbol" style={{ fontSize: 28 }}>
            {value}
          </span>
          <Box flex={1}>
            <Text size={1} weight="semibold">
              {ICON_OPTIONS.find((i) => i.value === value)?.title ?? value}
            </Text>
            <Text size={0} muted style={{ marginTop: 2 }}>
              {value}
            </Text>
          </Box>
          {!readOnly && (
            <Text
              size={0}
              muted
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => onChange(unset())}
            >
              Clear
            </Text>
          )}
        </Card>
      )}

      {/* Search */}
      <Box marginBottom={3}>
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search icons by name or category..."
          disabled={readOnly}
        />
      </Box>

      {/* Icon grid */}
      <Box style={{ maxHeight: 380, overflowY: 'auto' }}>
        {categories.map((category) => {
          const icons = search
            ? filtered
            : ICON_OPTIONS.filter((i) => i.category === category)

          if (icons.length === 0) return null

          return (
            <Box key={category} marginBottom={4}>
              <Text size={0} weight="semibold" muted style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {category}
              </Text>
              <Grid columns={6} gap={1} style={{ marginTop: 6 }}>
                {icons.map((icon) => {
                  const isSelected = value === icon.value
                  return (
                    <Card
                      key={icon.value}
                      padding={2}
                      radius={2}
                      tone={isSelected ? 'primary' : 'default'}
                      onClick={() => handleSelect(icon.value)}
                      style={{
                        cursor: readOnly ? 'default' : 'pointer',
                        textAlign: 'center',
                        border: isSelected ? '2px solid var(--card-border-color)' : '2px solid transparent',
                      }}
                      title={`${icon.title} (${icon.value})`}
                    >
                      <Flex direction="column" align="center" gap={1}>
                        <span className="studio-material-symbol" style={{ fontSize: 22 }}>
                          {icon.value}
                        </span>
                      </Flex>
                    </Card>
                  )
                })}
              </Grid>
            </Box>
          )
        })}

        {filtered.length === 0 && (
          <Card padding={4} tone="caution" radius={2}>
            <Text size={1} muted align="center">
              No icons found for &ldquo;{search}&rdquo;
            </Text>
          </Card>
        )}
      </Box>
    </Box>
  )
}
