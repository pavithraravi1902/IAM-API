import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String },
  password: { type: String },
  custom_attributes: { type: Map, of: String },
  status: {
    type: String,
    enum: ["active", "pending", "blocked"],
    default: "active",
  },
  email_verified: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false },
  mfa_enabled: { type: Boolean, default: false },
  roles: { type: [String] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_login: { type: Date },

  provider: { type: String },
  provider_id: { type: String },
  federated_attributes: { type: Map, of: String },
});

const GroupSchema = new Schema({
  name: { type: String },
  description: { type: String },
  permissions: { type: Map, of: Boolean },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const SigninExpSchema = new Schema({
  allowed_flows: { type: [String], enum: ["password", "sso", "mfa"] },
  multi_factor_auth: { type: Boolean, default: false },
  login_message: { type: String },
  max_attempts: { type: Number, default: 5 },
  logout_duration: { type: Number, default: 30 },
  federated_identity_providers: [{ provider: String, provider_id: String }],
  password_policy: {
    min_length: { type: Number, default: 8 },
    require_uppercase: { type: Boolean, default: true },
    require_numbers: { type: Boolean, default: true },
    allowed_symbols: { type: String, default: "!@#$%^&*()_+[]{}|;:,.<>?" },
  },
  user_account_recovery: {
    type: String,
    enum: ["email", "sms"],
    default: "email",
  },
});

const SignupExpSchema = new Schema({
  required_attributes: {
    type: [String],
    default: ["email", "password", "address", "phone_number"],
  },
  auto_confirm: { type: Boolean, default: false },
  welcome_message: { type: String },
  captcha_required: { type: Boolean, default: false },
  invite_only: { type: Boolean, default: false },
  custom_questions: [{ question: String, answer: String }],
  attribute_verification: {
    method: {
      type: String,
      enum: ["Cognito-assisted", "self-managed"],
      default: "Cognito-assisted",
    },
    auto_send_verification_messages: { type: Boolean, default: true },
    verify_attributes: { type: [String], default: ["email"] },
    keep_original_on_update_pending: { type: Boolean, default: true },
    active_attributes_on_pending: { type: [String], default: ["email"] },
  },
  account_confirmation_required: { type: Boolean, default: true },
  custom_attributes: [
    {
      name: { type: String },
      type: {
        type: String,
        enum: ["String", "Number", "Date", "Boolean"],
        required: true,
      },
      min_length: { type: Number, default: 0 },
      max_length: { type: Number, default: 255 },
      mutable: { type: Boolean, default: true },
    },
  ],
  self_service_signup: { type: Boolean, default: true },
});

const MessageSchema = new Schema({
  type: { type: String, enum: ["email", "sms"], required: true },
  subject: { type: String },
  template: { type: String, required: true },
  sender_email: { type: String, default: "pavithrar@bloomlync.com" },
  sender_name: {
    type: String,
    default: "Pavithra Ravi <pavithraravi1902@gmail.com>",
  },
  send_on: { type: String, enum: ["signup", "password_reset", "custom"] },
  reply_to_email: { type: String, default: "pavithraravi1902@gmail.com" },
  templates: [
    {
      message_type: {
        type: String,
        enum: ["verification", "invitation", "mfa"],
        required: true,
      },
      delivery_method: {
        type: [String],
        enum: ["SMS", "Email"],
        required: true,
      },
    },
  ],
});

const AppClientSchema = new Schema({
  name: { type: String, required: true },
  client_id: { type: String, required: true },
  client_secret: { type: String, required: true },
  redirect_uris: { type: [String], required: true },
  authentication_flows: {
    type: [String],
    enum: ["ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_CUSTOM_AUTH", "ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_USER_PASSWORD_AUTH"],
  },
  session_duration: { type: Number, default: 3 * 60 }, // in seconds
  refresh_token_expiration: { type: Number, default: 30 }, // in days
  access_token_expiration: { type: Number, default: 60 }, // in minutes
  id_token_expiration: { type: Number, default: 60 }, // in minutes
  advanced_auth_settings: {
    token_revocation: { type: Boolean, default: false },
    prevent_user_existence_errors: { type: Boolean, default: false },
  },
  attribute_permissions: {
    read: { type: [String] },
    write: { type: [String] },
  },
  pinpoint_analytics: {
    enabled: { type: Boolean, default: false },
  },
  hosted_ui: {
    status: { type: String, enum: ["available", "disabled"], default: "available" },
    callback_urls: { type: [String] },
    signout_urls: { type: [String] },
    identity_providers: { type: [String] },
    oauth_grant_types: { type: [String], enum: ["authorization_code", "implicit"], default: ["authorization_code"] },
    openid_connect_scopes: { type: [String], enum: ["email", "openid", "phone"], default: ["email", "openid"] },
    custom_scopes: { type: [String] },
  },
  hosted_ui_customization: {
    logo: { type: String },
    custom_css: { type: String },
  },
});


const AppIntegrationSchema = new Schema({
  // hosted_ui_domain: {
  //   type: String,
  //   default: "https://authhub.auth.ap-southeast-2.authNexus.com",
  // },
  custom_domain: { type: String },
  scopes: { type: [String] },
  grant_types: {
    type: [String],
    enum: ["authorization_code", "client_credentials"],
    required: true,
  },
  token_lifetime: { type: Number, default: 3600 },
  resource_servers: [
    {
      name: { type: String },
      identifier: { type: String },
      custom_scopes: [{ type: String }],
    },
  ],
  app_clients: [AppClientSchema], 
});

const UserPoolPropertiesSchema = new Schema({
  password_policy: {
    min_length: { type: Number, default: 8 },
    require_uppercase: { type: Boolean, default: true },
    require_numbers: { type: Boolean, default: true },
    allowed_symbols: { type: String, default: "!@#$%^&*()_+[]{}|;:,.<>?" },
  },
  max_password_age: { type: Number, default: 90 },
  account_recovery: { type: String, enum: ["email", "sms"], default: "email" },
  session_timeout: { type: Number, default: 3600 },
  email_verification_required: { type: Boolean, default: true },
});

const UserPoolSchema = new Schema({
  name: { type: String, required: true },
  creation_date: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  admin_email: { type: String, required: true },
  domain: { type: String },
  default_group: { type: String },
  users: [UserSchema],
  groups: [GroupSchema],
  signin_exp: SigninExpSchema,
  signup_exp: SignupExpSchema,
  messages: [MessageSchema],
  app_integration: [AppIntegrationSchema],
  user_pool_properties: UserPoolPropertiesSchema,

  // Dashboard-specific fields
  total_users: { type: Number, default: 0 },
  active_users: { type: Number, default: 0 },
  pending_users: { type: Number, default: 0 },
  blocked_users: { type: Number, default: 0 },
  total_groups: { type: Number, default: 0 },
  mfa_enabled_users: { type: Number, default: 0 },
  daily_signups: { type: [Date], default: [] },
  daily_signins: { type: [Date], default: [] },

  // Audit fields
  created_by: { type: String },
  updated_by: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserPool = mongoose.model("UserPool", UserPoolSchema);

export default UserPool;
