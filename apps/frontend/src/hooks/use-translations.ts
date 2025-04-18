import { useTranslations } from "next-intl";

export function useAppClientTranslations() {
  return {
    teams: {
      common: useTranslations("teams.common"),
      dashboard: useTranslations("teams.dashboard"),
      list: useTranslations("teams.list"),
      users: useTranslations("teams.users"),
      roles: useTranslations("teams.roles"),
      tickets: {
        detail: useTranslations("teams.tickets.detail"),
        form: {
          base: useTranslations("teams.tickets.form"),
          channels: useTranslations("teams.tickets.form.channels"),
          priorities: useTranslations("teams.tickets.form.priorities"),
        },
        list: useTranslations("teams.tickets.list"),
        new_dialog: useTranslations("teams.tickets.new_dialog"),
        timeline: useTranslations("teams.tickets.timeline"),
      },
    },
    users: {
      list: useTranslations("users.list"),
      detail: useTranslations("users.detail"),
      common: useTranslations("users.common"),
      form: useTranslations("users.form"),
      profile: useTranslations("users.profile"),
      org_chart_view: useTranslations("users.org_chart_view"),
    },
    common: {
      buttons: useTranslations("common.buttons"),
      misc: useTranslations("common.misc"),
      navigation: useTranslations("common.navigation"),
      permission: useTranslations("common.permission"),
    },
    authorities: {
      common: useTranslations("authorities.common"),
      list: useTranslations("authorities.list"),
      detail: useTranslations("authorities.detail"),
      add: useTranslations("authorities.add"),
      form: useTranslations("authorities.form"),
    },
    header: {
      nav: useTranslations("header.nav"),
    },
    workflows: {
      add: useTranslations("workflows.add"),
      common: useTranslations("workflows.common"),
      detail: useTranslations("workflows.detail"),
      list: useTranslations("workflows.list"),
    },
    login: {
      form: useTranslations("login.form"),
    },
  };
}
