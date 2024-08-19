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
  provider_id: { type: String, unique: true },
  federated_attributes: { type: Map, of: String },
});

const GroupSchema = new Schema({
  name: { type: String, required: true },
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
  lockout_duration: { type: Number, default: 30 },
});

const SignupExpSchema = new Schema({
  required_attributes: { type: [String], default: ["email", "password"] },
  auto_confirm: { type: Boolean, default: false },
  welcome_message: { type: String },
  captcha_required: { type: Boolean, default: false },
  invite_only: { type: Boolean, default: false },
  custom_questions: [{ question: String, answer: String }],
});

const MessageSchema = new Schema({
  type: { type: String, enum: ["email", "sms"], required: true },
  subject: { type: String },
  template: { type: String, required: true },
  sender_email: { type: String },
  sender_name: { type: String },
  send_on: { type: String, enum: ["signup", "password_reset", "custom"] },
});

const AppIntegrationSchema = new Schema({
  client_id: { type: String, required: true },
  client_secret: { type: String, required: true },
  redirect_uris: { type: [String], required: true },
  hosted_ui_domain: {type: [String]},
  scopes: { type: [String] },
  grant_types: {
    type: [String],
    enum: ["authorization_code", "client_credentials"],
    required: true,
  },
  token_lifetime: { type: Number, default: 3600 },
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
