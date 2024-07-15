import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const { Schema } = mongoose;

const AppClientSchema = new Schema({
  clientId: { type: String, required: true, default: uuidv4 },
  clientSecret: { type: String, required: true, default: () => crypto.randomBytes(32).toString('hex') },
  clientName: { type: String },
  tokenValidity: { type: Number, default: 3600 },
  isActive: { type: Boolean, default: true },
  callbackUrl: { type: String, required: true },
});

const MFASchema = new Schema({
  enabled: { type: Boolean, default: false },
  methods: [{ type: String }], //MFA methods include SMS, email, authenticator apps, or custom biometric methods.
  totp: {
    issuer: { type: String }, //issuer or provider of the TOTP tokens
    period: { type: Number, default: 30 },
    digits: { type: Number, default: 6 }
  },
  biometric: {
    enabled: { type: Boolean, default: false },
    description: { type: String }
  }
});

const AccountRecoverySchema = new Schema({
  enabled: { type: Boolean, default: true },
  methods: [{ type: String }] //include SMS, email, authenticator apps
});

const PasswordPolicySchema = new Schema({
  minLength: { type: Number, default: 8 },
  requireUppercase: { type: Boolean, default: true },
  requireLowercase: { type: Boolean, default: true },
  requireNumbers: { type: Boolean, default: true },
  requireSymbols: { type: Boolean, default: true }
});

const UserAttributesSchema = new Schema({
  standard: [{ type: String }], //our mandatory like username, email, mob, ....
  custom: [{ type: String }] // user choice like address, dob...
});

const IdentityProviderSchema = new Schema({
  providerName: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  redirectUri: { type: String, required: true },
  authorizationUrl: { type: String, required: true },
  tokenUrl: { type: String, required: true },
  userInfoUrl: { type: String, required: true },
  scopes: [{ type: String, required: true }]
});

//generate URLs specific to that domain.

const DomainSettingsSchema = new Schema({
  domainPrefix: { type: String }
});

const ApplicationConfigSchema = new Schema({
  userId: {type: String, required: true},
  applicationName: { type: String, required: true },
  appClients: [AppClientSchema],
  domainSettings: DomainSettingsSchema,
  mfa: MFASchema,
  accountRecovery: AccountRecoverySchema,
  passwordPolicy: PasswordPolicySchema,
  userAttributes: UserAttributesSchema,
  identityProviders: [IdentityProviderSchema]
});

const ApplicationConfig = mongoose.model('ApplicationConfig', ApplicationConfigSchema);

export default ApplicationConfig;
