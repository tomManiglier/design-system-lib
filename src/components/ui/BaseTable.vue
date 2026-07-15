<template>
  <div class="table-wrap">
    <table class="table">
      <caption v-if="caption" class="table__caption">{{ caption }}</caption>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from './types';

defineProps<{
  columns: TableColumn[];
  rows: Record<string, string | number>[];
  caption?: string;
}>();
</script>

<style scoped lang="scss">
.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.table__caption {
  caption-side: bottom;
  padding: 12px;
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
  text-align: left;
}

th {
  text-align: left;
  font-weight: var(--weight-medium);
  color: var(--color-muted-foreground);
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background 0.12s ease;

  &:hover {
    background: var(--color-muted);
  }
}
</style>
