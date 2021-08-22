<template>
    <b-button
      variant="outline-primary"
      target="_blank"
      :href="`/${route}`"
      block
      style="white-space: pre-wrap"
    >
      <font-awesome-icon
        :icon="icon"
        class="mr-2"
      />{{ text }}
    </b-button>
</template>

<script src="./link-button.ts" lang="ts"/>
