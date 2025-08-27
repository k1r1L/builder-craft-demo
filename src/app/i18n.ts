import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      fieldBuilder: "Field Builder",
      label: "Label",
      type: "Type",
      multiSelect: "Multi-select",
      required: "A value is required",
      defaultValue: "Default Value",
      choices: "Choices",
      order: "Order",
      alphabetical: "Display choices in Alphabetical",
      asEntered: "Display choices as Entered",
      save: "Save changes",
      saving: "Saving...",
      cancel: "Or Cancel",
      clear: "Clear & Start Fresh",
      errors: {
        labelRequired: "Label is required.",
        dupes: "Duplicate choices are not allowed.",
        tooMany: "No more than {{max}} choices allowed."
      },
      alerts: {
        saved: "Saved! (Check your webhook URL to see the JSON payload.)",
        failed: "Failed to post. Check console / endpoint."
      }
    }
  }
  // Add more locales easily here
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
