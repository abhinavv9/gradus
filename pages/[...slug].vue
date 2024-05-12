<template>
  <ClientOnly>
    <CoreAppBar :title="data.title" />
    <!-- Left Sidebar -->
    <CoreLeftSideBar :authors="metadata.authors" v-model="sidebar">
      <SidebarChips
        :toc="finalData.body.toc"
        :currentNode="currentNode"
        @currentNodeChanged="(i) => (currentNode = i)"
      />
    </CoreLeftSideBar>
    <!-- Left Sidebar -->

    <v-main class="d-flex align-center justify-center mt-3">
      <v-fab
        @click="currentNode > 0 && currentNode--"
        variant="flat"
        icon
        app
        appear
        color="#DEE5F1"
        location="bottom start"
        class="d-none d-md-flex d-lg-flex d-lg-flex d-xxl-flex"
        ><v-icon>mdi-arrow-left</v-icon></v-fab
      >
      <v-slide-y-reverse-transition>
        <v-container
          fluid
          style="
            background-color: white;
            border-radius: 12px !important;
            border: 1px solid #dee5f1;
            min-height: 88vh;
            max-width: 900px;
          "
          class="mx-2 mt-0 pa-0 mb-0"
          v-show="show"
        >
          <div
            class="pa-md-8 pa-4"
            style="
              background-color: #e8f0fe;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            "
            v-if="currentNode == 0"
          >
            <v-btn
              class="float-right d-none d-md-flex d-lg-flex d-lg-flex d-xxl-flex"
              variant="flat"
              @click="aiDrawer = !aiDrawer"
              v-if="config.config.aiFlag"
              rounded
              size="small"
            >
              <v-avatar size="x-small">
                <v-img src="/public/donotremove/ai-logo.svg"></v-img>
              </v-avatar>
              AI Chat
            </v-btn>

            <p style="font-size: 150%">
              <b>{{ data.title }}</b>
            </p>
            <p style="font-size: 95%">{{ data.description }}</p>
            <p class="mt-4 mb-0" style="font-size: 95%">
              <b>Last Updated:</b> {{ formatDate(metadata.date) }}
            </p>
            <p class="mt-1" style="font-size: 95%">
              <b>Written By: </b>
              <span v-for="(author, i) in metadata.authors" :key="i">
                {{ author.name
                }}<span v-if="i < metadata.authors.length - 1">, </span>
              </span>
            </p>
            <v-chip
              size="small"
              variant="outlined"
              class="mr-2 mt-3"
              v-for="(tag, index) in metadata.tags"
              :key="index"
              >{{ tag }}</v-chip
            >
          </div>
          <!-- Header -->
          <div
            class="px-md-8 py-md-3 pa-4"
            style="
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
              border-bottom: 1px solid #e0e0e0;
            "
            v-if="currentNode != 0"
          >
            <p style="font-weight: 400">
              <span class="mr-1">{{ currentNode + 1 }}.</span>
              {{ finalData.body.toc[currentNode].title }} (
              <span
                ><v-icon size="lg" class="mt-n1 mr-1">mdi-av-timer</v-icon
                >{{ readTime }} min read </span
              >)
            </p>

            <v-btn
              class="float-right d-none d-md-flex d-lg-flex d-lg-flex d-xxl-flex mt-n6"
              variant="flat"
              @click="aiDrawer = !aiDrawer"
              rounded
              size="small"
              v-if="config.config.aiFlag"
            >
              <v-avatar size="x-small">
                <v-img src="/public/donotremove/ai-logo.svg"></v-img>
              </v-avatar>
              AI Chat
            </v-btn>
          </div>
          <!-- Header -->
          <div class="pa-md-8 pa-4">
            <div class="" v-for="(node, i) in finalData" :key="`node-${i}`">
              <ContentRenderer :value="node">
                <ContentRendererMarkdown :value="node" />
              </ContentRenderer>
            </div>
          </div>
        </v-container>
      </v-slide-y-reverse-transition>

      <v-fab
        @click="currentNode < groupedContent.length - 1 && currentNode++"
        variant="flat"
        icon
        app
        appear
        color="#DEE5F1"
        location="bottom right"
        :style="aiDrawer ? 'left: 0 !important' : ''"
        class="d-none d-md-flex d-lg-flex d-lg-flex d-xxl-flex"
        ><v-icon>mdi-arrow-right</v-icon></v-fab
      >
    </v-main>

    <!-- AI Sidebar -->
    <v-navigation-drawer
      floating
      app
      :width="aiDrawerWidth"
      location="right"
      v-if="config.config.aiFlag"
      elevation="0"
      v-model="aiDrawer"
      class="pa-3"
      style="background-color: #f5f8fc"
    >
      <AIChat :content="finalData.body"></AIChat>
    </v-navigation-drawer>
    <!-- AI Sidebar -->

    <!-- Mobile Navbar -->
    <CoreBottomNav
      :currentNode="currentNode"
      :contentLength="groupedContent.length"
      class="d-flex d-md-none d-lg-none d-lg-none d-xxl-none"
      @currentNodeChanged="(fn) => (currentNode = fn())"
    />
    <!-- Mobile Navbar -->
    <!-- Mobile Sidebar toggle -->
    <v-fab
      class="d-flex d-md-none d-lg-none d-lg-none d-xxl-none"
      @click="sidebar = !sidebar"
      icon="mdi-format-list-checks"
      location="bottom end"
      size="50"
      color="#E8F0FE"
      app
      appear
    ></v-fab>
    <!-- Mobile Sidebar toggle -->
  </ClientOnly>
