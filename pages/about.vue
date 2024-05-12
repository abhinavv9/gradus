<template>
  <CoreHeader />
  <v-main class="my-4">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col md="9" lg="7">
          <NuxtLink to="/" style="font-size: 80%"
            ><v-icon>mdi-keyboard-backspace</v-icon> Back</NuxtLink
          >
          <h1 style="font-size: 30px">About Gradus</h1>
          <p>
            Gradus is an open-source tool that enables you to create codelabs
            using both markdown and rich markdown components. It offers the
            flexibility to operate either server-side or client-side, depending
            on your preference. Additionally, Gradus is experimenting with
            AI-enabled features to enhance its capabilities.
          </p>

          <v-btn
            href="https://github.com/oss-labs/gradus"
            variant="tonal"
            color="black"
            target="_blank"
            class="mt-3"
            append-icon="mdi-github"
            rounded
            >GitHub</v-btn
          >

          <CoreGTeam class="mt-10" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: "About Gradus",
  description:
    "Gradus is an open-source tool that enables you to create codelabs using both markdown and rich markdown components.",
  keywords: ["Gradus", "Codelab"],
  author: "Gradus",
  creator: "Gradus",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: "About Gradus",
  ogDescription:
    "Gradus is an open-source tool that enables you to create codelabs using both markdown and rich markdown components.",
  ogImage: "/donotremove/gradus-social.png",
  ogImageUrl: "/donotremove/gradus-social.png",
  ogUrl: "https://gradus.sudoboink.me/",
  ogType: "website",
  twitterTitle: "About Gradus",
  twitterDescription:
    "Gradus is an open-source tool that enables you to create codelabs using both markdown and rich markdown components.",
  twitterImage: "/donotremove/gradus-social.png",
  twitterCard: "summary_large_image",
});
</script>

<style>
</style>