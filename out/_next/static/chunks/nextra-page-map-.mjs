import meta from "../../../pages/_meta.js";
import developer_guides_meta from "../../../pages/developer_guides/_meta.js";
import user_guides_meta from "../../../pages/user_guides/_meta.js";
export const pageMap = [{
  data: meta
}, {
  name: "about",
  route: "/about",
  frontMatter: {
    "sidebarTitle": "About"
  }
}, {
  name: "developer_guides",
  route: "/developer_guides",
  children: [{
    data: developer_guides_meta
  }, {
    name: "back_end",
    route: "/developer_guides/back_end",
    frontMatter: {
      "sidebarTitle": "Back End"
    }
  }, {
    name: "deployment",
    route: "/developer_guides/deployment",
    frontMatter: {
      "sidebarTitle": "Deployment"
    }
  }, {
    name: "front_end",
    route: "/developer_guides/front_end",
    frontMatter: {
      "sidebarTitle": "Front End"
    }
  }, {
    name: "how_to_contributes",
    route: "/developer_guides/how_to_contributes",
    frontMatter: {
      "sidebarTitle": "How to Contributes"
    }
  }, {
    name: "index",
    route: "/developer_guides",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}, {
  name: "user_guides",
  route: "/user_guides",
  children: [{
    data: user_guides_meta
  }, {
    name: "installation",
    route: "/user_guides/installation",
    frontMatter: {
      "sidebarTitle": "Installation"
    }
  }]
}];