</template>

<script setup>
import { config } from "../assets/config.js";

const route = useRoute();
const router = useRouter();
const aiDrawer = useAIChat();
const aiDrawerWidth = ref(400);
const show = ref(false);
const appLoading = useAppLoading();
const sidebar = useSideBar();

// Asynchronous data fetching
const { data } = await useAsyncData(`${route.path}`, () =>
  queryContent(route.path).findOne()
);

onMounted(async () => {
  appLoading.value = true;
  if (window.screen.width > 500) {
    aiDrawer.value = false;
    aiDrawerWidth.value = 300;
  }
  if (window.screen.width < 500) {
    aiDrawerWidth.value = window.screen.width;
  }
  show.value = true;

  setTimeout(() => {
    appLoading.value = false;
  }, 800);
});

const currentNode = ref(getCurrentNodeFromUrl());
const totalNodes = ref(0);

function getCurrentNodeFromUrl() {
  const url = new URLSearchParams(route.query);
  const node = url.get("page");
  return node ? parseInt(node) : 0;
}

const groupedContent = computed(() => {
  const sections = [];
  let currentSection = [];

  let styleEl = data.value?.body?.children.find((node) => node.tag === "style");

  data.value?.body?.children.forEach((node) => {
    if (node.tag === "h1" && currentSection.length) {
      sections.push(currentSection);
      currentSection = [];
    }
    if (styleEl != undefined) {
      currentSection.push(styleEl);
    }

    currentSection.push(node);
  });

  if (currentSection.length) sections.push(currentSection);

  return sections;
});

watch(
  currentNode,
  (newVal, oldVal) => {
    show.value = false;
    if (newVal !== oldVal) {
      router.replace({ path: route.fullPath, query: { page: newVal } });
    }

    // Scroll to top
    // window.scrollTo(0, 0);

    setTimeout(() => {
      show.value = true;
    }, 350);
  },
  { immediate: true }
);

// GetToc
const getToc = () => {
  let menu = [];
  data.value?.body?.children.forEach((node) => {
    if (node.tag == "h1") {
      menu.push({
        title: node?.children[0].value,
        link: node?.props.id,
      });
    }
  });
  totalNodes.value = menu.length;
  return menu;
};

// FormatDate
const formatDate = (dateString) => getFormatedDate(dateString);

// For seo
const metadata = computed(() => ({
  _type: data.value?._type,
  _id: data.value?._id,
  _source: data.value?._source,
  _file: data.value?._file,
  _extension: data.value?._extension,
  _path: data.value?._path,
  _dir: data.value?._dir,
  _draft: data.value?._draft,
  _partial: true,
  _locale: data.value?._locale,
  authors: data.value?.authors,
  date: data.value?.date,
  duration: data.value?.duration,
  title: data.value?.title,
  description: data.value?.description,
  categories: data.value?.categories,
  slug: data.value?.slug,
  image: data.value?.image,
}));

useSeoMeta({
  contentType: "text/html; charset=utf-8",
  title: `${metadata.value.title} - Gradus`,
  description: metadata.value.description,
  keywords: config.seo.keywords,
  author: config.seo.author,
  creator: "Gradus",
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1.0",
  ogTitle: `${metadata.value.title} - Gradus`,
  ogDescription: metadata.value.description,
  ogImage: `${config.hostUrl}${metadata.value.image}`,
  ogUrl: `${config.hostUrl}${metadata.value._path}`,
  ogType: "website",
  twitterTitle: `${metadata.value.title} - Gradus`,
  twitterDescription: metadata.value.description,
  twitterImage:`${config.hostUrl}${metadata.value.image}`,
  twitterCard: "summary_large_image",
});

useHead({
  link: [
    { rel: "canonical", href: `${config.hostUrl}${metadata.value._path}` },
  ],
  script: [
    {
      type: "application/ld+json",
      json: {
        "@context": "http://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${config.hostUrl}${metadata.value._path}`,
        },
        headline: metadata.value.title,
        image: [metadata.value.image],
        datePublished: metadata.value.date,
        dateModified: metadata.value.date,
        author: {
          "@type": "Person",
          name: metadata.value.authors?.join(", "),
        },
        description: metadata.value.description,
      },
    },
  ],
});

// Read time per section
const readTime = computed(() => {
  if (!groupedContent.value[currentNode.value]) return 0;
  return getReadTIme(groupedContent.value[currentNode.value]);
});

const finalData = computed(() => ({
  body: {
    type: "root",
    children: groupedContent.value[currentNode.value],
    toc: getToc(),
  },
}));
</script>
