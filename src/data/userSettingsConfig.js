import { parseCustomDate } from "../helpers/helpers";

export const USER_SETTINGS_CONFIG = {
  ui: {
    gridTemplateAreas: `
     "edit save"
     "personal-title personal-title"
     "cover_url full_name"
     "display_name display_name"
     "account-settings-title account-settings-title"
     "subscribed ."
     "account-info-title account-info-title"
     "email email_verified"
     "created_at created_at"
     "subscription_start_date subscription_end_date"
    `,
    gridTemplateAreasResp: "test",
  },
  sections: [
    {
      title: "Personal Information",
      gridArea: "personal-title",
      readOnly: false,
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          editable: true,
          required: true,
          placeholder: "Enter your full name",
          validation: {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Full name must be no more than 50 characters",
            },
            pattern: {
              value: /^[a-zA-ZšđčćžŠĐČĆŽ\s]+$/,
              message: "Full name must contain only letters and spaces",
            },
          },
        },
        {
          name: "display_name",
          label: "Display Name",
          type: "text",
          editable: true,
          required: false,
          placeholder: "How others see you",
          validation: {
            maxLength: {
              value: 30,
              message: "Display name must be no more than 30 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]*$/,
              message:
                "Display name can only contain letters, numbers and underscores",
            },
          },
        },
        {
          name: "cover_url",
          label: "Profile Cover Image",
          type: "image",
          editable: true,
          required: false,
          placeholder: "",
          validation: {},
        },
      ],
    },
    {
      title: "Account Settings",
      gridArea: "account-settings-title",
      readOnly: true,
      fields: [
        {
          name: "subscribed",
          label: "Premium Subscription",
          type: "subscription-status",
          editable: false,
          description: "Access premium features and content",
          format: (value) => (value ? "Subscribed" : "Not Subscribed"),
        },
      ],
    },
    {
      title: "Account Information",
      gridArea: "account-info-title",
      readOnly: true,
      fields: [
        {
          name: "email",
          label: "Email Address",
          type: "text",
          editable: false,
        },
        {
          name: "created_at",
          label: "Member Since",
          type: "text",
          editable: false,
          format: (value) => parseCustomDate(value),
        },
        {
          name: "email_verified",
          label: "Email Verified",
          type: "text",
          editable: false,
          format: (value) => (value ? "Verified" : "Not Verified"),
        },
        {
          name: "subscription_start_date",
          label: "Subscription Start",
          type: "text",
          editable: false,
          format: (value) =>
            value ? parseCustomDate(value) : "Not subscribed",
        },
        {
          name: "subscription_end_date",
          label: "Subscription End",
          type: "text",
          editable: false,
          format: (value) =>
            value ? parseCustomDate(value) : "Not subscribed",
        },
      ],
    },
  ],
};
